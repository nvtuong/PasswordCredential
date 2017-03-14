var router = require('express').Router();
var user = require('./user');

router.get('/', function(req, res) {
	res.json('Thag lol dinh');
});

router.use('/user', user);

module.exports = router;

