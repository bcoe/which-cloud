const assign = require('lodash.assign')
const fs = require('fs')
const path = require('path')
const parse = require('xml2js').parseString

function Azure (opts) {
  assign(this, {
    rangesFile: path.resolve(__dirname, '../data/PublicIPs.xml'),
    name: 'azure'
  }, opts)
}

Azure.prototype.list = function (cb) {
  fs.readFile(this.rangesFile, 'utf-8', function (err, output) {
    if (err) return cb(err)
    parse(output, function (err, obj) {
      if (err) return cb(err)
      else return cb(null, transform(obj))
    })
  })
}

function transform (obj) {
  return obj.AzurePublicIpAddresses.Region[0].IpRange.map(function (range) {
    return range.$.Subnet
  })
}

module.exports = function (opts) {
  return new Azure(opts)
}
