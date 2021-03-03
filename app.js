var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var passport = require('passport')

var session = require('express-session')
var MemoryStore = require('memorystore')(session)
//var env = require('dotenv').load(); 

//IMPORT Models
var models = require("./models/index");

//Sync Database
models.sequelize.sync().then(function () {

    console.log('Connected to DB')

}).catch(function (err) {

    console.log(err, "Something went wrong with the Database!")

});

var indexRouter = require('./routes/index');

var serverRouter = require('./routes/server');

var apiRouter = require('./routes/api');

var app = express();
//: HANDLER
var handler = require('./lib/Handler');
handler.runCron() // RUN CRON TASKS
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json( {limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//? - - - - - - - - - -- - - - - - -PASSPORT
 
//app.use(session({ secret: '***$*$!jd@@##ah@#$',resave: true, saveUninitialized:true})); // session secret
app.use(session({
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  secret: '***$*$!jd@@##ah@#$_67',
  resave: true, saveUninitialized:true
}))

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


app.use('/', indexRouter);

app.use('/server', serverRouter);

app.use('/api', apiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
