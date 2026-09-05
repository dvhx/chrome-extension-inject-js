// This script is executed on every website (can send message to service worker)
// linter: ngspicejs-lint --browser
// global: chrome
"use strict";

//console.log('Improvements content.js');

(function () {
    var url = document.location.toString();
    //console.log('url', url);
    chrome.runtime.sendMessage(url, function (reply) {
        if (reply) {
            // evaluate user defined code
            //console.log('content.js postMessage', reply);
            window.postMessage({code:reply});
        }
    });
}());
