
const $input = $("input[name='Search']");
const $userform = $("#user-form");


/// - - - USER QUERY
$userform.submit(function (event) {
    event.preventDefault();
    dbSearch(event); //SEARCH DATABASE, POPULATE RESULTS TO WEBPAGE
    countdown();
});


/// - - - DATABASE SEARCH
function dbSearch(obj) {
    const userInput = $input.val();
    const url = `https://api.newscatcherapi.com/v2/search?q=${userInput}&lang=en&page_size=20`;

    //HTTP GET REQUEST


    $.ajax({
        type: "GET",
        url: `${url}`,
        crossDomain: true,
        dataType: 'json',
        headers: { "x-api-key": "7nbElxjKQUcoFa1q-mSJu-V_dNrcRhJtsy8q3eARoTE" },
        success: function (response) {
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
        $resultCard = readArticle(data[`articles`][`${i}`], data.status);
        $resultCard.appendTo($results);
    }
    // for (const article in data.articles) {
    //     console.log(`data.articles[#], data.status: ${article}, ${data.status}`);

    // }


};

function readArticle(articleObj, status) {
    let $row = $(`<div class="row"></div>`);

    if (status === "ok") {
        $row.html(`
            <div class="w-responsive text-left mx-auto pb-2 px-4">
                <div class="card bg-white rounded">
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="ratio ratio-4x3">
                                <img
                                    src="${articleObj.media}"
                                    class="col px-0" alt="...">
                            </div>
                        </div>
                            <div class="col-sm-8 p-3">
                                <h5 class="card-title">${articleObj.title}</h5>
                                <p class="card-text">${articleObj.excerpt}</p>
                                <cite title="Source Title"> - From ${articleObj.clean_url}  </cite>
                                <a href="${articleObj.link}" class="btn btn-secondary btn-sm" role="button">Read Full Article</a>
                            </div>
                    </div>
                </div>
            </div>`);

    } else {
        //uh-oh messsage
        $row.html(`<div class="container">
                        <div class="card-summary">
                            <h4>Oh no!</h4>    
                            <p>
                            <i>Sorry, no articles available at this time. Try again later.</i>
                            </p>
                        </div>
                    </div>`);

    }



    return $row;
};


function countdown() {
    let timer = Date.now() + 60000;
    let x = setInterval(function () {

        // Get today's date and time
        let now = Date.now();
        let distance = timer - now;

        // Find the distance between now and the count down date  
        // Time calculations for days, hours, minutes and seconds
        // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        // var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        $("#demo").text(`${seconds} seconds until your next search`);

        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "";
        }
    }, 1000);
};