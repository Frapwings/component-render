'use strict';

/*!
 * import(s)
 */

var expect = require('expect.js');
var exec = require('child_process').exec;
var format = require('util').format;
var fs = require('fs')

var PKG = JSON.parse(fs.readFileSync(__dirname + '/../package.json', 'utf8'));


/*!
 * test(s)
 */

describe('component-render', function () {

  var testVersionOption = function (opt) {
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
          it(format('expect to contain "%s"', PKG.version), function (done) {
            expect(this.stdout).to.contain(PKG.version);
            done();
          });
        });

        describe('stderr', function () {
          it('expect to equal ""', function (done) {
            expect(this.stderr).to.eql('')
            done();
          });
        });

      });
    });
  };

  testVersionOption('--version');
  testVersionOption('-V');

}); // end of 'component-render'
