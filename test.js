'use strict';

var _ = require('lodash');
var test = require('tape');
var results = [];

test('creates unique hashes', function (t) {
  var createHash = require('./');
  sub([0,1,2,3]);
  sub({url:12});
  sub({headers:12});
  sub({headers:122});
  sub({headers:'122'});
  sub({headers:{accept:'text/plain'}});
  sub({payload:[0,1,2,3],headers:[{a:'b'}]});
  sub({a:function () {}});
  sub({b:function () {}});
  sub({b:function (a) {}});
  sub(function () {});
  sub(function (a) {});
  sub(function (b) {});
  sub(function (a) { return a;});
  sub(function (a) {return a;});
  sub('');
  sub('null');
  sub('false');
  sub('true');
  sub('0');
  sub('1');
  sub('void 0');
  sub('undefined');
  sub(null);
  sub(false);
  sub(true);
  sub(0);
  sub(1);
  sub(void 0);
  sub({});
  sub({a:{},b:{}});
  sub({b:{},a:{}});
  sub([]);
  t.equal(results.length, _.uniq(results).length);
  t.end();

  function sub (value) {
    var hash = createHash(value);
    results.push(hash);
    console.log('%s from:', hash, value);
  }
});
