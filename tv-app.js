// What do you have?
//   - jQuery to make AJAX requests to an API
//   - jQuery to work with the DOM
//   - Some existing HTML with placeholder information (.result-card)
//   - An API endpoint that has data for me "https://api.tvmaze.com/search/shows?q="
//   - A reference to how to use that API: "https://www.tvmaze.com/api#show-search"

// What do you need?
// When the user clicks the search button, the following needs to happen afterwards:
//     1. I need to take the text they typed in the input box
//     2. I need to get the TV show information based on what the user typed in: "https://api.tvmaze.com/search/shows?q=[SEARCH_STRING]"
//     2. I need to display that information using the .result-card html as a template

// How do you get there?
// I need to use this API endpoint: "https://api.tvmaze.com/search/shows?q="
// I can use the URL bar in my web browser to see what comes back when I visit an end point, e.g."https://api.tvmaze.com/search/shows?q=lost"
// I need to handle a click event on the search button
// I need to get the user information from the input box
// I need to use $.get to make an AJAX request to the endpoint with the user search info, e.g. "https://api.tvmaze.com/search/shows?q=lost"
// I need to use jQuery to recreate the .result-card html and all of it's nested elements
// I need to go through the data sent from the AJAX request and create a result card for each TV show
// I need to add each result card to the #results element.

const $submitBtn = $("#submit");

//FIND THE INPUT BOX
//opn1 - $input = $('#user-section").getChildren()[0];
//opn2 - $input = $('#user-section > input");
//opn3 - $input = $("input[name='search']"); <<<----- THIS IS THE BEST OPN
const $input = $("input[name='search']");
const $userform = $("#user-form");


/// - - - USER QUERY
$userform.submit(function (event) {
    event.preventDefault();
    dbSearch(event); //SEARCH DATABASE, POPULATE RESULTS TO WEBPAGE
});


/// - - - DATABASE SEARCH
function dbSearch(obj) {
    const userInput = $input.val();
    const url = `https://api.tvmaze.com/search/shows?q=${userInput}`;
    //HTTP GET REQUEST
    $.get(url, (data) => {
        buildResults(data);
    });
}


/// - - - RESULT LIST BUILDER
function buildResults(data) {
    let $results = $("#results").empty();;

    for (var i = 0; i < data.length; ++i) {
        //append movie cards
        let $resultCard = movieCard(data[i]);
        $resultCard.appendTo($results);
    }
}



///MOVIE CARD BUILDER
function movieCard(movieObj) {
    let $span = $(`<span></span>`).addClass("result-card");
    let $spanh3 = $("<h3></h3>").addClass("card-title").text(`${movieObj["show"]["name"]}`);
    let $spanImg = $("<img></img>").addClass("card-image");
    let $spanh2 = $("<h2></h2>").addClass("card-genres").text(`${movieObj["show"]["genres"]}`);
    let $spanDiv = $("<div></div>").addClass("card-summary");
    let $spanA = $("<a></a>").attr("href", `${movieObj["show"]["url"]}`).text("View Show");
    let htmlText = `<em>Summary:</em><p><b>${movieObj["show"]["name"]}</b>${movieObj["show"]["summary"]}</p>`;
    $spanDiv.html(htmlText);

    if (movieObj["show"]["image"] == null) {
        $spanImg.attr("alt", "Movie Poster Image");
    } else {
        $spanImg.attr("src", movieObj["show"]["image"]["medium"]);
    };

    $spanA.attr({
        target: "_blank",
        rel: "noreferrer",
    });

    $span.append($spanh3, $spanImg, $spanh2, $spanDiv, $spanA);
    return $span;
};

// $submitBtn.click(() => {
//   console.log("clicked: ", $input.val());
// });

// $.get("https://api.tvmaze.com/search/shows?q=breaking%20bad", (data) => {
//   console.log(data);
//   //   var results = JSON.parse(data); // The data comes to us in JSON format, it must be parsed in to a object that we can use
//   console.log(results);
// });
