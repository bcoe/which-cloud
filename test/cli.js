/* global describe, it */

require('chai').should()

const exec = require('child_process').exec

describe('cli', function () {
  it('displays help if no ip is provided', function (done) {
    exec('./bin/which-cloud.js', function (err, stdout, stderr) {
      err.message.should.match(/you must provide an ip to lookup/)
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
