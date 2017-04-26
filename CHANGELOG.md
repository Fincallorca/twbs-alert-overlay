## Changes in Twitter Bootstrap Alert Overlay

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

### [0.1.0] - 2017-04-26

#### Added
* CSS style of including `<p>` tags.
* Added no-scroll by adding `overflow: hidden` to the `body` element.
* Added keep showing the scrollbar when displaying the alert.

#### Changed
* Renamed `core.js` to [TwbsAlertOverlay.js](src/js/TwbsAlertOverlay.js).
* [Dist](dist/) files are prefixed with `jquery.` instead of suffixed with `.jquery`.

#### Fixed
* Removed predefined messages in `TwbsAlertOverlay.DEFAULTS`.

### [0.0.1] - 2017-04-20

#### Added
* First version