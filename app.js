var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas.");
  })
  .catch(err => {
    console.log("MongoDB connection error:", err);
  }); 
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'assets')));



const indexRouter = require('./routes/indexRouter');
const usersRouter = require('./routes/usersRouter');
const restaurantRouter=require('./routes/restaurantsRouter');
const dishRouter = require('./routes/dishesRouter');
const cartRouter = require('./routes/cartRouter');
const dishAvailabilityRouter = require('./routes/dishAvailabilityRouter'); 


app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/restaurants',restaurantRouter);
app.use('/api/dishes', dishRouter);
app.use('/api/cart', cartRouter);
app.use('/api/dish-availability', dishAvailabilityRouter);




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
