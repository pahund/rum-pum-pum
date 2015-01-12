# Rum Pum Pum

![Monkey Logo](images/monkey-logo.png "Monkey Logo")

A browser-based music program for kids.

Uses [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) and [PIXI.js](http://www.pixijs.com/).

Written in JavaScript, based on the [entity-component-system](http://en.wikipedia.org/wiki/Entity_component_system) architecture pattern.

## Demo

[Early alpha version (in development)](http://pahund.github.io/rum-pum-pum/demo/index.html)

## Installation

Prerequisites:

* [NodeJS and npm](http://nodejs.org/)
* [Grunt](http://gruntjs.com/)
* [Bower](http://bower.io/)

Intallation steps:

* `npm install`
* `bower install`
* `grunt install`

Open up [index.html](index.html) in your favorite browser (needs to support Web Audio API).

## Creating Optimized Distribution Version

Rum Pum Pum uses [webpack](http://webpack.github.io/) to optimize and bundle its resources. To create a distribution,
use this command (after the steps listed above):

    grunt dist

## Credits and Acknowledgements

### Cuíca Sounds (Kangaroo)

Copyright (c) 2006 [reinsamba](https://www.freesound.org/people/reinsamba/).
Published under [Creative Commons CC BY 3.0](http://creativecommons.org/licenses/by/3.0/) license.
Downloaded from [Freesounds.org](https://www.freesound.org/people/reinsamba/packs/1339/).

## The MIT License (MIT)

Copyright (c) 2014 [Patrick Hund](https://github.com/pahund)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
