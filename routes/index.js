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
	res.render('index', {title: "Financial Planner", message: "let's get our finances under control ;)"});
});
router.post('/add', function(req, res, next) {
	res.redirect('/');
});

module.exports = router;