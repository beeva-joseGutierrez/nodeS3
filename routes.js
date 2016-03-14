'use strict';

let AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

// container which we will work
const container = 'contenedor7';


module.exports = function(app) {
	
	// get list all objects in container
	const getAllObjects = function(req, res) {
		let s3 = new AWS.S3();
		let response = [];

		// lista todos los objectos de un bucket
		s3.listObjects({Bucket: container}, function(err, data) {
			if (err) {
				console.log('Error: '+err);
			}
			else {
				for (let index in data.Contents) {
					let content = data.Contents[index];
					console.log('Content: ', content.Key, ' : ', content.LastModified);
					response.push({object: content.Key, lastModified: content.LastModified});
				}
			}
			res.send(response);
		})
	};

	// get object with name in params
	const getObjectByKey = function(req, res) {
		let s3 = new AWS.S3();

		// devuelve el contenido del archivo Key que esta contenido en un Bucket
		s3.getObject({Bucket: container, Key: req.params.key}, function(err, data) {
			if (err) {
				console.log('Error: '+err);
			}
			else {
				res.send({key: req.params.key, body:data.Body.toString()});
			}
		});
	};

	// API Routes
	app.get('/getAll', getAllObjects);
	app.get('/getObjectByKey/:key', getObjectByKey);
}