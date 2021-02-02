import express from "express"
import createError from 'http-errors'
import path from "path"
import logger from "morgan"
//var createError = require('http-errors');
//var express = require('express');
//var path = require('path');
var cookieParser = require('cookie-parser');
//var logger = require('morgan');

import indexRouter from "./routes/index"
import usersRouter from "./routes/users"
import * as kuranRouter from "./routes/kuran"
import { KURAN_PATH, KURAN_AYAH_PATH, KURAN_NUMMER_PATH} from "./API/API_PATH";
import { make_symlinks, set_ayah_nummer, set_indexes, set_infos, set_kuran_nummer, set_mp3_files, set_mp3_files_ein_ayah, set_photos, set_photos_ein_ayah, set_result_object, set_sure_nummer } from "./middleware/kuran";

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(KURAN_PATH,set_result_object,set_kuran_nummer, set_sure_nummer) // Basis Middleware
app.use(KURAN_NUMMER_PATH, set_indexes, set_mp3_files, set_photos, set_infos, make_symlinks, kuranRouter.router_nummer);
app.use(KURAN_AYAH_PATH , set_ayah_nummer, set_mp3_files_ein_ayah, set_photos_ein_ayah, set_infos, make_symlinks, kuranRouter.router_ayah_nummer);

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
