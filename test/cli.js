/* global describe, it */

const should = require('chai').should()

const exec = require('child_process').exec

describe('cli', function () {
  it('looks up host ip if no ip is provided', function (done) {
    exec('./bin/which-cloud.js', function (err, stdout, stderr) {
      should.not.exist(err)
      stderr.should.be.empty
      stdout.should.be.ok
      return done()
    })
  })

  it('looks up an ip', function (done) {
    exec('./bin/which-cloud.js 94.245.97.0', function (err, stdout, stderr) {
      if (err) return done(err)
      stdout.should.match(/azure/)
      return done()
    })
  })
})
