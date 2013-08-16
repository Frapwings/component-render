# component-render

[![Build Status](https://travis-ci.org/Frapwings/component-render.png?branch=master)](https://travis-ci.org/Frapwings/component-render)

Render html file from template file for component



## Installation

With [Component](http://github.com/component/component) previously installed:

```
    $ npm install -g component-render
```


## Usage

```

  Usage: component-render [options] <template>

  Options:

    -V, --version              
    -h, --help                 output usage information
    -l, --local <json>         local <json> file
    -o, --out <dir>            output the compiled html to <dir>
    -u, --use <name>           use the given render <name> plugin

```


## Example

```
    # redner html file from template file
    $ component render simple.jade

    # render html file from template file with local json file
    $ component render -l user.json user.jade

    # render html file to output directory path
    $ component render -o ./render simple.jade

    # render html file with plugin
    $ component render -u component-render-hogan -l user.json user.mustache

```

## Template engine
Support `Jade` template engine. `Hogan`, `EJS`, and other template engine, you can support with plugin.


## How to create plugin
You need to implement below function.

- Function have `template`, `program` and `fn` arugments.
- `template`: a template file path.
- `program`: `commander` object.
- `fn`: a callback function. specify `error`, `html` to arguments.

### Plugin example
```javascript

var hogan = require('hogan.js');
var path = require('path');
var fs = require('fs');

module.exports = function (template, program, fn) {
  var local = {};
  if (program.local) {
    var resolve_path = path.resolve(program.local);
    local = fs.existsSync(resolve_path) ? require(resolve_path) : require(resolve_path + '.json');
  }
  fs.readFile(template, { encoding: 'utf8' }, function (err, data) {
    if (err) { return fn(err); }
    var renderer = hogan.compile(data);
    var html = renderer.render(local);
    fn(null, html);
  });
};

```


## License

[MIT license](http://www.opensource.org/licenses/mit-license.php).

See the `LICENSE`.
