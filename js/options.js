// Settings callbacks
// linter: ngspicejs-lint --browser
// global: chrome, SC
"use strict";

var IM = IM || {};

IM.url = localStorage.getItem('LAST_URL') || '';

IM.onClickSave = function () {
    // save code for this url to local storage
    var url = IM.url,
        code = IM.e.editor.value,
        o = {};
    o['CODE_' + url] = code;
    chrome.storage.local.set(o);
    IM.e.save.disabled = true;
};

IM.onClickImport = function () {
    // import settings from previous export
    SC.chooseFiles(function (aFiles) {
        var o = JSON.parse(aFiles[0].data);
        chrome.storage.local.clear();
        chrome.storage.local.set(o, function () {
            IM.url = Object.keys(o)[0];
            IM.fillUrls();
        });
    }, '.json', true);
};

IM.onClickExport = function () {
    // export settings to external json file
    chrome.storage.local.get(null, function (o) {
        SC.download(JSON.stringify(o, undefined, 4), 'improvements.json');
    });
};

IM.onChangeUrls = function () {
    if (!IM.e.save.disabled && confirm('Save changes for ' + IM.url + '?')) {
        IM.onClickSave();
    }
    IM.url = IM.e.urls.value;
    localStorage.setItem('LAST_URL', IM.url);
    var key = 'CODE_' + IM.e.urls.value;
    chrome.storage.local.get([key], function (o) {
        IM.e.editor.value = o[key] || '';
        IM.e.save.disabled = true;
    });
};

IM.fillUrls = function () {
    // fill select with urls
    IM.e.urls.textContent = '';
    chrome.storage.local.get(null, function (all) {
        for (var key in all) {
            if (key.match(/^CODE_/)) {
                var o = document.createElement('option');
                o.innerText = key.replace(/^CODE_/, '');
                IM.e.urls.appendChild(o);
                if (o.innerText === IM.url) {
                    o.selected = true;
                }
            }
        }
        IM.onChangeUrls();
    });
};

IM.onClickUrlDelete = function () {
    var s = IM.e.urls.value;
    if (confirm("Really delete URL " + s + " and it's code?")) {
        IM.e.save.disabled = true;
        chrome.storage.local.remove('CODE_' + s, function () {
            IM.fillUrls();
        });
    }
};

IM.onClickUrlAdd = function () {
    var s = prompt("Add new URL (e.g. example.com, or example.com/foo/bar)", IM.e.urls.value);
    if (s) {
        s = s.trim();
        var o = document.createElement('option');
        o.innerText = s;
        IM.e.urls.appendChild(o);
        IM.e.urls.value = s;
        IM.url = s;
        IM.e.editor.value = '';
        IM.e.editor.focus();
        localStorage.setItem('LAST_URL', IM.url);
    }
};

IM.onClickUrlChange = function () {
    var s = prompt("Change url (preserves code)", IM.url);
    if (s && s !== IM.url) {
        var old = IM.url;
        var o = {};
        o['CODE_' + s] = IM.e.editor.value;
        // add new
        chrome.storage.local.set(o, function () {
            // remove old
            chrome.storage.local.remove('CODE_' + old, function () {
                // update select
                IM.url = s;
                IM.fillUrls();
            });
        });
    }
};

IM.onKeyDownWindow = function (event) {
    // Ctrl+s to save
    if (event.ctrlKey && (event.key === 's')) {
        IM.onClickSave();
        event.preventDefault();
    }
};

IM.onKeyDownEditor = function (event) {
    // Tab indentation
    if (event.key === 'Tab') {
        event.preventDefault();
        var indent = '    ';
        var start = this.selectionStart;
        var end = this.selectionEnd;
        this.value = this.value.substring(0, start) + indent + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + indent.length;
        //this.value = this.value.substring(0, start) + '\t' + this.value.substring(end);
        //this.selectionStart = this.selectionEnd = start + 1;
    }
};

window.addEventListener('DOMContentLoaded', function () {
    // initialize events, restore values
    IM.e = SC.elementsWithId();
    IM.e.urls.onchange = IM.onChangeUrls;
    IM.e.url_add.onclick = IM.onClickUrlAdd;
    IM.e.url_change.onclick = IM.onClickUrlChange;
    IM.e.url_delete.onclick = IM.onClickUrlDelete;
    IM.e.save.onclick = IM.onClickSave;
    IM.e.editor.oninput = function () { IM.e.save.disabled = false; };
    IM.e.export.onclick = IM.onClickExport;
    IM.e.import.onclick = IM.onClickImport;
    IM.fillUrls();
    window.addEventListener('keydown', IM.onKeyDownWindow);
    IM.e.editor.addEventListener('keydown', IM.onKeyDownEditor);
});
