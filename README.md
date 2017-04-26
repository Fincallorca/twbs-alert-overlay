## Twitter Bootstrap Alert Overlay

[![LICENSE](https://img.shields.io/badge/release-0.1.0-blue.svg?style=flat)](https://github.com/Fincallorca/twbs-alert-overlay/tree/0.1.0)
[![LICENSE](https://img.shields.io/badge/License-MIT-blue.svg?style=flat)](LICENSE)
[![https://jquery.com/](https://img.shields.io/badge/jQuery-3.1.1-red.svg?style=flat)](https://jquery.com/)
[![https://v4-alpha.getbootstrap.com/](https://img.shields.io/badge/Bootstrap-4.0.0--alpha6-red.svg?style=flat)](https://v4-alpha.getbootstrap.com/)

This is a small javascript snippet to show  [Bootstrap Alert Elements](https://v4-alpha.getbootstrap.com/components/alerts/) as result of XMLHttpRequests.
 
### Integrations

Download the code from GitHub and copy the dist directory to your project.

Include the following lines of code in the `<head>` section of your HTML.

```html
<link href="path/to/twbs-alert-overlay.jquery.min.css" rel="stylesheet" />
<script src="path/to/twbs-alert-overlay.jquery.min.js"></script>
```

### The basics

Use the predefined bootstrap `alert-*` types and add some content to show as alert message:
* `success`,
* `info`,
* `warning` or
* `danger`

```javascript
$.twbsAlertOverlay({
    messages:
    [
        {type: 'success', content: 'The entity was successfully updated.'},
        {type: 'warning', content: '<p>The database connection is not working!</p>'}
    ]
})
```

### Contributing

#### Building

[Google's Closure Compiler](https://developers.google.com/closure/compiler/)

```bash
java -jar closure-compiler.jar --js src/js/jquery.twbs-alert-overlay.js --js src/js/core.js --js_output_file dist/twbs-alert-overlay.jquery.min.js
```

Use an online css compressor, for instance [CSS Compressor](http://csscompressor.com/)