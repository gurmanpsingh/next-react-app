import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import Router from 'next/router';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import JScookie from 'js-cookie';
import SimpleReactValidator from 'simple-react-validator';
import $ from '../node_modules/jquery/dist/jquery.min.js';

// Live
var baseURL = process.env.BASEURL;

// delcare cookies
//const cookies = new Cookies();

//console.log('baseURL: ', baseURL);

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

export default class extends Component {
	
	constructor(props, context) {
		super(props, context);
		this.onPurchaseProduct = this.onPurchaseProduct.bind(this);
		this.checkPromoCode = this.checkPromoCode.bind(this);
        
		this.state = {
			email: '',
			del_first_name: '',			
			del_last_name: '',			
			del_street: '',
			del_city: '',
			del_state: '',
			del_zipcode: '',
			del_phone: '',
			bill_first_name: '',
			bill_last_name: '',
			bill_street: '',
			bill_city: '',
			bill_state: '',
			bill_zip: '',
			ccn: '',
			cc_from: '',
			cc_expire: '',
			ccv: '',
			promoCode: '',
			isChecked : false,
			productID : '',
			checkoutType: 17,
			requestQuery: '',
		};
		
		this.validator = new SimpleReactValidator();
	
    }
	
	onChange = (e) => {
		const state = this.state
		state[e.target.name] = e.target.value;
		this.setState(state);
	}
	
	toggleChange = () => {
		this.setState({
			isChecked: !this.state.isChecked,
		});
	}
	
	encrypt = (text) => {
	  var cipher = crypto.createCipher(algorithm, password)
	  var crypted = cipher.update(text, 'utf8', 'hex')
	  crypted += cipher.final('hex');
	  return crypted;
	}
	
	checkPromoCode(e) {
        e.preventDefault();
		var promo = $.trim($('#promoCode').val());
		var userEmail = $.trim($('#userEmail').val());
		if( promo.length !== 0 && userEmail !== 0) {			
			$(".promoCodeID").hide();
			$(".promoCodeSuccessID").hide();
				axios.post(baseURL + '/api/validate_coupon', this.state)
					.then((res) => {
						if(res.data.response_code == 430) {
							$(".promoCodeSuccessID").hide();
							$(".promoCodeID").show();
							$(".promoCodeID").html("Invalid Promo Code");
						} 
						else if (res.data.response_code == 431) {
							$(".promoCodeSuccessID").hide();
							$(".promoCodeID").show();
							$(".promoCodeID").html("This promo code has expired");
						}
						else if (res.data.response_code == 432) {
							$(".promoCodeSuccessID").hide();
							$(".promoCodeID").show();
							$(".promoCodeID").html("Product does not meet minimum purchase amount");
						}
						else if (res.data.response_code == 433) {
							$(".promoCodeSuccessID").hide();
							$(".promoCodeID").show();
							$(".promoCodeID").html("Maximum use count has exceeded");
						}
						else if (res.data.response_code == 434) {
							$(".promoCodeSuccessID").hide();
							$(".promoCodeID").show();
							$(".promoCodeID").html("Customer use count has exceeded its limit");
						} else {
								$(".promoCodeID").hide();
								$(".promoCodeSuccessID").show();
								//console.log("code ", this.state.promoCode);
								//console.log("coupon_amount ", res.data.coupon_amount);
								
								$("#promoCodeText").html("$" + res.data.coupon_amount);
								
								//console.log("prod_price ", this.state.product_price);
								
								var discountedAmount = this.state.product_price - res.data.coupon_amount;
								$("#Total_product_price").html("$" + discountedAmount);
								
								//console.log("discountedAmount ", discountedAmount);

							}
					});

		} else {
				if(this.validator.fieldValid('email')) {
					this.validator.hideMessages();
					this.forceUpdate();
				} else {
						this.validator.showMessages();
						this.forceUpdate();
					}
				$(".promoCodeID").show();
				$(".promoCodeSuccessID").hide();
			}
	}
	
