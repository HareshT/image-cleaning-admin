'use strict';
var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app = express();

app.use(morgan('dev'));
var www = __dirname + path.sep + 'app';

var port = process.env.PORT || 5000;
console.log(www);
app.use(gzippo.staticGzip(www));

console.log('UI is service on PORT : ', port);
app.listen(port);
