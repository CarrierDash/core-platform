"use strict";


angular.module("Authentication");

carrierdash.controller('loginController', ['$scope', '$rootScope', '$location', 'AuthenticationService', '$localStorage', '$auth', function($scope, $rootScope, $location, AuthenticationService, $localStorage, $auth){

	var inputJSON = "";
	//login
	$scope.login = function() {
			
			inputJSON = '{"username":' + '"' + $scope.email + '", "password":' + '"' + $scope.password + '"}';
			
			AuthenticationService.Login(inputJSON, function(response) {

			var errorMessage = '';
						
			if(response.messageId == 200) {
				
				$localStorage.userLoggedIn = true;
				$localStorage.loggedInUsername = $scope.username;						
				$location.path('/');
			}
			else {	

				if(response == "Unauthorized") {
					errorMessage = "Either Username or Password is incorrect";
				}

				$scope.error = errorMessage;
			}
		});
	};


	//logout
	$scope.logout = function() {
		$localStorage.userLoggedIn = false;
		$rootScope.userLoggedIn = false;
		$location.path('/login');
	}


	$scope.emailVerification = function(response1){

		inputJSON = {"token":$routeParams.token};

		AuthenticationService.emailVerification(inputJSON, function(response) {
		console.log(response);
			if(response.code == 400) {
				
				
				$scope.message = response.messageText;
				
			}
			else {
				$scope.message = "Thank you for using Carrier Dash. Your email has been verified and now you can login.";
			  	//rootScope.showLogin=true;
			}

		});
	}


	//forgot password
	$scope.resendPassword = function() {

		inputJSON = '{"username":' + '"' + $scope.username + '"}';

		AuthenticationService.resendPassword(inputJSON, function(response) {

			if(response.messageId == 200) {
				
				$scope.message = response.message;
			}
			else {
				$scope.message = response.message;
			}

		});
	}

	//authentication
	$scope.authenticate = function(provider) {
		$auth.authenticate(provider)
		.then(function(response) {
			//success
			$localStorage.userLoggedIn = true;
			$localStorage.loggedInUsername = response.data.displayName;
			$location.path('/home');
		})
		.catch(function(response) {
			
			$scope.error = response.data.message;
			$location.path('/login');
		});
		
	}

}]);
