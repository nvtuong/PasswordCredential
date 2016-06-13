var User = require('../models/user.js'); 
var Puid = require('puid');
var puid = new Puid();

function getTokenResult(err, token, response) {
	if(err)
		res.send("Cannot get token of this user");
}

function grantToken(username, password, response) {
	User.findOne({username: username, password: password}, function(err, user) {
			if(err)
				res.send(err);
			else {
				var token = {"access_token": puid.generate(),
							 "refresh_token": puid.generate(),
							 "expires_in": 3600,
							 "token_type": "bearer"
							};
				user.access_token = token["acess_token"];
				user.refresh_token = token["refresh_token"];
				user.token_createAt = Date.now();
				user.save(function(err, result) {
					if(err) 
						res.send(err);
					else
						res.send(token);
				});
			}
		})
}

function refreshToken(refresh_token, response) {
	User.findOne({refresh_token: refresh_token}, function(err, user) {
		if(err)
			response.send(err);
		else {
			var token = {"access_token": puid.generate(),
						 "expires_in": 3600,
						 "token_type": "bearer"
						};
			user.access_token = token["access_token"];
			user.refresh_token = null;
			user.token_createAt = Date.now();
			user.save(function(err, result) {
				if(err)
					response.send(err);
				else 
					response.send(token);
			});
		}
	});
}


module.exports.token = function(req, res) {
	var grant_type = req.body.grant_type;
	if(grant_type === 'password') {
		var username = req.body.username;
		var password = req.body.password;
		grantToken(username, password, res);
	}
	else if(grant_type === 'refresh_token') {
		var refresh_token = req.body.refresh_token;
		refreshToken();
	}
}