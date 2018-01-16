const assign = require('lodash.assign')
const request = require('request')
const parse = require('xml2js').parseString

function Azure (opts) {
  assign(this, {
    rangesURL: 'https://www.microsoft.com/en-us/download/confirmation.aspx?id=41653',
    name: 'azure'
  }, opts)
}

Azure.prototype.list = function (cb) {
  getHrefURI(this.rangesURL)
    .then(function (output) {
      parse(output, function (err, obj) {
        if (err) return cb(err)
        else return cb(null, transform(obj))
      })
    })
    .catch(function (err) {
      if (err) { throw err }
    })
}

const getHrefURI = function (uri) {
  return new Promise((resolve, reject) => {
    request(uri, (err, body, resp) => {
      if (err) { return reject(err) }
      if (body.statusCode !== 200) {
        return reject(new Error('Azure: Non-200 response from ' + uri))
      }
      const fileRegex = /href="(.*?PublicIPs.*?xml)"/g
      const uriMatches = fileRegex.exec(resp)
      if (uriMatches.length < 2) {
        return reject(new Error('Azure: No file download urls found at ' + uri))
      }
      const rangeXMLUri = uriMatches[1]
      request(rangeXMLUri, (err, body, resp) => {
        if (err) { return reject(err) }
        if (body.statusCode !== 200) {
          return reject(new Error('Azure: Non-200 response from ' + rangeXMLUri))
        }
        resolve(resp)
      })
    })
  })
}

function transform (obj) {
  const regions = obj.AzurePublicIpAddresses.Region.map(function (range) {
    return range.IpRange.map(function (ipr) {
      return ipr.$.Subnet
    })
  })
  return [].concat.apply([], regions)
}

module.exports = function (opts) {
  return new Azure(opts)
}
