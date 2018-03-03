const express = require('express');
const path = require('path');

const app = express();

app.use(express.static("wwwroot"));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


