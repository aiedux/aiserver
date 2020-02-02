let express = require('express');
let path = require('path');
let logger = require('morgan');
let bodyParser = require('body-parser');
let redis = require('redis');

let app = express();

// Create Redis Client - Must have Redis server started with cmd: redis-server 
let client = redis.createClient();

client.on('connect', function () {
  console.log('Redis Server Connected...');
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  let title = 'Task List';

  // read all tasks entries from Redis db
  client.lrange('tasks', 0, -1, function (err, reply) {
    res.render('index', {
      title: title,
      tasks: reply
    });
  });
});

// adding a task posted from form
app.post('/task/add', function (req, res) {
  let task = req.body.task;

  client.rpush('tasks', task, function (err, reply) {
    if (err) {
      console.log(err);
    }
    console.log('Task Added...');
    res.redirect('/');
  });
});

app.listen(3000);
console.log('Server Started On Port 3000...');

module.exports = app;