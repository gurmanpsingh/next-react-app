const express = require('express')
const router = express.Router()
var request = require("request");
const contentful = require('contentful')
require('dotenv').config();
var marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: true,
  xhtml: false
});

// fetch credentials from environment variables
var SPACE_ID = process.env.SPACE_ID;
var ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: ACCESS_TOKEN
})

// Load all entries for a given Content Type from Contentful
function fetchEntriesForContentType(contentType) {
  return client.getEntries({
      content_type: contentType
    })
  .then((response) => response.items)
  .catch((error) => {
      console.error(error)
  })
}

// Load all entries for a given Content Type from Contentful
function fetchEntriesForContentTypeByOrder(contentType, orderBy) {
  return client.getEntries({
      content_type: contentType,
	  order: orderBy
    })
  .then((response) => response.items)
  .catch((error) => {
      console.error(error)
  })
}

// Load entry by ID from Contentful
function fetchEntryByID(entry_id) {
	return client.getEntry(entry_id)
	.then(function (response) { return response})
	.catch((error) => {
		console.error(error)
	})
}

// Load entry by ID with contentTYPE from Contentful
function fetchEntryBy(obj) {
	return client.getEntries(obj)
	.then(function (response) { return response})
	.catch((error) => {
		console.error(error)
	})
}

// Load content-type by ID from Contentful
function fetchContentTypeByID(content_id) {
	return client.getContentType(content_id)
	.then(function (response) { return response})
	.catch((error) => {
		console.error(error)
	})
}

/*-------------------------------------------------------*/
// Api to fetch the testimonials for HOME page
/*-------------------------------------------------------*/
router.get('/getTestimonials', (req, res) => {
	fetchEntriesForContentType('newTestimonials')
	  .then((entries) => {
		  var data = [];
		  entries.forEach((resField) => {
			data.push({
					id : resField.fields.permaLink,
					influencerName : resField.fields.influencerName,
					title : marked(resField.fields.title),
					description : marked(resField.fields.pullQuote),
					checkMarks : resField.fields.influencerHeroMedia.fields.checkMarks,
					images : resField.fields.influencerHeroMedia.fields.picture.fields.file.url
				});
			
	      //console.log("\n\nHEREdata======================", JSON.stringify(data))
		  })	  
		  res.json(data);
    });
});

/*-------------------------------------------------------*/
// Api to fetch the single story for HOME page
// traodmCaw86GCgyw0cueG
/*-------------------------------------------------------*/
router.get('/getStory/:id', (req, res) => {
	if(req.params.id) { var ID = req.params.id; }
	else { var ID = 'befitmac'; }
	
	var obj = {
		content_type: 'newTestimonials',
		'fields.permaLink[in]': ID,
		include: 10
	}
	
	var data = [];
	var achievementsArr = [];
	var goalsArr = [];
	var interestsArr = [];
	var formuaQuoteArr = [];
	var skuArr = [];
	var influencerSocialMediaArr = [];
	
	fetchEntryBy(obj)
	  .then((entries) => {		  
		  entries.items.forEach((entry, index) => {
			data.push({
				id: entry.fields.permaLink,
				title: entry.fields.title,
				pullQuote: marked(entry.fields.pullQuote),
				buyButtonText: entry.fields.buyButtonText,
				image: entry.fields.influencerHeroMedia.fields.picture.fields.file.url,
				checkMarks : entry.fields.influencerHeroMedia.fields.checkMarks,
				facts: marked(entry.fields.facts),
				achievements: entry.fields.achievements,
				goals: entry.fields.goals,
				interests: entry.fields.interests,
			});

			if('influencerName' in entry.fields) {
				data[index].influencerName = marked(entry.fields.influencerName)
			}
			
			entry.fields.bunldeSkUs.forEach((bsObj, skuKey) => {
				skuArr.push({
					productId: bsObj.fields.productId
				});
				data[index].skUs = skuArr;
			});
			
			entry.fields.formulaQuote.forEach((fqObj, key) => {
				formuaQuoteArr.push({
					formulaTitle: fqObj.fields.formulaTitle,
					descriptionQuote: fqObj.fields.descriptionQuote
				});
				data[index].formulaQuote = formuaQuoteArr;
			})
			
			entry.fields.influencerSocialMedia.forEach((ismObj, skuKey) => {
				influencerSocialMediaArr.push({
					socialMediaType: ismObj.fields.socialMediaType,
					socialmedialink: ismObj.fields.socialmedialink
				});
				data[index].influencerSocialMedia = influencerSocialMediaArr;
			});
			
			
			entry.fields.achievements.forEach((acObj, key) => {
			//console.log("API=====================: ", JSON.stringify(acObj));
				achievementsArr.push({
					category: acObj.fields.category,
					title: acObj.fields.title,
					icon: acObj.fields.icon.fields.file.url,
				});
				data[index].achievements = achievementsArr;
			})
			
			entry.fields.goals.forEach((glObj, key) => {
				goalsArr.push({
					category: glObj.fields.category,
					title: glObj.fields.title,
					icon: glObj.fields.icon.fields.file.url,
				});
				data[index].goals = goalsArr;
			})
			
			entry.fields.interests.forEach((inObj, key) => {
				interestsArr.push({
					category: inObj.fields.category,
					title: inObj.fields.title,
					icon: inObj.fields.icon.fields.file.url,
				});
				data[index].interests = interestsArr;
			})			
		  })	  
		  res.json(data);
    });
});

