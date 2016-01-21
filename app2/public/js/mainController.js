var socket = io.connect();

angular.module("GitStats", ['ui.router']) // déclaration du module
.factory('socket', function($rootScope){
	//var socket = io.connect();

	return {
		// lors d'un appel sur socket.on
		on: function (eventName, callback){
			function wrapper() {
				var args = arguments;
				$rootScope.$apply(function(){
					callback.apply(socket, args);
				});
			}

			socket.on(eventName, wrapper);

			return function(){
				socket.removeListener(eventName, wrapper);
			};
		},

		// lors d'un appel sur socket.emit
		emit: function(eventName, data, callback){
			socket.emit(eventName, data, function(){
				var args = arguments;
				$rootScope.$apply(function(){
					if(callback) {
						callback.apply(socket, args);
					}
				});
			});
		}

	};
})
.config(function($stateProvider) {
	// Main state
  	$stateProvider.state('home', {
    	templateUrl: 'partials/home.html',
    	url: '/home',
    	controller: 'mainController'
  	});

  	$stateProvider.state('stats', {
    	templateUrl: 'partials/stats.html',
    	url: '/stats'
    	//controller: 'mainController'
  	});
})
.controller("mainController", function($scope, $http, $state, $stateParams){
	$state.go("home");

	$scope.repository = {
		name : "",
		stats : {}
	}

	$scope.names = [];
	$scope.error = "";

	socket.on('getStats', function(data){

		var serie = [];

		$scope.repository.stats = JSON.parse(data);

		console.log($scope.repository.stats);

		for(i = 0 ; i < $scope.repository.stats.length ; ++i){
			serie.push($scope.repository.stats[i].total);
		}

		if($scope.repository.stats[0]){
			$scope.names.push($scope.repository.name);
			console.log("NAMES : " + $scope.names);
			$scope.$apply();
			addSerie(serie, {
				//'nameY' : $scope.repository.name
			});
		}
		
	});

	$scope.addRepository = function(){
		$scope.error = "";

		for(i = 0 ; i < $scope.names.length ; ++i){
			if($scope.names[i] === $scope.repository.name){
				$scope.error = "This repository has already been added !";
				return;
			}
		}

		socket.emit("addRepository", $scope.repository.name);
	}
});