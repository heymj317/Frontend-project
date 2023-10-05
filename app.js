
const $input = $("input[name='Search']");
const $userform = $("#user-form");

/// - - - USER QUERY
$userform.submit(function (event) {
    event.preventDefault();
    newsSearch(); //SEARCH DATABASE, POPULATE RESULTS TO WEBPAGE
});


/// - - - DATABASE SEARCH
function newsSearch() {
    const userInput = encodeURIComponent($input.val());
    const url = `https://newsapi.org/v2/everything?q=${userInput}&language=en&pageSize=20`;

    //HTTP GET REQUEST
    $.ajax({
        type: "GET",
        url: `${url}`,
        crossDomain: true,
        dataType: 'json',
        headers: { "x-api-key": "5bf7df2d2e5a451b91cb83e450fed719" },
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
    //this is hook into page
    console.log(data)
    let $results = $("#results").empty();
    let resultSize;
    let $resultCard;
       //Get resultsize >> 
    switch (true) {
        case data.totalResults - 20 < 0:
            resultSize = data.totalResults;
            break;
        default:
            resultSize = 20;
    }
    //ITERATE
    for (var i = 0; i < resultSize; ++i) {
        console.log(data[`articles`][`${i}`])
        $resultCard = readArticle(data[`articles`][`${i}`], data.status);
        $resultCard.appendTo($results);
    }


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
                                    src="${articleObj.urlToImage}"
                                    class="col px-0" alt="...">
                            </div>
                        </div>
                            <div class="col-sm-8 p-3">
                                <h5 class="card-title">${articleObj.title}</h5>
                                <p class="card-text">${articleObj.description}</p>
                                <blockquote class="blockquote">
                                <footer class="blockquote-footer"><cite title="Source Title">From ${articleObj.source.name}  </cite>
                                <a href="${articleObj.url}" id="articleBtn" style=margin:5px rel=noreferrer target=_blank  class="btn btn-secondary btn-sm" role="button">Read Full Article</a></footer>
                                </blockquote>
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






/*


function countdown() {
    let timer = Date.now() + 60000;
    let x = setInterval(function () {

        // Get today's date and time
        let now = Date.now();
        let distance = timer - now;
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        $("#demo").text(`${seconds} seconds until your next search`);

        // If the count down is over, clear 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "";
        }
    }, 1000);
};

*/