	onPurchaseProduct(e) {
        e.preventDefault();
		
		//console.log('here======= ', this.state.isChecked);
		if( this.state.isChecked ) {
			if( this.validator.fieldValid('bill_first_name') && this.validator.fieldValid('bill_last_name') && 
				this.validator.fieldValid('bill_street') && this.validator.fieldValid('bill_city') && 
				this.validator.fieldValid('bill_state') && this.validator.fieldValid('bill_zipcode') &&
				this.validator.fieldValid('del_first_name') && this.validator.fieldValid('del_last_name') && 
				this.validator.fieldValid('del_street') && this.validator.fieldValid('del_city') && 
				this.validator.fieldValid('del_state') && this.validator.fieldValid('del_zipcode') && 
				this.validator.fieldValid('ccn') && this.validator.fieldValid('cc_expire') && this.validator.fieldValid('ccv') ) {
					this.validator.hideMessages();
					this.forceUpdate();
					
					// disable checkout button
					$('.checkoutSubmitButton').prop('disabled', true);
					
					this.state.ccn = this.encrypt(this.state.ccn);
					
					axios.post(baseURL + '/api/purchase', this.state)
						.then((res) => {
							//console.log("RESPONSE from API: ", res.data);
							if(res.data.error_found == 1) {				
								$("#checkout_success").hide();
								$("#checkout_error").show();
								$("#checkout_error").html(res.data.error_message);
								
								// enable checkout button
								$('.checkoutSubmitButton').prop('disabled', false);
							} else { 
									$("#checkout_error").hide();

									this.setState = ({
										email: '',
										del_first_name: '',			
										del_last_name: '',			
										del_street: '',
										del_city: '',
										del_state: '',
										del_zipcode: '',
										del_phone: '',
										bill_first_name: '',
										bill_last_name: '',
										bill_street: '',
										bill_city: '',
										bill_state: '',
										bill_zip: '',
										ccn: '',
										cc_from: '',
										cc_expire: '',
										ccv: '',
										promoCode: ''
									});
									$("#checkout_success").show();
									$("#checkout_success").html("Order placed successfully!, your Order id is " + res.data.order_id);
									localStorage.setItem('order_id', res.data.order_id);
									JScookie.set('order_id', res.data.order_id, { expires: 1, path: '/' });
									Router.push('/thankyou');
									//res.data.order_id
								}
						});
					} else {
							this.validator.showMessages();
							// rerender to show messages for the first time
							this.forceUpdate();
							
							// enable checkout button
							$('.checkoutSubmitButton').prop('disabled', false);
						}
			} else {
				if(
					this.validator.fieldValid('del_first_name') && this.validator.fieldValid('del_last_name') && 
					this.validator.fieldValid('del_street') && this.validator.fieldValid('del_city') && 
					this.validator.fieldValid('del_state') && this.validator.fieldValid('del_zipcode') && 
					this.validator.fieldValid('ccn') && this.validator.fieldValid('cc_expire') && this.validator.fieldValid('ccv') 
				) {
					this.validator.hideMessages();
					this.forceUpdate();

					this.state.ccn = this.encrypt(this.state.ccn);
					
					// disable checkout button
					$('.checkoutSubmitButton').prop('disabled', true);
				
					axios.post(baseURL + '/api/purchase', this.state)
					.then((res) => {
						//console.log("RESPONSE from API: ", res.data);
						if(res.data.error_found == 1) {				
							$("#checkout_success").hide();
							$("#checkout_error").show();
							$("#checkout_error").html(res.data.error_message);
							
							// enable checkout button
							$('.checkoutSubmitButton').prop('disabled', false);
						} else { 
								$("#checkout_error").hide();

								this.setState = ({
									email: '',
									del_first_name: '',			
									del_last_name: '',			
									del_street: '',
									del_city: '',
									del_state: '',
									del_zipcode: '',
									del_phone: '',
									bill_first_name: '',
									bill_last_name: '',
									bill_street: '',
									bill_city: '',
									bill_state: '',
									bill_zip: '',
									ccn: '',
									cc_from: '',
									cc_expire: '',
									ccv: '',
									promoCode: ''
								});
								$("#checkout_success").show();
								$("#checkout_success").html("Order placed successfully!, your Order id is " + res.data.order_id);
								localStorage.setItem('order_id', res.data.order_id);
								JScookie.set('order_id', res.data.order_id, { expires: 1, path: '/' });
								Router.push('/thankyou');
							}
					});					
			}  else {					
					this.validator.showMessages();
					// rerender to show messages for the first time
					this.forceUpdate();
					
					// enable checkout button
					$('.checkoutSubmitButton').prop('disabled', false);
				}
		}
	}
	