/*-------------------------------------------------------*/
// Api to fetch the single Ingredient
// 
/*-------------------------------------------------------*/
router.get('/getSingleIngredient/:id', (req, res) => {
	//console.log('PARAM=======================', req.params.id);
	var obj = {
		content_type: 'singleIngredient',
		'fields.permaLink[in]': req.params.id
	}
	fetchEntryBy(obj)
	  .then((entries) => {
		entries.items.forEach((entry, index) => {
			var data 	  = [];
			var studyData = [];
			data.push({
				resource: entry.fields.resource,
				name: entry.fields.name,
				shortDescription: marked(entry.fields.shortDescription),
				benefits: marked(entry.fields.benefits),
				benefitImageDes: marked(entry.fields.benefitImage[0].fields.description),
				benefitImage: entry.fields.benefitImage[0].fields.file.url,
				purity: marked(entry.fields.purity),
				summary: marked(entry.fields.summary),
				selectedCommunityExperience: marked(entry.fields.selectedCommunityExperience),
				studyReferences: entry.fields.ingredientsStudyReferences
			});
			
			if('ingredientsStudyReferences' in entry.fields) {
				entry.fields.ingredientsStudyReferences.forEach((studyEntry) => {
					var authorString = studyEntry.fields.authors.join(', ');
					studyData.push({
						studytitleID: studyEntry.sys.id,
						citationNumber: studyEntry.fields.citationNumber,
						studyTitle: marked(studyEntry.fields.studyTitle),
						description: marked(studyEntry.fields.description),
						authors: authorString
					});
					data[index].studyReferences = studyData;
				});
			}
			/* console.log("\n\nHEREdata======================", JSON.stringify(data)); */
			res.json(data);
		  });
    });
});

/*-------------------------------------------------------*/
// Api to fetch the faq for FAQ Page
/*-------------------------------------------------------*/
router.get('/getFaq', (req, res) => {
	fetchEntriesForContentTypeByOrder('faq', 'fields.order')
	  .then((entries) => {
		  var data = [];		  
		  entries.forEach((entry) => {
			data.push({
				categoryOrder: entry.fields.categoryOrder,
				faqCategory: entry.fields.faqCategory,
				question: entry.fields.question,
				answer: entry.fields.answers,
				order: entry.fields.order
			});
			//console.log("\n\nHERE======================", JSON.stringify(data))
		  });
		  res.json(data);
    });
});

/*-------------------------------------------------------*/
// Api to fetch the faq Categories for FAQ Page
/*-------------------------------------------------------*/
router.get('/getFaqCat', (req, res) => {
	fetchEntriesForContentTypeByOrder('faq', 'fields.categoryOrder')
	  .then((entries) => {
		  var data = [];		  
		  entries.forEach((entry) => {
			data.push({
				categoryOrder: entry.fields.categoryOrder,
				faqCategory: entry.fields.faqCategory
			});
			//console.log("\n\nHERE======================", JSON.stringify(data))
		  });
		  
		  var unique = {};
		  var distinct = [];
		  for( var i in data ){
		   if( typeof(unique[data[i].categoryOrder]) == "undefined"){
		     distinct.push({categoryOrder: data[i].categoryOrder, faqCategory: data[i].faqCategory});
		   }
		   unique[data[i].categoryOrder] = 0;
		  }
		  res.json(distinct);
    });
});

