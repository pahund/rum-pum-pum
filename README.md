# Rum Pum Pum

![Monkey Logo](images/monkey-logo.png "Monkey Logo")

A browser-based music program for kids.

Uses [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) and [PIXI.js](http://www.pixijs.com/).

Written in ECMAScript 6, based on the [entity-component-system](http://en.wikipedia.org/wiki/Entity_component_system) architecture pattern.

## Demo

[Early alpha version (in development)](http://pahund.github.io/rum-pum-pum/demo/index.html)

## Installation

Prerequisites:

* [NodeJS and npm](http://nodejs.org/)
* [Grunt](http://gruntjs.com/)

Installation steps:

* `npm install`

This will install all the required npm packages and start a Grunt build that creates a `dist` folder with static
files (HTML, CSS, JS, etc.). Open up `dist/index.html` in your browser to play (needs to support Web Audio API).

## Development 

Rum Pum Pum uses [webpack](http://webpack.github.io/) to optimize and bundle its resources. For easy developement
with live reloading, you can start a webpack dev server:

* `npm start`

Open up [localhost:8080](http://localhost:8080/) in your favorite browser.

## Running Tests

The unit tests of Rum Pum Pum are based on [jasmine](https://github.com/velesin/jasmine-jquery) and can be run with
the [Karma](http://karma-runner.github.io/) test runner.

You can also do this with npm:

* `npm test`

If you use a JetBrains IDE ([WebStorm](https://www.jetbrains.com/webstorm/) or [IntelliJ IDEA](https://www.jetbrains.com/idea/)),
you can also use the [Wallaby.js](http://wallabyjs.com/) test runner plugin (commercial software, but well worth it if
you like test driven development).

You can create a Wallaby.js run configuration, pointing to the [wallaby.js](wallaby.js) configuration file.

## Credits and Acknowledgements

### Cuíca Sounds (Kangaroo)

Copyright (c) 2006 [reinsamba](https://www.freesound.org/people/reinsamba/).
Published under [Creative Commons CC BY 3.0](http://creativecommons.org/licenses/by/3.0/) license.
Downloaded from [Freesounds.org](https://www.freesound.org/people/reinsamba/packs/1339/).

### Acknowledgements

Parts of _Rum Pum Pum_'s code are based on these projects on GitHub:

* [metronome](https://github.com/cwilso/metronome) by [Chris Wilson](https://github.com/cwilso)

### Third Party Libraries and Tools

* [pixi.js](https://github.com/GoodBoyDigital/pixi.js/) &mdash; Copyright (C) 2013-2015 Mathew Groves.
  [MIT License](https://github.com/GoodBoyDigital/pixi.js/blob/master/LICENSE)
* [webpack](http://webpack.github.io/) &mdash; Copyright (C) 2012-2015 Tobias Koppers.
  [MIT License](https://github.com/webpack/webpack/blob/master/LICENSE)
* [Grunt](http://gruntjs.com/) &mdash; Copyright (C) 2015 "Cowboy" Ben Alman.
  [MIT License](https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT)
* [jQuery](http://jquery.com/) &mdash; Copyright (C) 2015 The jQuery Foundation. 
  [jQuery License](https://jquery.org/license/)
* [jasmine](https://github.com/velesin/jasmine-jquery) &mdash; Copyright (C) 2010-2014 Wojciech Zawistowski, Travis Jeffery.
  [MIT License](https://github.com/velesin/jasmine-jquery/blob/master/MIT.LICENSE)
  
## The MIT License (MIT)

Copyright (C) 2015 [Patrick Hund](https://github.com/pahund)

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
