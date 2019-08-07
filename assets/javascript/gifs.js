$( document ).ready()

var topics = ["Little House on the Prairie", "The Dukes of Hazzard", "Gilligans Island", "The Flintstones", "The Brady Bunch", "The Facts of Life", "Family Ties", "Punky Brewster", "Growing Pains", "M*A*S*H", "Happy Days", "The Mary Tyler Moore Show", "Laverne and Shirley", "The Adams Family", "Moonlighting"];
console.log(topics);

//pulls gif from giphy, displays gif on the html page
function displayGifInfo() {
  //$("button").on("click", function() {
    var gif = $(this).attr("data-name");
    console.log(gif);
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=W4xqmEe0yTy39ECMo3Q4BXuLgdkYv4cH&limit=10&rating=pg-13";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
      console.log(queryURL);
      console.log(response);
      var results = response.data;
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        //if(results[i].rating !== "r" && results[i].rating !== "pg-13") {
          var gifDiv = $("<div>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          var gifImage = $("<img>");
          gifImage.attr("src", results[i].images.fixed_height.url);
          gifDiv.append(p);
          gifDiv.append(gifImage);
          $("#gifs-view").prepend(gifDiv);
        renderGifs();
      
    }
  });
}

//populates buttons on top of page, adds button from typing
function renderGifs() {
  
    $(".button-clicks").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("gif");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $(".button-clicks").append(a);
      }
    }
    console.log(renderGifs);
    

  //adds new buttons when typing into gif-input field 
  $("#add-gif").on("click", function(event) {
    event.preventDefault();
    var gif = $("#gif-input").val().trim();
    topics.push(gif);
    renderGifs();
  });

$(document).on("click", ".gif", displayGifInfo);
  


  renderGifs()