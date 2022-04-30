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
    }
	
  render() {
	return (
		<div>
			<Header title="Medical Disclaimer - Get my formula" />
			<div className="science-page medical-disclaimer-page">
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
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="main-medical-heading text-center">
                                    <h1>Medical Disclaimer</h1>
                                </div>
                                <div className="disclaimer-heading">
                                    <h2>Disclaimer</h2>
                                    <h3>PLEASE READ CAREFULLY</h3>
                                    <p>In order to participate in Outliers’ nootropics system, you must be at least 18 years of age and agree to the following Terms and Conditions.</p>
                                </div>
        
                                <div className="medical-qust">
                                    <h3>OUTLIERS DOES NOT PROVIDE MEDICAL ADVICE.  IF AT ANY TIME YOU EXPERIENCE A MEDICAL EMERGENCY, GO TO YOUR NEAREST EMERGENCY DEPARTMENT OR CALL 911 IMMEDIATELY.  DO NOT RELY ON THE PRODUCTS OR OUTLIERS TO TREAT OR DIAGNOSIS ANY EMERGENCY OR NON-EMERGENCY MEDICAL OR PSYCHIATRIC CONDITION.</h3>
        
                                     <p>You should consult your physician or other health care professional before using any vitamins, supplements, or research chemicals, particularly if you are pregnant, plan to become pregnant, are breast feeding, have a history of high blood pressure or heart disease, or if you have ever experienced chest pain, smoke, have high cholesterol, are obese, or have a health problem that could be made worse by a change in diet.</p>
        
                                    <p>All content and information included with products sold by Outliers (the “Products”), such as text, videos, graphics, images, information and all other materials (“Content”), is solely for general information and educational purposes, or to describe Outliers’ products and services, and is not complete or exhaustive.  The Content is not intended or implied to provide or substitute for medical, psychiatric, or other professional health care advice, be used to assess health conditions, or used or relied upon for diagnosis or treatment.  In addition, transmission of the Content is not intended to create, and receipt by you does not constitute, a physician-patient relationship with Outliers, its employees, agents, independent contractors, or anyone acting on behalf of Outliers.</p>
      
                                    <p>The Content does not take the place of instructions or advice from your doctor or other qualified health care professional, and may not necessarily take into account your individual health situation.  Always seek the advice of your physician or other qualified health care professional relating to any concerns you may have regarding symptoms, a medical condition, or the use of any Products.  Do not disregard professional medical advice or delay in seeking it because of any Content or information provided by or from Outliers, or received through the use of the Products or this trial.</p>
      
                                    <p>Outliers assumes no duty to correct or update the Content or to resolve or clarify any inconsistencies within the Content.  Outliers is not responsible for any misuses you may make of the Content.  Except as specifically stated in these Terms and Conditions, neither Outliers nor any of its directors, employees or other representatives will be liable for damages arising out of or in connection with the use of the Content.  This is a comprehensive limitation of liability that applies to all damages of any kind, including (without limitation) compensatory, direct, indirect or consequential damages, loss of data, income or profit, loss of or damage to property and claims of third parties.</p>
      
                                    <p>The statements made about the Products have not been evaluated by the Food and Drug Administration.  The Products are not intended to diagnose, treat, cure or prevent any condition or disease.  Outliers makes no endorsement or guarantee regarding the safety or efficacy of dietary supplements or research chemicals and shall be held harmless for any losses or damages that may result from their usage or application including, but not limited to, economic loss, injury, illness, or death.</p>
      
                                    <p>Outliers is not responsible for any misuse of the Products.  The recommended dosages are based off standards and Outliers does not guarantee a lack of side effects or interactions even below the recommended dosages.  By consuming the Products you are taking full liability for your body and actions.  Any dietary supplement(s) or research chemical(s) you purchase from Outliers and apply or use, you do so at your own risk.</p>
                                    
                                    <p>Phenylpiracetam, noopept, pramiracetam, oxiracetam and aniracetam are not vitamins, minerals, amino acids, herbs or other botanical, or dietary substances for use by man to supplement the diet by increasing the total dietary intake.</p>
      
                                    <p>Outliers reserves the right to change or update these Terms and Conditions, and to correct errors, inaccuracies, or omissions at any time without prior notice.  Accordingly, you should continually review the Terms and Conditions in order to ensure that you understand the terms to which you are agreeing.</p>
                                    
                                    <p>In no case shall Outliers, its directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the Products, or for any other claim related in any way to your use of the Products, including, but not limited to, any errors or omissions in any Content, or any loss or damage of any kind incurred as a result of the use of the Products.</p>
                                    <h2 className="disclaimer-heading">DISCLAIMER OF WARRANTIES</h2>
                                    <h3>RELIANCE ON ANY INFORMATION PROVIDED BY OUTLIERS, OUTLIERS’ EMPLOYEES, AGENTS, INDEPENDENT CONTRACTORS, OR OTHERS ACTING ON BEHALF OF OUTLIERS, IS SOLELY AT YOUR OWN RISK.  THE CONTENT IS PROVIDED AS IS OR AS AVAILABLE WITHOUT REPRESENTATION OR WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, AND NO WARRANTY OR GUARANTEE CONCERNING THE ACCURACY OF THE INFORMATION IS MADE.  ALL SUCH REPRESENTATIONS AND WARRANTIES ARE HEREBY DISCLAIMED, TO THE FULLEST EXTENT PERMITTED BY LAW, INCLUDING WITHOUT LIMITATION, THE IMPLIED WARRANTIES AND CONDITIONS OF MERCHANTABILITY, NON-INFRINGEMENT OF THIRD PARTIES’ RIGHTS, AND FITNESS FOR A PARTICULAR PURPOSE.</h3>
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