var router = require('express').Router();
var User = require('../../models/user.js');
var userController = require('../../controllers/user.js');

router.get('/all', function(req, res) {
	User.find({}, function(err, result) {
		if(err) {
			res.statusCode(404);
			res.send('Error');
		} else {
			res.send(result);
		}
	})
});

router.post('/create', userController.create);
router.post('/info', userController.getUserInfor);

module.exports = router;