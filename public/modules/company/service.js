"use strict"

angular.module("Company")

.factory('CompanyService', ['$http', 'communicationService', function($http, communicationService) {

	var service = {};


	service.getCompanyList = function(callback) {
		
			communicationService.resultViaGet(webservices.companyList, appConstants.authorizationKey, headerConstants.json, function(response) {
			callback(response.data);
		});

	}

	return service;


}]);
