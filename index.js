const parallel = require('async').parallel
const ipRangeCheck = require('ip-range-check')

const whois = require('./lib/whois')

const providers = [
  require('./lib/azure'),
  require('./lib/aws'),
  require('./lib/gce')
]

function WhichCloud (ip, done) {
  let name = WhichCloud.default
  function checkersGenerator (ip) {
    const checkers = []
    providers.forEach(provider => {
      checkers.push(cb => {
        check(ip, provider(), (err = null, _name = null) => {
          if (err) return cb(err)
          if (_name) name = _name
          return cb(null)
        })
      })
    })
    return checkers
  }

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
