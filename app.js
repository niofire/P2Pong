const express = require('express');
const path = require('path');

const app = express();
var port = process.env.port || 1337;

app.use(express.static(path.join(__dirname,"wwwroot")));

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});


