$("#scrape").on("click", function () {
  console.log("scrape clicked")
  $.ajax("/scrape", {
      type: "GET",
    }).then(function () {
      console.log("scraped");
    })
    .then(function () {
      //appends articles for the first time right after the click
      $.getJSON("/articles", function (data) {
        // For each one
        //only scrape if the div is empty
        if ( !$.trim( $("#articles-wrap").html() ).length ) {
          for (var i = 0; i < data.length; i++) {
            // Display the apropos information on the page
            $("#articles-wrap").append('<div class="one-article"> <a target="_blank" href="' + data[i].link + '"<p>' + data[i].title + '</p></a> <button  class="fave-btn" data-id="' + data[i]._id + '">save to favorites </button></div>');
          }
        }
      });
    });
});