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
    const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=5bf7df2d2e5a451b91cb83e450fed719`;
    //const url = `https://api.tvmaze.com/search/shows?q=${userInput}`;
    //HTTP GET REQUEST
    // $.get(url, (data) => {
    //     buildResults(data);
    //     //console.log(data);
    // });

    $.ajax({
        type: "GET",
        url: 'https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=business&page_size=20',
        crossDomain: true,
        dataType: 'json',
        headers: { "x-api-key": "7nbElxjKQUcoFa1q-mSJu-V_dNrcRhJtsy8q3eARoTE" },
        success: function (response) {
            console.log(response);
            buildResults(response);
        },
        error: function (response) {
            alert('No articles available at this time. Try again later');
            console.log(response);
        },
    });

};


/// - - - RESULT LIST BUILDER
function buildResults(data) {
    let $results = $("#results").empty();
    let resultSize;
    //let $resultsDiv = $("<div></div>").addClass("contribute");
    let $resultCard;

    //Get Length >> 
    switch (true) {
        case data.totalResults - 20 < 0:
            resultSize = data.total_hits;
            break;
        default:
            resultSize = 20;
    }
    //ITERATE
    for (var i = 0; i < resultSize; ++i) {
        console.log(i + `: ${data[`articles`][`${i}`][`title`]}`);
        $resultCard = readArticle(data[`articles`][`${i}`], data.status);
        $resultCard.appendTo($results);
    }
    // for (const article in data.articles) {
    //     console.log(`data.articles[#], data.status: ${article}, ${data.status}`);

    // }


};

function readArticle(articleObj, status) {
    let $span = $(`<span></span>`).addClass("result-card");
    if (status === "ok") {
        let $spanh3 = $("<h3></h3>").addClass("card-title").text(`${articleObj.title}`);
        let $spanImg = $("<img></img>").addClass("img-thumbnail").attr("src", `${articleObj.media}`);
        $span.append($spanh3, $spanImg);

    } else {
        //uh-oh messsage
        let $spanh3 = $("<h3></h3>").addClass("card-title").text(`Oh no!`);
        let $spanDiv = $("<div></div>").addClass("error-message");
        let $errorMsg = `Sorry, no articles available at this time. Try again later`
        $spanDiv.html = $errorMsg;
        $span.append($spanh3, $spanImg);
        console.log("msg: " + status);
    }



    return $span;
};