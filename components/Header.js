import React from 'react'
import NextHead from 'next/head'
import { string } from 'prop-types'

const defaultDescription = ''
const defaultOGURL = ''
const defaultOGImage = ''

// Live
var baseURL = process.env.BASEURL;

const Header = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || ''}</title>
    <meta
      name="description"
      content={props.description || defaultDescription}
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

	<link rel="apple-touch-icon" sizes="60x60" href={baseURL + "/static/favicons/apple-touch-icon.png"} />
	<link rel="icon" type="image/png" sizes="32x32" href={baseURL + "/static/favicons/favicon-32x32.png"} />
	<link rel="icon" type="image/png" sizes="16x16" href={baseURL + "/static/favicons/favicon-16x16.png"} />
	<link rel="manifest" href={baseURL + "/static/favicons/site.webmanifest"} />
	<link rel="mask-icon" href={baseURL + "/static/favicons/safari-pinned-tab.svg"} color="#5bbad5" />
	<meta name="msapplication-TileColor" content="#da532c" />
	<meta name="theme-color" content="#ffffff" />

    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta property="og:title" content={props.title || ''} />
    <meta
      property="og:description"
      content={props.description || defaultDescription}
    />
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
	
	<link rel="stylesheet" href={baseURL + "/static/css/bootstrap.min.css"} />
	<link rel="stylesheet" href={baseURL + "/static/css/font-awesome.min.css"} />
	<link rel="stylesheet" href={baseURL + "/static/css/checkout-page-style.css"} />
	<link rel="stylesheet" href={baseURL + "/static/css/owl.carousel.min.css"} />
	<link rel="stylesheet" href={baseURL + "/static/css/product-page.css"} />
	<link rel="stylesheet" href={baseURL + "/static/css/common-style.css"} />
    <link rel="stylesheet" href={baseURL + "/static/css/common-responsive.css"} />
	<link rel="stylesheet" href={baseURL + "/static/css/checkout-page-responsive.css"} />
	<link rel="stylesheet" href={baseURL + "/static/css/landing-page-responsive.css"} />
	
	<script src={baseURL + "/static/js/jquery.min.js"}></script>
	<script src={baseURL + "/static/js/accordion.js"}></script>
    <script src={baseURL + "/static/js/bootstrap.min.js"}></script>
    <script src={baseURL + "/static/js/carousel.min.js"}></script>
    <script src={baseURL + "/static/js/product-slider.js"}></script>
    <script src={baseURL + "/static/js/common-jQuery.js"}></script>
  </NextHead>
)

Header.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
}

export default Header
