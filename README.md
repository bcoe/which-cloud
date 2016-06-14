# which-cloud

[![Build Status](https://travis-ci.org/bcoe/which-cloud.svg)](https://travis-ci.org/bcoe/which-cloud)
[![Coverage Status](https://coveralls.io/repos/github/bcoe/which-cloud/badge.svg?branch=master)](https://coveralls.io/github/bcoe/which-cloud?branch=master)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)

given an ip address, return which cloud provider it belongs to (EC2, GCE, etc)

```sh
$ which-cloud 104.196.27.39
gce
```

if no ip is given, `which-cloud` will use the public ip of the current host

```sh
$ which-cloud
AT&T Internet Services (SIS-80)
```

## Installing

### CLI

```sh
npm i which-cloud -g
```

```sh
which-cloud
```

### Module

```sh
npm i which-cloud --save
```

```js
const whichCloud = require('which-cloud')
```

## API

### `whichCloud([ip,] callback)`

- `ip`: string, optional

    Determine the cloud provider for this ip

    If no ip is given, the public ip of the current host will be used

- `callback`: function, required

    Called with an `Error` or the determined cloud provider as a string

## Supported Clouds

* Amazon Web Services (aws).
* Google Compute Engine (gce).
* Azure (azure).
* _fallback to [whois](https://www.npmjs.com/package/whois) lookup._

## Patches Welcome!

I would love help adding support for more cloud services.

## License

ISC
