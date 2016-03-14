'use strict';

const express = require('express');
const  bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('It works!')
});

require('./routes')(app);

app.listen(5000, function() {
	console.log('listening in port 5000');
});