/*-------------------------------------------------------*/
// Api to fetch the product for PRODUCT Page
// 2rOZXtbid8caCDWL3R62Ij
/*-------------------------------------------------------*/
router.get('/getProduct/:id', (req, res) => {
	/* fetchEntryByID(req.params.id)
	  .then((entry) => {
		  var data = [];		  
		  data.push({
				title: entry.fields.title,
				feature: entry.fields.features,
				description: entry.fields.description
			});
	      //console.log("\n\nHERE======================", JSON.stringify(entry))
		  res.json(data);
	}); */
	
	var obj = {
		content_type: 'newProductPage',
		'fields.title[in]': req.params.id,
		include: 10
	}

	var data = [];
	var skUsArr = [];
	var benefitsArr = [];
	var faqArr = [];
	var resultstestimonialArr = [];
	var recommendedFormulasArr = [];
	
	fetchEntryBy(obj)
	  .then((entries) => {
		entries.items.forEach((entry, index) => {
			data.push({
				SKU: entry.fields.results.fields.skUs,
				resultstestimonial: entry.fields.resultstestimonial
			});

			entry.fields.results.fields.skUs.forEach((skuField, skuKey) => {
				/* skuField.fields.benefits.forEach((benEntry, benKey) => {
					benefitsArr[benKey] = benEntry.fields;
				}) */
				skUsArr.push({
					productId: skuField.fields.productId /* ,
					formulaName: skuField.fields.formulaName,
					science: skuField.fields.science,
					directions: skuField.fields.directions,
					ingredients: skuField.fields.ingredients,
					benefits : benefitsArr */
				})
				data[index].SKU = skUsArr;
			});
			
			entry.fields.results.fields.recommendedFormulas.forEach((recField, recKey) => {
				recField.fields.benefits.forEach((benEntry, benKey) => {
					benefitsArr[benKey] = benEntry.fields;
				})
				recommendedFormulasArr.push({
					productId: recField.fields.productId,
					formulaName: marked(recField.fields.formulaName),
					directions: marked(recField.fields.directions),
					science: marked(recField.fields.science),
					ingredients: marked(recField.fields.ingredients),
					benefits : benefitsArr
				})
				data[index].recommendedFormula = recommendedFormulasArr;
			});
			
			entry.fields.results.fields.resultstestimonial.forEach((resField, resInd) => {
				resultstestimonialArr.push({
					permaLink : resField.fields.permaLink,
					title : marked(resField.fields.title),
					pullQuote : marked(resField.fields.pullQuote),
					checkMarks : resField.fields.influencerHeroMedia.fields.checkMarks,
					influencerHeroMedia : resField.fields.influencerHeroMedia.fields.picture.fields.file.url
				});
				data[index].resultstestimonial = resultstestimonialArr;
			});
			
			entry.fields.faq.forEach((faqField, resInd) => {
				faqArr.push({
					faqCategory : faqField.fields.faqCategory,
					categoryOrder : faqField.fields.categoryOrder,
					question : marked(faqField.fields.question),
					answers : marked(faqField.fields.answers),
					order : faqField.fields.order
				});
				data[index].faq = faqArr;
			});
			//console.log("\nHERE======================", JSON.stringify(data)) 
		});
		res.json(data);
    });
});

/*-------------------------------------------------------*/
// Api to fetch the result for RESULT Page
// 41Opc5IYXxjnsAdHiED1h0
/*-------------------------------------------------------*/
router.get('/getResult/:id', (req, res) => {
	fetchEntryByID(req.params.id)
	  .then((entry) => {
		  var data = [];		  
		  data.push({
				fields: entry.fields
			});
	      //console.log("\n\nHERE======================", JSON.stringify(entry))
		  res.json(data);
	});
});

/*-------------------------------------------------------*/
// Api to fetch the ingrediant for INGREDIENTS Page
// 2XlCeGki4k3o9YHhGP37KO
/*-------------------------------------------------------*/
router.get('/loadAllIngredients', (req, res) => {
	fetchEntriesForContentType('singleIngredient')
	  .then((entries) => {
		  var data = [];
		  var studyData = [];
		  entries.forEach((entry, index) => {
			data.push({
				id: entry.sys.id,
				permaLink: entry.fields.permaLink,
				resource: entry.fields.resource,
				name: entry.fields.name,
				shortDescription: marked(entry.fields.shortDescription),
				benefits: marked(entry.fields.benefits),
				benefitImageDes: marked(entry.fields.benefitImage[0].fields.description),
				benefitImage: entry.fields.benefitImage[0].fields.file.url,
				purity: marked(entry.fields.purity),
				summary: marked(entry.fields.summary),
				selectedCommunityExperience: marked(entry.fields.selectedCommunityExperience),
				studyReferences: entry.fields.ingredientsStudyReferences
			});
			//console.log("\n\nHEREdata======================", JSON.stringify(entry.fields.benefitImage));
			
			/* if('ingredientsStudyReferences' in entry.fields) {
				entry.fields.ingredientsStudyReferences.forEach((studyEntry) => {
					var authorString = studyEntry.fields.authors.join(', ');
					
					studyData.push({
						studytitleID: studyEntry.sys.id,
						citationNumber: studyEntry.fields.citationNumber,
						studyTitle: marked(studyEntry.fields.studyTitle),
						description: marked(studyEntry.fields.description),
						authors: authorString
					});
					data[index].studyReferences = studyData;
				});
			} */			
		  });	  
		  res.json(data);
    });
});

