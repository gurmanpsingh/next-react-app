const express = require('express')
const router = express.Router()
var http = require("https");
var request = require("request");
const nodemailer  = require("nodemailer");
require('dotenv').config();

// fetch credentials from environment variables
var user = process.env.USER_ID;
var pass = process.env.USER_KEY;

var gmailLogin = process.env.GMAILLOGIN;
var gmailPass = process.env.GMAILPASS;

// Nodejs encryption with CTR
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm, password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text) {
  var decipher = crypto.createDecipher(algorithm, password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

router.get('/validate', (req, res) => {

	var options = {
		method: 'POST',
		url: 'https://' + user + ':' + pass + '@formula.limelightcrm.com/api/v1/validate_credentials',		
		headers:
		{
			'cache-control': 'no-cache',
			'Content-Type': 'application/json'
		}
	};

	request(options, function (error, response, body) {
	  if (error) throw new Error(error);

	  console.log("RESPONSE: ", body);
	});
});

router.get('/product', (req, res) => {
	//console.log(req.connection.remoteAddress);
	var options = {
		method: 'POST',
		url: 'https://' + user + ':' + pass + '@formula.limelightcrm.com/api/v1/product_index',		
		headers:
		{
			'cache-control': 'no-cache',
			'Content-Type': 'application/json'
		},
		body: { product_id: [ 17 ] },
		json: true 
	};

	//console.log("REQUEST:==================> ", options);
	request(options, function (error, response, body) {
	  if (error) throw new Error(error);

	  //console.log("RESPONSE: ", body.products);
	  res.json(body.products);
	});
});

router.post('/validate_coupon', (req, res) => {
var options = { 
		method: 'POST',
		url: 'https://' + user + ':' + pass + '@formula.limelightcrm.com/api/v1/coupon_validate',
		headers:
		{
			'cache-control': 'no-cache',
			'Content-Type': 'application/json'
		},
		body: 
		{ 
			campaign_id: 1,
			shipping_id: 2,
			email: req.body.email,
			products: [ { product_id: 3, quantity: 1 } ],
			promo_code: req.body.promoCode },
			json: true 
		};
  
	request(options, function (error, response, body) {
	  if (error) throw new Error(error);

	  console.log("RESPONSE=========================== ", body);
		
	  res.json(body);
	});
});

router.post('/purchase', (req, res) => {
	
	var IP = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         req.connection.socket.remoteAddress;
		 
	//console.log('ip=========== ' + IP);

	var childrenArr = [];
	req.body.productID.map(function(prodObj, key) {
		childrenArr.push({ product_id: prodObj.productId, quantity: '1' });
	});

	var num;
	
	var requestQuery = req.body.requestQuery;
	delete requestQuery.email;
	
	console.log('request ============= ' + JSON.stringify(req.body));
	
	// decrypt original credit card
	var creditCardNumber = decrypt(req.body.ccn);
	
	num = creditCardNumber.replace(/[^\d]/g,'');
	
	// check if the global test card number inserted
	if(num == "1444444444444440") {
		var ccn_type = "Visa";
	} else {
		// now test the number against some regexes to figure out the card type.	
		if (num.match(/^5[1-5]\d{14}$/)) {
			var ccn_type = "MasterCard";
		} else if (num.match(/^4\d{15}/) || num.match(/^4\d{12}/)) {
			var ccn_type = "Visa";
		} else if (num.match(/^3[47]\d{13}/)) {
			var ccn_type = "AmEx";
		} else if (num.match(/^6011\d{12}/)) {
			var ccn_type = "Discover";				
		} else {
				var ccn_type = "UNKNOWN";
			}
	}
		
	if(req.body.promoCode != '') {
		var promoCode = req.body.promoCode;
	} else {
			var promoCode = '';
		}
	
	var expireAt = req.body.cc_expire;
	var expiredAt = expireAt.replace(/\//g, '');
	
	// get the main product bundle and build with child bundle
	var checkoutType = req.body.checkoutType;
	
	if(checkoutType == 16) {
		var productsObj = { 
				16: 
				{
					offer_id: '2',
					billing_model_id: '4',
					quantity: '1',
					children: childrenArr 
				} 
			}
	} else {
			var productsObj = { 
					17: 
					{
						offer_id: '2',
						billing_model_id: '4',
						quantity: '1',
						children: childrenArr 
					} 
				}
		}
		
	// build object for json body
	var objBody = { 
			firstName: req.body.del_first_name,
			lastName: req.body.del_last_name,
			billingFirstName: req.body.bill_first_name,
			billingLastName: req.body.bill_last_name,
			billingAddress1: req.body.bill_street,
			billingAddress2: '',
			billingCity: req.body.bill_city,
			billingState: req.body.bill_state,
			billingZip: req.body.bill_zip,
			billingCountry: 'US',
			billingSameAsShipping: 'YES',
			shippingAddress1: req.body.del_street,
			shippingAddress2: '',
			shippingCity: req.body.del_city,
			shippingState: req.body.del_state,
			shippingZip: req.body.del_zipcode,
			shippingCountry: 'US',
			phone: req.body.del_phone,
			email: req.body.email,
			creditCardType: ccn_type,
			creditCardNumber: creditCardNumber,
			expirationDate: expiredAt,
			CVV: req.body.ccv,
			shippingId: '2',
			tranType: 'Sale',
			ipAddress: IP,
			campaignId: '1',
			promoCode: promoCode,
			products: productsObj
		}
		
	// merge body object and the query parameteres into json object for request body
	var mergedObj = Object.assign(objBody, requestQuery);
	
	// build final json object to send request
	var options = { 
		method: 'POST',
		url: 'https://' + user + ':' + pass + '@formula.limelightcrm.com/api/v1/new_order',
		headers:
		{
			'cache-control': 'no-cache',
			'Content-Type': 'application/json'
		},
		body: mergedObj,
		json: true
	};
	
	console.log('options ============= ' + JSON.stringify(options));

	request(options, function (error, response, body) {
	  if (error) throw new Error(error);

	  if(body.response_code == 100) {
			const transporter = nodemailer.createTransport({
				host	: 'smtp.gmail.com',
				port	: 465,
				secure	: true, // use SSL
				auth	: {							
						user	: gmailLogin,
						pass	: gmailPass 
				}
			});
			const mailOptions = {
				from 	: '"GetMyFormula.com" <noreply@getmyformula.com>', // sender address
				to   	: req.body.email, // list of receivers
				subject	: "Order confirmation",
				text	: 'Hello world ?', // plain text body
				html	: 'Hello ' + req.body.del_first_name + ' ' + req.body.del_last_name + ', <br/><br/> Thank you for your order. Your order id is ' + body.order_id + '<br/><br/>Thank you<br />Sales GetMyFormula<br/><br/><i>Copyright © 2018 GetMyFormula | all rights reserved.</i>'
			};
			
			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log("Email Error: " + error);
				} else {			
					// var token = jwt.sign(user.toJSON(), settings.secret);	
					// res.json({success: true, token: 'JWT ' + token});
				}
			});
	  }
	  console.log("RESPONSE=========================== ", body);
	    
	  res.json(body);
	});

});

router.post("/testMail", function(req, res) {
	const transporter = nodemailer.createTransport({
		host	: 'smtp.gmail.com',
		port	: 465,
		secure	: true, // use SSL
		auth	: {
				user	: gmailLogin,
				pass	: gmailPass
		}
	});
	const mailOptions = {
		from 	: '"GetMyFormula.com" <noreply@getmyformula.com>', // sender address
		to   	: 'gurmanpsingh@gmail.com', // list of receivers
		subject	: "Order confirmation",
		text	: 'Hello world ?', // plain text body
		html	: 'Hello Gurman, <br/><br/> Thank you for your order. Your order id is 10013' +
		  '<br/><br/>' +
		  'Thank you<br />Sales GetMyFormula<br/><br/>' +
		  '<i>Copyright © 2018 GetMyFormula | all rights reserved.</i>'
	};
	
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log("Email Error: " + error);
			// var token = jwt.sign(user.toJSON(), settings.secret);	
			// res.json({success: true, token: 'JWT ' + token});
			res.json({success: false});
		} else {			
			// var token = jwt.sign(user.toJSON(), settings.secret);	
			// res.json({success: true, token: 'JWT ' + token});
			res.json({success: true});
		}
	});
});

module.exports = router;