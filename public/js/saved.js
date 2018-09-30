//get articles from the api route after they have been scraped
console.log("saved linked");
$.getJSON("/favorites", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        //each headline is an a tag that opens an article in a new window
      $("#saved-wrap").append('<div class="one-article saved saved-article"> <a target="_blank" href="' + data[i].link + '"<p>' + data[i].title + '</p></a> <button class="add-note" data-id="' + data[i]._id + '"> add note </button><div class="notes-wrap"></div> </div>');

    }
  });

