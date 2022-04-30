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
    }
	
	static async getInitialProps({ query }) {
		// res is assigned the response once the axios
        // async get is completed

		if(JSON.stringify(query) != '{}') {
			//console.log("REQ========== ", JSON.stringify(query));
			var resultPage = await axios.get(baseURL + '/capi/getResultPage/' + query.results);
		} else {
				var resultPage = await axios.get(baseURL + '/capi/getResultPage/1');
				// redirect to home if query missing.
				//Router.push('/');
			}

		//console.log("RESPONSE RESULT========== ", resultPage.data[0].recommendedFormulas);
		//console.log("RESPONSE RESULT========== ", resultPage.data);
		
		// Return properties
        return {resultPage: resultPage.data}
	}
	
	componentWillMount() {
		this.setState({
			resultPage: this.props.resultPage
		});
	}

	componentDidMount() {

		var queryURL = this.props.url.query;
		//console.log("qurl: ", JSON.stringify(queryURL));
		this.setState({
			productPageID: queryURL.results
		});
		
		/* JScookie.set('score', queryURL.score, { expires: 15, path: '/' });
		JScookie.set('goals', queryURL.goals, { expires: 15, path: '/' });
		JScookie.set('productResultQuery', JSON.stringify(queryURL), { expires: 15, path: '/' });
		JScookie.set('productResultID', JSON.stringify(queryURL.results), { expires: 15, path: '/' }); */
		
		var CHART_COLORS = {
			'BASE' 		 : '#6d70a0',
			'ENERGY' 	 : '#ff7d53',
			'MOOD' 		 : '#6d70a0',
			'FOCUS' 	 : '#f9d93d',
			'MEMORY' 	 : '#19ccc7',
			'MOTIVATION' : '#ff0072',
			'SLEEP' 	 : '#8343d5'
		};
		
		var goalValues = getGoalValues() || {
							'ENERGY' : 6,
							'MOOD' : 7,
							'FOCUS' : 5,
							'MEMORY' : 8,
							'MOTIVATION' : 6,
							'SLEEP' : 8
						};

		var goalNames = getGoals() || [
			'Focus', 'Energy', 'Motivation'
		];
		
		//var $cta = $('.purchase-cta-container');
		//var $placeholder = $('.purchase-cta-placeholder');
		//var $window = $(window);

		function renderChart(elem, data, width) {
			return new Chart(elem, {
			type: 'doughnut',
				data: data,
				options: {
					legend: {
						display: false
					},
					cutoutPercentage: width ? 100 - width : 85,
					rotation: 1 * Math.PI,
					circumference: 1 * Math.PI,
					tooltips: {
						enabled: false
					}
				}
			});
		}

		function getDataObject(goal, value, total) {
			return {
				labels: [],
				datasets: [{
					data: [value, total - value],
					backgroundColor: [
						CHART_COLORS[ goal.toUpperCase() ],
						"#AAAAAA"
					],
					hoverBackgroundColor: [
						CHART_COLORS[ goal.toUpperCase() ],
						"#AAAAAA"
					]
				}]
			};
		}

		function renderCharts(goalValues) {
			var totalScore = Object.keys(goalValues).reduce(function(total, goal) {
				return total + goalValues[ goal ];
			}, 0);
			var maxScore = Object.keys(goalValues).length * 10;

			$('.base-score-container .chart-label').text(totalScore + '/' + maxScore);
			renderChart(document.getElementById("base-score-chart"), getDataObject('base', totalScore, maxScore), 7);

			Object.keys(goalValues).forEach(function(goal) {
				renderChart(document.getElementById(goal.toLowerCase() + "-score-chart"), getDataObject(goal, goalValues[ goal ], 10));
				var $parent  = $('#goal-score-container-' + goal.toLowerCase());
				var strValue = (typeof goalValues[ goal ] === 'number' && goalValues[ goal ] < 10 ? '0' + goalValues[ goal ].toString() : goalValues[ goal ].toString());
				//$parent.find(".chart-label").text(strValue);
				$parent.find(".chart-base").text(goal);
				$parent.find(".chart-label-full").text(strValue + '/10');			
			});
		}

		function getGoalValues() {
			//var scores = window.placeboproof.getQueryParam('score') || Cookies.get('score');
			var scores = JScookie.get('score');

			if (scores) {
				//Cookies.set('score', scores, { domain: '.getmyformula.com', maxAge: 1800 });
				//JScookie.set('score', JSON.stringify(query), { expires: 7, path: '/' });
				var arrScores = [];
				for (var i = 0; i < scores.length; i += 2) {
					var score = scores.substring(i, i + 2);
					arrScores.push(score);
				}
				
				if (arrScores.length) {
					return {
						'SLEEP' 	 : Math.floor(arrScores[ 0 ]/10),
						'ENERGY' 	 : Math.floor(arrScores[ 1 ]/10),
						'FOCUS' 	 : Math.floor(arrScores[ 2 ]/10),
						'MOTIVATION' : Math.floor(arrScores[ 3 ]/10),
						'MOOD'		 : Math.floor(arrScores[ 4 ]/10),
						'MEMORY' 	 : Math.floor(arrScores[ 5 ]/10)
					};
				}
			}
		}

		function renderGoals(goals) {
			$('.goals-container .goals').text(goals.join(', '));
		}

		function getGoals() {
			//var strGoals = window.placeboproof.getQueryParam('goals') || Cookies.get('goals');
			var strGoals = Cookies.get('goals');
			if (strGoals) {
				var arrGoals = strGoals.split(',');
				return arrGoals.map(function(goal) {
					return goal.trim();
				});
			}
		}
		
		function fixPurchaseCta() {
			var offset = $placeholder.offset();
			var scrollTop = $window.scrollTop();
			if (scrollTop >= offset.top) {
			$cta.addClass('fixed');
			} else {
			$cta.removeClass('fixed');
			}
		}
		//$(document).ready(function() {
			renderCharts(goalValues);
			renderGoals(goalNames);
		//});

	}
	
  render() {
	const {resultPage} = this.state;
	const {productPageID} = this.state;
	return (
		<div>
			<Header title="Recommendations" />
			<div className="result-page">
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
				<section className="achieve-bg">
					<div className="container container-result">
						<div className="achieve-row text-center">
							<div className="achieve-heading">
								<h2>It’s time to achieve your goals</h2>
								<div className="base-score-container">
									<div className="chart-container">
										<canvas id="base-score-chart"></canvas>
										<div className="chart-label chart-label-top"></div>
									</div>
									<p>Your Baseline</p>
								</div>
								<div className="goal-scores-container">
								   <div id="goal-score-container-sleep" className="goal-score-container">
									  <div className="chart-container">
										 <canvas className="innner-chart" id="sleep-score-chart" width="100" height="50"></canvas>
										 <div className="chart-icon chart-icon-sleep"></div>
										 <div className="chart-label"></div>
									  </div>
									  <div className="chart-base">SLEEP</div>
									  <div className="chart-label-full"></div>
								   </div>
								   <div id="goal-score-container-energy" className="goal-score-container">
									  <div className="chart-container">
										 <canvas className="innner-chart" id="energy-score-chart" width="100" height="50"></canvas>
										 <div className="chart-icon chart-icon-energy"></div>
										 <div className="chart-label"></div>
									  </div>
									  <div className="chart-base">ENERGY</div>
									  <div className="chart-label-full"></div>
								   </div>
								   <div id="goal-score-container-focus" className="goal-score-container">
									  <div className="chart-container">
										 <canvas className="innner-chart" id="focus-score-chart" width="100" height="50"></canvas>
										 <div className="chart-icon chart-icon-focus"></div>
										 <div className="chart-label"></div>
									  </div>
									  <div className="chart-base">FOCUS</div>
									  <div className="chart-label-full"></div>
								   </div>
								   <div id="goal-score-container-motivation" className="goal-score-container">
									  <div className="chart-container">
										 <canvas className="innner-chart" id="motivation-score-chart" width="100" height="50"></canvas>
										 <div className="chart-icon chart-icon-motivation"></div>
										 <div className="chart-label"></div>
									  </div>
									  <div className="chart-base">MOTIVATION</div>
									  <div className="chart-label-full"></div>
								   </div>
								   <div id="goal-score-container-mood" className="goal-score-container">
									  <div className="chart-container">
										 <canvas className="innner-chart" id="mood-score-chart" width="100" height="50"></canvas>
										 <div className="chart-icon chart-icon-mood"></div>
										 <div className="chart-label"></div>
									  </div>
									  <div className="chart-base">MOOD</div>
									  <div className="chart-label-full"></div>
								   </div>
								   <div id="goal-score-container-memory" className="goal-score-container">
									  <div className="chart-container">
										 <canvas className="innner-chart" id="memory-score-chart" width="100" height="50"></canvas>
										 <div className="chart-icon chart-icon-memory"></div>
										 <div className="chart-label"></div>
									  </div>
									  <div className="chart-base">MEMORY</div>
									  <div className="chart-label-full"></div>
								   </div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section>
                    <div className="Get-starter-bluestrip">
                        <div className="container">
                            <div className="Get-starter-heading get-result-btn">
                                <h2>Experience Results Today</h2>
                                <a href={"/product/" + productPageID}><button type="button" className="btn btn-primary kitbuy-btn">Buy Now</button></a>
                            </div>
                        </div>
                    </div>
                </section>
				<section className="ingradient-result-bg"> 
                    <div className="container container-result">
                        <div className="ingradient-result">
                            <h2>Your Recommended Formulas</h2>
                        </div>
						{resultPage[0].recommendedFormulas.map(function(rfObj, key) {
                        return <div className="result-box-row">
                            <div className="row">
                                <h3 className="resultformula-name">{rfObj.formulaName}</h3>
                                <div className="col-md-4 col-sm-4">
                                    <div className="racetams-inner racetams-peptides-inner">
                                        <ul>
										{rfObj.benefits.map(function(benObj, key) {
                                            if(benObj.symbol[0] !== 'plus') { 
												return <li><span><i className={"fa fa-caret-" + benObj.symbol[0] + " " + benObj.symbol[0] + "-arrow"} aria-hidden="true"></i></span>{benObj.effect}</li>
                                            } else {
												return <li><span><i className={"fa fa-" + benObj.symbol[0]} aria-hidden="true"></i></span>{benObj.effect}</li>
											}
										})}
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-md-4 col-sm-4">
                                    <div className="racetams-inner">
                                        <ul>
                                            <li>{rfObj.science}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                    <div className="racetams-inner racetams-inner3">
                                        <ul>
                                            <li>{renderHTML(rfObj.ingredients)}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
						})}
                    </div>
                </section>
				<section>
                    <div className="inside-box-bg">
                        <img className="img-responsive mob-inside-center" src={baseURL + "/static/images/inside-starter-kit.png"} />
                        <div className="container container-result">
                            <div className="inside-box-row">
                                <div className="inside-box-inner">
                                    <h2>Inside The Box</h2>
                                    <p>Your recommended formulas are the first step toward achieving your goals and keeping you at peak performance.</p>
                                    <ul>
                                        <li>4 week supply</li>
                                        <li>All your recommended formulas</li>
                                        <li>Expert guidance</li>
                                    </ul>
                                    <div className="try-itout-btn">
                                        <a href={"/product/" + productPageID}><button type="button" className="btn btn-primary">Try it out</button></a>
                                    </div>
                                </div>
                                <div className="inside-right-row">
                                    <img className="img-responsive" src={baseURL + "/static/images/inside-starter-kit.png"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>      
                <section className="meet-expert">
                    <div className="inside-box-bg">
                        <div className="container container-result">
                            <div className="inside-box-row">
                                <div className="inside-right-row">
                                    <img className="img-responsive" src={baseURL + "/static/images/mobile-ph.png"} />
                                </div>
                                <div className="inside-box-inner">
                                    <h2>Meet Your Expert Guide</h2>
                                    <p>Nootropics experts are on-hand to guide you at every step, answering any questions you have and helping you achieve your goals.</p>
                                    <div className="try-itout-btn">
                                        <button type="button" className="btn btn-primary">Chat with an expert</button>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </section>      
				<section>
					<div className="result-slider-bg">
						<div className="container">
							<div className='row'>
								<div className='col-md-12 results-bg'>
									<div className="result-title">
										<h2>The results are in</h2>
									</div>
									<div className="carousel slide" data-ride="carousel" id="quote-carousel">
										<ol className="carousel-indicators">
											<li data-target="#quote-carousel" data-slide-to="0" className="active"></li>
											<li data-target="#quote-carousel" data-slide-to="1"></li>
											<li data-target="#quote-carousel" data-slide-to="2"></li>
											<li data-target="#quote-carousel" data-slide-to="3"></li>
										</ol>
										<div className="carousel-inner">
										{resultPage[0].resultstestimonial.map(function(rsObj, key) {
											if(key == 0) {
											return <div className="item active">											   
													<div className='col-offset-md-1 col-md-9 result-slider'>
														<div className="row">
															<div className="col-sm-6 text-center mob-slider">
																<img className="img-responsive" src={rsObj.influencerHeroMedia} />
																<div className="checkMarks-cont">
																	<ul>
																		{rsObj.checkMarks.map(function(cmObj, key) {	
																			if(key !== -1) {
																				return <li><i className="fa fa-check"></i>{cmObj}</li>
																			}
																		})}
																	</ul>
																</div>
															</div>
															<div className="col-sm-6 specific-formula-title">
																<h1>{renderHTML(rsObj.title)}</h1>
																{renderHTML(rsObj.pullQuote)}
																<div className="find-btn mian-header-title">
																	<a href={baseURL + "/stories/" + rsObj.permaLink}><button type="button" className="btn btn-primary">Read my story</button></a>
																</div>
															</div>
															<div className="col-sm-6 text-center desktop-slider">
																<img className="img-responsive" src={rsObj.influencerHeroMedia} />
																	<div className="checkMarks-cont">
																	<ul>
																		{rsObj.checkMarks.map(function(cmObj, key) {	
																			if(key !== -1) {
																				return <li><i className="fa fa-check"></i>{cmObj}</li>
																			}
																		})}
																	</ul>
																	</div>
															</div>
														</div>
													</div>
												</div>
											} else {
												return <div className="item">											   
													<div className='col-offset-md-1 col-md-9 result-slider'>
														<div className="row">
															<div className="col-sm-6 text-center mob-slider">
																<img className="img-responsive" src={rsObj.influencerHeroMedia} />
																<div className="checkMarks-cont">
																	<ul>
																		{rsObj.checkMarks.map(function(cmObj, key) {	
																			if(key !== -1) {
																				return <li><i className="fa fa-check"></i>{cmObj}</li>
																			}
																		})}
																	</ul>
																</div>
															</div>
															<div className="col-sm-6 specific-formula-title">
																<h1>{renderHTML(rsObj.title)}</h1>
																<p>{renderHTML(rsObj.pullQuote)}</p>
																<div className="find-btn mian-header-title">
																	<a href={baseURL + "/stories/" + rsObj.permaLink}><button type="button" className="btn btn-primary">Read my story</button></a>
																</div>
															</div>
															<div className="col-sm-6 text-center desktop-slider">
																<img className="img-responsive" src={rsObj.influencerHeroMedia} />
																<div className="checkMarks-cont">
																	<ul>
																		{rsObj.checkMarks.map(function(cmObj, key) {	
																			if(key !== -1) {
																				return <li><i className="fa fa-check"></i>{cmObj}</li>
																			}
																		})}
																	</ul>
																</div>
															</div>
														</div>
													</div>
												</div>
											}
										})}
										</div>
										<a data-slide="prev" href="#quote-carousel" className="left carousel-control"><img className="img-responsive" src={baseURL + "/static/images/result1blue-errow.png"} /></a>
										<a data-slide="next" href="#quote-carousel" className="right carousel-control"><img className="img-responsive" src={baseURL + "/static/images/result-blue-errow.png"} /></a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>				
				<section>
                    <div className="Get-starter-bluestrip mob-bluestrip">
                        <div className="container">
                            <div className="Get-starter-heading get-result-btn">
                                <h2>Experience Results Today</h2>
                                <a href={"/product/" + productPageID}><button type="button" className="btn btn-primary kitbuy-btn">Buy Now</button></a>
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