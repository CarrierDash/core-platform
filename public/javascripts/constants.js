var baseUrl = "http://localhost:3000";

var webservices = {	

	"authenticate" : baseUrl + "/adminlogin/authenticate",
	"forgot_password" : baseUrl + "/adminlogin/forgot_password",
	"email_verification" : baseUrl + "/adminlogin/email_verification/:token",

	//Company
	"companyList" : baseUrl + "/company/list",
	

	//user
	"addUser" : baseUrl + "/users/add",
	"userList" : baseUrl + "/users/list",
	"updateStatus" : baseUrl + "/users/update_status",
	"deleteUser": baseUrl + "/users/delete_user",
	"editUser" : baseUrl + "/users/edit_user",
	"updateUser" : baseUrl + "/users/update_user",
	
	



}

var appConstants = {

	"authorizationKey": "Y2FycmllcmRhc2g6YXBwbGljYXRpb24="	
}


var headerConstants = {

	"json": "application/json"

}

var pagingConstants = {
	"defaultPageSize": 10,
	"defaultPageNumber":1
}

var messagesConstants = {

	//users
	"saveUser" : "User saved successfully",
	"updateUser" : "User updated successfully",
	"updateStatus" : "Status updated successfully",
	"deleteUser": "User(s) deleted successfully",

	
}