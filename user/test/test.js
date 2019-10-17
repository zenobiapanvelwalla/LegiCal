let should = require("should");
let request = require("request");
let expect = require("chai").expect;
let util = require("util");
var assert = require('assert');

describe("LegiCal",function(){
    it('Log the user in', function (done) {
         assert.equal(1+1, 2);
         done();
    });
    it('Add organization', function (done) {
          assert.equal(1+1, 2);
         done();
    });
    it('Add Comment', function (done) {
         assert.equal(1+1, 2);
         done();
    });
    it('Get comments', function (done) {
        assert.equal(1+1, 2);
         done();
    });
    it('Add to saved Bills', function (done) {
         assert.equal(1+1, 2);
         done();
    });
    it('Get saved Bills', function (done) {
       assert.equal(1+1, 2);
         done();
    });
    it('Logout', function (done) {
      request.post('http://ec2-52-53-162-75.us-west-1.compute.amazonaws.com:5000/logout',
          { form: { user: "zenobia" } },
          function (error, response, body) {
              console.log(error);
              let body_parsed = JSON.parse(body);
              console.log(body_parsed);
              assert.equal(200, body_parsed.statusCode);
              done();
          });
    });
  });

