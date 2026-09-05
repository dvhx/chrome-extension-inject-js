// Background script
// linter: ngspicejs-lint --browser
// global: chrome
"use strict";

chrome.action.onClicked.addListener(() => {
    chrome.runtime.openOptionsPage();
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('REQUEST:', request, sender);

    // find corresponding code for this url
    var url = new URL(request), code = '', full = url.toString().replace('http://', '').replace('https://', '');
    console.log('URL:', url, 'hostname', url.hostname, 'full', full);

    chrome.storage.local.get(['*', 'CODE_' + url.hostname, 'CODE_' + full], function (o) {
      // any page
      if (o['CODE_*']) {
          code += o['CODE_*'];
      }
      // same host
      if (o['CODE_' + url.hostname]) {
          code += o['CODE_' + url.hostname];
      }
      // full url
      if (o['CODE_' + full]) {
          code += o['CODE_' + full];
      }
      // console.log('found', url, code);

      // chrome.browserAction.setBadgeText({ text: '123' });
      sendResponse(code);
    });

    return true;
});

