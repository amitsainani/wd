// Generated by CoffeeScript 1.3.3
(function() {
  var app, express, runTestWith, should, wd;

  should = require('should');

  wd = require('../../lib/main');

  express = require('express');

  app = null;

  runTestWith = function(remoteWdConfig, desired) {
    var browser;
    browser = null;
    return {
      "wd.remote": function(test) {
        browser = wd.remote(remoteWdConfig);
        browser.on("status", function(info) {
          return console.log("\u001b[36m%s\u001b[0m", info);
        });
        browser.on("command", function(meth, path) {
          return console.log(" > \u001b[33m%s\u001b[0m: %s", meth, path);
        });
        return test.done();
      },
      "init": function(test) {
        return browser.init(desired, function(err) {
          should.not.exist(err);
          return test.done();
        });
      },
      "get": function(test) {
        return browser.get("http://127.0.0.1:8181/element-test-page.html", function(err) {
          should.not.exist(err);
          return test.done();
        });
      },
      "element.text": function(test) {
        return browser.element("id", "text", function(err, el) {
          should.not.exist(err);
          el.should.have.property("text");
          return el.text(function(err, res) {
            res.should.include("I am some text");
            return test.done();
          });
        });
      },
      "element.textPresent": function(test) {
        return browser.element("id", "text", function(err, el) {
          should.not.exist(err);
          el.should.have.property("textPresent");
          return el.textPresent("some text", function(err, present) {
            should.not.exist(err);
            present.should.be["true"];
            return test.done();
          });
        });
      },
      "element.getAttribute": function(test) {
        return browser.element("id", "getAttribute", function(err, el) {
          should.not.exist(err);
          el.should.have.property("getAttribute");
          return el.getAttribute("att", function(err, value) {
            should.not.exist(err);
            value.should.equal("42");
            return test.done();
          });
        });
      },
      "element.getValue": function(test) {
        return browser.element("id", "getValue", function(err, el) {
          should.not.exist(err);
          el.should.have.property("getValue");
          return el.getValue(function(err, value) {
            should.not.exist(err);
            value.should.equal("value");
            return test.done();
          });
        });
      },
      "element.sendKeys": function(test) {
        var text;
        text = "keys";
        return browser.element("id", "sendKeys", function(err, el) {
          should.not.exist(err);
          el.should.have.property("sendKeys");
          return el.sendKeys(text, function(err) {
            should.not.exist(err);
            return el.getValue(function(err, textReceived) {
              should.not.exist(err);
              textReceived.should.equal(text);
              return test.done();
            });
          });
        });
      },
      "element.clear": function(test) {
        return browser.element("id", "clear", function(err, el) {
          should.not.exist(err);
          el.should.have.property("clear");
          return el.clear(function(err) {
            should.not.exist(err);
            return el.getValue(function(err, textReceived) {
              should.not.exist(err);
              textReceived.should.equal("");
              return test.done();
            });
          });
        });
      },
      "close": function(test) {
        return browser.close(function(err) {
          should.not.exist(err);
          return test.done();
        });
      },
      "quit": function(test) {
        return browser.quit(function(err) {
          should.not.exist(err);
          return test.done();
        });
      }
    };
  };

  exports.wd = {
    "per element method test": {
      'starting express': function(test) {
        app = express.createServer();
        app.use(express["static"](__dirname + '/assets'));
        app.listen(8181);
        return test.done();
      }
    },
    chrome: runTestWith({}, {
      browserName: 'chrome'
    }),
    firefox: runTestWith({}, {
      browserName: 'firefox'
    }),
    'stopping express': function(test) {
      app.close();
      return test.done();
    }
  };

}).call(this);
