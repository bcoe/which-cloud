const whois = require('whois')
const entryRegex = /^(network:)?Organization(;I)?:\W*(.*)/

function WhoIs (ip) {
  this.ip = ip
}

WhoIs.prototype.org = function (cb) {
  whois.lookup(this.ip, function (err, data) {
    if (err) return cb(err)

    var org = data.split('\n').filter(function (entry) {
      return entryRegex.test(entry)
    })

    if (org.length) return cb(null, org[0].replace(entryRegex, '$3'))
    else return cb()
  })
}

module.exports = function (ip) {
  return new WhoIs(ip)
}
