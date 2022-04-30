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
		this.state = {linkName: '', productResultID: ''}
    }
	
	static async getInitialProps() {
		// res is assigned the response once the axios
        // async get is completed
        const res = await axios.get(baseURL + '/capi/getIngredients');
        
		console.log("\n\nRESPONSE========== ", JSON.stringify(res.data));
		
		// Return properties
        return {ingredients: res.data}
	}
	
	componentWillMount() {
		this.setState({
			ingredients: this.props.ingredients
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
	const { ingredients } = this.state;
	const {linkName} = this.state;
	const {productResultID} = this.state;
	return (
		<div>
			<Header title="Main Ingredients - Get my formula" />
			<div className="ingredients-page">
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
					<div className="ingredient-bg">
						<div className="container-ingredient">
							<div className="ingredient-inner">
								<h2>Ingredients with purpose</h2>
								<p>Based on proven science and meticulous testing, we thoughtfully select our ingredients from three uniquely effective categories.</p>
							</div>
						</div>
					</div>
				</section>
				<section>
				{ingredients.map(function(name, index) {
					return <div className="container-ingredient racetams-inner1">
						<div className="ingredients">
							<div className="racetams-border">
								<div className="racetams">
									<h2>{name.ingredientsCategory1}</h2>
									<p>{name.ingredientsCategory1description}</p>
								</div>
							</div>
							<div className="col-md-12 ingredient1">								
							{name.racetamsPeptidesImages.map(function(key, index) {
								return <div className="col-md-4 col-sm-4 name-row"><a href={baseURL + "/ingredient/" + key.sourceID}>{renderHTML(key.image)}</a></div>
							})}
							</div>
						</div>
						<div className="ingredients">
							<div className="racetams-border">
								<div className="racetams">
									<h2>{name.ingredientsCategory2}</h2>
									<p>{name.ingredientsCategory2description}</p>
								</div>
							</div>
							<div className="col-md-12 ingredient1">								
							{name.cholineSourcesImages.map(function(key, index) {
								return <div className="col-md-4 col-sm-4 name-row"><a href={baseURL + "/ingredient/" + key.sourceID}>{renderHTML(key.image)}</a></div>
							})}
							</div>
						</div>
						<div className="ingredients">
							<div className="racetams-border">
								<div className="racetams">
									<h2>{name.ingredientsCategory3}</h2>
									<p>{name.ingredientsCategory3description}</p>
								</div>
							</div>
							<div className="col-md-12 ingredient1">								
							{name.vitaminsAminoAcidsImages.map(function(key, index) {
								return <div className="col-md-4 col-sm-4 name-row"><a href={baseURL + "/ingredient/" + key.sourceID}>{renderHTML(key.image)}</a></div>
							})}
							</div>
						</div>
					</div>
				})}
				</section>
				<section className="ingredient-accordion">
					<div className="container-ingredient">				
						<div className="accordion-container">
							{ingredients.map(function(name, index) {
								return <div>
								<div className="set">
									<a class="active" href="javascript:void(0);">
										<div className="racetams">
											<h2>{name.ingredientsCategory1}</h2>
											<p>{name.ingredientsCategory1description}</p>
										</div>
										<i className="fa fa-angle-down"></i>
									</a>
									<div className="content">
										<div className="row">
											<div className="col-md-12 ingredient1">
												<div className="row">
													<div className="col-md-4 col-sm-4 name-row1">
														{name.racetamsPeptidesImages.map(function(key, index) {
															return <div className="ingredient-name"><a href={baseURL + "/ingredient/" + key.sourceID}>{renderHTML(key.image)}</a></div>
														})}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								
								<div className="set">
									<a class="active" href="javascript:void(0);">
										<div className="racetams">
											<h2>{name.ingredientsCategory2}</h2>
											<p>{name.ingredientsCategory2description}</p>
										</div>
										<i className="fa fa-angle-down"></i>
									</a>
									<div className="content">
										<div className="row">
											<div className="col-md-4 col-sm-4 name-row1">
												<div className="col-md-4 col-sm-4 name-row1">
													{name.cholineSourcesImages.map(function(key, index) {
														return <div className="ingredient-name"><a href={baseURL + "/ingredient/" + key.sourceID}>{renderHTML(key.image)}</a></div>
													})}													
												</div>
											</div>
										</div>
									</div>
								</div>
								
								<div className="set">
									<a class="active" href="javascript:void(0);">
										<div className="racetams">
											<h2>{name.ingredientsCategory3}</h2>
											<p>{name.ingredientsCategory3description}</p>
										</div>
										<i className="fa fa-angle-down"></i>
									</a>
									<div className="content">
										<div className="row">
											<div className="col-md-4 col-sm-4 name-row1">
												<div className="col-md-4 col-sm-4 name-row1">
														{name.vitaminsAminoAcidsImages.map(function(key, index) {
															return <div className="ingredient-name"><a href={baseURL + "/ingredient/" + key.sourceID}>{renderHTML(key.image)}</a></div>
														})}
													</div>
											</div>
										</div>
									</div>
								</div>
								</div>
							})}
						</div>
					</div>
				</section>
				<section>
					<div className="Get-starter-bluestrip Get-starter-row">
						<div className="container">
							<div className="Get-starter-heading">
								<h2>Ready to try it out?</h2>								
								{productResultID ?
									(<a href={baseURL + "/result?results=" + productResultID}><button type="button" className="btn btn-primary kitbuy-btn">{linkName}</button></a>)
									:
									(<a href={"quiz"}><button type="button" className="btn btn-primary kitbuy-btn">{linkName}</button></a>)
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