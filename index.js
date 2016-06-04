const parallel = require('async').parallel
const ipRangeCheck = require('ip-range-check')
const azure = require('./lib/azure')
const aws = require('./lib/aws')
const gce = require('./lib/gce')
const whois = require('./lib/whois')

function WhichCloud (ip, done) {
  var name = WhichCloud.default
  parallel([
    function (cb) {
      check(ip, azure(), function (err, _name) {
        if (err) return cb(err)
        else {
          if (_name) name = _name
          return cb()
        }
      })
    },
    function (cb) {
      check(ip, aws(), function (err, _name) {
        if (err) return cb(err)
        else {
          if (_name) name = _name
          return cb()
        }
      })
    },
    function (cb) {
      check(ip, gce(), function (err, _name) {
        if (err) return cb(err)
        else {
          if (_name) name = _name
          return cb()
        }
      })
    }
  ], function (err) {
    if (err) return done(err)

    if (name === WhichCloud.default) {
      whois(ip).org(function (err, _name) {
        if (err) return done(err)
        if (_name) name = _name
        return done(null, name)
      })
    } else {
      return done(null, name)
    }
  })
}

WhichCloud.default = 'unknown'

module.exports = WhichCloud

function check (ip, cloud, cb) {
  cloud.list(function (err, ranges) {
    if (err) return cb(err)
    else if (ipRangeCheck(ip, ranges)) {
      return cb(null, cloud.name)
    } else {
      return cb()
    }
  })
}
