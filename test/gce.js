/* global describe, it */

require('chai').should()

const GCE = require('../lib/gce')

describe('GCE', function () {
  it('returns a list of IP ranges for GCE', function (done) {
    const gce = GCE()
    gce.list(function (err, ranges) {
      if (err) return done(err)
      ranges.should.include('8.34.208.0/20')
      return done()
    })
  })
})
