
var restler = require('restler');
var randomstring = require("randomstring")

var api = {};

var results = {
	"OK": 						"The OTP is valid.",
	"BAD_OTP":	 				"The OTP is invalid format.",
	"REPLAYED_OTP": 			"The OTP has already been seen by the service.",
	"BAD_SIGNATURE":			"The HMAC signature verification failed.",
	"MISSING_PARAMETER": 		"The request lacks a parameter.",
	"NO_SUCH_CLIENT":	 		"The request id does not exist.",
	"OPERATION_NOT_ALLOWED":	"The request id is not allowed to verify OTPs.",
	"BACKEND_ERROR": 			"Unexpected error in our server. Please contact us if you see this error.",
	"NOT_ENOUGH_ANSWERS":	 	"Server could not get requested number of syncs during before timeout",
	"REPLAYED_REQUEST":	 		"Server has seen the OTP/Nonce combination before"
}

exports.setCreds = function(id, key) {
	api.id = id;
	api.key = key;
}

exports.testOTP = function(otp, cb) {

	var url = "http://api2.yubico.com/wsapi/2.0/verify?id="+api.id+"&otp="+otp+"&nonce=" + randomstring.generate(20);

	restler.get(url).on('complete', function(res) {

		var tmp = res.split('\r\n');	

		for(var i = 0; i < tmp.length; i++) {

			var tmp2 = tmp[i].split('=');

			if(tmp2[0]=="status") {

				var code = tmp2[1];

				if(code=="OK") {
					cb([1, results[code]])
				} else {
					cb([0, results[code]]);
				}

			}
			
		}

	});

}