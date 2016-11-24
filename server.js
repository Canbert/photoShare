// set up ========================
var express = require('express');
var app = express(); // create our app w/ express
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 80;
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var multer = require('multer');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

// configuration =================

var database = require('./config/database');
mongoose.connect(database.url);

require('./config/passport')(passport); // pass passport for configuration

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// required for passport
app.use(session({ secret: 'didsomebodysaythatineedtoputsomethinghere' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.set('json spaces', 2);
// socket.io chat ===================
require('./app/chat.js')(io);

// routing ========================
require('./app/routes/routes.js')(app, passport);
require('./app/routes/admin')(app,mongoose);
require('./app/routes/upload')(app, multer, multipartyMiddleware);
require('./app/routes/login')(app, passport);
require('./app/routes/register')(app, passport);
require('./app/routes/profile')(app);
require('./app/routes/chat')(app);


// listen (start app with node server.js) ======================================
server.listen(port, function () {
    console.log("Server listening on port " + port);
});
