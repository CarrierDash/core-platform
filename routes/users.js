module.exports = function(app, express, passport) {

	var router = express.Router();

	var userObj = require('./../app/controllers/users/users.js');
	router.get('/list', passport.authenticate('basic', {session:false}), userObj.list);
	router.post('/add', passport.authenticate('basic', {session:false}), userObj.add);
	router.post('/update_status', passport.authenticate('basic', {session:false}), userObj.updateUserStatus);
	router.post('/delete_user', passport.authenticate('basic', {session:false}), userObj.delete_user);
	router.get('/edit_user/:id', passport.authenticate('basic', {session:false}), userObj.edit_user);
	router.post('/update_user', passport.authenticate('basic', {session:false}), userObj.update_user);
	app.use('/users', router);

}