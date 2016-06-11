#!/usr/bin/env node

const which = require('../')
const argv = require('yargs')
  .usage('$0 [ip]')
  .help()
  .alias('help', 'h')
  .argv

function cb (err, cloud) {
  if (err) {
    console.log(which.default)
    process.exit(1)
  } else {
    console.log(cloud)
    process.exit(0)
  }
}

if (argv._.length) which(argv._[0], cb)
else which(cb)
