const assign = require('lodash.assign')
const request = require('request')

function AWS (opts) {
  assign(this, {
    rangesURL: 'https://ip-ranges.amazonaws.com/ip-ranges.json',
    name: 'aws'
  }, opts)
}

AWS.prototype.list = function (cb) {
  request.get({
    url: this.rangesURL,
    json: true
  }, function (err, res, obj) {
    if (res && res.statusCode >= 400) {
      err = Error('unexpected status = ' + res.statusCode)
      err.statusCode = res.statusCode
    }
    if (err) return cb(err)
    else {
      return cb(null, obj.prefixes.map(
        function (p) {
          return p.ip_prefix
        }
      ))
    }
  })
}

module.exports = function (opts) {
  return new AWS(opts)
}
