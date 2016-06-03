const parallel = require('async').parallel
const ipRangeCheck = require('ip-range-check')
const azure = require('./lib/azure')
const aws = require('./lib/aws')

module.exports = function (ip, done) {
  var name = 'unknown'
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
    }
  ], function (err) {
    if (err) return done(err)
    else return done(null, name)
  })
}

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
