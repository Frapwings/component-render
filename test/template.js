'use strict';

/*!
 * import(s)
 */

var expect = require('expect.js');
var exec = require('child_process').exec;
var format = require('util').format;
var fs = require('fs');
var path = require('path');

var TEMPLATE_FIXTURES_DIR = __dirname + '/fixtures/templates';


/*!
 * test(s)
 */

describe('component-render', function () {

  var testTemplateOption = function (opt, template_path, desc_fn, after_fn) {
    describe(opt, function () {
      describe(format('bin/component-render %s %s', opt, template_path), function () {
        before(function (done) {
          exec(format('bin/component-render %s %s', opt, template_path), function (err, stdout, stderr) {
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


  var SIMPLE_HTML_PATH = 'bin/simple.html';
  testTemplateOption('--template', path.join(TEMPLATE_FIXTURES_DIR, 'simple.jade'), function () {
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
        var html = fs.readFileSync(SIMPLE_HTML_PATH).toString();
        expect(html).to.contain('<p>hello world</p>');
        done();
      });
    });
  }, function (done) {
    if (fs.existsSync(SIMPLE_HTML_PATH)) {
      fs.unlinkSync(SIMPLE_HTML_PATH);
    }
    done();
  });

  //testTemplateOptionOption('-t');

}); // end of 'component-render'
