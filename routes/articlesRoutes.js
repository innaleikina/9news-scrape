// var db = require("../models");
var path = require("path");



// var db = require("../models");

var db =  require(path.join( __dirname + '/../app/models'));

module.exports = function (app) {
//=========================
  //ARTICLES ROUTE
  //=========================
  //retrieve articles from the database to make my own API
  app.get("/articles", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function (dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });


    //=========================
  //FAVORITES ROUTE
  //=========================
  app.get("/saved", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({
        saved: true
      })
      .populate("note")
      .then(function (dbArticle) {
        res.render("saved", {
          articles: dbArticle
        })
      })
      .catch(function (err) {
        res.json(err);
      })
  })



  //=========================
  //SAVE NOTES TO FAVORITE ARTICLE
  //=========================
  app.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    //console.log("req body is " + req.body)
    db.Note.create(req.body)
      .then(function(dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { note: dbNote._id }}, { new: true });
      })
      .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });


  //=========================
  //DISPLAY NOTES ON FAVORITE ARTICLE
  //=========================
  app.get("/articles/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      .populate("note")
      .then(function(dbArticle) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbArticle);
       // console.log(dbArticle)
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
  



  //=========================
  //LOAD ONLY ARTICLES THAT AREN'T FAVORITES ROUTE
  //=========================
  //retrieve articles from the database to make my own API
  app.get("/noneFaveArticles", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({
      saved:false
    })
      .then(function (dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
};