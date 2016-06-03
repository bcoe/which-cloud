/* global describe, it */

require('chai').should()

var AWS = require('../lib/aws')
var nock = require('nock')

describe('AWS', function () {
  it('returns a list of IP ranges for AWS', function (done) {
    var aws = AWS()
    aws.list(function (err, ranges) {
      if (err) return done(err)
      ranges.should.include('23.20.0.0/14')
      return done()
    })
  })

  it('handles an upstream error', function (done) {
    var aws = AWS()
    var getRanges = nock('https://ip-ranges.amazonaws.com')
      .get('/ip-ranges.json')
      .reply(500)
    aws.list(function (err, ranges) {
      getRanges.done()
      err.statusCode.should.equal(500)
      return done()
    })
  })
})
