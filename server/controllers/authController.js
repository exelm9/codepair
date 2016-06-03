// All authentication functionality in here
var jwt = require('jwt-simple');
var User = require('../models/user');
var Users = require('../collections/users');
// import JWT secret from here
var EnvConfig = require('../config/envConfig');

module.exports = {
	// Signin function:
	// req passed in has user attribute set to false if signin info was wrong or user does not exist, or a user object with all its attributes
	signin: function(req, res, next) {
		res.send({ token: tokenForUser(req.user),
				   name: req.user.attributes.name,
				   email: req.user.attributes.email,
				   language: req.user.attributes.language,
				   skillLevel: req.user.attributes.skillLevel });
	},

	// Signup function
	signup: function(req, res, next) {
		var email = req.body.email;
		var name = req.body.name;
		var language = req.body.language;
		var skillLevel = req.body.skillLevel;
		var password = req.body.password;
		var github = req.body.github_handle;
		var profilePic = req.body.profile_url;

		if(!email || !password) {
			return res.status(422).send({ error: 'You must provide email and password' });
		}

		// See if a user with given email exists
		new User({ email: email }).fetch().then(function(found) {

			// If a user with email does exist, return an error
			if (found) {
				return res.status(422).send({ error: 'Email is in use' });
			}

			// If a use with email does NOT exist, create and save user record
			var user = new User({
				email: email,
				name: name,
				language: language,
				skillLevel: skillLevel,
				password: password,
				github_handle: github,
				profile_url: profilePic,
				aggregateScore: 0
			});

			user.save().then(function(newUser) {
				console.log('New user created in authController.signup!');
				Users.add(newUser);

				// Respond to request indicating the user was created
				res.json({ token: tokenForUser(user) });
			});
		});
	}
}

// Helper function to create token for user
function tokenForUser(user) {
	console.log('tokenForUser fired');
	console.log('user id in tokenForUser is : ',user.id);
	var timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, EnvConfig.secret);
}