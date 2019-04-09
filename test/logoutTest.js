let should = require("should");
let request = require("request");
let expect = require("chai").expect;
let util = require("util");
var assert = require('assert');

describe("Log the user out",function(){
    it("Log the user out",function(done){
      request.get('http://127.0.0.1:3000/logout',function(error,response,body){
        console.log(error);
        expect(body).to.equal("Session Invalidated");
        done();
      });
    });
  });