var createError = require('http-errors');
var express = require('express');
var path = require('path');
const pug = require('pug')
const authenticated = require('./shared/libs/middleware/authenticated')

var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const cors = require('cors');

// middlewares
// const admin = require('./libs/middleware/admin');
const auth = require('./services/auth');
const userService = require('./services/user');

// routes import
// const authRouter = require('./routes/auth');

// admin routes
// const adminProduct = require('./routes/admin/product');
// const adminCategory = require('./routes/admin/category');


var app = express();

// view setup
app.engine('pug', pug.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// session config
const sess = session({
  secret: `${process.env.SECRET_KEY}`,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
});

app.use(sess);

app.use('/auth/', auth.routes);
app.use('/user/', userService.routes);


// // routes
// app.use('/auth', authRouter);

// // client side
// app.use('/products', clientProduct);

// // admin
// app.use('/admin/products', admin, adminProduct);
// app.use('/admin/categories', admin, adminCategory);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    err: {
      code: err.status || 500,
      message: err.message
    }
  });

});


module.exports = app;
