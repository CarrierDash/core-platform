"use strict"

angular.module("Users")

.factory('UserService', ['$http', 'communicationService', function($http, communicationService) {

	var service = {};


	service.getUserList = function(callback) {
		
			communicationService.resultViaGet(webservices.userList, appConstants.authorizationKey, headerConstants.json, function(response) {
			callback(response.data);
		});

	}

	service.saveUser = function(inputJsonString, callback) {
			communicationService.resultViaPost(webservices.addUser, appConstants.authorizationKey, headerConstants.json, inputJsonString, function(response) {
			callback(response.data);
		});
	}

	service.statusUpdateUser = function(inputJsonString, callback) {
			communicationService.resultViaPost(webservices.updateStatus, appConstants.authorizationKey, headerConstants.json, inputJsonString, function(response) {
			callback(response.data);
		});

	}

	service.deleteUser = function(inputJsonString, callback) {
			communicationService.resultViaPost(webservices.deleteUser, appConstants.authorizationKey, headerConstants.json, inputJsonString, function(response) {
			callback(response.data);
		});
	}

	service.editUser = function(userID, callback) {

		var serviceURL = webservices.editUser + "/" + userID;
		communicationService.resultViaGet(serviceURL, appConstants.authorizationKey, "", function(response) {
			callback(response.data);
		});

	}

	service.updateUser = function(inputJsonString, callback) {

		communicationService.resultViaPost(webservices.updateUser, appConstants.authorizationKey, headerConstants.json, inputJsonString, function(response) {
		callback(response.data);
		});
	}

	return service;


}]);
