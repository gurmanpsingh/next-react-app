import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import Router from 'next/router';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import JScookie from 'js-cookie';
import $ from  '../node_modules/jquery/dist/jquery.min.js';
import renderHTML from 'react-render-html';

// Live
var baseURL = process.env.BASEURL;

export default class extends Component {
	
	constructor(props, context) {
		super(props, context);
		this.state = {
			selectedOption: 17,
			baseURL: baseURL,
			linkName: '', 
			productResultID: ''
		}
		this.handleOptionClick = this.handleOptionClick.bind(this)
    }
	
	static async getInitialProps({ query }) {
		// res is assigned the response once the axios
        // async get is completed
		if(JSON.stringify(query) != '{}') {
			var res = await axios.get(baseURL + '/capi/getProduct/' + query);
		} else {
				//var res = await axios.get(baseURL + '/capi/getProduct/1');
				// redirect to home if query missing.
				Router.push('/');
			}
		//console.log("RESPONSE RESULT========== ", res.data);
		
		// Return properties
        return {product: res.data}
	}
	
	handleOptionClick = (param) => (e) => {
		this.setState({ selectedOption: param });
		var checkoutArr = [];
		if(param == '16') {
			this.setState({ checkoutDesc: 'Starter kit - Subscription' });
			checkoutArr.push({selectedOption: param, checkoutDesc: 'Starter kit - Subscription'});
		} else {
				this.setState({ checkoutDesc: 'Starter kit - One Time Purchase' });
				checkoutArr.push({selectedOption: param, checkoutDesc: 'Starter kit - One Time Purchase'});
			}
		JScookie.set('CheckoutType', JSON.stringify(checkoutArr), { expires: 15, path: '/' });
	}
	
	componentDidMount() {
		var SKUs = this.state.product[0].SKU;
		var checkoutArr = [];
		checkoutArr.push({selectedOption: '17', checkoutDesc: 'Starter kit - Subscription'});
		JScookie.set('productSKU', JSON.stringify(SKUs), { expires: 15, path: '/' });
		JScookie.set('CheckoutType', JSON.stringify(checkoutArr), { expires: 15, path: '/' });
		
		if(typeof JScookie.get('productResultID') == 'undefined') {
			this.setState({linkName: 'Find My Formula'});
			this.setState({productResultID: ''});
		} else {
			this.setState({linkName: 'See My Formula'});
			this.setState({productResultID: JSON.parse(JScookie.get('productResultID'))});
		}
		//console.log('here prod: ', this.state.productResultID);
	}
	
	componentWillMount() {
		this.setState({
			product: this.props.product
		});
	}
	
