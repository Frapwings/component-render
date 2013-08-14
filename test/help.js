'use strict';

/*!
 * import(s)
 */

var expect = require('expect.js');
var exec = require('child_process').exec;
var format = require('util').format;


/*!
 * test(s)
 */

describe('component-render', function () {

  var testHelpOption = function (opt) {
    describe(opt, function () {
      describe(format('bin/component-render %s', opt), function () {
        before(function (done) {
          exec(format('bin/component-render %s', opt), function (err, stdout, stderr) {
            if (err) { return done(err); }
            this.stdout = stdout;
            this.stderr = stderr;
            done();
          }.bind(this));
        });

        describe('stdout', function () {
          it('expect to contain "Usage: component-render [options] <template>"', function (done) {
            expect(this.stdout).to.contain('Usage: component-render [options]');
            done();
          });

          it('expect to contain "-V, --version"', function (done) {
            expect(this.stdout).to.contain('-V, --version');
            done();
          });

          it('expect to contain "-h, --help"', function (done) {
            expect(this.stdout).to.contain('-h, --help');
            done();
          });

          it('expect to contain "-l, --local <json>"', function (done) {
            expect(this.stdout).to.contain('-l, --local <json>');
            done();
          });

          it('expect to contain "-o, --out <dir>"', function (done) {
            expect(this.stdout).to.contain('-o, --out <dir>');
            done();
          });

          it('expect to contain "-u, --use <name>"', function (done) {
            expect(this.stdout).to.contain('-u, --use <name>');
            done();
          });
        }); // end of 'stdout'

        describe('stderr', function () {
          it('expect to equal ""', function (done) {
            expect(this.stderr).to.eql('')
            done();
          });
        }); // end of 'stderr'
      });
    });
  };

  testHelpOption('--help');
  testHelpOption('-h');

}); // end of 'component-render'
