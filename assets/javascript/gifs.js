$( document ).ready()

var topics = ["Little House on the Prairie", "I Love Lucy", "Gilligans Island", "The Flintstones", "The Brady Bunch", "The Facts of Life", "Family Ties", "Punky Brewster", "Leave it to Beaver", "M*A*S*H", "Happy Days", "The Mary Tyler Moore Show", "Laverne and Shirley", "The Adams Family", "Moonlighting"];
console.log(topics);



function displayGifInfo() {
    
    var gif = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=W4xqmEe0yTy39ECMo3Q4BXuLgdkYv4cH";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
      console.log(response);
        var gifsDiv = $("<div class = 'gif'>");

        $(".button-clicks").prepend(gifsDiv);
        renderGifs();
});
}
console.log(displayGifInfo);



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
    


    $("#add-gif").on("click", function(event) {
      event.preventDefault();
      var gif = $("#gif-input").val().trim();
      topics.push(gif);
      renderGifs();
    });



    $(document).on("click", ".gif", displayGifInfo);
    console.log(displayGifInfo);

    renderGifs();