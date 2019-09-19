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

var port = 8080;

mongoose.connect('mongodb://mongo:27017/User', { useNewUrlParser: true });


var userName1;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));


app.get('/chat/:user1', function(req, res) {
//		User.findOne({unique_id:req.session.userId},function(err,data){
//		console.log("data");
//		console.log(data);
		userName1 = req.params.user1;
		res.render('index.ejs', { port : port, user1 : userName1});

//	});
    
//	app.locals.myVar = req.params.id;
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');	

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));

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

io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
//		clients.push(socket.username);
		client1 = socket.username;
		clients = clients.concat(",");
		clients = clients.concat(client1);
        io.emit('is_online', '?? <i>' + socket.username + ' join the chat..</i>' + '"\r\n"online users are : ' + clients);
		io.emit('online users are', '?? <i>' + clients);
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '?? <i>' + socket.username + ' left the chat..</i>');
		var1 = socket.username;
		var1 = ",".concat(var1);
		clients = clients.replace(var1,'');

//		clients.splice(clients.indexOf(client), 1);
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});


const server = http.listen(port, function() {
    console.log('listening on *:' +port);
});
