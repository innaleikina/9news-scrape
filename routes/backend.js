var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");


module.exports = function (app) {


    //=========================
    //SCRAPE ROUTE
    //=========================
    // A GET route for scraping the 9 news website
    app.get("/scrape", function (req, res) {
        // First, we grab the body of the html with request
        axios.get("https://www.9news.com/local/").then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);

            // Now, we grab every headline within an article tag, and do the following:
            $(".text-only-headline-list__headline").each(function (i, element) {
                // Save an empty result object
                var result = {};

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this)
                    .children("a")
                    .text();
                result.link = "https://www.9news.com" + $(this)
                    .children("a")
                    .attr("href");

                // Create a new Article using the `result` object built from scraping
                db.Article.create(result)
                    .then(function (dbArticle) {
                        // View the added result in the console
                        // console.log(dbArticle);
                    })
                    .catch(function (err) {
                        // If an error occurred, send it to the client
                        return res.json(err);
                    });
            });
            // If we were able to successfully scrape and save an Article, send a message to the client
            res.send("Scrape Complete");
        });
    });

    //=========================
    //DELETE ROUTE
    //=========================
    app.post("/clear", function () {
        db.Article.deleteMany({}).then(function () {
            console.log("article deleted");
        });
        db.Note.deleteMany({}).then(function () {
            console.log("note deleted");
        })
    })

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
};