#!/usr/bin/env node

const which = require('../')
const argv = require('yargs')
  .usage('$0 <ip>')
  .help()
  .alias('help', 'h')
  .demand(1, 'you must provide an ip to lookup')
  .argv
const ip = argv._[0]

which(ip, function (err, cloud) {
  if (err) {
    console.log(which.default)
    process.exit(1)
  } else {
    console.log(cloud)
    process.exit(0)
  }
})
