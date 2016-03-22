'use strict';

const express = require('express');
const  bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('express-jwt');

let app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");

	next();
});

const auth = require('./auth');

app.post('/auth', auth.check, auth.validate);
//TODO app.use

app.get('/', function(req, res) {
	res.send('It works!')
});


require('./passport')(app); //Initialize and define the strategy
require('./login')(app);


const AWSRoutes = require('./routes'); //Operations in AWS
app.post('/object', auth.check, AWSRoutes.getAllObjects);
app.post('/object/:key', auth.check, AWSRoutes.getObjectByKey);

//TODO Logout
//TODO Problem with Google Auth


app.listen(5000, function() {
	console.log('listening in port 5000');
});