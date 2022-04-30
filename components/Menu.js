import React, { Component } from 'react';
import { string } from 'prop-types'
import JScookie from 'js-cookie';

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
	}

render() {
	const {linkName} = this.state;
	const {productResultID} = this.state;
	return (
	<div>
		<div id="wrapper">
			<div id="sidebar-wrapper">
				<div className="main-menu-row">
					<div className="main-menu-inner">
						<ul>
							<li><a href="/">Home</a></li>
							{productResultID ?
								(<li><a href={baseURL + "/result?results=" + productResultID}>Buy Now</a></li>)
								:
								(<li><a href={baseURL + "/product/1"}>Buy Now</a></li>)
							}
							<li><a href={baseURL + "/ingredients"}>Ingredients</a></li>
							<li><a href={baseURL + "/science"}>Science</a></li>
							<li><a href={baseURL + "/stories"}>Stories</a></li>
							<li><a href={baseURL + "/faq"}>faq</a></li>
						</ul>
					</div>
				</div>
			</div>
		
		<div className="menu-fixed">
			<nav id="header" className="navbar navbar-fixed-top">
				<div id="header-container" className="container navbar-container">
					<div className="mobilelogo">
						<div className="mob-mainlogo1 svg-logo">
							<a href="/"><svg id="Layer_11" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 537.85 77.8"><title>Get My FORMULA</title><path className="cls-1" d="M97.93,105.28A38.76,38.76,0,1,0,136.55,144a38.62,38.62,0,0,0-38.62-38.76m0,60c-11.25,0-20.12-8.14-20.12-21.28s8.87-21.39,20.12-21.39S118.16,131,118.16,144s-8.87,21.28-20.23,21.28" transform="translate(0 -105)"/><path className="cls-1" d="M191.46,159c9.63-4.46,14.82-13,14.82-23.57,0-15.63-10.71-29.42-32.88-29.42H146.79v76h18.39V164.89h4.54c7,.22,8,2.06,13.52,10.64l4.22,6.51h20.66l-6-9.33c-4.76-7.28-7.79-11.41-10.71-13.68m-16.33-11.62h-9.95v-24h9.95c7.89,0,13.74,4.23,13.74,12,0,8.26-5.85,11.95-13.74,11.95" transform="translate(0 -105)"/><polygon className="cls-1" points="257.72 34.91 230.57 1.04 219.53 1.04 219.53 77.04 237.93 77.04 237.93 34.48 257.72 58.91 277.62 34.48 277.62 77.04 296.01 77.04 296.01 1.04 284.98 1.04 257.72 34.91"/><path className="cls-1" d="M353.81,150.12c0,13-7.35,15.21-12.22,15.21s-12.22-2.18-12.22-15.21V106H311v44.63c0,22.37,15.79,32.13,30.61,32.13S372.2,173,372.2,150.67V106H353.81Z" transform="translate(0 -105)"/><polygon className="cls-1" points="405.27 1.04 386.88 1.04 386.88 77.04 436.85 77.04 436.85 59.56 405.27 59.56 405.27 1.04"/><polygon className="cls-1" points="507.87 4.48 511.95 4.48 511.95 14.65 516.55 14.65 516.55 4.48 520.63 4.48 520.63 0 507.87 0 507.87 4.48"/><polygon className="cls-1" points="534.89 0 529.92 5.8 524.9 0 521.94 0 521.94 14.6 526.5 14.6 526.5 7.3 529.92 11.26 533.3 7.3 533.3 14.6 537.85 14.6 537.85 0 534.89 0"/><path className="cls-1" d="M485.72,105.45H473.3L443.07,182h15.31v0H500.1v0h15.44Zm-11.93,46.83,5.51-15.69,5.52,15.69,4.28,12.46H469.51Z" transform="translate(0 -105)"/><polygon className="cls-1" points="48.89 35.59 48.89 53.07 18.39 53.07 18.39 77.04 0 77.04 0 1.03 51.81 1.03 51.81 18.41 18.39 18.41 18.39 35.59 48.89 35.59"/></svg></a>
                            <h3 className="freeshipping">Free shipping on all orders in the US</h3>
						</div>
					</div>
					<div className="navbar-header">
						<button id="menu-toggle-rl" className="navbar-toggler navbar-toggle" data-toggle="collapse" data-target="#wrapper">
							<i></i><i></i><i></i>
						</button>
					</div>
					<div className="collapse navbar-collapse" id="navbar">
						<div className="main-menu-row">
							<div className="main-menu-inner">
								<ul>
									{productResultID ?
										(<li><a href={baseURL + "/result?results=" + productResultID}>Buy Now</a></li>)
										:
										(<li><a href={baseURL + "/product/1"}>Buy Now</a></li>)
									}
									<li><a href={baseURL + "/ingredients"}>Ingredients</a></li>
									<li><a href={baseURL + "/science"}>Science</a></li>
									<li className="main-header-logo">
										<div className="mainlogo1 svg-logo">
											<a href="/">
											<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 537.85 77.8"><title>Get My FORMULA</title><path className="cls-1" d="M97.93,105.28A38.76,38.76,0,1,0,136.55,144a38.62,38.62,0,0,0-38.62-38.76m0,60c-11.25,0-20.12-8.14-20.12-21.28s8.87-21.39,20.12-21.39S118.16,131,118.16,144s-8.87,21.28-20.23,21.28" transform="translate(0 -105)"/><path className="cls-1" d="M191.46,159c9.63-4.46,14.82-13,14.82-23.57,0-15.63-10.71-29.42-32.88-29.42H146.79v76h18.39V164.89h4.54c7,.22,8,2.06,13.52,10.64l4.22,6.51h20.66l-6-9.33c-4.76-7.28-7.79-11.41-10.71-13.68m-16.33-11.62h-9.95v-24h9.95c7.89,0,13.74,4.23,13.74,12,0,8.26-5.85,11.95-13.74,11.95" transform="translate(0 -105)"/><polygon className="cls-1" points="257.72 34.91 230.57 1.04 219.53 1.04 219.53 77.04 237.93 77.04 237.93 34.48 257.72 58.91 277.62 34.48 277.62 77.04 296.01 77.04 296.01 1.04 284.98 1.04 257.72 34.91"/><path className="cls-1" d="M353.81,150.12c0,13-7.35,15.21-12.22,15.21s-12.22-2.18-12.22-15.21V106H311v44.63c0,22.37,15.79,32.13,30.61,32.13S372.2,173,372.2,150.67V106H353.81Z" transform="translate(0 -105)"/><polygon className="cls-1" points="405.27 1.04 386.88 1.04 386.88 77.04 436.85 77.04 436.85 59.56 405.27 59.56 405.27 1.04"/><polygon className="cls-1" points="507.87 4.48 511.95 4.48 511.95 14.65 516.55 14.65 516.55 4.48 520.63 4.48 520.63 0 507.87 0 507.87 4.48"/><polygon className="cls-1" points="534.89 0 529.92 5.8 524.9 0 521.94 0 521.94 14.6 526.5 14.6 526.5 7.3 529.92 11.26 533.3 7.3 533.3 14.6 537.85 14.6 537.85 0 534.89 0"/><path className="cls-1" d="M485.72,105.45H473.3L443.07,182h15.31v0H500.1v0h15.44Zm-11.93,46.83,5.51-15.69,5.52,15.69,4.28,12.46H469.51Z" transform="translate(0 -105)"/><polygon className="cls-1" points="48.89 35.59 48.89 53.07 18.39 53.07 18.39 77.04 0 77.04 0 1.03 51.81 1.03 51.81 18.41 18.39 18.41 18.39 35.59 48.89 35.59"/></svg></a>
										</div>
									</li>
									<li><a href={baseURL + "/stories"}>Stories</a></li>
									<li><a href={baseURL + "/faq"}>faq</a></li>
									<li className="find-formula-btn">
									{productResultID ?
										(<a href={"result?results=" + productResultID}>{linkName}<i className="fa fa-angle-right"></i></a>)
										:
										(<a href={"quiz"}>{linkName}<i className="fa fa-angle-right"></i></a>)
									}
									</li>
                                    <h3 className="freeshipping1">Free shipping on all orders in the US</h3>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</div>
	</div>
    </div>
)}
}