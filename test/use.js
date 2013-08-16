'use strict';

/*!
 * import(s)
 */

var expect = require('expect.js');
var exec = require('child_process').exec;
var format = require('util').format;
var fs = require('fs');

var TEMPLATE_FIXTURES_PATH = __dirname + '/fixtures/templates/user.jade';
var GENERATE_HTML_PATH = 'user.html';
var LOCAL_PATH = __dirname + '/fixtures/user.json';
var PLUGIN_PATH = __dirname + '/fixtures/jade.js';


/*!
 * test(s)
 */

describe('component-render', function () {

  var testLocalOption = function (opt, plugin, desc_fn, after_fn) {
    describe(opt, function () {
      var cmd = format('bin/component-render %s %s -l %s %s', opt, plugin, LOCAL_PATH, TEMPLATE_FIXTURES_PATH);
      describe(cmd, function () {
        before(function (done) {
          exec(cmd, function (err, stdout, stderr) {
            if (err) { return done(err); }
            this.stdout = stdout;
            this.stderr = stderr;
            done();
          }.bind(this));
        });
        after_fn && after(after_fn);

        desc_fn && desc_fn();
      });
    });
  };

  var cleanup = function (done) {
    if (fs.existsSync(GENERATE_HTML_PATH)) {
      fs.unlinkSync(GENERATE_HTML_PATH);
    }
    done();
  };

  var commonDescribes = function () {
    describe('stdout', function () {
      it('expect to equal ""', function (done) {
        expect(this.stdout).to.eql('')
        done();
      });
    });

    describe('stderr', function () {
      it('expect to equal ""', function (done) {
        expect(this.stderr).to.eql('')
        done();
      });
    });

    describe('render file', function () {
      it('expect to contain "<p>Name: taro</p><p>Age: 99</p>"', function (done) {
        var html = fs.readFileSync(GENERATE_HTML_PATH).toString();
        expect(html).to.contain('<p>Name: taro</p><p>Age: 99</p>');
        done();
      });
    });
  };


  testLocalOption('--use', PLUGIN_PATH, commonDescribes, cleanup);
  testLocalOption('-u', PLUGIN_PATH, commonDescribes, cleanup);


}); // end of 'component-render'
