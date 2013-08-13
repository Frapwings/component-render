'use strict';

/*!
 * import(s)
 */

var expect = require('expect.js');
var exec = require('child_process').exec;
var format = require('util').format;
var fs = require('fs');
var path = require('path');

var TEMPLATE_FIXTURES_PATH = __dirname + '/fixtures/templates/simple.jade';
var GENERATE_DIR = __dirname + '/fixtures/templates';
var GENERATE_HTML_PATH = __dirname + '/fixtures/templates/simple.html';


/*!
 * test(s)
 */

describe('component-render', function () {

  var testOutOption = function (opt, out_dir, desc_fn, after_fn) {
    describe(opt, function () {
      var cmd = format('bin/component-render -t %s %s %s', TEMPLATE_FIXTURES_PATH, opt, out_dir);
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
      it('expect to contain "<p>hello world</p>"', function (done) {
        var html = fs.readFileSync(GENERATE_HTML_PATH).toString();
        expect(html).to.contain('<p>hello world</p>');
        done();
      });
    });
  };


  testOutOption('--out', GENERATE_DIR, commonDescribes, cleanup);
  testOutOption('-o', GENERATE_DIR, commonDescribes, cleanup);


}); // end of 'component-render'
