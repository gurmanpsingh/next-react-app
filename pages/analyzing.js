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

	componentDidMount() {
		var queryURL = this.props.url.query;
		//console.log("queryURL : ", JSON.stringify(queryURL));
		//console.log("calTotalScores : ", calTotalScores);
		JScookie.set('score', queryURL.score, { expires: 15, path: '/' });
		JScookie.set('goals', queryURL.goals, { expires: 15, path: '/' });
		
		var scores = GetParameterValues('score') || JScookie.get('score');
        function GetParameterValues(param) {
            var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < url.length; i++) {  
                var urlparam = url[i].split('=');  
                if (urlparam[0] == param) {  
                    return urlparam[1];  
                }  
            }  
        }
		
		var goalValues = getGoalValues() || {
							'ENERGY' : 6,
							'MOOD' : 7,
							'FOCUS' : 5,
							'MEMORY' : 8,
							'MOTIVATION' : 6,
							'SLEEP' : 8
						};

		function calculateScores(goalValues) {
			var totalScore = Object.keys(goalValues).reduce(function(total, goal) {
				return total + goalValues[ goal ];
			}, 0);
			return totalScore;
		}

		function getGoalValues() {

			if (scores) {				
				var arrScores = [];
				for (var i = 0; i < scores.length; i += 2) {
					var score = scores.substring(i, i + 2);
					arrScores.push(score);
				}
				
				if (arrScores.length) {
					return {
						'SLEEP' 	 : Math.floor(arrScores[ 0 ]/10),
						'ENERGY' 	 : Math.floor(arrScores[ 1 ]/10),
						'FOCUS' 	 : Math.floor(arrScores[ 2 ]/10),
						'MOTIVATION' : Math.floor(arrScores[ 3 ]/10),
						'MOOD'		 : Math.floor(arrScores[ 4 ]/10),
						'MEMORY' 	 : Math.floor(arrScores[ 5 ]/10)
					};
				}
			}
		}

		var calTotalScores = calculateScores(goalValues);
        scheduleRedirect(6000);

		/*------ Redirect page */
		function scheduleRedirect(delay) {
          setTimeout(function() {
			console.log("queryURL : ", queryURL.caffeine_fx);
			console.log('totalScore ', calTotalScores); 
			
			var nervous = queryURL.caffeine_fx.indexOf("Nervous");
			console.log("nervous: ", nervous);
			var url    = window.location.search.toString();
			
			//If caffeine_fx does not contain nervous
			if(nervous == -1 && calTotalScores < 25) {
				JScookie.set('productResultID', 1, { expires: 15, path: '/' });
				var newUrl = url.replace("results=1", "results=1");
			} else if(nervous == -1 && (calTotalScores > 25 && calTotalScores < 28)) {
			console.log("here y");
				JScookie.set('productResultID', 2, { expires: 15, path: '/' });
				var newUrl = url.replace("results=1", "results=2");				
			} else if(nervous == -1 && (calTotalScores > 28 && calTotalScores < 31)) {
				JScookie.set('productResultID', 3, { expires: 15, path: '/' });
				var newUrl = url.replace("results=1", "results=3");
			} else if(nervous == -1 && (calTotalScores > 32 && calTotalScores < 35)) {
				JScookie.set('productResultID', 4, { expires: 15, path: '/' });
				var newUrl = url.replace("results=1", "results=4");
			} else if(nervous == -1 && ( calTotalScores > 35)) {
				JScookie.set('productResultID', 5, { expires: 15, path: '/' });
				var newUrl = url.replace("results=1", "results=5");			
			} 
			
			//If caffeine_fx does contain nervous
			if(nervous != -1 && calTotalScores < 25) {
				JScookie.set('productResultID', 6, { expires: 15, path: '/' });
				var newUrl = url.replace("results=1", "results=6");
			} else if(nervous != -1 && (calTotalScores > 25 && calTotalScores < 28)) {
				JScookie.set('productResultID', 7, { expires: 15, path: '/' });
				var newUrl = url.replace("results=1", "results=7");
			} else if(nervous != -1 && (calTotalScores > 28 && calTotalScores < 31)) {
				JScookie.set('productResultID', 8, { expires: 15, path: '/' });
				var newUrl = url.replace("results=1", "results=8");			
			} else if(nervous != -1 && (calTotalScores > 32 && calTotalScores < 35)) {
				JScookie.set('productResultID', 9, { expires: 15, path: '/' });				
				var newUrl = url.replace("results=1", "results=9");
			} else if(nervous != -1 && ( calTotalScores > 35)) {
				JScookie.set('productResultID', 10, { expires: 15, path: '/' });				
				var newUrl = url.replace("results=1", "results=10");
			}
			
			console.log('before window.location.search ', window.location.search); 			
			console.log('after window.location.search ', newUrl);
			JScookie.set('productResultQuery', JSON.stringify(newUrl), { expires: 15, path: '/' });
            location.href = '/result' + newUrl;
          }, delay);
        }

        function getMatchCount() {
          var sum = scores.split('').reduce(function(sum, digit) {
            return sum + parseInt(digit);
          }, 0);
          return sum ? sum * 7 : 741;
        }

        $('.loader-container-0 span').text(Math.floor((Date.now() - 1514764800000) / 3000).toLocaleString());
        $('.loader-container-1 span').text(getMatchCount().toLocaleString());

        var goals = getGoalValues();
        if (goals) {
          var $goals = $('.goals').empty();
          var improvements = Object.keys(goals).map(function(goal) {
            var score = goals[ goal ];
            return {
              'name' : goal,
              'value' : Math.round((90 - score)/2)
            };
          });
          improvements.sort(function(a, b) {
            return b.value - a.value;
          }).forEach(function(obj, index) {
            if (index < 3) {
              var goal = obj.name;
              var imp = obj.value;
              $('<div></div>').text(imp + '% ' + goal).appendTo($goals);
            }
          });
        }
		
		 var quotes = $(".loader-container");
		var quoteIndex = -1;
		function showNextQuote() {
			++quoteIndex;
			quotes.eq(quoteIndex % quotes.length)
				.fadeIn(2000)
				.delay(2000)
				.fadeOut(2000, showNextQuote);
		}

		showNextQuote(); 
		/*------ End Redirect page */
		
	}
	
	render() {
		return (
			<div>
				<Header title="Analyzing - Get my formula" />
				<div className="quiz-page">
					<div className="loader-container loader-container-0" style={{display: 'block'}}>
						<div className="status">Processing Your Response</div>
						<div className="quiz-heading">Our algorithm has analyzed</div>
						<div className="quiz-text"><span>13,715,725</span> data points</div>
					</div>
					<div className="loader-container loader-container-1" style={{display: 'none'}}>
						<div className="status">Generating Results</div>
						<div className="quiz-heading">We found <span>385</span> people</div>
						<div className="quiz-text">with similar responses to yours</div>
					</div>
					<div className="loader-container loader-container-2" style={{display: 'none'}}>
						<div class="status">Creating Your Starter Kit</div>
						<div>
							<div className="improved quiz-heading">They have improved</div>
							<div className="goals quiz-text"><div>19% ENERGY</div><div>17% FOCUS</div><div>14% SLEEP</div></div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}