/*-------------------------------------------------------*/
// Api to fetch the All Ingredients for MAIN INGREDIENTS page
/*-------------------------------------------------------*/
router.get('/getIngredients', (req, res) => {
	fetchEntriesForContentType('newMainIngredientsPage')
	  .then((entries) => {
		  var data = [];
		  var titleImage = '';
		  
		  entries.forEach((entry, index) => {
			var racetamsPeptidesArr = [];
			var cholineSourcesArr = [];
			var vitaminsAminoAcidsArr = [];

			data.push({
				ingredientsCategory1: entry.fields.ingredientsCategory1,
				ingredientsCategory1description: entry.fields.ingredientsCategory1description,
				racetamsPeptidesImages: entry.fields.racetamsPeptides,
				ingredientsCategory2: entry.fields.ingredientsCategory2,
				ingredientsCategory2description: entry.fields.ingredientsCategory2Description,
				cholineSourcesImages: entry.fields.cholineSources,
				ingredientsCategory3: entry.fields.ingredientsCategory3,
				ingredientsCategory3description: entry.fields.ingredientsCategory3Description,
				vitaminsAminoAcidsImages: entry.fields.vitaminsAminoAcids
			});

			entry.fields.racetamsPeptides.forEach((image, ind) => {
				titleImage = '<div className="ingredient-name"><img src="' + image.fields.benefitImage[0].fields.file.url + '" /><p><b>' + image.fields.benefitImage[0].fields.title + '</b></p></div>';
				racetamsPeptidesArr[ind] = {sourceID: image.fields.permaLink, image: titleImage};
				data[index].racetamsPeptidesImages = racetamsPeptidesArr
			});
			
			entry.fields.cholineSources.forEach((image, ind) => {
				titleImage = '<div className="ingredient-name"><img src="' + image.fields.benefitImage[0].fields.file.url + '" /><p><b>' + image.fields.benefitImage[0].fields.title + '</b></p></div>';
				cholineSourcesArr[ind] = {sourceID: image.fields.permaLink, image: titleImage};
				data[index].cholineSourcesImages = cholineSourcesArr
			});
			
			entry.fields.vitaminsAminoAcids.forEach((image, ind) => {
				//console.log("\n\nHERE======================", JSON.stringify(image.fields))
				titleImage = '<div className="ingredient-name"><img src="' + image.fields.benefitImage[0].fields.file.url + '" /><p><b>' + image.fields.benefitImage[0].fields.title + '</b></p></div>';
				vitaminsAminoAcidsArr[ind] = {sourceID: image.fields.permaLink, image: titleImage};
				data[index].vitaminsAminoAcidsImages = vitaminsAminoAcidsArr
			});
		  });
			//data.sort(compare);
			//data.sort((a,b) => (a.ingredientID > b.ingredientID) ? 1 : ((b.ingredientID > a.ingredientID) ? -1 : 0)); 
		  res.json(data);
    });
});

/*-------------------------------------------------------*/
// Api to fetch the All Ingredients for RESULT page
/*-------------------------------------------------------*/
router.get('/getResultPage/:id', (req, res) => {
	var obj = {
		content_type: 'newResultsPage',
		'fields.name[in]': req.params.id,
		include: 10
	}
	
	var data = [];
	var skUsArr = [];
	var recommendedFormulasArr = [];
	var resultstestimonialArr = [];
	var benefitsArr = [];
	var infArr = [];
	
	fetchEntryBy(obj)
	  .then((entries) => {
		entries.items.forEach((entry, index) => {
			data.push({
				SKU: entry.fields.skUs,
				recommendedFormulas: entry.fields.recommendedFormulas,
				resultstestimonial: entry.fields.resultstestimonial
			});

			entry.fields.skUs.forEach((skuField, skuKey) => {
				skUsArr[skuKey] = skuField.fields.productId;
				data[index].SKU = skUsArr;
			});
			
			entry.fields.recommendedFormulas.forEach((recField, recKey) => {
				recommendedFormulasArr[recKey] = recField.fields;
				recField.fields.benefits.forEach((benEntry, benKey) => {
					benefitsArr[benKey] = benEntry.fields;
				})
				recommendedFormulasArr[recKey].benefits = benefitsArr;
				benefitsArr = [];
				data[index].recommendedFormulas = recommendedFormulasArr;
			});
			
			entry.fields.resultstestimonial.forEach((resField, resInd) => {
				resultstestimonialArr.push({
					permaLink : resField.fields.permaLink,
					title : marked(resField.fields.title),
					pullQuote : marked(resField.fields.pullQuote),
					checkMarks : resField.fields.influencerHeroMedia.fields.checkMarks,
					influencerHeroMedia : resField.fields.influencerHeroMedia.fields.picture.fields.file.url
				});
				data[index].resultstestimonial = resultstestimonialArr;
			});
		});
		//console.log("\nHERE======================", JSON.stringify(data)) 
		res.json(data);
    });
});
/*-------------------------------------------------------*/
module.exports = router;