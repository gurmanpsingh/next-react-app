import React from 'react'
import { string } from 'prop-types'

// Live
var baseURL = process.env.BASEURL;

const Footer = props => (
	<section>
		<div className="home-footer">
			<div className="container">
				<div className="footer-inner footer-inner2">
					<div className="row">
                        <div className="col-md-3 col-sm-3">
                            <div className="footer-logo">
                                <img className="img-responsive" src={baseURL + "/static/images/main-logo.png"} />
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="learn-us-text">
                                <p className="connect-title"><b>LEARN</b></p>
                                <ul>
                                    <li><a href={baseURL + "/about"}>About us</a></li>
                                    <li><a href={baseURL + "/faq"}>Faq</a></li>
                                    <li><a href={baseURL + "/science"}>Science</a></li>
                                    <li><a href={baseURL + "/ingredients"}>Ingredients</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="connect-withus-text">
                                <p className="connect-title"><b>CONNECT</b></p>
                                <p>@FINDMYFORMULA</p>
                                <ul>
                                    <li><a target="_blank" href="https://www.facebook.com/findmyformula"><span><i className="fa fa-facebook-official" aria-hidden="true"></i></span></a></li>
                                    <li><a target="_blank" href="https://www.instagram.com/findmyformula/"><span><i className="fa fa-instagram" aria-hidden="true"></i></span></a></li>
                                    <li><a target="_blank" href="https://www.youtube.com/findmyformula"><span><i className="fa fa-youtube-square" aria-hidden="true"></i></span></a></li>
                                </ul> 
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="contect-withus-text">
                                <p className="connect-title"><b>CONTACT</b></p>
                                <p>1 (646) 647-3599</p>
                                <p><a href="mailto:hello@findmyformula.com" target="" rel="">HELLO@FINDMYFORMULA.COM</a></p>
                                <p>604 E 11th Street, 3rd Floor </p>
                                <p>New York, NY 10009</p>
                            </div>
                        </div>
                    </div>
					<div className="footer-statement-inner">
						<div className="footer-statement">
							<p>These statements have not been evaluated by the Food and Drug Administration. The products and information on this website are not intended to diagnose, treat, cure or prevent any disease. The information on this site is for educational purposes only and should not be considered medical advice. Please speak with an appropriate healthcare professional when evaluating any wellness related therapy. Please read the full <a href={baseURL + "/disclaimer"}>medical disclaimer</a> before taking any of the products offered on this site.
These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Formula is for adults aged 18 and older. If you are pregnant or undergoing treatment for a medical condition, please consult your physician before taking Formula. </p>
						</div>
						<div className="copy-right">
							<ul>
								<li><a href="javascript:void(0)">©2018 FORMULA ALL RIGHTS RESERVED</a></li>
								<li>|</li>
								<li><a href={baseURL + "/privacy"}>PRIVACY POLICY</a></li>
								<li>|</li>
								<li><a href={baseURL + "/terms"}>TERMS OF USE</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
    <script src={baseURL + "/static/js/placeboproof.cookie.2.1.4.js"}></script>
    <script src={baseURL + "/static/js/chart.bundle.min.2.1.4.js"}></script>
    <script src={baseURL + "/static/js/recommendations.js"}></script>
    <script src={baseURL + "/static/js/result-calculation.js"}></script>
	</section>
	
)

export default Footer
