'use strict';

/*!
 * import(s)
 */
var jade = require('jade');
var debug = require('debug')('component-render');


/*!
 * export(s)
 */
exports = module.exports = function (program, fn) {
  var local = {};
  if (program.local) {
    local = require(program.local);
  }
  debug('local', local);
  jade.renderFile(program.template, local, function (err, html) {
    fn(err, html);
  });
};
