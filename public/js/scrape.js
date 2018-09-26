$("#scrape").on("click", function () {
  $.ajax("/scrape", {
      type: "GET",
    }).then(function () {
      console.log("scraped");
    })
    .then(function () {
      //appends articles for the first time right after the click
      $.getJSON("/articles", function (data) {
        // For each one
        for (var i = 0; i < data.length; i++) {
          // Display the apropos information on the page
          $("#articles-wrap").append('<div class="one-article"> <a targer="_blank" href="' + data[i].link + '"<p data-id="' + data[i]._id + '">' + data[i].title + '</p></a> <button> save to favorites </button></div>');
        }
      });
    });
});