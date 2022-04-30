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
	
	static async getInitialProps({ query }) {
		// res is assigned the response once the axios
        // async get is completed
		
		const res = await axios.get(baseURL + '/capi/loadAllIngredients');

		//console.log("RESPONSE========== ", res.data);
		
		/* if(JSON.stringify(query) == '{}') {
			query = 'traodmCaw86GCgyw0cueG';
		} */
		const singleIngredient = await axios.get(baseURL + '/capi/getSingleIngredient/' + query);

		//console.log("RESPONSE getSingleIngredient========== ", singleIngredient.data);
		
		// Return properties
        return {allIngredients: res.data, singleIngredient: singleIngredient.data}
	}
	
	componentWillMount() {
		this.setState({
			allIngredients: this.props.allIngredients,
			singleIngredient: this.props.singleIngredient
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
	const { allIngredients } = this.state;
	const { singleIngredient } = this.state;
	const {linkName} = this.state;
	const {productResultID} = this.state;
	return (
		<div>
			<Header title="Single Ingredient - Get my formula" />
			<div className="ingredient-page">
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
        
                <section id="section11" className="effect-blue-bg">
                    <div className="container-ingredient">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className=" effective-row">
                                    <h1>Pure Meets Effective.</h1>
                                    <p>We use only the highest-quality ingredients, sourced in the USA, and rigorously tested for purity. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
    
                <section>
                    <div className="container-ingredient">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-4"> 
                                <div className="mob-read-more">
                                    <div className="readmore rotate-icon">
                                        <h3>More Ingredients
                                        <i className="more-less-icon rotate glyphicon glyphicon-chevron-right"></i></h3>
                                    </div>
                                    <div className="mob-tab-racetams">
                                        <div className="panel-heading" role="tab" id="headingOne">
                                            <h4 className="panel-title">
                                                <a className="title-color" data-parent="#accordion" href="javascript:void(0);" aria-expanded="true" aria-controls="collapse01">
                                                    <span>RACETAMS & PEPTIDES</span>
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="" className="" aria-labelledby="headingOne">
                                            <div className="panel-body oxiracetam-tab">
                                              <ul>
                                              {allIngredients.map(function(ingr, index) {
                                                  if(ingr.resource == "RACETAMS & PEPTIDES") {
                                                  return <li><a href={baseURL + "/ingredient/" + ingr.permaLink}><i className="fa fa-caret-up" aria-hidden="true"></i>{ingr.name}</a></li>
                                                  }
                                              })}
                                              </ul>
                                            </div>
                                        </div>
										
										<div className="panel-heading" role="tab" id="headingOne">
                                            <h4 className="panel-title">
                                                <a className="title-color" data-parent="#accordion" href="javascript:void(0);" aria-expanded="true" aria-controls="collapse01">
                                                    <span>CHOLINE SOURCES</span>
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="" className="" aria-labelledby="headingOne">
                                            <div className="panel-body oxiracetam-tab">
                                              <ul>
                                              {allIngredients.map(function(ingr, index) {
                                                  if(ingr.resource == "CHOLINE SOURCES") {
                                                  return <li><a href={baseURL + "/ingredient/" + ingr.permaLink}><i className="fa fa-caret-up" aria-hidden="true"></i>{ingr.name}</a></li>
                                                  }
                                              })}
                                              </ul>
                                            </div>
                                        </div>
										
										<div className="panel-heading" role="tab" id="headingOne">
                                            <h4 className="panel-title">
                                                <a className="title-color" data-parent="#accordion" href="javascript:void(0);" aria-expanded="true" aria-controls="collapse01">
                                                    <span>VITAMINS & AMINO ACIDS</span>
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="" className="" aria-labelledby="headingOne">
                                            <div className="panel-body oxiracetam-tab">
                                              <ul>
                                              {allIngredients.map(function(ingr, index) {
                                                  if(ingr.resource == "VITAMINS & AMINO ACIDS") {
                                                  return <li><a href={baseURL + "/ingredient/" + ingr.permaLink}><i className="fa fa-caret-up" aria-hidden="true"></i>{ingr.name}</a></li>
                                                  }
                                              })}
                                              </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="sticky-anchor"></div>
                                <div className="left-tab-row">
                                <div className="panel-group desktop-accordion" id="accordion" role="tablist" aria-multiselectable="true">
                                    <div className="panel panel-default">
                                        <div className="panel-heading" role="tab" id="headingOne">
                                            <h4 className="panel-title">
                                                <a className="title-color" role="button" data-toggle="" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    <span>RACETAMS & PEPTIDES</span>
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseOne" className="panel-collapse" role="tabpanel" aria-labelledby="headingOne">
                                            <div className="panel-body oxiracetam-tab">
                                              <ul>
											  {allIngredients.map(function(ingr, index) {
												  if(ingr.resource == "RACETAMS & PEPTIDES") {
                                                  return <li><a href={baseURL + "/ingredient/" + ingr.permaLink}><i className="fa fa-caret-up" aria-hidden="true"></i>{ingr.name}</a></li>
												  }
											  })}
											  </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="panel panel-default">
                                        <div className="panel-heading" role="tab" id="headingTwo">
                                            <h4 className="panel-title">
                                                <a className="collapsed" role="button" data-toggle="" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    <span>CHOLINE SOURCES</span>
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseTwo" className="panel-collapse" role="tabpanel" aria-labelledby="headingTwo">
                                            <div className="panel-body oxiracetam-tab">
												<ul>
												  {allIngredients.map(function(ingr, index) {
													  if(ingr.resource == "CHOLINE SOURCES") {
													  return <li><a href={baseURL + "/ingredient/" + ingr.permaLink}><i className="fa fa-caret-up" aria-hidden="true"></i>{ingr.name}</a></li>
													  }
												  })}
											    </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="panel panel-default">
                                        <div className="panel-heading" role="tab" id="headingThree">
                                            <h4 className="panel-title">
                                                <a className="collapsed" role="button" data-toggle="" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    <span>VITAMINS & AMINO ACIDS</span>
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseThree" className="panel-collapse" role="tabpanel" aria-labelledby="headingThree">
                                            <div className="panel-body oxiracetam-tab">
                                                <ul>
												  {allIngredients.map(function(ingr, index) {
													  if(ingr.resource == "VITAMINS & AMINO ACIDS") {
													  return <li><a href={baseURL + "/ingredient/" + ingr.permaLink}><i className="fa fa-caret-up" aria-hidden="true"></i>{ingr.name}</a></li>
													  }
												  })}
											    </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>        
                            </div>
                            <div className="col-lg-8 col-md-8 col-sm-8 tab-content">
                                {singleIngredient.map(function(ingr, index) {
										if(index == 0) {
											return <div id={"res" + index} className="tab-pane fade in active">
														<div className="piracetam-row">
															<h1>{ingr.name}</h1><p>{renderHTML(ingr.shortDescription)}</p>
                                                            {("benefitImage" in ingr) && 
															<div className="piracetam piracetam-mob">
																<img src={ingr.benefitImage} />
																{("benefitImageDes" in ingr) && 
																	<p>{renderHTML(ingr.benefitImageDes)}</p>
																}
															</div>
															}
														</div>
														{("benefits" in ingr) && 
														<div className="benefits-row">
															<div className="benefits-inner">
																<h3>Benefits</h3>
																{renderHTML(ingr.benefits)}
															</div>
															{("benefitImage" in ingr) && 
															<div className="piracetam">
																<img src={ingr.benefitImage} />
																{("benefitImageDes" in ingr) && 
																	<p>{renderHTML(ingr.benefitImageDes)}</p>
																}
															</div>
															}
														</div>
														}														
														{("purity" in ingr) &&
														<div className="ingredients-purity-row">
															<h1>Purity</h1>
															{renderHTML(ingr.purity)}
														</div>
														}
														{("summary" in ingr) && 
														<div className="ingredients-summary-row">
															<h1>Summary</h1>
															{renderHTML(ingr.summary)}
														</div>														
														}
														{("selectedCommunityExperience" in ingr) && 
															<div className="ingredients-summary-row">
																<h1>Selected Community Experience </h1>
																{renderHTML(ingr.selectedCommunityExperience)}
															</div>
														}
														{(ingr.hasOwnProperty("studyReferences")) &&
															<div className="ingredients-referrences-row">
																<h1>References</h1>
																{ingr.studyReferences.map(function(stdRef) {
																	return <div className="reference-cont">
																			<span className="reference-index">{stdRef.citationNumber}</span>
																			<div className="reference-studyCont">
																				<div className="ref-studyTitle">{renderHTML(stdRef.studyTitle)}</div>
																				<i>{renderHTML(stdRef.description)}</i>
																				<div className="ref-studyAuthor">{stdRef.authors}</div>
																			</div>
																		</div>
																})}
															</div>
														}
														
													</div>
										} else {
											return <div id={"res" + index} className="tab-pane fade">
														<div className="piracetam-row">
															<h1>{ingr.name}</h1><p>{renderHTML(ingr.shortDescription)}</p>
														</div>
														{("benefits" in ingr) && 
														<div className="benefits-row">
															<div className="benefits-inner">
																<h3>Benefits</h3>
																{renderHTML(ingr.benefits)}
															</div>
															{("benefitImage" in ingr) && 
															<div className="piracetam">
																<img src={ingr.benefitImage} />
																{("benefitImageDes" in ingr) && 
																	<p>{renderHTML(ingr.benefitImageDes)}</p>
																}
															</div>
															}
														</div>
														}														
														{("purity" in ingr) &&
														<div className="ingredients-purity-row">
															<h1>Purity</h1>
															{renderHTML(ingr.purity)}
														</div>
														}
														{("summary" in ingr) && 
														<div className="ingredients-summary-row">
															<h1>Summary</h1>
															{renderHTML(ingr.summary)}
														</div>														
														}
														{("selectedCommunityExperience" in ingr) && 
															<div className="ingredients-summary-row">
																<h1>Selected Community Experience </h1>
																{renderHTML(ingr.selectedCommunityExperience)}
															</div>
														}
														{(ingr.hasOwnProperty("studyReferences")) &&
															<div className="ingredients-referrences-row">
																<h1>References</h1>
																{ingr.studyReferences.map(function(stdRef) {
																	return <div className="reference-cont">
																			<span className="reference-index">{stdRef.citationNumber}</span>
																			<div className="reference-studyCont">
																				<div className="ref-studyTitle">{renderHTML(stdRef.studyTitle)}</div>
																				<i>{renderHTML(stdRef.description)}</i>
																				<div className="ref-studyAuthor">{stdRef.authors}</div>
																			</div>
																		</div>
																})}
															</div>
														}														
													</div>
										}
								})}
							</div>
                        </div>
                    </div>
                </section>
                <div className="container">
                    <div className="backtotop text-center">
                        <i className="glyphicon glyphicon-chevron-up"></i>
                        <a className="topscroll" href="#section11">Back to the top</a>
                    </div>
                </div>
                <div id="ingredient-bluestrip"></div> 
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