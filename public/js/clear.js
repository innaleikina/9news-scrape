$("#clear").on("click", function () {
  console.log("cleared articles");
  $("#articles-wrap").empty();
  $("#saved-wrap").empty();
  $.ajax("/clear", {
    type: "POST"
  })
})