  render() {
	const {product} = this.state
	const {baseURL} = this.state
	const {selectedOption} = this.state
	const {linkName} = this.state;
	const {productResultID} = this.state;
	return (
		<div>
			<Header title="Product - Get my formula" />
			<div className="product-page">    
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
				<div className="shipping-strip">
					<div className="container">
						<div className="free-shipping-inner">
							<p><b>FREE</b> SHIPPING ON ANY ORDER</p>
							<img src={baseURL + "/static/images/delivery-truck.png"} />
						</div>
					</div>
				</div>
			</section>
			<section>
				<div className="container">
					<div className="product-slide-row">
						<div className="row">
							<div className="col-md-7 product-slider-left">
								<div className="product-slider pull-right">
									<div className="albery-container">
										<div className="albery-wrapper">
											<div className="albery-item">
												<img src={baseURL + "/static/images/product/started-kit-product.jpg"} alt="" />
											</div>
											<div className="albery-item">
												<img src={baseURL + "/static/images/product/728-Product2.jpg"} alt="" />
											</div>
											<div className="albery-item">
												<img src={baseURL + "/static/images/product/728-Product3.jpg"} alt="" />
											</div>
											<div className="albery-item">
												<img src={baseURL + "/static/images/product/728-Product4.jpg"} alt="" />
											</div>
										</div>
									</div>
									<div className="pagination-container">
										<div className="pagination-wrapper">
											<div className="pagination-item" data-item="1">
												<img src={baseURL + "/static/images/product/started-kit-product.jpg"} alt="" />
											</div>
											<div className="pagination-item" data-item="2">
												<img src={baseURL + "/static/images/product/728-Product2.jpg"} alt="" />
											</div>
											<div className="pagination-item" data-item="3">
												<img src={baseURL + "/static/images/product/728-Product3.jpg"} alt="" />
											</div>
											<div className="pagination-item" data-item="4">
												<img src={baseURL + "/static/images/product/728-Product4.jpg"} alt="" />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-5 right-buy-row1">
								<div className="right-buy-row">
									<div className="star-reviews-inner">
										<img className="img-responsive" src={baseURL + "/static/images/orange-star.png"} />
										<img className="img-responsive" src={baseURL + "/static/images/orange-star.png"} />
										<img className="img-responsive" src={baseURL + "/static/images/orange-star.png"} />
										<img className="img-responsive" src={baseURL + "/static/images/orange-star.png"} />
										<img className="img-responsive" src={baseURL + "/static/images/half-star.png"} />
										<p>4.6/5 | <a id="reviews-inner" href="javascript:void(0);">READ REVIEWS</a></p>
									</div>
									<div className="buy-starter-kit">
										<div className="buy-starter-title">
                                            <h1>Starter Kit</h1>
											<p>Personalized Nootropic Formulas</p>
											<ul><li>4 week supply</li><li>All your recommended Formulas</li><li>Expert guidance</li></ul>
                                        </div>
										<div className="purchase-checkbox">
											<div className="purchase-check-inner">
												<label className="investment-check">
													<input type="radio" name="radio2" defaultChecked />
													<span onClick={this.handleOptionClick('17')} className="checkmark"></span>
												</label>
												<div className="fixed-rapay">
												   <p>One-Time Purchase</p>
												</div>
											</div>											
											<div className="purchase-check-inner">
												<label className="investment-check">
													<input type="radio" name="radio2" />
													<span onClick={this.handleOptionClick('16')} className="checkmark"></span>
												</label>
												<div className="fixed-rapay">
													<p>Subscribe and save <span>$40 on first purchase</span></p>
												</div>
											</div>
										</div>
										<div className="buy-price">
											{selectedOption == 16 &&
												<h2><del>$99.00</del> $79.00</h2>
											}
											{selectedOption == 17 &&
												<h2>$99.00</h2>
											}
											
											<a href="/checkout" className="btn btn-primary buy-btn">Buy Now<img src={baseURL + "/static/images/place-order-errow.png"} /></a>
											<p className="back-guarantee">100 Day Money Back Guarantee<img src={baseURL + "/static/images/doller.png"} /></p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="product-desktop-tab">
                <div className="container">
                    <div className="get-buy-tab">
                        <ul className="nav nav-tabs tabs">
                            <li className="active" rel="tab2"><a href="javascript:void(0);">FORMULAS</a></li>
                            <li rel="tab3"><a href="javascript:void(0);">REVIEWS</a></li>
                        </ul>
                    </div>
				</div>
				<div className="tab-content-tabs tab_container">
					<div className="container tab_container11">
						<div className="tab-content">
							<h3 className="tab_drawer_heading" rel="tab2">Formulas<span className="plus-icon">+</span><span className="plus-icon1">-</span></h3>
							<div id="tab2" className="tab-pane tab_content">
								<div className="row">
									<div className="col-md-7 col-sm-6">
										<div className="recetams-inner1">
                                            <p>Based on proven science and meticulous testing, we thoughtfully selected the following formulas for you. Try your Formula and experience peak performance.</p>
                                        </div>
									</div>
        
                                    <div className="col-md-12 formula-accord-main mob-formula-accord">
                                        <div className="formula-accord faq-section">
                                            <div className="panel-groupFirst" id="accordionFirst" role="tablist" aria-multiselectable="true">
                                                {product[0].recommendedFormula.map(function(rfObj, key) {
                                                <div className="panel panel-default">
                                                    <div className="panel-heading" role="tab" id={"headingOne"+key}>
                                                        <h4 className="panel-title">
                                                            <a role="button" data-toggle="collapse" data-parent="#accordionFirst" href="#collapse11" aria-expanded="true" aria-controls="collapse11">
                                                                <span>{renderHTML(rfObj.formulaName)}</span>
                                                                <i className="more-less1 glyphicon glyphicon-chevron-right"></i>
                                                            </a>
                                                        </h4>
                                                    </div>
                                                    <div id="collapse11" className="panel-collapse collapse" role="tabpanel" aria-labelledby={"headingOne"+key}>
                                                        <div className="panel-body">
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <div className="directions-text">
                                                                        <h3>Directions</h3>
																		{renderHTML(rfObj.directions)}
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-4">
                                                                    <div className="directions-text">
                                                                        <h3>Science</h3>
																		{renderHTML(rfObj.science)}
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-4">
                                                                    <div className="directions-text ingredients-mg">
                                                                        <h3>Ingredients</h3>
																		{renderHTML(rfObj.ingredients)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
												})}												
                                            </div>
                                        </div>
                                    </div>

									<div className="col-md-5 col-sm-5 vegan-row vegan-row1">
										<div className="right-vegan-row">
                                            <div className="vegan-inner">
                                                <div className="vegan-img-row">
                                                    <img src={baseURL + "/static/images/purest-icon.png"} />
                                                </div>
                                                <p>PUREST INGREDIENTS ON THE MARKET</p>
                                            </div>
                                            <div className="vegan-inner">
                                                <div className="vegan-img-row">
                                                    <img src={baseURL + "/static/images/v-icon.png"} />
                                                </div>
                                                <p>VEGAN & ANIMAL-FREE</p>
                                            </div>
                                            <div className="vegan-inner">
                                                <div className="vegan-img-row">
                                                    <img src={baseURL + "/static/images/check-icon.png"} />
                                                </div>
                                                <p>FOLLOWS FDA GUIDELINES</p>
                                            </div>
                                            <div className="vegan-inner">
                                                <div className="vegan-img-row">
                                                    <img src={baseURL + "/static/images/usa.png"} />
                                                </div>
                                                <p>MADE IN THE USA</p>
                                            </div>
                                            <div className="vegan-inner">
                                                <div className="vegan-img-row">
                                                    <img src={baseURL + "/static/images/blue-star.png"} />
                                                </div>
                                                <p>(GMP) CERTIFIED FACILITY</p>
                                            </div>
                                        </div>
									</div>
        
                                    <div className="col-md-12 formula-accord-main desktop-formula-accord">
                                        <div className="formula-accord faq-section">
                                            <div className="panel-groupSecond" id="accordionSecond" role="tablist" aria-multiselectable="true">
											{product[0].recommendedFormula.map(function(rfObj, key) {	
												return <div className="panel panel-default">
                                                    <div className="panel-heading" role="tab" id={"headingOne"+key}>
                                                        <h4 className="panel-title">
                                                            <a role="button" data-toggle="collapse" data-parent="#accordionSecond" href={"#collapseOne"+key} aria-expanded="true" aria-controls="collapseOne">
                                                                <span>{renderHTML(rfObj.formulaName)}</span>
                                                                <i className="more-less glyphicon glyphicon-plus"></i>
                                                            </a>
                                                        </h4>
                                                    </div>
                                                    <div id={"collapseOne"+key} className="panel-collapse collapse" role="tabpanel" aria-labelledby={"headingOne"+key}>
                                                        <div className="panel-body">
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <div className="directions-text">
                                                                        <h3>Directions</h3>
																		{renderHTML(rfObj.directions)}
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-4">
                                                                    <div className="directions-text">
                                                                        <h3>Science</h3>
																		{renderHTML(rfObj.science)}
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-4">
                                                                    <div className="directions-text ingredients-mg">
                                                                        <h3>Ingredients</h3>
																		{renderHTML(rfObj.ingredients)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
											})}
                                            </div>
                                        </div>
                                    </div>      
								</div>
							</div>

							<h3 className="tab_drawer_heading" rel="tab3">Reviews<span className="plus-icon">+</span><span className="plus-icon1">-</span></h3>
							<div id="tab3" className="tab-pane tab_content">
								<div className="row">
									<div className="col-md-7 col-sm-12">
										<div className="product-reviews-row">
											<div className="product-reviews">
												<div className="reviews-star">
													<img src={baseURL + "/static/images/orange-star.png"}/>
													<img src={baseURL + "/static/images/orange-star.png"}/>
													<img src={baseURL + "/static/images/orange-star.png"}/>
													<img src={baseURL + "/static/images/orange-star.png"}/>
													<img src={baseURL + "/static/images/half-star.png"}/>
													<span>5/5</span>
												</div>
												<h3>Review Title Placeholder</h3>
												<p>Used by astronauts for stress relief, laser-like focus, and increased stamina. These are the most potent and well-studied nootropics available.</p>
											</div>
											
											<div className="product-reviews">
												<div className="reviews-star">
													<img src={baseURL + "/static/images/orange-star.png"}/>
													<img src={baseURL + "/static/images/orange-star.png"}/>
													<img src={baseURL + "/static/images/orange-star.png"}/>
													<img src={baseURL + "/static/images/orange-star.png"}/>
													<img src={baseURL + "/static/images/half-star.png"}/>
													<span>5/5</span>
												</div>
												<h3>Review Title Placeholder</h3>
												<p>Used by astronauts for stress relief, laser-like focus, and increased stamina. These are the most potent and well-studied nootropics available.</p>
											</div>
											
											<div className="product-reviews">
												<div className="reviews-star">
													<img src={baseURL + "/static/images/orange-star.png"}/>
													<img src={baseURL + "/static/images/orange-star.png"}/>
													<img src={baseURL + "/static/images/orange-star.png"}/>
													<img src={baseURL + "/static/images/orange-star.png"}/>
													<img src={baseURL + "/static/images/half-star.png"}/>
													<span>5/5</span>
												</div>
												<h3>Review Title Placeholder</h3>
												<p>Used by astronauts for stress relief, laser-like focus, and increased stamina. These are the most potent and well-studied nootropics available.</p>
											</div>
											
											<div className="product-reviews">
												<div className="reviews-star">
													<img src={baseURL + "/static/images/orange-star.png"}/>
													<img src={baseURL + "/static/images/orange-star.png"}/>
													<img src={baseURL + "/static/images/orange-star.png"}/>
													<img src={baseURL + "/static/images/orange-star.png"}/>
													<img src={baseURL + "/static/images/half-star.png"}/>
													<span>5/5</span>
												</div>
												<h3>Review Title Placeholder</h3>
												<p>Used by astronauts for stress relief, laser-like focus, and increased stamina. These are the most potent and well-studied nootropics available.</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

            <section className="mobile-product-tab">
                <div className="container">
                    <div className="row">
                    <div className="col-sm-12">
                        <div className="panel-groupThird" id="accordionThird" role="tablist" aria-multiselectable="true">
                             <div className="panel">
                                <div className="panel-heading" role="tab" id="headingOne">
                                    <div className="panel-title">
                                        <a className="formula-title-Mob" role="button" data-toggle="collapse" data-parent="#accordionThird" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <i className="more-less-formula glyphicon glyphicon-minus"></i>
                                            <h2>Formulas</h2>
                                        </a>
                                    </div>
                                </div>
                                <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                                    <div className="row">
                                    <div className="col-sm-12">
										<div className="recetams-inner1">
                                            <p>Based on proven science and meticulous testing, we thoughtfully selected the following formulas for you. Try your Formula and experience peak performance.</p>
                                        </div>
									</div>

                                    <div className="col-md-12 formula-accord-main mob-formula-accord">
                                        <div className="formula-accord faq-section">
                                            <div className="panel-groupMob" id="accordionMob" role="tablist" aria-multiselectable="true">
											{product[0].recommendedFormula.map(function(rfObj, key) {	
												return <div className="panel panel-default">
                                                    <div className="panel-heading" role="tab" id={"headingOneMob"+key}>
                                                        <h4 className="panel-title">
                                                            <a role="button" data-toggle="collapse" data-parent="#accordionMob" href={"#collapseOneMob"+key} aria-expanded="true" aria-controls="collapseOneMob">
                                                                <span>{renderHTML(rfObj.formulaName)}</span>
                                                                <i className="more-less-product-mob glyphicon glyphicon-chevron-right"></i>
                                                            </a>
                                                        </h4>
                                                    </div> 
                                                    <div id={"collapseOneMob"+key} className="panel-collapse collapse" role="tabpanel" aria-labelledby={"headingOneMob"+key}>
                                                        <div className="panel-body">
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <div className="directions-text">
                                                                        <h3>Directions</h3>
																		{renderHTML(rfObj.directions)}
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-4">
                                                                    <div className="directions-text">
                                                                        <h3>Science</h3>
																		{renderHTML(rfObj.science)}
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-4">
                                                                    <div className="directions-text ingredients-mg">
                                                                        <h3>Ingredients</h3>
																		{renderHTML(rfObj.ingredients)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
											})}
                                            </div>
                                        </div>
                                        </div>
                                        <div className="col-sm-12 vegan-row vegan-row1">
										<div className="right-vegan-row">
                                            <div className="vegan-inner">
                                                <div className="vegan-img-row">
                                                    <img src={baseURL + "/static/images/purest-icon.png"} />
                                                </div>
                                                <p>PUREST INGREDIENTS ON THE MARKET</p>
                                            </div>
                                            <div className="vegan-inner">
                                                <div className="vegan-img-row">
                                                    <img src={baseURL + "/static/images/v-icon.png"} />
                                                </div>
                                                <p>VEGAN & ANIMAL-FREE</p>
                                            </div>
                                            <div className="vegan-inner">
                                                <div className="vegan-img-row">
                                                    <img src={baseURL + "/static/images/check-icon.png"} />
                                                </div>
                                                <p>FOLLOWS FDA GUIDELINES</p>
                                            </div>
                                            <div className="vegan-inner">
                                                <div className="vegan-img-row">
                                                    <img src={baseURL + "/static/images/usa.png"} />
                                                </div>
                                                <p>MADE IN THE USA</p>
                                            </div>
                                            <div className="vegan-inner">
                                                <div className="vegan-img-row">
                                                    <img src={baseURL + "/static/images/blue-star.png"} />
                                                </div>
                                                <p>(GMP) CERTIFIED FACILITY</p>
                                            </div>
                                        </div>
									</div>

                                    </div>
                                </div>
                            </div>
                            
                            <div className="panel">
                                <div className="panel-heading" role="tab" id="headingOne">
                                    <div className="panel-title">
                                        <a className="formula-title-Mob" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo2" aria-expanded="true" aria-controls="collapseOne">
                                            <i className="more-less-formula glyphicon glyphicon-plus"></i>
                                            <h2>Reviews</h2>
                                        </a>
                                    </div>
                                </div>
                                <div id="collapseTwo2" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                                    <div className="row">
                                        <div className="col-md-7 col-sm-12">
                                            <div className="product-reviews-row">
                                                <div className="product-reviews">
                                                    <div className="reviews-star">
                                                        <img src={baseURL + "/static/images/orange-star.png"}/>
                                                        <img src={baseURL + "/static/images/orange-star.png"}/>
                                                        <img src={baseURL + "/static/images/orange-star.png"}/>
                                                        <img src={baseURL + "/static/images/orange-star.png"}/>
                                                        <img src={baseURL + "/static/images/half-star.png"}/>
                                                        <span>5/5</span>
                                                    </div>
                                                    <h3>Review Title Placeholder</h3>
                                                    <p>Used by astronauts for stress relief, laser-like focus, and increased stamina. These are the most potent and well-studied nootropics available.</p>
                                                </div>

                                                <div className="product-reviews">
                                                    <div className="reviews-star">
                                                        <img src={baseURL + "/static/images/orange-star.png"}/>
                                                        <img src={baseURL + "/static/images/orange-star.png"}/>
                                                        <img src={baseURL + "/static/images/orange-star.png"}/>
                                                        <img src={baseURL + "/static/images/orange-star.png"}/>
                                                        <img src={baseURL + "/static/images/half-star.png"}/>
                                                        <span>5/5</span>
                                                    </div>
                                                    <h3>Review Title Placeholder</h3>
                                                    <p>Used by astronauts for stress relief, laser-like focus, and increased stamina. These are the most potent and well-studied nootropics available.</p>
                                                </div>

                                                <div className="product-reviews">
                                                    <div className="reviews-star">
                                                        <img src={baseURL + "/static/images/orange-star.png"}/>
                                                        <img src={baseURL + "/static/images/orange-star.png"}/>
                                                        <img src={baseURL + "/static/images/orange-star.png"}/>
                                                        <img src={baseURL + "/static/images/orange-star.png"}/>
                                                        <img src={baseURL + "/static/images/half-star.png"}/>
                                                        <span>5/5</span>
                                                    </div>
                                                    <h3>Review Title Placeholder</h3>
                                                    <p>Used by astronauts for stress relief, laser-like focus, and increased stamina. These are the most potent and well-studied nootropics available.</p>
                                                </div>

                                                <div className="product-reviews">
                                                    <div className="reviews-star">
                                                        <img src={baseURL + "/static/images/orange-star.png"}/>
                                                        <img src={baseURL + "/static/images/orange-star.png"}/>
                                                        <img src={baseURL + "/static/images/orange-star.png"}/>
                                                        <img src={baseURL + "/static/images/orange-star.png"}/>
                                                        <img src={baseURL + "/static/images/half-star.png"}/>
                                                        <span>5/5</span>
                                                    </div>
                                                    <h3>Review Title Placeholder</h3>
                                                    <p>Used by astronauts for stress relief, laser-like focus, and increased stamina. These are the most potent and well-studied nootropics available.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section> 


            <section>
				<div className="container">
					<div className="product-backmoney">
						<div className="product-money-row">
							<div className="product-money-back">
								<img className="img-responsive" src={baseURL + "/static/images/product/money-back-logo-pp.png"} />
							</div>
							<div className="product-money-text">
								<h2>Nothing to lose.</h2>
								<p>Our data shows Formula works for most people, but if you’re not completely satisfied with your Formula, we’ll give you a full refund within 100 days. No questions asked. </p>
								<span>* Limit one Starter Kit per customer</span>
							</div>
						</div>
					</div>
				</div>
			</section>
      
              <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="formula-accord faq-section formula-accord3">
                                <div className="panel-groupFourth" id="accordion" role="tablist" aria-multiselectable="true">
                                    <h1 className="questions-heading">Frequently Asked Questions</h1>
                                    {product[0].faq.map(function(faqObj, key) {
                                    return <div className="panel panel-default">
                                        <div className="panel-heading" role="tab" id="heading8">
                                            <h4 className="panel-title">
                                                <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href={"#collapse"+key} aria-expanded="false" aria-controls="collapse8">
                                                    <span>{renderHTML(faqObj.question)}</span>
                                                    <i className="more-less22 glyphicon glyphicon-plus"></i>
                                                    <i className="more-less2 glyphicon glyphicon-chevron-right"></i>
                                                </a>
                                            </h4>
                                        </div>
                                        <div id={"collapse"+key} className="panel-collapse collapse" role="tabpanel" aria-labelledby="heading8">
                                            <div className="panel-body">
                                                <div className="directions-text">
                                                    {renderHTML(faqObj.answers)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
									})}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

			<section>
				<div className="Get-starter-bluestrip">
					<div className="container">
						<div className="Get-starter-heading">
							<h2>Experience Results Today</h2>
							{productResultID ?
								(<a href={baseURL + "/product/" + productResultID}><button type="button" className="btn btn-primary kitbuy-btn">Buy Now</button></a>)
								:
								(<a href={baseURL + "/product/1"}><button type="button" className="btn btn-primary kitbuy-btn">Buy Now</button></a>)
							}
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	</div>
    )
  }
}