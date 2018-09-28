//get articles from the api route after they have been scraped
$.getJSON("/noneFaveArticles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        //each headline is an a tag that opens an article in a new window
      $("#articles-wrap").append('<div class="one-article"> <a target="_blank" href="' + data[i].link + '"<p>' + data[i].title + '</p></a> <button class="fave-btn" data-id="' + data[i]._id + '"> save to favorites </button></div>');

    }
  });

