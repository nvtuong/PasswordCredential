var mongoose = require('mongoose');

module.exports.connectToMongoDB = function(urlPath) {
	mongoose.connect(urlPath);
	mongoose.connection.on('open', function() {
		console.log("Mongoose connected");
	});
}