	static async getInitialProps({req}) {
		// validate the request; it will return 100 if validates
		//const res = await fetch('http://54.82.183.170/api/validate')
    
		const res = await fetch(baseURL + '/api/product')

		const data = await res.json();
		//console.log("JScookie: ", req.headers.cookie);
		//console.log("JScookie: ", JSON.parse(JScookie.get('productSKU')));
		var arr = Object.values(data);

		return { arr }
	}

  componentWillMount() {
	this.setState({
		object: this.props.arr
    });

	this.props.arr.map( (obj, key) => 
		this.setState({
		  product_id: obj.product_id,
		  product_name: obj.product_name,
		  product_description: obj.product_description,
		  product_sku: obj.product_sku,
		  product_price: obj.product_price,
		  product_category_name: obj.product_category_name,
		  vertical_name: obj.vertical_name,
		  product_is_trial: obj.product_is_trial,
		  product_is_shippable: obj.product_is_shippable,
		  product_rebill_product: obj.product_rebill_product,
		  product_rebill_days: obj.product_rebill_days,
		  product_max_quantity: obj.product_max_quantity,
		  preserve_recurring_quantity: obj.preserve_recurring_quantity,
		  subscription_type: obj.subscription_type,
		  subscription_week: obj.subscription_week,
		  subscription_day: obj.subscription_day,
		  cost_of_goods_sold: obj.cost_of_goods_sold
		})
	);
	
  }
  
