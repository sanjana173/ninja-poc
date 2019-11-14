var express = require('express');
var ejs = require('ejs');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var http = require('http').Server(app);
var io = require('socket.io')(http);
var User = require('./models/user');
var localStorage = require('localStorage');
//var alert1 = require('alert');

var port = 3000;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo:27017/User', { useNewUrlParser: true });

var apiRoutes = require("./chatMongo/api-routes")

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRoutes)


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');	

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var index = require('./routes/index');
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

// listen on port 3000
app.listen(3000, function () {
  console.log('Express app listening on port 3000');
});
var clients = '';


$(document).ready(function() {
    $.ajax({
        url: "http://192.168.99.100:3000/api/chats/"
    }).then(function(data) {
       $('.name').append(data.name);
       $('.message').append(data.message);
    });
});

    socket.on('connection', function(name,message) {
        io.emit('chat_message', '<strong>' + socket.name + '</strong>: ' + message);
    });

});


const server = http.listen(port, function() {
    console.log('listening on *:' +port);
});
