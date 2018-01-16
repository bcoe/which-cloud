/* global describe, it */

require('chai').should()

const which = require('../')

describe('which', function () {
  it('returns appropriate response for azure ip', function (done) {
    which('13.65.128.128', function (err, name) {
      if (err) return done(err)
      name.should.equal('azure')
      return done()
    })
  })

  it('returns appropriate response for aws ip', function (done) {
    which('54.173.231.161', function (err, name) {
      if (err) return done(err)
      name.should.equal('aws')
      return done()
    })
  })

  it('returns appropriate response for gce ip', function (done) {
    which('104.196.27.39', function (err, name) {
      if (err) return done(err)
      name.should.equal('gce')
      return done()
    })
  })

  it('falls back to whois organization', function (done) {
    which('208.43.118.0', function (err, name) {
      if (err) return done(err)
      name.should.match(/SoftLayer/)
      return done()
    })
  })

  it("returns 'unknown' if ip is not recognized", function (done) {
    which('999.999.999.999', function (err, name) {
      if (err) return done(err)
      name.should.equal('unknown')
      return done()
    })
  })
})
