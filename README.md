# which-cloud

[![Build Status](https://travis-ci.org/bcoe/gce-ips.svg)](https://travis-ci.org/bcoe/gce-ips)
[![Coverage Status](https://coveralls.io/repos/github/bcoe/which-cloud/badge.svg?branch=master)](https://coveralls.io/github/bcoe/which-cloud?branch=master)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)

given an IP address, return which cloud provider it belongs to (EC2, GCE, etc)

```sh
> which-cloud 104.196.27.39
> gce
```

## Installing

```sh
npm i which-cloud -g
```

## Supported Clouds

* Amazon Web Services (aws).
* Google Compute Engine (gce).
* Azure (azure)

## License

ISC
