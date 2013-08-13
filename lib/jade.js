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
  var opts = {};
  jade.renderFile(template, opts, function (err, html) {
    fn(err, html);
  });
};
