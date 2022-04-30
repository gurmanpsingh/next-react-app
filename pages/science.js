import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import Router from 'next/router';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import JScookie from 'js-cookie';
import $ from  '../node_modules/jquery/dist/jquery.min.js';

// Live
var baseURL = process.env.BASEURL;

export default class extends Component {
	
	constructor(props, context) {
		super(props, context);
		this.state = {linkName: '', productResultID: ''}
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
	const {linkName} = this.state;
	const {productResultID} = this.state;
	return (
		<div>
			<Header title="Science - Get my formula" />
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
					<div className="every-bg">
                        <div className="container-ingredient">
                            <div className="row everyone-container">
                                <div className="everyone-row">
                                    <h2>Everyone’s brain chemistry is unique.</h2>
                                    <p>Supplements affect everyone differently, that’s why we’ve created personalized formulas.</p>
                                </div>

                                <div className="everyone-pic">
                                    <img className="img-responsive" src={baseURL + "/static/images/dna-man.png"} />
                                </div>
                            </div>
                        </div>
                    </div>
				</section>
				<section>
                    <div className="container-ingredient-millions">
                        <div className="breaking-row">
                            <h2>Millions of data points, smart insights</h2>
                            <p>With the world’s largest nootropics data set behind us, we’re moving the industry forward. We’re rigorously researching and drawing insights to understand exactly what it takes for maximum results.</p>
                        </div>
                        <div className="row">
                            <div className="completely1">
                                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 completely-row text-center">
                                    <div className="recommend-inner">
                                        <img className="img-responsive" src={baseURL + "/static/images/recomd-icon.png"} />
                                        <h2>427,980</h2>
                                        <h4>Recommendations Made</h4>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 completely-row text-center">
                                    <div className="recommend-inner">
                                        <img className="img-responsive" src={baseURL + "/static/images/ingredients.png"} />
                                        <h2>127</h2>
                                        <h4>Ingredients Tested</h4>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 completely-row text-center">
                                    <div className="recommend-inner">
                                        <img className="img-responsive" src={baseURL + "/static/images/Unique.png"} />
                                        <h2>75,582</h2>
                                        <h4>Unique Combinations</h4>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 completely-row text-center">
                                    <div className="recommend-inner">
                                        <img className="img-responsive" src={baseURL + "/static/images/customer.png"} />
                                        <h2>96%</h2>
                                        <h4>Customers Satisfied</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        
				<section className="brain-bg">
                    <div className="container-ingredient">
                        <div className="breaking-row">
                            <h2>Breaking down your formula</h2>
                            <p>We’ve spent years perfecting the Formula recommendation system. It’s the most efficient way to learn what works for your brain and what doesn’t. </p>
                        </div>
                        <div className="completely-row">
                            <div className="completely-inner">
                                <div className="brain-icon">
                                    <img className="img-responsive" src={baseURL + "/static/images/brain.png"} />
                                </div>
                                <div className="completely-text">
                                    <h2>Completely objective</h2>
                                    <p>All of our formulas were created after rigorous placebo controlled testing with thousands of subjects.</p>
                                </div>
                            </div>

                            <div className="completely-inner">
                                <div className="brain-icon">
                                    <img className="img-responsive" src={baseURL + "/static/images/thoughtfull.png"} />
                                </div>
                                <div className="completely-text">
                                    <h2>Thoughtfully selected</h2>
                                    <p>We choose only the highest quality ingredients that are both safe and effective.</p>
                                </div>
                            </div>

                            <div className="completely-inner purposeful">
                                <div className="brain-icon">
                                    <img className="img-responsive" src={baseURL + "/static/images/purpose.png"} />
                                </div>
                                <div className="completely-text">
                                    <h2>Purposeful blends</h2>
                                    <p>We use ingredients clinically proven to work well together, creating Formulas that target specific goals—everything from focus to energy to creativity. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        
				<section className="formula-users-bg">
                    <div className="container-formula-users">
                        <div className="breaking-row">
                            <h2 className="scientists-text">The world's top scientists are leading the way</h2>
                            <p>Our team of experts has 20+ years of experience in medical research and data analytics. They’re helping to craft each unique Formula, and guide at every step. </p>
                        </div>
                        <div className="row">
                        <div className="col-lg-6 col-sm-6">
                            <div className="formula-users-row">
                                <img className="img-responsive" src={baseURL + "/static/images/louran.jpg"} />
                                <p>“Formula uses evidence-based literature to curate its selection and reduces the time to finding the best ingredients for an individual with its rich dataset of customer outcomes, making it a uniquely effective product.”</p>
                                <h4 class="dr-name1">Lauren Talbot - Data Science Advisor Stanford BA - Cornell MEng </h4>
                            </div>
                        </div>

                        <div className="col-lg-6 col-sm-6">
                            <div className="formula-users-row">
                                <img className="img-responsive" src={baseURL + "/static/images/divyansh.jpg"} />
                                <p>“Formula is applying the same scientific methods, that are used to measure efficacy and eliminate biases in clinical trials. It's amazing to see a company with a scientific approach to nootropics research and development.”</p>
                                <h4 class="dr-name2">Divyansh Agarwal - Scientific Advisor Yale BS, MS - UPenn MD, PhD Candidate </h4>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
        
				<section>
                    <div className="honest-bg">
                        <div className="container-ingredient">
                            <div className="row">
                                <div className="col-md-7 col-sm7">
                                    <div className="Honest-row">
                                        <div className="honest-heading">
                                            <h2>Honest ingredients, proven results</h2>
                                            <p>Safety is our priority. That’s why, our team of scientists carefully considers and rigorously tests every single ingredient.</p>
                                            <div className="Get-starter-heading desk-ex">
                                                <a href={baseURL + "/ingredients"}><button type="button" className="btn btn-primary kitbuy-btn">Explore our Ingredients</button></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 col-sm-5 vegan-row">
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
                                    <div className="Get-starter-heading mob-ex">
                                        <a href={baseURL + "/ingredients"}><button type="button" className="btn btn-primary kitbuy-btn">Explore our Ingredients</button></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="Get-starter-bluestrip">
                        <div className="container-ingredient">
                            <div className="Get-starter-heading">
                                <h2>Experience Results Today</h2>                                
								{productResultID ?
									(<a href={baseURL + "/product/" + productResultID}><button type="button" className="btn btn-primary kitbuy-btn formula-btnscience">Buy Now</button></a>)
									:
									(<a href={baseURL + "/product/1"}><button type="button" className="btn btn-primary kitbuy-btn formula-btnscience">Buy Now</button></a>)
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