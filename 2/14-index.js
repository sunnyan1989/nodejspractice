var server = require("./14-server");
var router = require("./14-router");
var requestHandlers = require("./14-nonblocking");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);