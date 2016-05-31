"use strict";

angular.module("Authentication", []);
angular.module("Home", []);
angular.module("communicationModule", []);
angular.module("Users", []);
angular.module("Company", []);

var carrierdash = angular.module('carrierdash', ['ngRoute', 'ngStorage', 'ngTable', 'ngResource', 'ui.grid', 'Authentication', 'Home','communicationModule', 'Users', 'Company', 'satellizer'])

.factory('basicAuthenticationInterceptor', function() {
	
	var basicAuthenticationInterceptor = {
		request:function(config) {
			config.headers['Authorization'] = 'Basic ' + appConstants.authorizationKey;
 			config.headers['Content-Type'] = headerConstants.json;
	
			return config;
		}
	};

	return basicAuthenticationInterceptor;
	
})

.config(['$routeProvider', '$httpProvider', '$authProvider', '$locationProvider', function($routeProvider, $httpProvider, $authProvider, $locationProvider) {

	//$httpProvider.interceptors.push('basicAuthenticationInterceptor');

	$routeProvider
	.when('/', {
		controller:'homeController',
		templateUrl:'/modules/home/views/home.html'
	})

	.when('/home', {
		controller:'homeController',
		templateUrl:'/modules/home/views/home.html'
	})

	.when('/login', {
		controller:'loginController',
		templateUrl:'/modules/authentication/views/login.html'
	})

	.when('/forgot-password', {
		controller:'loginController',
		templateUrl:'/modules/authentication/views/forgot-password.html'
	})


	.when('/users', {
		controller : "userController",
		templateUrl : "/modules/users/views/listuser.html"
	})

	.when('/users/add', {
		controller : "userController",
		templateUrl : "/modules/users/views/adduser.html"
	})

	.when('/users/signup', {
		controller : "userController",
		templateUrl : "/modules/users/views/signup.html"
	})

	.when('/users/edit/:id' , {
		controller: "userController",
		templateUrl : "/modules/users/views/adduser.html"
	})

	.when('/email-verification:token' , {
		controller: "loginController",
		templateUrl : "/modules/authentication/views/email-verification.html"
	})


	.otherwise({
		redirectTo:'/modules/authentication/views/login.html'
	});

	//to remove the # from the URL
	//$locationProvider.html5Mode({enabled : true, requireBase : false});
}])

.run(['$rootScope', '$location', '$http', '$localStorage', function($rootScope, $location, $http, $localStorage) {

	if(!$localStorage.userLoggedIn) {
		$location.path('/login');
	}
}]);
