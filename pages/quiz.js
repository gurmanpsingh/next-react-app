import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import Router from 'next/router';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import $ from  '../node_modules/jquery/dist/jquery.min.js';
import JScookie from 'js-cookie';

// Live
var baseURL = process.env.BASEURL;

export default class extends Component {

	constructor(props, context) {
		super(props, context);
    }
	
	render() {
		return (
			<div>
				<Header title="Quiz - Get my formula" />
				<div className="quiz-page">
					<iframe id="typeform-full" width="100%" height="100%" frameborder="0" src="https://myformula.typeform.com/to/QdLKSz"></iframe> <script type="text/javascript" src="https://embed.typeform.com/embed.js"></script>
				</div>
			</div>
		)
	}
}