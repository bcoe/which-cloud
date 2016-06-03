/* global describe, it */

require('chai').should()

const which = require('../')

describe('which', function () {
  it('returns appropriate response for azure ip', function (done) {
    which('94.245.97.0', function (err, name) {
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

  it("returns 'unknown' if ip is not recognized", function (done) {
    which('9.9.9.9', function (err, name) {
      if (err) return done(err)
      name.should.equal('unknown')
      return done()
    })
  })
})
