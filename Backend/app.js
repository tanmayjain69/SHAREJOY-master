const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const eventsRouter = require('./routes/events');
const app = express();
const bodyParser=require('body-parser');
const multer = require('multer');
const upload = multer();
// database setup
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://sharejoy:fvPRubLxvULSryUd@cluster0-t9kzf.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true
}).then(() => {
	console.log('Connected to database');
},
err => {
	console.log(err);
    console.log('Connection Failed');
});
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());
app.use(multer({
    dest: path.join(__dirname, 'Backend/uploads')}).single('file'));

// handling CROS errors
app.use((req,res,next) => {
  res.header("Acess-Control-Allow-Origin","*"),
  res.header("Acess-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization");

if (req.method == 'OPTIONS'){
  res.header('Access-Control-Allow-Method','PUT,POST,PATCH,DELETE,GET');
  return res.status(200).json({});
}
next();
});

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads',express.static('uploads'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);

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
  res.json({
    message:err.message,
    error:err
  });
});

module.exports = app;
