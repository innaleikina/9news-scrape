var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
var exphbs = require("express-handlebars");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
// var axios = require("axios");
// var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to the Mongo DB

var databaseUri = "mongodb://localhost/homeworkScraper";

if(process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_UTI)
} else {
  mongoose.connect(databaseUri);
}

// mongoose.connect("mongodb://localhost/homeworkScraper", { useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', function(err){
  console.log("Mongoose err", err)
});

db.once('open', function(){
  console.log("Mongoose connection successful")
})

// Routes
require("./routes/frontend")(app);
require("./routes/backend")(app);
require("./routes/articlesRoutes")(app);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
