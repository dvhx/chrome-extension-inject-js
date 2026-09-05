// This script is executed on every website (in MAIN world, can do EVAL)
// linter: ngspicejs-lint --browser
// global: chrome
"use strict";

//console.log('Improvements content_world_main.js');

window.addEventListener('message', function (event) {
    //console.log("Improvements content_world_main.js", document.location, event);
    if (event.source !== window) {
        throw "Improvements: Source must be window!";
    }
    if (event.origin !== document.location.origin) {
        throw "Improvements: Origin must be " + document.location.origin;
    }

    // library of commonly used functions (will be used in eval)
    var blackOnWhite = function () {
        // change all text to be black text on white background
        var t, a, i,
            tag_names = ['p', 'li', 'a', 'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'form', 'input', 'button', 'iframe', 'table', 'b', 'i', 'u'];
        for (t = 0; t < tag_names.length; t++) {
            a = document.getElementsByTagName(tag_names[t]);
            for (i = 0; i < a.length; i++) {
                a[i].style.color = 'black';
                a[i].style.backgroundColor = 'white';
            }
        }
    };

    var removeImages = function () {
        // remove images
        var i,
            img = document.getElementsByTagName('img');
        for (i = 0; i < img.length; i++) {
            img[i].src = '';
        }
    };

    var removeUglyFonts = function () {
        // replace everything with standard font
        var t, a, i, default_font_family = 'sans-serif, arial important';
        function remove_fonts_for_elements(tag_names) {
            for (t = 0; t < tag_names.length; t++) {
                a = document.getElementsByTagName(tag_names[t]);
                for (i = 0; i < a.length; i++) {
                    a[i].style.fontFamily = default_font_family;
                }
            }
        }
        remove_fonts_for_elements(['p', 'li', 'a', 'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'form', 'input', 'button', 'iframe', 'table', 'b', 'i', 'u']);
        // In 2015, some pages still uses font element
        a = document.getElementsByTagName('font');
        for (i = 0; i < a.length; i++) {
            a[i].face = '';
            a[i].size = '';
        }
    };

    eval(event.data.code);
});

