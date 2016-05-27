var path = require('path');
var Auth = require('./controllers/authController');
var passportService = require('./config/passport');
var passport = require('passport');
var userController = require('./controllers/userController');
var cardsController = require('./controllers/cardsController');
var swipeController = require('./controllers/swipeController');
var requireAuth = passport.authenticate('jwt', {session: false});
var requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app){
	// route to get index route
	app.get('/', function(req, res, next){
		res.sendFile(path.join(__dirname, '../client/index.html'));
	});

	// route when user signs in
	app.post('/user/signin', requireSignin, Auth.signin);

	// route when new user signs up
	app.post('/user/signup', Auth.signup);

	// route when user gets to their profile page
	app.get('/user/profile', requireAuth, function(req,res,next){
		console.log('inside get request for user profile');
		var user = req.user.attributes;
		var userObject = { 
			id: user.id, 
			name: user.name, 
			email: user.email, 
			language: user.language, 
			skillLevel: user.skillLevel, 
			github_handle: user.github_handle, 
			profile_url: user.profile_url 
		};
		res.send(userObject);
	});

	// route when user requests their cards
	app.get('/user/cards', requireAuth, cardsController.getCards);

	// route when user updates their information
	app.post('/user/edit', requireAuth, userController.editProfileInfo);
	
	// route if user swipes left on a card
	app.post('/cards/dislike', requireAuth, swipeController.dislike);

	// route if user swipes right on a card
	app.post('/cards/like', requireAuth, swipeController.like);

	// catch all route which redirects to index
	app.get('*',function(req, res){
		// TODO: change to send back index.html
		// res.sendFile(path.join(__dirname, '../client/index.html'));
		res.redirect('/');
	});

}