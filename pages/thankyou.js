import React, { Component } from 'react';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import JScookie from 'js-cookie';

// Live
var baseURL = process.env.BASEURL;

export default class extends Component {
	
	constructor(props, context) {
		super(props, context);
		this.state = { orderID: ''}
    }
	
	componentDidMount() {
		JScookie.remove('productResultID', { path: '' }); // removed!
		JScookie.remove('productSKU', { path: '' }); // removed!
		JScookie.remove('CheckoutType', { path: '' }); // removed!
		JScookie.remove('score', { path: '' }); // removed!
		JScookie.remove('goals', { path: '' }); // removed!
		JScookie.remove('productResultQuery', { path: '' }); // removed!
		
		console.log("orderID: ", JScookie.get('order_id'));
		if(typeof JScookie.get('order_id') == 'undefined') {
			Router.push('/');
		} else {
				this.setState({orderID: JScookie.get('order_id')});
			}
	}
	
  render() {
	  const {orderID} = this.state; 
	return (
		<div class="thankyou-page">
			<Header title="Thank you - Get my formula" />
			<div className="product-page">
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
							<div className="col-lg-12">
								<div className="main-heading-delivery">
									<h2>Thank you for your order, your order ID is {orderID}</h2>
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