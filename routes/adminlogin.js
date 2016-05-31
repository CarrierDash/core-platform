module.exports = function(app, express, passport) {

	var router = express.Router();

	var adminLoginObj = require('./../app/controllers/adminlogins/adminlogins.js');
	router.post('/authenticate', passport.authenticate('adminLogin', {session:false}), adminLoginObj.authenticate);
	router.post('/forgot_password', passport.authenticate('basic', {session:false}), adminLoginObj.forgotPassword);
	router.post('/email_verification/:token', adminLoginObj.emailVerification);
	app.use('/adminlogin', router);

}