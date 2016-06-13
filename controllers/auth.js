var passport = require('passport');
var BasicStrategy = require("passport-http").BasicStrategy;
var Client = require("../models/client.js");

passport.use(new BasicStrategy(function(clientID, clientSecret, callback) {
	Client.findOne({_id: clientID}, function(err, client) {
		if(err)
			return callback(err);
		if(client == null)
		{
			console.log("There is no client: " + clientID);
			return callback(err);
		}
		else {
			client.verifyClientSecret(clientSecret, function(err, isMatch) {
				if(err)
					return callback(err);
				if(!isMatch) 
					return callback(null, false);
				return callback(null, client);
			});
		}
	});
}));


module.exports.isAuthenticated = passport.authenticate('basic', {session: false});