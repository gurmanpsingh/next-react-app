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
        const res = await axios.get(baseURL + '/capi/getTestimonials');
		//const singleStory = [];
		if(JSON.stringify(query) != '{}') {
			//console.log("REQ========== ", JSON.stringify(query));
			var singleStory = await axios.get(baseURL + '/capi/getStory/' + query);
		} else {
				//console.log("REQ========== In else");
				var singleStory = await axios.get(baseURL + '/capi/getStory/befitmac');
			}
		//console.log("RESPONSE========== ", res.data);
		//console.log("RESPONSE STORY========== ", singleStory.data);
		
		// Return properties
        return {testimonials: res.data, story: singleStory.data}
	}
	
	componentWillMount() {
		this.setState({
			story: this.props.story,
			testimonials: this.props.testimonials
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
	const { testimonials } = this.state;
	const { story } = this.state;
	const {productResultID} = this.state;
	return (
		<div>
			<Header title="Stories - Get my formula" />
			<div className="stories-page">
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
				<section className="testimonial-first-slider">
            <div className="container">
                <div className='row'>
                    <div className='col-md-12 results-bg top-client-name-row'>
                        <div className="carousel slide" data-ride="carousel" id="quote-carousel">                        
                            <div className="carousel-inner">
                                <div className="item active">
                                    <h1 className="top-client-name">{renderHTML(story[0].influencerName)}
                                    {story[0].influencerSocialMedia.map(function(ismObj, index) {
                                            if(ismObj.socialMediaType == "Facebook") {
                                            return <div className="main-heading">
                                                <a href={ismObj.socialmedialink} target="_blank"><i className="fa fa-facebook"></i></a>
                                                </div>
                                            }
                                            if(ismObj.socialMediaType == "Instagram") {
                                            return <div className="main-heading">
                                                <a href={ismObj.socialmedialink} target="_blank"><i className="fa fa-instagram"></i></a>
                                                </div>
                                            }
                                            if(ismObj.socialMediaType == "Twitter") {
                                            return <div className="main-heading">
                                                <a href={ismObj.socialmedialink} target="_blank"><i className="fa fa-twitter"></i></a>
                                                </div>
                                            }
                                            if(ismObj.socialMediaType == "YouTube") {
                                            return <div className="main-heading">
                                                <a href={ismObj.socialmedialink} target="_blank"><i className="fa fa-youtube"></i></a>
                                                </div>
                                            }
                                    })}
                                    </h1>
                                        <div className='col-offset-md-1 col-md-9 result-slider'>
                                            <div className="row">
                                                <div className="col-sm-6 text-center mob-slider">
                                                    <img className="img-responsive" src={story[0].image} />
													<div className="checkMarks-cont">
														<ul>
															{story[0].checkMarks.map(function(cmObj, key) {	
																if(key !== -1) {
																	return <li><i className="fa fa-check"></i>{cmObj}</li>
																}
															})}
														</ul>
													</div>
                                                </div>
                                            <div className="col-sm-6 specific-formula-title">
                                                <h1>{story[0].title}</h1>
                                                <p>{renderHTML(story[0].pullQuote)}</p>
                                            </div>
                                            <div className="col-sm-6 text-center desktop-slider">
                                                <img className="img-responsive" src={story[0].image} />
												<div className="checkMarks-cont">
													<ul>
														{story[0].checkMarks.map(function(cmObj, key) {	
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
	
	<section className="formulaQuote">
        <div className="container formulaQuote-container">
            <div className='row'>
                <div className="container personal-container">
                    <h1 className="stories-formulas-heading">My Formulas</h1>
				{story[0].formulaQuote.map(function(fqObj, index) {
                    return <div className="energy-main-heading">
                        <h2>{renderHTML(fqObj.formulaTitle)}</h2>
                        <p>{renderHTML(fqObj.descriptionQuote)}</p>                        
                    </div>
				})}
                </div>
            </div>
        </div>
    </section>

	<section className="personal-bg energy-main-heading personal-padd">
        <div className="container personal-container"> 
            {renderHTML(story[0].facts)}
        </div>
    </section>
	
    {/*<section className="influencerSocialMedia">
        <div className="container influencerSocialMedia-container">
            <div className='row'>
                <div className="col-lg-12 col-md-12">
				{story[0].influencerSocialMedia.map(function(ismObj, index) {
                        if(ismObj.socialMediaType == "Facebook") {
						return <div className="main-heading">
							<a href={ismObj.socialmedialink} target="_blank"><i className="fa fa-facebook"></i></a>
							</div>
						}
						if(ismObj.socialMediaType == "Instagram") {
						return <div className="main-heading">
							<a href={ismObj.socialmedialink} target="_blank"><i className="fa fa-instagram"></i></a>
							</div>
						}
						if(ismObj.socialMediaType == "Twitter") {
						return <div className="main-heading">
							<a href={ismObj.socialmedialink} target="_blank"><i className="fa fa-twitter"></i></a>
							</div>
						}
						if(ismObj.socialMediaType == "YouTube") {
						return <div className="main-heading">
							<a href={ismObj.socialmedialink} target="_blank"><i className="fa fa-youtube"></i></a>
							</div>
						}
				})}
                </div>
            </div>
        </div>
    </section>*/}
	
	<section className="achievements-goals-interests">
        <div className="container agi-container">
            <div className='row'>
                <div className="col-lg-4 col-md-4 col-sm-4">
                        <h3>Achievements</h3>
				{story[0].achievements.map(function(acObj, index) {
                    return <div className="energy-main-heading">
                        <div className="achievements-section">
                            <img src={acObj.icon} />
                            <span>{renderHTML(acObj.title)}</span>
                        </div>
                    </div>
				})}
				</div>
                <div className="col-lg-4 col-md-4 col-sm-4">
                        <h3>Goals</h3>
				{story[0].goals.map(function(goObj, index) {
                    return <div className="energy-main-heading">
                        <div className="achievements-section">
                            <img src={goObj.icon} />
                            <span>{renderHTML(goObj.title)}</span>
                        </div>
                    </div>
				})}
				</div>
                <div className="col-lg-4 col-md-4 col-sm-4">
                        <h3>Interests</h3>
				{story[0].interests.map(function(inObj, index) {
                    return <div className="energy-main-heading">
                        <div className="achievements-section">
                            <img src={inObj.icon} />
                            <span>{renderHTML(inObj.title)}</span>
                        </div>
                    </div>
				})}
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
							<a href={baseURL + "/product/" + story[0].id}><button type="button" className="btn btn-primary">{story[0].buyButtonText}</button></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

	{testimonials.map(function(testimonial, index) {
	if(index !== -1) {
    return <section className="testimonial-2-slider">
        <div className="container">
            <div className='row'>
                <div className='col-md-12 results-bg'>
                    <div className="carousel slide client-name-padd" data-ride="carousel" id="quote-carousel">
                        <div className="carousel-inner">                       
                            <div className="item active">
								<h1 className="client-name">{testimonial.influencerName}{story[0].influencerSocialMedia.map(function(ismObj, index) {
                                            if(ismObj.socialMediaType == "Facebook") {
                                            return <div className="main-heading">
                                                <a href={ismObj.socialmedialink} target="_blank"><i className="fa fa-facebook"></i></a>
                                                </div>
                                            }
                                            if(ismObj.socialMediaType == "Instagram") {
                                            return <div className="main-heading">
                                                <a href={ismObj.socialmedialink} target="_blank"><i className="fa fa-instagram"></i></a>
                                                </div>
                                            }
                                            if(ismObj.socialMediaType == "Twitter") {
                                            return <div className="main-heading">
                                                <a href={ismObj.socialmedialink} target="_blank"><i className="fa fa-twitter"></i></a>
                                                </div>
                                            }
                                            if(ismObj.socialMediaType == "YouTube") {
                                            return <div className="main-heading">
                                                <a href={ismObj.socialmedialink} target="_blank"><i className="fa fa-youtube"></i></a>
                                                </div>
                                            }
                                    })}</h1>
                                    <div className='col-offset-md-1 col-md-9 result-slider'>
                                        <div className="row">
                                            <div className="col-sm-6 text-center mob-slider">
                                                <img className="img-responsive" src={testimonial.images} />
												<div className="checkMarks-cont">
													<ul>
														{story[0].checkMarks.map(function(cmObj, key) {	
															if(key !== -1) {
																return <li><i className="fa fa-check"></i>{cmObj}</li>
															}
														})}
													</ul>
												</div>
                                            </div>
                                            <div className="col-sm-6 specific-formula-title">
                                                <h1>{renderHTML(testimonial.title)}</h1>
                                                {renderHTML(testimonial.description)}
                                                <div className="find-btn mian-header-title">
                                                    <a href={baseURL + "/stories/" + testimonial.id}><button type="button" className="btn btn-primary">Read my story</button></a>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 text-center desktop-slider">
                                                <img className="img-responsive" src={testimonial.images} />
												<div className="checkMarks-cont">
													<ul>
														{story[0].checkMarks.map(function(cmObj, key) {	
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
	}
	})}
	<Footer />
	</div>
</div>
    )
  }
}