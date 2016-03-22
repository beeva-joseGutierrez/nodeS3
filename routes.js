'use strict';

let AWS = require('aws-sdk');
AWS.config.loadFromPath('./config/config.json');

const s3 = new AWS.S3();

// container which we will work
const container = 'contenedor7';


const AWSRoutes =  {
	
	// get list all objects in container
	getAllObjects: function(req, res) {
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
	},

	// get object with name in params
	getObjectByKey: function(req, res) {

		// devuelve el contenido del archivo Key que esta contenido en un Bucket
		s3.getObject({Bucket: container, Key: req.params.key}, function(err, data) {
			if (err) {
				console.log('Error: '+err);
			}
			else {
				res.send({key: req.params.key, body:data.Body.toString()});
			}
		});
	}

}

module.exports=AWSRoutes;