var companyObj = require('./../../models/company/company.js');
var constantObj = require('./../../../constants.js');

exports.list = function(req, res) {
	
	var outputJSON = "";
	
	companyObj.find({is_deleted:false}, function(err, data) {
		if(err) {
			outputJSON = {'status':'failure', 'messageId':203, 'message': constantObj.messages.errorRetreivingData};
		}
		else {
			console.log("data is", data);
			outputJSON = {'status':'success', 'messageId':200, 'message': constantObj.messages.successRetreivingData, 'data': data}
			
		}
		res.jsonp(outputJSON);
	});
}






