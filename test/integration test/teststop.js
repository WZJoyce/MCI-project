var server=require("../server.js");
var http = require("http");
var assert = require("assert");


it("should return stop test", function(done)
{
    http.get("http://127.0.0.1:8081/stop", function(res)
    {
        res.setEncoding("utf8");
        res.on("data", function(text)
        {
            assert.equal(text, '{"data":["The container has been removed"]}');
            done();
        });
    });
});