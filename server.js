var express = require('express');
var passport = require('passport');
var authController = require('./controllers/auth.js');
var clientController = require('./controllers/client.js');
var oauthController = require('./controllers/oauth.js');
var db = require('./database/database.js');
var urlDB = 'mongodb://localhost:27017/myoauthserver';
var bodyParser = require('body-parser');
var userController = require('./controllers/user.js');

var app = express();
var port = 9000;
var router = require('./routes');
app.use(passport.initialize());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// router.route('/app/create').post(clientController.create);
// router.route('/user/infor').post(userController.getUserInfor);
// router.route('/user/create').post(userController.create);
// router.route('/oauth/token').post(authController.isAuthenticated, oauthController.token);

router.route('/').get(function(req, res){
	console.log("home");
	res.send('Hello world');
});

app.use("/api", router);
db.connectToMongoDB(urlDB);


app.listen(9000, function() {
	console.log('Server is runnning at 9000');
	
});



