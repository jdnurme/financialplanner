var express = require('express');
var router = express.Router();
var session = require('express-session');
var Transaction = require("../models/transactions");

/**
 * get('/') renders the home page with all existing posts loaded
 *
 * @res-action - loads all posts
 * 	@succes: renders homepage with all posts
 *	@failure: renders error page with error message
*/
router.get('/', function(req, res, next) {
	var timeUnit = 30;
	//Grab Time Unit from filter parameters
	Transaction.getAllTransactions(function(err, info){
		res.render('index', {
			title: "Financial Planner",
			message: "let's get our finances under control ;)",
			items: info
			});

	})
});
router.post('/add', function(req, res, next) {
	var cost = req.body.cost;
	var tag = req.body.tag;
	var item = req.body.item;
	Transaction.inputItem(cost, tag, item, function(err){
		if (err){
			res.send(err);
		}
		else{
			res.redirect('/');
		}
	})
});

module.exports = router;