  componentDidMount() {
	/* console.log("JScookie: ", JSON.parse(JScookie.get('productSKU')));
	console.log("JScookie: ", JSON.parse(JScookie.get('CheckoutType'))); */

	var products = JSON.parse(JScookie.get('productSKU'));
	var CheckoutType = JSON.parse(JScookie.get('CheckoutType'));
	
	if(typeof JScookie.get('productResultQuery') != 'undefined') {
		var productResultQuery = JSON.parse(JScookie.get('productResultQuery'));
		/* console.log("JScookie: ", JSON.parse(JScookie.get('productResultQuery'))); */
		
		this.setState({ requestQuery: productResultQuery });
	}
	this.setState({ productID: products });
	this.setState({ CheckoutType: CheckoutType[0].selectedOption });
	this.setState({ CheckoutDesc: CheckoutType[0].checkoutDesc });
	
	if(CheckoutType[0].selectedOption == 16) {
		this.setState({ product_price: '79.00' });
	} else {
			this.setState({ product_price: '99.00' });
		}
	
	$('#del_state').keyup(function() {
		$(this).val($(this).val().toUpperCase());
	});
	
	$('#bill_state').keyup(function() {
		$(this).val($(this).val().toUpperCase());
	});	
	
	$("#billingAddressCont").hide();
	$("#checkout_error").hide();
	$("#checkout_success").hide();
	$(".promoCodeID").hide();
	$(".promoCodeSuccessID").hide();
	
	$(document).ready(function() {
		$('#billingSameAsShipping').click(function() {
			if($('input[type=checkbox]').prop('checked')) {
				$("#billingAddressCont").show();
			} else { $("#billingAddressCont").hide(); }
		});
		
		$('#cc_expire').bind('keyup', 'keydown', function(event) {
			var inputChar = String.fromCharCode(event.keyCode);
			var code = event.keyCode;
			var allowedKeys = [8];
			if (allowedKeys.indexOf(code) !== -1) {
				return;
			}

			event.target.value = event.target.value.replace(
			/^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
			).replace(
			/^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
			).replace(
			/^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
			).replace(
			/^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
			).replace(
			/^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
			).replace(
			/[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
			).replace(
			/\/\//g, '/' // Prevent entering more than 1 `/`
			);
		});
		
	});
  }
  
  render() {
    const { email, del_first_name, del_last_name, del_street, del_city, del_state, del_zipcode, del_phone, bill_first_name, bill_last_name, bill_street, bill_city, bill_state, bill_zip, ccn, cc_from, cc_expire, ccv } = this.state;
	return (
		<div>
			<Header title="Checkout - Get my formula" />
			<div className="science-page">
				<section>
					<div className="product-header-bg">
						<div className="container container-header">
							<div className="row">
								<div className="col-lg-12">
									<Menu />
								</div>
							</div>
						</div>
					</div>
				</section>
				<section>
				<div className="container">
					<div className="row">
						<div className="col-lg-12 checkout-full-row">
							<div className="main-heading-delivery">
								<span id="checkout_error" className="text-danger"></span>
								<span id="checkout_success" className="text-success"></span>
								<h2>Delivery Information</h2>
							</div>
							<form onSubmit={this.onPurchaseProduct}>
							<div className="row">
								<div className="col-md-4 col-sm-4 right-bar-row pull-right">
									<div className="right-row-border">
										<div className="started-kit-row">
											<div className="left-kit">
												<img className="img-responsive" src={baseURL + "/static/images/starter-kit.jpg"}/>
											</div>
											<div className="started-heading">
												<p>{this.state.CheckoutDesc}</p>
											</div>
											<div className="kit-doller">
												<p>${this.state.product_price}</p>
											</div>
										</div>
										<div className="discount-row">
											<div className="discount">
												<p>Discount</p>
												<p>Free shipping</p>
											</div>
											<div className="doller-discount">
												<p id="promoCodeText">$00.00</p>
												<span>FREE</span>
											</div>
										</div>
										<div className="promo-code-row promo-code-media">
											<div className="promo-code">
												<input className="form-control" type="text" placeholder="Promo Code"/>
												<button type="button" className="btn btn-primary">+</button>
											</div>
                                            <div className="promo-inner">
                                                <span id="promoCodeID" className="promoCodeID text-danger">Valid Email and Code Required</span>
                                                <span id="promoCodeSuccessID" className="promoCodeSuccessID text-success">Applied Successfully</span>
                                            </div>
										</div>
										<div className="total-ammount-row">
											<div className="total-ammount">
												<p>Total</p>
												<span id="Total_product_price">${this.state.product_price}</span>
											</div>
										</div>

										<div className="promo-code-row">
											<div className="promo-code">
												<input id="promoCode" className="form-control"  onChange={this.onChange} name="promoCode" type="text" placeholder="Promo Code" />												
												<button type="button" onClick={this.checkPromoCode} className="btn btn-primary">+</button>
											</div>
                                            <div className="promo-inner">
                                                <div id="promoCodeID" className="promoCodeID text-danger">Valid Email and Code Required</div>
                                                <div id="promoCodeSuccessID" className="promoCodeSuccessID text-success">Applied Successfully</div>
                                            </div>
										</div>
										<div className="place-order-row">
											<button type="submit" className="checkoutSubmitButton btn btn-primary pull-right">Place Order <img src={baseURL + "/static/images/place-order-errow.png"}/></button>
											<p>You can delay, modify, or cancel your order anytime. </p>
										</div>
									</div>
									<div className="money-back-row">
										<div className="money-back">
											<h3>Money Back <br />Guarantee</h3>
											<div className="monet-back-media">
												<img className="img-responsive" src={baseURL + "/static/images/money-back-logo.png"} />
											</div>
											<p>We offer a 100-day money back guarantee. No hassle, no need to ship it back to us. If you don’t love your Formula, we’ll give you a full refund. </p>
										</div>
										<div className="monet-back-logo">
											<img className="img-responsive" src={baseURL + "/static/images/money-back-logo.png"} />
										</div>
									</div>
									
								</div>
								
								<div className="col-md-8 col-sm-8 left-bar-row">
									<div className="main-heading-delivery main-heading-delivery-media">
										<h2>Delivery Information</h2>
									</div>
									<div className="left-side-infomation">
										<div className="infomation-form">
											<div className="row">
												<div className="col-sm-6 first-name-row">
													<div className="first-name">
														<input className="form-style form-control" onChange={this.onChange} name="del_first_name" type="text" value={del_first_name} placeholder="First Name" />
														{this.validator.message('del_first_name', this.state.del_first_name, 'required', 'text-danger', {required: 'First Name field is required'})}
													</div>
												</div>
												<div className="col-sm-6 last-name-row">
													<div className="last-name">
														<input className="form-style form-control" onChange={this.onChange} name="del_last_name" type="text" value={del_last_name} placeholder="Last Name" />
														{this.validator.message('del_last_name', this.state.del_last_name, 'required', 'text-danger', {required: 'Last Name field is required'})}
													</div>
												</div>
												<div className="col-sm-12 street-address-row">
													<div className="street-address">
														<input className="form-style form-control" onChange={this.onChange} name="del_street" type="text" value={del_street} placeholder="Street Address" />
														{this.validator.message('del_street', this.state.del_street, 'required', 'text-danger', {required: 'Street Address field is required'})}
													</div>
												</div>
												<div className="col-sm-12 city-row">
													<div className="city-row-div city-css">
														<input className="city form-control form-style" type="text" onChange={this.onChange} name="del_city" value={del_city} placeholder="City" />
														{this.validator.message('del_city', this.state.del_city, 'required', 'text-danger', {required: 'Required'})}
													</div>
													
													<div className="city-row-div city-css state-css">
														<input id="del_state" className="state form-control form-style" type="text" onChange={this.onChange} name="del_state" value={del_state} placeholder="State" />
														{this.validator.message('del_state', this.state.del_state, 'required', 'text-danger', {required: 'State code Required. Ex. TX'})}
													</div>
													
													<div className="city-row-div zip-css">
														<input className="zipcode form-control form-style" type="text" onChange={this.onChange} name="del_zipcode" value={del_zipcode} placeholder="Zipcode" />
														{this.validator.message('del_zipcode', this.state.del_zipcode, 'required', 'text-danger', {required: 'Required'})}
													</div>
												</div>
												<div className="col-sm-6 email-row">
													<div className="email">
														<input id="userEmail" className="form-style form-control" type="email" onChange={this.onChange} name="email" value={email} placeholder="Email" />
														{this.validator.message('email', this.state.email, 'required|email', 'text-danger', {required: 'Email is Required'})}
														
													</div>
												</div>
												<div className="col-sm-6 phone-row">
													<div className="ph-number ph-row">
														<input className="form-style form-control" type="text" onChange={this.onChange} name="del_phone" value={del_phone} placeholder="Phone" />
														{this.validator.message('del_phone', this.state.del_phone, 'required|phone', 'text-danger', {required: 'Phone is Required'})}
													</div>
												</div>
											</div>
										</div>
									</div>
							
									<div className="row">
										<div className="col-md-12 col-sm-12 billing-info-row">
											<div className="billing-info-inner">
												<div className="main-heading-billing">
													<h2>Billing Information</h2>
												</div>
												<div className="different-belling-inner">
													<div className="switch-btn">
														<label className="switch switch-toggle">
															<input id="billingSameAsShipping" type="checkbox" name="billingSameAsShipping"  />
															<span className="slider round"></span>
														</label>
														<p>Different Billing Address</p>
													</div>
												</div>
												
												<div id="billingAddressCont" className="left-side-infomation">
													<div className="infomation-form">
														<div className="row">
															<div className="col-sm-6 first-name-row">
																<div className="first-name">
																	<input className="form-style form-control" onChange={this.onChange} name="bill_first_name" type="text" value={bill_first_name} placeholder="First Name" />
																	{this.validator.message('bill_first_name', this.state.bill_first_name, 'required', 'text-danger', {required: 'First Name field is required'})}
																</div>
															</div>
															<div className="col-sm-6 last-name-row">
																<div className="last-name">
																	<input className="form-style form-control" onChange={this.onChange} name="bill_last_name" type="text" value={bill_last_name} placeholder="Last Name" />
																	{this.validator.message('bill_last_name', this.state.bill_last_name, 'required', 'text-danger', {required: 'Last Name field is required'})}
																</div>
															</div>
															<div className="col-sm-12 street-address-row">
																<div className="street-address">
																	<input className="form-style form-control" onChange={this.onChange} name="bill_street" type="text" value={bill_street} placeholder="Street Address" />
																	{this.validator.message('bill_street', this.state.bill_street, 'required', 'text-danger', {required: 'Street Address field is required'})}
																</div>
															</div>
															<div className="col-sm-12 city-row">
																<div className="city-row-div city-css">
																	<input className="city form-control form-style" type="text" onChange={this.onChange} name="bill_city" value={bill_city} placeholder="City" />
																	{this.validator.message('bill_city', this.state.bill_city, 'required', 'text-danger', {required: 'Required'})}
																</div>
																
																<div className="city-row-div city-css state-css">
																	<input id="bill_state" className="state form-control form-style" type="text" onChange={this.onChange} name="bill_state" value={bill_state} placeholder="State" />
																	{this.validator.message('bill_state', this.state.bill_state, 'required', 'text-danger', {required: 'State code Required. Ex. TX'})}
																</div>
																
																<div className="city-row-div zip-css">
																	<input className="zipcode form-control form-style" type="text" onChange={this.onChange} name="bill_zip" value={bill_zip} placeholder="Zipcode" />
																	{this.validator.message('bill_zip', this.state.bill_zip, 'required', 'text-danger', {required: 'Required'})}
																</div>
															</div>												
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-sm-12 street-address-row">
														<div className="card-number">
															<input id="ccnumber" className="form-style form-control" onChange={this.onChange} name="ccn" value={ccn} type="text" placeholder="Card Number" />
															{this.validator.message('ccn', this.state.ccn, 'required|card_num', 'text-danger', {card_num: 'Must be a valid credit card number.', required: 'Required field'})}
														</div>
														<div className="card-number1">														
															<div className="card-number-div card-margin card-margin2">
																<input id="cc_expire" maxLength="5" className="card-style card-style2 form-control" type="text" onChange={this.onChange} name="cc_expire" value={cc_expire} placeholder="00/00" />
																{this.validator.message('cc_expire', this.state.cc_expire, 'required|card_exp', 'text-danger', {card_exp: 'Must be a valid expiration date.', required: 'Required field'})}
															</div>
															
															<div className="card-number-div card-margin3">
																<input className="card-style card-style3 form-control" type="text" onChange={this.onChange} maxLength="4" name="ccv" value={ccv} placeholder="CVC" />
																{this.validator.message('ccv', this.state.ccv, 'required|integer', 'text-danger', {required: 'Required field'})}
															</div>
														</div>
													</div>
												</div>
												<div className="secure-row">
													<div className="secure-text">
														<p>Secure and Encrypted Checkout</p>
													</div>
													<div className="poweredby">
														<img className="img-responsive" className="img-responsive" src={baseURL + "/static/images/mcafee-ilogo.png"} />
														<img className="img-responsive" src={baseURL + "/static/images/norton-logo.jpg"} />
													</div>
												</div>
											   
												<div className="money-back-row money-back-row-media">
													<div className="money-back">
														<div className="monet-back-media1">
															<img className="img-responsive" src={baseURL + "/static/images/money-back-logo.png"} />
														</div>
														<h3>Money Back <br />Guarantee</h3>
														<div className="monet-back-media">
															<img className="img-responsive" src={baseURL + "/static/images/money-back-logo.png"} />
														</div>
														<p>We offer a 100-day money back guarantee. No hassle, no need to ship it back to us. If you don’t love your Formula, we’ll give you a full refund. </p>
													</div>
													<div className="monet-back-logo">
														<img className="img-responsive" src={baseURL + "/static/images/money-back-logo.png"} />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-12">
									<div className="money-back-row money-back-media-mobile">
                                        <div className="place-order-row place-order-mobile-row">
											<button type="submit" className="checkoutSubmitButton btn btn-primary pull-right">Place Order <img src={baseURL + "/static/images/place-order-errow.png"}/></button>
										</div>
										<div className="money-back">
											<div className="monet-back-media-mobile">
												<img className="img-responsive" src={baseURL + "/static/images/money-back-logo.png"} />
											</div>
											<h3>Money Back <br />Guarantee</h3>
											<div className="monet-back-media">
												<img className="img-responsive" src={baseURL + "/static/images/money-back-logo.png"} />
											</div>
											<p>We offer a 100-day money back guarantee. No hassle, no need to ship it back to us. If you don’t love your Formula, we’ll give you a full refund. </p>
										</div>
									</div>
								</div>
							</div>
							</form>
						</div>
					</div>
				</div>
			</section>			
		</div>
	</div>
    )
  }
}