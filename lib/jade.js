'use strict';

/*!
 * import(s)
 */
var jade = require('jade');
var debug = require('debug')('component-render');


/*!
 * export(s)
 */
exports = module.exports = function (template, program, fn) {
  var local = {};
  if (program.local) {
    local = require(program.local);
  }
  debug('local', local);
  jade.renderFile(template, local, function (err, html) {
    fn(err, html);
  });
};
