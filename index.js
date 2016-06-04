const parallel = require('async').parallel
const ipRangeCheck = require('ip-range-check')

const providers = [
    require('./lib/azure'), 
    require('./lib/aws'), 
    require('./lib/gce')
];

module.exports = (ip, done) => {
    let name = 'unknown';

    function checkersGenerator(ip) {
        const checkers = [];
        providers.forEach(provider => {
            checkers.push(cb => {
                check(ip, provider(), (err=null, _name=null) => {
                    if (err) return cb(err);
                    if (_name) name = _name;
                    return cb(null);
                });
            });
        });
        return checkers;
    }

    parallel(checkersGenerator(ip), err => {
        if (err) return done(err)
        else return done(null, name)
    })
};

function check(ip, cloud, cb) {
    cloud.list((err, ranges) => {
        if (err) return cb(err)
        else if (ipRangeCheck(ip, ranges)) {
            return cb(null, cloud.name)
        } else {
            return cb()
        }
    })
}