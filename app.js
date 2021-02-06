import express from "express"
import createError from 'http-errors'
import path from "path"
import logger from "morgan"


import indexRouter from "./routes/index"
import usersRouter from "./routes/users"
import {set_kuran_router} from "./routes/kuran"
import { set_hadith_router } from "./routes/hadith";
import {  set_result_object } from "./middleware/index";


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



app.use('/',set_result_object, indexRouter);
app.use('/users', usersRouter);


//////////////////////////////

set_kuran_router(app)

//////////////////////////////

set_hadith_router(app)


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
