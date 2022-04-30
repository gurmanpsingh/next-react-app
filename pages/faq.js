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
		this.state = {linkName: '', productResultID: ''}
    }
	
	static async getInitialProps() {
		// res is assigned the response once the axios
        // async get is completed
        const res = await axios.get(baseURL + '/capi/getFaq');
        const resF = await axios.get(baseURL + '/capi/getFaqCat');
        
		//console.log("RESPONSE========== ", res.data);
		//console.log("RESPONSE========== ", resF.data);

		// Return properties
        return {faq: res.data, faqCat: resF.data}
	}
	
	componentWillMount() {
		this.setState({
			faqs: this.props.faq,
			faqCats: this.props.faqCat
		});
	}
	
	componentDidMount() {
		if(typeof JScookie.get('productResultID') == 'undefined') {
			this.setState({linkName: 'Find My Formula'});
			this.setState({productResultID: ''});
		} else {
			this.setState({linkName: 'See My Formula'});
			this.setState({productResultID: JSON.parse(JScookie.get('productResultID'))});
		}
		//console.log('here prod: ', this.state.productResultID);
	}
	
  render() {
	const { faqs, faqCats } = this.state;
	const {linkName} = this.state;
	const {productResultID} = this.state;
	return (
		<div>
			<Header title="FAQ - Get my formula" />
			<div className="faq-page">
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
                            <div className="faq-inner">
                                <h2>Frequently Asked Questions</h2>
                            </div>
                        </div>
                    </div>
                </section>
        
				<section>
					<div className="product-header">
						<div className="container container-header">
							<div className="faq-section">
				                <div className="col-md-10 col-md-offset-1">
                                    <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
										{faqCats.map(function(mainFaq, index1) {
											if(index1 == mainFaq.categoryOrder) {
												return <div><h2 className="faq-title">{mainFaq.faqCategory}</h2>
												<div className="panel panel-default">
													{faqs.map(function(faq, index2) {
														if(mainFaq.categoryOrder == faq.categoryOrder) {
															return <div className="item">
																<div className="row">
																	<div className="col-md-12">
																		<div className="panel-heading" role="tab" id="heading1">
																			<h4 className="panel-title">
																				<a role="button" data-toggle="collapse" data-parent="#accordion" href={'#collapse1' + index2} aria-expanded="true" aria-controls="collapse1">
																				<span>{faq.question}</span>
																				<i className="more-less-faq1 fa fa-angle-right"></i>
																			</a>
																		</h4>
																	</div>
																	<div id={'collapse1' + index2} className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
																		<div className="panel-body"><p>
																		   {renderHTML(faq.answer)}</p>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														}
													})}
												</div></div>
											}
										})}
                                    </div>
								</div>
							</div>
						</div>
					</div>
				</section>
                <section>
                    <div className="itout-bg">
                        <div className="container">
                            <div className="">
                                <div className="itout-title">
                                    <h2>Experience Results Today</h2>
                                    <div className="find-btn mian-header-title">
										{productResultID ?
											(<a href={baseURL + "/product/" + productResultID}><button type="button" className="btn btn-primary">Buy Now</button></a>)
											:
											(<a href={baseURL + "/product/1"}><button type="button" className="btn btn-primary">Buy Now</button></a>)
										}
                                    </div>
                                </div>
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