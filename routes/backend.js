// var path = require("path");
var db = require("../models");

// var axios = require("axios");
var cheerio = require("cheerio");
var request = require("request");


module.exports = function (app) {


    //=========================
    //SCRAPE ROUTE
    //=========================
    // A GET route for scraping the 9 news website
    app.get("/scrape", function (req, res) {
        // console.log("db1 is " + db1);
        // console.log("db is " + db);
        // console.log(path.join(__dirname + "/../"));
        // First, we grab the body of the html with request
        request("https://www.9news.com/local/",function (error,response,html) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(html);

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

    
};