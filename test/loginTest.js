let should = require("should");
let request = require("request");
let expect = require("chai").expect;
let util = require("util");
var assert = require('assert');

describe("Log the user in",function(){
    it('Log the user in', function (done) {
      request.post('http://localhost:3000/login',
          { form: { email: "zenobiapanvelwalla@gmail.com",password:"123" } },
          function (error, response, body) {
              console.log(error);
              let body_parsed = JSON.parse(body);
              console.log(body_parsed);
              assert.equal(200, body_parsed.statusCode);
              done();
          });
    });
  });