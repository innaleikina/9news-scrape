function saveFave() {
  console.log("Fave clicked");
  console.log($(this).attr("data-id"));
  var thisId = $(this).attr("data-id");
  $.ajax({
    type: "GET",
    url: "/markFavorite/" + thisId
  });
  $(this).parents(".one-article").remove();
}

function deleteFave() {
  var thisId = $(this).attr("data-id");
  //REMOVE FAVE
  $.ajax({
    type: "GET",
    url: "/removeFavorite/" + thisId
  });
  $(this).parents(".one-article").remove();
}

$(document).on("click", ".fave-btn", saveFave);
$(document).on("click", ".delete-fave", deleteFave);