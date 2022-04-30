const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
require('dotenv').config();
const PORT = process.env.PORT || 80
const dev = process.env.NODE_DEV !== 'production' //true false
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler() //part of next config
var compression = require('compression')


// fetch credentials from environment variables
var BASEURL = process.env.BASEURL;

// express code here
const app = express();

var limelight  = require('./routes/limelightapi');
var contentful = require('./routes/contentfulapi');

nextApp.prepare().then(() => {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
	
	// compress all responses
	app.use(compression());
	
    app.use('/api', limelight);
    app.use('/capi', contentful);
   
    app.get('/product/:id', (req, res) => {
      return nextApp.render(req, res, '/product', req.params.id)
    })
	
	app.get('/stories/:id', (req, res) => {
      return nextApp.render(req, res, '/stories', req.params.id)
    })
	
	app.get('/ingredient/:id', (req, res) => {
      return nextApp.render(req, res, '/ingredient', req.params.id)
    })
	
	app.get('/redirect/:id', (req, res) => {
      return nextApp.render(req, res, '/redirect', req.params.id)
    })
	
	app.get('/result/:id', (req, res) => {
      return nextApp.render(req, res, '/result', req.params.id)
    })
   
	app.get('*', (req, res) => {
        return handle(req, res) // for all the react stuff
    });
	
    app.listen(PORT, err => {
        if (err) throw err;
        console.log(`Site is live at ${BASEURL}`)
    });
});
