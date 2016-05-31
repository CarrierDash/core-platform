module.exports = function(app, express, passport) {

	var router = express.Router();

	var companyObj = require('./../app/controllers/company/company.js');
	router.get('/list', passport.authenticate('basic', {session:false}), companyObj.list);
	app.use('/company', router);

}
