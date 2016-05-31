/* var express = require('express');
var router = express.Router();

GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;*/

module.exports = function(app, express, passport) {

	var router = express.Router();

	var adminLoginObj = require('./../app/controllers/adminlogins/adminlogins.js');	
	
	app.use('/', router);

}

