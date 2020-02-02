let express = require('express');
let path = require('path');
let logger = require('morgan');
let bodyParser = require('body-parser');
let redis = require('redis');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);
console.log('Server Started On Port 3000...');

module.exports = app;