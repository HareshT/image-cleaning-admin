'use strict';
var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app = express();

var port = process.env.PORT || 5000;
app.use(morgan('dev'));
app.use(express.static(__dirname + "/dist/index.html"));
console.log('UI is service on PORT : ', port);
app.listen(port);
