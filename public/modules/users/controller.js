"use strict";

angular.module("Users")

carrierdash.controller("userController", ['$scope', '$rootScope', '$localStorage', 'UserService', 'ngTableParams', '$routeParams', '$route','CompanyService',  function($scope, $rootScope, $localStorage, UserService, ngTableParams, $routeParams, $route,CompanyService){

	
	if($localStorage.userLoggedIn) {
		$rootScope.userLoggedIn = true;
		$rootScope.loggedInUser = $localStorage.loggedInUsername;
	}
	else {
		$rootScope.userLoggedIn = false;
	}

	
	if($rootScope.message != "") {

		$scope.message = $rootScope.message;
	}

	//empty the $scope.message so the field gets reset once the message is displayed.
	$scope.message = "";

	//getUsers
	UserService.getUserList (function(response) {
		
		
		if(response.messageId == 200) {

			$scope.filter = {firstname: '', lastname : '', email : ''};

			$scope.tableParams = new ngTableParams({page:1, count:2, sorting:{firstname:"asc"}, filter:$scope.filter}, { total:response.data.length, counts:[], data: response.data});
			
			//apply global Search
			$scope.applyGlobalSearch = function() {

				var term = $scope.globalSearchTerm;

				if(term != "") {

					if($scope.isInvertedSearch) {
						term = "!" + term;
					}

					$scope.tableParams.filter({$ : term});
					$scope.tableParams.reload();			
				}
			}

			//multiple checkboxes
			var simpleList = response.data;
			$scope.checkboxes = {
				checked: false,
				items:{}
			};	

			// watch for check all checkbox
			    $scope.$watch(function() {
			      return $scope.checkboxes.checked;
			    }, function(value) {

			    	angular.forEach(simpleList, function(item) {

			       	$scope.checkboxes.items[item._id] = value;

			      });
			    });


			    // watch for data checkboxes
			    $scope.$watch(function() {
			      return $scope.checkboxes.items;
			    }, function(values) {
			    	//console.log("select one", values);

			      var checked = 0, unchecked = 0,
			          total = simpleList.length;
			      angular.forEach(simpleList, function(item) {
			        checked   +=  ($scope.checkboxes.items[item._id]) || 0;
			        unchecked += (!$scope.checkboxes.items[item._id]) || 0;
			      });
			      if ((unchecked == 0) || (checked == 0)) {
			        $scope.checkboxes.checked = (checked == total);
			      }


			      // grayed checkbox
			    // angular.element($element[0].getElementsByClassName("select-all")).prop("indeterminate", (checked != 0 && unchecked != 0));
			    var result = document.getElementsByClassName("select-all");

			   // console.log("result=" , result);

			    angular.element(result[0]).prop("indeterminate", (checked != 0 && unchecked != 0));

			    }, true);

		}
	});

	// $scope.companylist();
	$scope.companylist = function() {
		CompanyService.getCompanyList(function(response) {
			console.log("response is ",response);
			$scope.companyList = response;
		});
	}
	
	//console.log("company list is", );

	//saving the user
	$scope.addUser = function() {

		
		var inputJsonString = "";


		if($scope.firstname == undefined) {
			$scope.firstname = "";
		}

		if($scope.lastname == undefined) {
			$scope.lastname = "";
		}

		if($scope.email == undefined) {
			$scope.email = "";
		}

		if($scope.password == undefined) {
			$scope.password = "";
		}

		if($scope.phone == undefined) {
			$scope.phone = "";
		}

		if($scope.company_id == undefined) {
			$scope.company_id = "";
		}else{
			$scope.company_id = $scope.company_id._id;
		}

		console.log('company_id',$scope.company_id);
		if($scope.enable == undefined) {
			$scope.enable = "";
		}


		if($scope.userID == undefined) {

			inputJsonString = '{"firstname":"' + $scope.firstname + '", "lastname":"' + $scope.lastname + '", "email":"' + $scope.email + '", "password":"' +  $scope.password + '", "phone": "' + $scope.phone + '", "company": "' + $scope.company_id + '","type": "' + $scope.type + '", "enable": "' + $scope.enable + '" }';

			
			UserService.saveUser(inputJsonString, function(err, response) {

			if(err) {
				$scope.message = err.message;
			}
			else {
				if(response.data.messageId == 200) {
					$scope.message = messagesConstants.saveUser;
				}	
			}

			});
		
		}
		else {

			//edit
			inputJsonString = '{"_id":"' + $scope.userID+ '","firstname":"' + $scope.firstname + '", "lastname":"' + $scope.lastname + '", "email":"' + $scope.email + '", "username":"' + $scope.username + '", "displayname": "' + $scope.displayname + '", "enable": "' + $scope.enable + '" }';
			
			UserService.updateUser(inputJsonString, function(err, response) {
				if(err) {
					$scope.message = err.message;
				}
				else {
					if(response.data.messageId == 200) {
						$scope.message = messagesConstants.updateUser;
					}
				}

			});
		}
	}



	$scope.editUser = function() {
		UserService.editUser($routeParams.id, function(response) {
			
			if(response.messageId == 200) {
				$scope.firstname = response.data.firstname;
				$scope.lastname = response.data.lastname;
				$scope.email = response.data.email,
				$scope.username = response.data.username,
				$scope.displayname = response.data.displayName,
				$scope.enable = response.data.enable;
				$scope.userID = $routeParams.id;
			}
		});


	}

	
	if($routeParams.id) {
		$scope.editUser();
	}


	//perform action
	$scope.performAction = function() {
		var data = $scope.checkboxes.items;	
		var records = [];
		var inputJsonString = "";
		var jsonString = "";

		var actionToPerform = "";
		
		$scope.selectAction = selectAction.value;

		if($scope.selectAction == "disable") {
			actionToPerform = false;
		}
		else if($scope.selectAction == "enable") {
			actionToPerform = true;
		}
		else if($scope.selectAction == "delete") {

			actionToPerform = "delete";
		}

		//console.log("data=", data);

		for(var id in data) {
			if(data[id]) {
				if(actionToPerform == "delete") {
					if(jsonString == "") {

						jsonString = '{"_id": "' + id + '", "is_deleted":"true"}';	
					}
					else {
						jsonString = jsonString + "," + '{"_id": "' + id + '", "is_deleted":"true"}';
					}
				}
				else {
					if(jsonString == "") {

						jsonString = '{"_id": "' + id + '", "enable":"' + actionToPerform + '"}';	
					}
					else {
						jsonString = jsonString + "," + '{"_id": "' + id + '", "enable":"' + actionToPerform + '"}';
					}
				}
			}
			
		}

		inputJsonString = "[" + jsonString + "]";

		if(actionToPerform == "delete") {
			
			UserService.deleteUser(inputJsonString, function(response) {
				$rootScope.message = messagesConstants.deleteUser;
				$route.reload();	
			});
		}
		else {
			UserService.statusUpdateUser(inputJsonString, function(response) {
				$rootScope.message = messagesConstants.updateStatus;
				$route.reload();
			});
		}

	}


}

]);
