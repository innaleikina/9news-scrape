function addNote(){

console.log("Add note clicked");
console.log($(this).attr("data-id"));
$(".module").css('display',"block");
// var thisId = $(this).attr("data-id");
//   $.ajax({
//     type: "GET",
//     url: "/markread/" + thisId
//   });
//   $(this).parents(".one-article").remove();
 }



 function closeModule(){
    $(".module").css("display","none"); 
 }


$(document).on("click", ".add-note", addNote);
$(document).on("click", ".close-module", closeModule);