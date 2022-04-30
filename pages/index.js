import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import Router from 'next/router';
import Header from '../components/Header';
import Menu from '../components/HomeMenu';
import Footer from '../components/HomeFooter';
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
        const res = await axios.get(baseURL + '/capi/getTestimonials');
        
		//console.log("RESPONSE========== ", res.data);
		
		// Return properties
        return {testimonials: res.data}
	}
	
	componentWillMount() {
		this.setState({
			testimonials: this.props.testimonials
		});
	}
	
	componentDidMount() {
		console.log('here: ', JScookie.get('productResultID'));
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
	const {linkName} = this.state;
	const {productResultID} = this.state;
	return (
		<div>
			<Header title="Home - Get my formula" />
			<div className="landing-page">
				<section>
					<div className="header-bg">
						<div className="container container-header">
							<div className="row">
								<div className="col-lg-12">
									<Menu />									
									<div className="row">
										<div className="col-sm-6 pull-right">
                                            <div className="mian-header-title">
                                                <h2>Your mind is unique. Our Formulas are too</h2>
                                                <p>Introducing personalized blends of nootropic supplements tailored to your unique needs—enhancing anything from <b>creativity</b> to <b>energy</b> to <b>focus.</b> </p>
                                                {productResultID ?
													(<a href={"result?results=" + productResultID}><button type="button" className="btn btn-primary">{linkName}</button></a>)
													:
													(<a href={"quiz"}><button type="button" className="btn btn-primary">{linkName}</button></a>)
												}
                                            </div>
                                        </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

			<section>
                <div className="mob-bg">
                    <div className="container">
                        <div className="">
                            <div className="mian-header-title">
                                <p>Introducing personalized blends of nootropic supplements tailored to your unique needs—enhancing anything from <b>creativity</b> to <b>energy</b> to <b>focus.</b> </p>                               
								{productResultID ?
									(<a href={"result?results=" + productResultID}><button type="button" className="btn btn-primary">{linkName}</button></a>)
									:
									(<a href={"quiz"}><button type="button" className="btn btn-primary">{linkName}</button></a>)
								}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

			<section className="assessment-bg">
                <div className="">
                    <div className="container">
                        <div className="">
                            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 text-center">
                                <div className=" assessment-inner">
                                    <img className="img-responsive" src={baseURL + "/static/images/assessment.png"} />
                                    <h3>Take the assessment </h3>
                                    <p>That’s how we know your baseline and your goals.</p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 text-center assessment-row1">
                                <div className=" assessment-inner">
                                    <img className="img-responsive" src={baseURL + "/static/images/recommendation.png"} />
                                    <h3>See Your Recommendation</h3>
                                    <p>Our algorithm analyzes the world’s largest nootropics data set and recommends the right nutrients. </p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 text-center">
                                <div className=" assessment-inner">
                                    <img className="img-responsive" src={baseURL + "/static/images/reco.png"} />
                                    <h3>Get Personalized Packs</h3>
                                    <p>Targeted formulas for your lifestyle and goals delivered to your door.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

			<section className="specific-bg">
                <div className="">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 formula-kit pull-right">
                                <div className="">
                                    <img className="img-responsive" src={baseURL + "/static/images/formula-kit.png"} />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 specific-row">
                                <div className=" specific-inner">
                                    <h1>Formulas for your goals</h1>
                                    <p>On demand energy, motivation and focus when you need it the most. We’ve got you covered with custom formulas.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        
            <section className="millions-data-bg">
                <div className="container">
                    <div className="row">
                        <div className="data-row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="data-users-inner">
                                    <h1>Millions of data points, smart insights</h1>
                                    <p>We’ve analyzed thousands of clinical trials and conducted research on 127 different ingredients.</p> 
                                    <p>Recommendations powered by the worlds largest data set. Here’s how it works:</p>
                                    <ul>
                                        <li><span>-</span> Ask the right questions</li>
                                        <li><span>-</span> Compare you to similar people</li>
                                        <li><span>-</span> Recommend ingredients based off what has worked for similar cases.</li>
                                    </ul>
                                    
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                                <div className="user-ages">
                                    <p>Finding similar cases of <span>women</span> between the ages of <span>20-25</span> looking to improve <span>motivation.</span></p>
                                    <h2>10,560</h2>
                                    <img className="img-responsive" src={baseURL + "/static/images/data-users.png"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        
            <section className="backed-bg">
                <div className="container">
                    <div className="breaking-row">
                        <h2>Backed by science, proven by you</h2>
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

            <section className="medician-bg">
                <div className="container">
                    <div className="">
                        <div className="pure-meets">
                            <h1>Pure meets effective</h1>
                            <p>We use only the highest-quality ingredients, sourced in the USA, and rigorously tested for purity.</p>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 text-center assess-first">
                            <div className=" assessment-inner">
                                <a href={baseURL + "/ingredients"}><img className="img-responsive" src={baseURL + "/static/images/white.jpg"} /></a>
                                <h3>Racetams & Peptides</h3>
                                <p>Used by astronauts for stress relief, laser-like focus, and increased stamina, racetams & peptides are the most potent and well-studied nootropics on the market.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 text-center">
                            <div className=" assessment-inner">
                                <a href={baseURL + "/ingredients"}><img className="img-responsive" src={baseURL + "/static/images/choline.jpg"} /></a>
                                <h3>Choline Sources</h3>
                                <p>Acetylcholine is the neurotransmitter derived from the essential nutrient choline. It’s known for memory, learning, and protecting the brain from symptoms of aging.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 text-center assess-third">
                            <div className=" assessment-inner">
                                <a href={baseURL + "/ingredients"}><img className="img-responsive" src={baseURL + "/static/images/brown.jpg"} /></a>
                                <h3>Vitamins & Adaptogens</h3>
                                <p>We’ve concentrated various amino acids, vitamins, and plant-based adaptogens that protect the brain from toxins, fatigue, and stress, while promoting memory and learning.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        
            <section className="home-slider-bg">
				<div className="container">
					<div className="">
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
									<li data-target="#quote-carousel" data-slide-to="4"></li>
								</ol>

								<div className="carousel-inner">
									{testimonials.map(function(name, index) {
										if(index == 0) {
											return <div className="item active">
												
													<div className='col-offset-md-1 col-md-9 result-slider'>
														<div className="row">
															<div className="col-sm-6 text-center mob-slider">
																<img className="img-responsive" src={name.images} />
															</div>
															<div className="col-sm-6 specific-formula-title">
																<h1><a href={baseURL + "/stories/" + name.id}>{renderHTML(name.title)}</a></h1>
																<p>{renderHTML(name.description)}</p>
															</div>
															<div className="col-sm-6 text-center desktop-slider">
																<img className="img-responsive" src={name.images} />
															</div>
														</div>
													</div>
												
											</div>
										} else {
												return <div className="item">													
														<div className='col-offset-md-1 col-md-9 result-slider'>
															<div className="row">
																<div className="col-sm-6 text-center mob-slider">
																	<img className="img-responsive" src={name.images} />
																</div>
																<div className="col-sm-6 specific-formula-title">
																	<h1><a href={baseURL + "/stories/" + name.id}>{renderHTML(name.title)}</a></h1>
																	<p>{renderHTML(name.description)}</p>
																</div>
																<div className="col-sm-6 text-center desktop-slider">
																	<img className="img-responsive" src={name.images} />
																</div>
															</div>
														</div>													
												</div>
											}											
										})}
								</div>
								<a data-slide="prev" href="#quote-carousel" className="left carousel-control"><img className="img-responsive" src={baseURL + "/static/images/team-slider-leftarrow.png"} /></a>
								<a data-slide="next" href="#quote-carousel" className="right carousel-control"><img className="img-responsive" src={baseURL + "/static/images/team-slider-rightarrow.png"} /></a>
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
                                <h2>Take the Quiz</h2>
                                <div className="find-btn mian-header-title">
                                    {productResultID ?
										(<a href={"result?results=" + productResultID}><button type="button" className="btn btn-primary">{linkName}</button></a>)
										:
										(<a href={"quiz"}><button type="button" className="btn btn-primary">{linkName}</button></a>)
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