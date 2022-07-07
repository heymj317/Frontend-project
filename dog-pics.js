console.log("Hello World");

const $input = $("input[name='Search']");
const $userform = $("#user-form");


/// - - - USER QUERY
$userform.submit(function (event) {
    event.preventDefault();
    dbSearch(event); //SEARCH DATABASE, POPULATE RESULTS TO WEBPAGE
});


/// - - - DATABASE SEARCH
function dbSearch(obj) {
    const userInput = $input.val();
    const url = `https://dog.ceo/api/breeds/image/random`;
    //const url = `https://api.tvmaze.com/search/shows?q=${userInput}`;
    //HTTP GET REQUEST
    $.get(url, (data) => {
        buildResults(data);
        //console.log(data);
    });
};


/// - - - RESULT LIST BUILDER
function buildResults(data) {
    let $results = $("#results").empty();
    let $resultsDiv = $("<div></div>").addClass("contribute");
    let $spanA = $("<a></a>").attr({
        rel: "noreferrer",
        target: "_blank",
        href: `https://github.com/jigsawpieces/dog-api-images#dog-api-images`
    }).text("Add your dog pic to this GitHub project");
    console.log(data.message);
    let $resultCard = dogPic(data);
    // Get Length >> console.log("data.length: " + Object.keys(data).length);
    //for (var i = 0; i < data.length; ++i) {
    //append dog pic
    //let $resultCard = movieCard(data[i]);
    // $resultCard.appendTo($results);

    //}
    $resultsDiv.append($spanA);
    $results.append($resultCard, $resultsDiv);

};

function dogPic(dogPicObj) {
    let $span = $(`<span></span>`).addClass("result-card");
    if (dogPicObj.status === "success") {
        let $spanh3 = $("<h3></h3>").addClass("card-title").text(`Arf!`);
        let $spanImg = $("<img></img>").addClass("card-image");
        $spanImg.attr("src", dogPicObj.message);
        $span.append($spanh3, $spanImg);

    } else {
        //uh-oh messsage
        let $spanh3 = $("<h3></h3>").addClass("card-title").text(`Arf!}`);
        let $spanDiv = $("<div></div>").addClass("error-message");
        let $errorMsg = `Sorry, no pics available at this time. Try again later`
        $spanDiv.html = $errorMsg;
        $span.append($spanh3, $spanImg);
    }



    return $span;
};