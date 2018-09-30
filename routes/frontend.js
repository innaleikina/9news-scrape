var db = require("../models");

module.exports = function (app) {
  //renders index.handlebars on the home page
  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/saved", function (req, res) {
    res.render("saved");
  });
}