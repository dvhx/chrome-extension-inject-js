# What is it?

This extension allow user to define JS code to inject onto any website.

# How to use it?

Let's say you want light gray background on www.google.sk. Open settings
site (or click on extension browser action button), add "www.google.sk" (note that chrome hides the www.) 
to the "URL" input and type in this code:

    document.body.style.backgroundColor = 'silver';

Hit "Save" button and when you visit www.google.sk, the background will
be light gray.

# Built-in functions

There are few built in functions built-in, you can use them without any
particular knowledge of JS. Try them out:

    removeUglyFonts();

    removeImages();

    blackOnWhite();

