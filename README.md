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

```


## Example

```
    # redner html file from template file
    $ component render simple.jade

    # render html file from template file with local json file
    $ component render -l user.json user.jade

    # render html file to output directory path
    $ component render -o ./render simple.jade

```

## template engine
Support `Jade` template engine. `Hogan`, `EJS`, and other template engine, you can support with plugin.


## TODO

- `-u`, `--use` option


## License

[MIT license](http://www.opensource.org/licenses/mit-license.php).

See the `LICENSE`.
