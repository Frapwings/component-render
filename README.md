# component-render

[![Build Status](https://travis-ci.org/Frapwings/component-render.png?branch=master)](https://travis-ci.org/Frapwings/component-render)

Render html files from template files for component



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


## License

[MIT license](http://www.opensource.org/licenses/mit-license.php).

See the `LICENSE`.
