/*
 * The file will take care of the database connectivity
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/carrierdash');

//check if we are connected successfully or not
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));