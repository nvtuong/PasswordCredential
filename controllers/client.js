var Client = require('../models/client.js');

module.exports.create = function(req, res) {
	var client = new Client();
	client.save(function(err, result) {
		if(err)
			res.send("Cannot create an App Client");
		else 
			res.send(client);
	});
}

