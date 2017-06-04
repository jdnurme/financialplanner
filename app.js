var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var routes = require('./routes/index');
var mongoose = require("mongoose");


mongoose.connect('mongodb://localhost/finances');
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test');


var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// associate html files with handlebars templating
app.set('views', path.join(__dirname, 'views'));
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({defaultLayout: 'single', extname: '.hbs'}));
app.set('view engine', '.hbs');


// set up a secret to encrypt cookies
app.use(session({
  secret: 'finances', 
  resave: true,
  saveUninitialized: true
}));

app.use('/', routes);
app.use(express.static('views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
	res.status(404).send("Sorry this page does not exist");
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send("Sorry something is broken, please check the console or come back again later")
})

app.listen(process.env.PORT || 8000, function() {
  console.log("Listening on port 8000");
});
