/* global describe, it */

require('chai').should()

const Azure = require('../lib/azure')

describe('Azure', function () {
  it('returns a list of IP ranges for Azure', function (done) {
    const azure = Azure()
    azure.list(function (err, ranges) {
      if (err) return done(err)
      ranges.should.include('13.65.0.0/16')
      return done()
    })
  })
})
