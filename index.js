const parallel = require('async').parallel
const ipRangeCheck = require('ip-range-check')
const providers = [
  require('./lib/azure'),
  require('./lib/aws'),
  require('./lib/gce')
]
const whois = require('./lib/whois')
const publicIp = require('public-ip')

function WhichCloud (ip, done) {
  var name = WhichCloud.default
  function checkersGenerator (ip) {
    const checkers = []
    providers.forEach(function (provider) {
      checkers.push(function (cb) {
        check(ip, provider(), function (err, _name) {
          if (err) return cb(err)
          else {
            if (_name) name = _name
            return cb()
          }
        })
      })
    })
    return checkers
  }

  function runCheckers (ip, done) {
    parallel(checkersGenerator(ip), function (err) {
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

  if (typeof ip === 'function') {
    done = ip
    publicIp.v4(function (err, hostIp) {
      if (err) return done(err)
      runCheckers(hostIp, done)
    })
  } else {
    runCheckers(ip, done)
  }
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
