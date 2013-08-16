'use strict';

/*!
 * import(s)
 */
var jade = require('jade');
var path = require('path');
var fs = require('fs');
var debug = require('debug')('component-render');


/*!
 * export(s)
 */
exports = module.exports = function (template, program, fn) {
  var local = {};
  if (program.local) {
    var resolve_path = path.resolve(program.local);
    local = fs.existsSync(resolve_path) ? require(resolve_path) : require(resolve_path + 'json');
  }
  debug('local', local);
  jade.renderFile(template, local, function (err, html) {
    fn(err, html);
  });
};
