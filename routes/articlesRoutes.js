var db = require("../models");

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
  app.get("/favorites", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({
        saved: true
      })
      .then(function (savedArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(savedArticle);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });


  //=========================
  //SAVE NOTES TO FAVORITE ARTICLE
  //=========================
  app.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    console.log("req body is " + req.body)
    db.Note.create(req.body)
      .then(function(dbNote) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
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