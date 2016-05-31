
const messages = {
	"errorRetreivingData": "Error occured while retreiving the data from collection",
	"successRetreivingData" : "Data retreived successfully from the collection",

	//VehicleType
	"vehicleTypeFailure": "Error occured while saving the data",
	"vehicleTypeSuccess": "Vehicle Type saved successfully",
	"vehicleTypeUpdateSuccess": "Vehicle Type updated successfully",
	"vehicleTypeStatusUpdateSuccess": "Status updated successfully",
	"vehicleTypeStatusUpdateFailure": "Error occured while updating status",
	"vehicleTypeStatusDeleteFailure": "Error occured while deleting the vehicle types",
	"vehicleTypeDeleteSuccess":"Vehicle Type(s) deleted successfully",

	//forgot password
	"successSendingForgotPasswordEmail": "Password sent successfully",


	//user message
	"userSuccess": "User saved successfully",
	"userStatusUpdateFailure" : "Error occured while updating Status",
	"userStatusUpdateSuccess" : "User update successfully",
	"userDeleteFailure": "Error occured while deleting the user",
	"userDeleteSuccess": "User(s) deleted successfully",
	"userUpdateSuccess": "User updated successfully",


}

const gmailSMTPCredentials = {
	"service": "gmail",
	"host": "smtp.gmail.com",
	"username": "osgroup.sdei@gmail.com",
	"password": "mohali2378"
}


const facebookCredentials = {
	"app_id" : "XXXXXXXXXXXXXXXX", 
	"secret":"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	 "token_secret": process.env.token_secret || 'JWT Token Secret'
}

const twitterCredentials = {
	"consumer_key" : "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	"consumer_secret" : "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx"
}

const googleCredentials = {
	"client_secret_key" : "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx"
}

var obj = {messages:messages, gmailSMTPCredentials:gmailSMTPCredentials, facebookCredentials:facebookCredentials, twitterCredentials : twitterCredentials, googleCredentials : googleCredentials};
module.exports = obj; 