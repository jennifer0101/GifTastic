$(document).ready()

var topics = ["Little House on the Prairie", "The Dukes of Hazzard", "Gilligans Island", "The Flintstones", "The Brady Bunch", "The Facts of Life", "Family Ties", "Punky Brewster", "Growing Pains", "M*A*S*H", "Happy Days", "The Mary Tyler Moore Show", "Laverne and Shirley", "The Adams Family", "Moonlighting"];
console.log(topics);

//pulls gif from giphy, displays gif on the html page
function displayGifInfo() {
  var gif = $(this).attr("data-name");
  console.log(gif);
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=W4xqmEe0yTy39ECMo3Q4BXuLgdkYv4cH&limit=10&rating=pg-13";
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      console.log(queryURL);
      console.log(response);
      var results = response.data;
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class=gifDiv>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var gifImage = $("<img>");
        gifImage.attr("src", results[i].images.fixed_height_still.url);
        gifImage.attr({ 'data-animate': results[i].images.fixed_height.url });
        gifImage.attr({ 'data-state': "still" });
        gifImage.attr({ 'data-still': results[i].images.fixed_height_still.url });
        gifDiv.append(p);
        gifDiv.append(gifImage);
        $("#gifs-view").prepend(gifDiv);

        //pauses and animates gifs
        $(gifImage).on("click", function () {
          var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        })

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
$("#add-gif").on("click", function (event) {
  event.preventDefault();
  var gif = $("#gif-input").val().trim();
  topics.push(gif);
  renderGifs();
});

$(document).on("click", ".gif", displayGifInfo);

renderGifs();