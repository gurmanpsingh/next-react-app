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
			<Header title="Privacy - Get my formula" />
			<div className="science-page privacy-page">
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
                                    <h1>Privacy Policy</h1>
                                    <h3>PRIVACY POLICY – REVISED AS OF July 29, 2017</h3>
                                </div>
                                <div className="privancy-text-inner">
                                    <p>The purpose of this Privacy Policy (“Policy”) is to inform you about what information may be collected from you when visiting Outliers Inc, (“Company”) Websites (“Sites”), how such information will be used, with whom such information may be shared, your ability to edit, update, correct or delete such information and the security procedures that we have implemented to protect your privacy.</p>
      
                                    <p>The Company respects the privacy needs of our customers. How the Company handles any personal information, such as your name, address, email address or phone number (“Personal Information”) that you provide is important to us. The Company respects your privacy in handling Personal Information relating to you and your transactions with us. This Policy describes the Personal Information the Company gathers about you, what the Company does with it, the safeguards the Company has in place to protect it, and how you can control our use of it. By using the Sites, the user agrees, without limitation or qualification, to be bound by this Policy. When you provide Personal Information on our Sites or to our Customer Care department, you are consenting to the manner in which the Company will collect, use, disclose and otherwise manage your Personal Information, as set forth below.</p>
      
                                    <h3>COLLECTION & USE OF INFORMATION</h3>
      
                                    <p>When visiting our Sites, you may be asked for certain types of Personal Information (e.g., your first and last name, mailing address, city, state, zip code, telephone number, e-mail address, credit card number, etc.). This Personal Information allows us to administer our business, better provide products and services to you, communicate offers on products that may be of interest to you, and to fulfill your order. You may volunteer to disclose Personal Information to us. If you do not want to disclose your Personal Information to us, please do not submit it. The Company may also collect non-personal information from you when you visit the Sites (e.g., your IP address, browser type, domain name, etc.). Be advised that all activity and IP address information is to be monitored and that this information may be used in a civil and/or criminal cases(s) against a client if there is fraudulent use and/or theft of services.</p>
                                    
                                    <p>As noted above, the Company uses the Personal Information that is collected about you for a variety of purposes, such as confirming and fulfilling your order, adding you to our e-mail subscription list, analyzing trends and statistics, improving the operation of the Sites, sending informational and promotional materials, and to help us design and enhance our products and service offerings so that we may provide you with quality products and to ensure your complete satisfaction. The Company may disclose the Personal Information that we collect about you when we have reason to believe that it is necessary to identify, contact or bring legal action against persons or entities that may be causing injury to you, to us or to others. We may also disclose the Personal Information to assist in compliance with certain laws and regulations.</p>
      
                                    <h3>INFORMATION RETENTION</h3>
      
                                    <p>The Company retains your information as long as it is required for the purposes identified when you provided the information, or for any new purposes identified by the Company and consented to by you, and for any appropriate time thereafter including a sufficient time following to permit you to ask any questions regarding its use. Certain information is retained for longer periods for our internal audit and quality control purposes.</p>
      
                                    <h3>THIRD-PARTY VENDORS</h3>
      
                                    <p>The Company maintains existing business relationships and may develop other relationships in the future with certain parties (“Vendors”). In these instances, the Company may share or otherwise allow partial access to the Personal Information that is collected that will enable Vendors to contact you regarding your order. The Company may contract Vendors to perform functions on our behalf. Examples may include fulfilling orders, delivering packages, e-mail administrative functions, processing credit card payments, administering chargeback representations and providing customer service. These Vendors are under contractual obligation to use confidential data only for those purposes for which they are contracted to provide.</p>
                                  <h3>THIRD-PARTY WEBSITES</h3>
                                  <p>Our Sites may contain links to other third-party websites, which may have Privacy Policies/Statements that differ from our own. We are not responsible for the activities and practices that take place on these websites. Accordingly, we recommend that you review the Privacy Policy/Statement posted on any website that you may access through our Sites.</p>
      
                                  <h3>UNFORESEEN CIRCUMSTANCES</h3>
      
                                  <p>In the event that the Company, or any of its assets are acquired by a third-party, Personal Information acquired by us may be one of the assets transferred.</p>
      
                                  <h3>COOKIES</h3>
      
                                  <p>Our Sites use a technology called “cookies”. A cookie is a tiny element of data that our Sites can send to your browser, which may then be stored on your hard drive so we can recognize you when you return. All pages on our Sites where you are prompted to log in or that are customizable require that you accept cookies. If you have registered with our Sites, these cookies (1) may let us know who you are, (2) are necessary to access your account information (stored on our computers) in order to deliver products and personalized services, and (3) will provide us and our affiliate members with information that we will use to personalize our Sites in accordance with your preferences. Cookies are also required to optimize your shopping experience in that they allow you to add multiple items to your order before completing your transaction. You may set your Web browser to notify you when you receive a cookie. However, should you decide not to accept cookies from our Sites, you will limit the functionality we can provide when you visit our Sites.</p>
      
                                <h3>SECURITY</h3>
      
                                <p>Our Company maintains physical, electronic, and procedural safeguards to protect the Personal Information you provide to us.</p>
                                
                                <h3>CALL CENTERS</h3>
      
                                <p>When you call one of our call centers about a product, delivery, billing question or for customer service, you may be asked for Personal Information that identifies you, along with additional information we need to help us promptly answer your question, such as your name, address, email address and a phone number where we might contact you. By completing or submitting a registration form or partial registration form you are consenting to receive SMS, wireless or other mobile offerings to your cellular phone. We may retain this information to assist you in the future.</p>
                              <h3>ACCESS OR CORRECTIONS TO YOUR INFORMATION</h3>
                              <p>If you identify any inaccuracy in your Personal Information, or you need to make a change or would like to verify such information, please contact our customer care department at 1 (646) 647-3599.</p>
                              <h3>SECURITY</h3>
                              <p>When you place orders on our Sites, all of your order information, including your card number and delivery address, is transmitted through the Internet using Secure Sockets Layer (SSL) technology. SSL technology causes your browser to encrypt your order information before transmitting it to our secure server. SSL technology, an industry standard, is designed to prevent someone other than operators of our Sites from capturing and viewing your Personal Information. While we strive to protect your Personal Information, we cannot guarantee or warrant its complete security. No data transmission over the internet can be guaranteed to be 100% secure. We shall not be responsible for harm that you or any person may suffer as a result of a breach of confidentiality in respect to your use of our Sites or any information you transmit to our Sites.</p>
                              <h3>CHILDREN’S ONLINE PRIVACY PROTECTION</h3>
                              <p>The Company serves general users of the World Wide Web. We do not knowingly collect information from children under the age of 13, nor do we share such information with third parties. Children under the age of 18 may use the Sites only with the involvement of a parent or guardian.</p>
                              <h3>MODIFICATIONS TO POLICY</h3>
                              <p>We reserve the right to change this Policy, along with any related provisions, at any time. Any changes to this Policy will be effective immediately. Be sure to review the Policy periodically to ensure familiarity with its most current version. You can easily confirm whether any revisions have been posted since your last visit by checking the date on which the Policy was last revised, which is set forth at the top of this Policy. If you object to such changes, we will honor our prior privacy policies as to any data previously collected. If you disagree with the changes in our policy, however, please do not use the Sites after the posting of such changes online. By using the Sites following the posting of changes to this Policy, you agree to all such changes.</p>
                              <h3>DO NOT TRACK</h3>
                              <p>Outliers Inc. does not track its customers over time and across third party websites to provide targeted advertising and therefore does not respond to Do Not Track (DNT) signals. However, some third party sites do keep track of your browsing activities when they serve you content, which enables them to tailor what they present to you. If you are visiting such sites, your web browser may allow you to set the DNT signal so that third parties (particularly advertisers) know you do not want to be tracked.</p>
                            <p>Third parties that have content embedded on Outliers Inc.’s websites such as segment.com or google.com/analytics/ may set cookies on a user’s browser and/or obtain information about the fact that a web browser visited a specific Outliers Inc. website from a certain IP address. Third parties cannot collect any other personally identifiable information from Outliers Inc.’s websites unless you provide it to them directly.</p>
                              <h3>QUESTIONS OR COMMENTS OR TO CONTACT US</h3>
                              <p>If you have questions or comments about this Policy, or you wish to confirm or make changes to information about you, please contact the customer care department at 1 (646) 647-3599.</p>
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