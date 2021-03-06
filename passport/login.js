const LocalStrategy   = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = function(passport) {
	// passport/login.js
	passport.use('login', new LocalStrategy({
		passReqToCallback : true
	},
	function(req, username, password, done) { 
		// check in mongo if a user with username exists or not
		User.findOne({ 'username' :  username }, 
			function(err, user) {
				// In case of any error, return using the done method
				if (err)
					return done(err);
				// Username does not exist, log error & redirect back
				if (!user){
					return done(null, false, 
						req.flash('message', 'User Not found.'));                 
				}
				// User exists but wrong password, log the error 
				if (!isValidPassword(user, password)){
					return done(null, false, 
						req.flash('message', 'Invalid Password'));
				}
				// User and password both match, return user from 
				// done method which will be treated like success
				return done(null, user);
			}
		);
	}));
	const isValidPassword = function(user, password) {
		return user.password === password;
	};
};