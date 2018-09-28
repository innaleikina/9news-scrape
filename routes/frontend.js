var db = require("../models");

module.exports = function (app) {
  //renders index.handlebars on the home page
  app.get("/", function (req, res) {
    res.render("index");
  });


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