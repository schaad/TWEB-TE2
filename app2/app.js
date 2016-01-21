

var express = require('express'),
  config = require('./config/config');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

var https = require("https");
var options = {
	host: 'api.github.com',
  	path: '',
  	method: '',
  	headers: {
  		'User-Agent' : 'TWEB - GitHub Stats - Schaad',
		'Accept' : 'application/json'
	}
};

var clientId = 'ca46d15b7d1515859102';
var clientSecret = '11ddbe6f36fcc4e94f9b3ecd4f095e6cbf0317fe';

require('./config/express')(app, config);

server.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});


var addAuth = function(path){
	return path + '?client_id=' + clientId + '&client_secret=' + clientSecret;
}

io.on('connection', function(socket){
	console.log('Un client s\'est connecté');

	// Définition des événements de communication avec le client

	socket.on('addRepository', function(repositoryName){
		console.log("A new repository as been added " + repositoryName);

		options.path = addAuth("/repos/" + repositoryName + "/stats/commit_activity");
		//console.log(options.host + options.path);
		options.method = "GET";

		var str = "";
		var req = https.request(options, function(res){

			res.on('data', function(data){
				str += data;
			});

			// Doit attendre la fin pour pouvoir envoyer toutes les données d'un coup vers le client
			res.on('end', function(){
				console.log("SUCCESS : " + req.data);
				console.log("Str " + str);

				io.emit('getStats', str);
			});
		});
		req.end();

		req.on('error', (e) => {
  			console.error(e);
		});
	});
});