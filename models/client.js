var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Puid = require('puid');
var puid = new Puid();

var Client = new Schema({
	name: {type: String, default: puid.generate()},
	secret: {type: String, default: puid.generate()},
});

Client.methods.verifyClientSecret = function(secret, callback) {
	if(secret !== this.secret)
		return callback("Password is not match: " + secret + " vs " + this.secret);
	return callback(null, true);
}

module.exports = mongoose.model('Client', Client);