var User = require('../models/user.js');

module.exports.create = function(req, res) {
	var user = new User();
	user.username = req.body.username;
	user.password = req.body.password;
	user.save(function(err, result) {
		if(err)
			res.send(err);
		else {
			res.send(result);
		}
	});
}

function getAuthorization(authorization) {
	console.log(authorization);
	var arr = authorization.split(' ');
	var result = {
		"authorization": arr[0],
		"type": arr[1],
		"token": arr[2]
	};
	return result;
}

function isValidAuthorization(auth) {
	if(auth["authorization"] === "Authorization:" && auth["type"] === "Bearer")
		return true;
	return false;
}

module.exports.getUserInfor = function(req, res) {
	var authorization = getAuthorization(req.headers.authorization);
	if(isValidAuthorization) {
		var token = authorization["token"];
		User.findOne({access_token: token}, function(err, user) {
			if(err)
				res.send(err);
			else {
				if(user.isTokenExpired())
					res.send("Token has expired");
				else 
					res.send(user);
			}
		});
	}
	res.send("Your request is not valid!");
}