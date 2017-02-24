'use strict';
var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app = express();

var port = process.env.PORT || 5000;
app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(port);
