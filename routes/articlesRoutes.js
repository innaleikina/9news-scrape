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
    //SAVE TO FAVORITES ROUTE
    //=========================
    // Mark a book as having been read
    app.get("/markFavorite/:id", function (req, res) {
      var query = {
          _id: req.params.id
      };
      var update = {
          saved: true
      };
      var options = {
          new: true
      };
      db.Article.findOneAndUpdate(query, update, options, function (err, doc) {
          if (err) {
              console.log(err)
          } else {
              console.log(doc.saved);
          }
      });
  });

  //=========================
    //DELETE FROM FAVORITES ROUTE
    //=========================
    // Mark a book as having been read
    app.get("/removeFavorite/:id", function (req, res) {
      var query = {
          _id: req.params.id
      };
      var update = {
          saved: false
      };
      var options = {
          new: true
      };
      db.Article.findOneAndUpdate(query, update, options, function (err, doc) {
          if (err) {
              console.log(err)
          } else {
              console.log(doc.saved);
          }
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
  //LOAD ONLY ARTICLES THAT AREN'T FAVORITES ON HOME PAGE
  //=========================
  //retrieve articles from the database to make my own API
  app.get("/", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({
      saved:false
    })
      .then(function (dbArticle) {
        res.render("index", {
          articles: dbArticle
        })
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
};