yubinode
========

YubiKey OTP testing for Node.JS

##Installation

	# npm install yubinode

##Usage

	# var yubinode = require('yubinode');
	#
	# yubinode.setCreds(API_ID, API_KEY);
	#
	# yubinode.testOTP(OTP, function(result) {
	#
	# 	 console.log(result);
	#	
	#	 /*
	#		"result" will be an array. First item will either be 1 or 0, success or fail, respectively.
	#		
	#		The second item will be the message from the server.
	#
	#	*/
	#
	# });