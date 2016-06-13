var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	username: {type: String},
	password: {type: String},
	access_token: {type: String},
	refresh_token: {type: String},
	token_createAt: {type: Date}
});

User.methods.isTokenExpired = function() {
	var datenow = Date.now();
	var diff = (datenow.getTime() - token_createAt.getTime()) / 1000;
	if(diff > 3600)
		return true;
	return false;
}


module.exports = mongoose.model('User', User);