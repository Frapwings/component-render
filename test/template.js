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

  var testTemplate = function (test_desc, cmd, desc_fn, after_fn) {
    describe(test_desc, function () {
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

  var cleanup = function (path) {
    return function (done) {
      if (fs.existsSync(path)) {
        fs.unlinkSync(path);
      }
      done();
    };
  };

  var commonDescribes = function (path, expect_html) {
    return function () {
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
        it(format('expect to contain "%s"', expect_html), function (done) {
          var html = fs.readFileSync(path).toString();
          expect(html).to.contain(expect_html);
          done();
        });
      });
    };
  };


  testTemplate(
    'simple template', 
    format('bin/component-render %s', path.join(TEMPLATE_FIXTURES_DIR, 'simple.jade')), 
    commonDescribes('simple.html', '<p>hello world</p>'),
    cleanup('simple.html')
  );
  testTemplate(
    'include template', 
    format('bin/component-render %s', path.join(TEMPLATE_FIXTURES_DIR, 'include.jade')), 
    commonDescribes('include.html', '<p>hello world</p>'), 
    cleanup('include.html')
  );

}); // end of 'component-render'
