const assign = require('lodash.assign')
const GCEIP = require('gce-ips')

function GCE (opts) {
  assign(this, {
    name: 'gce'
  }, opts)
}

GCE.prototype.list = function (cb) {
  GCEIP().lookup(function (err, ips) {
    return cb(err, ips)
  })
}

module.exports = function (opts) {
  return new GCE(opts)
}
