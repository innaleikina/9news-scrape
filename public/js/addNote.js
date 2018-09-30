function showModule(event) {
    event.preventDefault();
    console.log("Add note clicked");
    console.log($(this).attr("data-id"));
    $(".module").empty();
    $(".module-id").empty();
    // $(".module-id").append($(this).attr("data-id"))
    $(".module").css('display', "block");
    //creates a module labeled with the correct id on click of a button
    $(".module").append('<button class="close-module"> x </button> <p class="module-id-p"> id <span class="module-id">' + $(this).attr("data-id") + '</span> </p> <form class="form"> <textarea class="text-area" name="note" id="note" form="form"> Enter text here...</textarea> <input class="submit" type="submit" data-id=' + $(this).attr("data-id") + '> </form>');
}


function closeModule() {
    $(".module").css("display", "none");
}

function addNote(event) {
    event.preventDefault();
    console.log("note added")
    console.log("note val " + $("#note").val())
    var thisId = $(this).attr("data-id");

    $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                // Value taken from note textarea
                body: $("#note").val()
            }
        })
        // With that done
        .then(function (data) {
            closeModule();
            window.location.href = "/saved";
        });
}





$(document).on("click", ".add-note", showModule);
$(document).on("click", ".close-module", closeModule);
$(document).on("click", ".submit", addNote);