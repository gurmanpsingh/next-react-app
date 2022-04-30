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
		<div className="about-page">
			<Header title="About us - Get my formula" />
			<div>
				<section className="about-header-bg">
					<div className="product-header-bg">
						<div className="container container-header">
							<div className="row">
								<div className="col-lg-12">
									<Menu />
                                    <div className="row">
                                        <div className="col-sm-6 pull-left">
                                            <div className="mian-header-title">
                                                <h2>We believe in a world without ceilings</h2>
                                                <p>At Formula, we honor the unique mind. We work together to build a nootropic blend tailored to you, so you can break through your personal barriers and achieve what you’re after. </p>
                                            </div>
                                        </div>
                                    </div>
								</div>
							</div>
						</div>
					</div>
				</section>
        
                <section>
                    <div className="container about-container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="founder-heading text-center">
                                    <p className="mob-about-slide-text">At Formula, we honor the unique mind. We work together to build a nootropic blend tailored to you, so you can break through your personal barriers and achieve what you’re after. </p>

                                    <h1>Founder’s Letter</h1>
                                    <img className="img-responsive" src={baseURL + "/static/images/about-men.jpg"} />
                                </div>
                                <div className="founder-text">
                                    <p>When I was 16, I dropped out of high school. Throughout my adolescence I always struggled with procrastination, staying focused, and being motivated. It was nearly impossible. </p>
                                    <p>I tried every trick in the book to get me on track – from basic time management to the pomodoro method, from daily meditation to weeklong silent retreats, from intermittent fasting to eating keto and from crossfit to kundalini yoga. While most provided some short-term benefits, I struggled to maintain a lasting routine and eventually they all fell by the wayside.</p>
                                    <blockquote><h3 className="text-center always-head always-head1">I always struggled with procrastination, staying focused, and being motivated</h3></blockquote>
                                    <p>Then I came across nootropics. I tried every nootropic in the market and meticulously tracked its effects on my energy, focus, and mood – it was clear that I responded much better to some than others. I removed what didn’t work and experimented with different combinations to curate the optimal Formula for me. My days got easier. I had more energy and motivation. I could focus and be productive for longer periods of time, and I found that I began to make steady progress towards my goals. </p>
                                    <blockquote><h3 className="text-center always-head always-head2">I tried every nootropic in the market and meticulously tracked their effects on my energy, focus, and mood </h3></blockquote>
                                    <p>With the results I got from my Formula, I was able to quit my job as a chef at a restaurant, pass the GMAT with a score in the 99th percentile score and pursue a top-tier MBA program despite not having a high school diploma or undergraduate degree. Yeah, that’s right, I now have two master's degrees, one from INSEAD in paris and one from Yale. I credit nootropics for helping overcome lifelong limitations and getting me to the life I love today.</p>
                                    <blockquote><h3 className="text-center always-head always-head3">I now have two master's degrees, one from INSEAD and one from Yale, without a college or even high school diploma.</h3></blockquote>
                                    <p>Soon friends were sampling the nootropics I was taking but few saw the same benefits. That’s when I fully came to appreciate that everyone’s brain chemistry is unique – and why standard “one-supplement-fits-all” products rarely get people the results they’re looking for. From my first hand experience, I knew there was a better way. That’s why I started the world’s first line of personalized nootropics. Personalized to your brain, to your objectives, and to your potential. </p>
                                    <p>Formula was built with one person in mind: you. </p>
                                    <p>Here’s to your best self, every day. </p>
                                    <img className="sign-about img-responsive" src={baseURL + "/static/images/ab-sign.jpg"} />
                                    <span>Dan Freed,</span> <span>Founder and CEO</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="itout-bg">
                        <div className="container">
                            <div className="row">
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