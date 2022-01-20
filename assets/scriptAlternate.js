var movieApiKey = "k_q049lni3";
var mainContainer = $("#main-container");
var titleListFlex = $(`<div>`).attr("id", "title-list-container-flex");
var bookCover;
var bookTitle;
var bookAuthor;
var bookPublishDate;
var bookRating;
var movieTitle;
var poster;
var movieRating;
var searchedBookTitles;
var searchHistoryList = [];


$("#search-form").parsley();
// Prevent default for search form
var searchEventHandler = function (event) {
    event.preventDefault();
    // $("#search-history-list").empty();
    $("#search-input").parsley().validate();
    var userInput = $("#search-input").val()
    if (userInput) {
        apiQuery();
        $("#hide-container").addClass("hide");
    }
    // ELLIOT CODE - run searchHistory function 
    searchHistory(userInput);
};

var searchEventHandler2 = function (event) {
    
    event.preventDefault();
    $("#final-results-container").remove();
    var userInput = $("#search-input-again").val()
    console.log(`This is user input ${userInput}`);
    if (userInput) {
        apiQuery2();
        ;
    }

    // ELLIOT CODE - run searchHistory function 
    // searchHistory(userInput);
};

// function searchHistory(userInput) {
//     // Push user input history (i.e. book title searched) into a list and append to html <li> tag with id="searchHistory"
//     if (!searchHistoryList.includes(userInput)) {
//         searchHistoryList.push(userInput);
//         var searchedBookTitles = $(`
//             <li class="list-group-item">${userInput}</li>
//             `);
//         searchedBookTitles.addClass("text-primary");
//         $("#search-history-list").append(searchedBookTitles);
//     };

//     // Save user input (book title) to local storage
//     localStorage.setItem("bookTitleInput", JSON.stringify(searchHistoryList));
//     console.log(searchHistoryList);
// }







// Make api requests
function apiQuery() {
    $("#search-history-list").attr("class", "hide");
    var userInput = $("#search-input").val().trim();

    // User validation
    var userInputValidated = userInput.split(" ").join("+").toLowerCase();

    var booksRequestUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${userInputValidated}&num=1&filter=0`;


    fetch(booksRequestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (bookData) {
            console.log(bookData);
                
            
                // create and populate list of top results, book titles     **** seperate divs
                
                var ulDiv = $(`<div>`).attr("id", "title-list-container");
                $("#post-landing").append(titleListFlex);
                titleListFlex.append(ulDiv);
                var ul = $(`<ul id="title-list">`)
                ulDiv.append(ul);

  
                

                // Capture book information for final results display
                bookCover = $(`<img id="book-cover" src="${bookData.items[0].volumeInfo.imageLinks.thumbnail}">`)
                bookTitle = bookData.items[0].volumeInfo.title;
                bookAuthor = bookData.items[0].volumeInfo.authors[0];
                bookPublishDate = bookData.items[0].volumeInfo.publishedDate;
                bookRating = bookData.items[0].volumeInfo.averageRating;

          


     
                 for (i = 0; i < 1; i++ ) {
                     var liEl = $(`<li id="title-list-item">`);
                     liEl.text(bookData.items[i].volumeInfo.title);

                    //  Make omdbi api query when user selects book title 

                     liEl.on("click", function(event){
                        event.preventDefault();
                        // var userSelection = liEl.text().trim();

                        searchMovie(bookData.items[i].volumeInfo.title);
             
                       
                    });
                    ul.append(liEl);
              

                 }

                 var vertBar = $(`<img id="vertical-bar">`).attr("src", "assets/images/verticalBar.png")
                 titleListFlex.append(vertBar);
                 var titleResponseDiv = $(`<div id="title-response-div">`);
                 titleListFlex.append(titleResponseDiv);
                 var titleResponse = $(`<h2 id="title-response">`).text("Is this what you were looking for?");
                 titleResponseDiv.append(titleResponse);
                //  titleListFlex.attr("class", "hide");

        })

};



// Make api requests from search bar in results page
function apiQuery2() {

    
    var userInput = $("#search-input-again").val().trim();

    // User validation
    var userInputValidated = userInput.split(" ").join("+").toLowerCase();

    var booksRequestUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${userInputValidated}&num=1&filter=0`;

    // console.log("second query success");

    fetch(booksRequestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (bookData) {
            // console.log(bookData);
                
            
                // create and populate list of top results, book titles     **** seperate divs
                
                var ulDiv = $(`<div>`).attr("id", "title-list-container");
                $("#post-landing").append(titleListFlex);
                titleListFlex.append(ulDiv);
                var ul = $(`<ul id="title-list">`)
                ulDiv.append(ul);

  
                

                // Capture book information for final results display
                bookCover = $(`<img id="book-cover" src="${bookData.items[0].volumeInfo.imageLinks.thumbnail}">`)
                bookTitle = bookData.items[0].volumeInfo.title;
                bookAuthor = bookData.items[0].volumeInfo.authors[0];
                bookPublishDate = bookData.items[0].volumeInfo.publishedDate;
                bookRating = bookData.items[0].volumeInfo.averageRating;

          


     
                 for (i = 0; i < 1; i++ ) {
                     var liEl = $(`<li id="title-list-item">`);
                     liEl.text(bookData.items[i].volumeInfo.title);

                    //  Make omdbi api query when user selects book title 

                     liEl.on("click", function(event){
                        event.preventDefault();
                        // var userSelection = liEl.text().trim();

                        searchMovie(bookData.items[i].volumeInfo.title);
             
                       
                    });
                    ul.append(liEl);
              

                 }

                 var vertBar = $(`<img id="vertical-bar">`).attr("src", "assets/images/verticalBar.png")
                 titleListFlex.append(vertBar);
                 var titleResponseDiv = $(`<div id="title-response-div">`);
                 titleListFlex.append(titleResponseDiv);
                 var titleResponse = $(`<h2 id="title-response">`).text("Is this what you were looking for?");
                 titleResponseDiv.append(titleResponse);
                 titleListFlex.attr("class", "hide");

        })
       

        console.log(userInput);
        
};



// MOVIE CHECKKKKKK

// ==================================  set up IMDb API for movie rating API 
IMDbAPIKey = "k_kjtdo6f2"
function searchMovie(inputMovie){
   
    // var inputMovie = $("#movie-input").val().trim();
    var requestIMDbUrl = "https://imdb-api.com/en/API/SearchMovie/" + IMDbAPIKey + "/" + inputMovie;
 
    fetch(requestIMDbUrl)
        .then(function(searchMovieResponse){
            if (searchMovieResponse.status === 200){
                // movieRating = movieRatingResponse.status;
            }
            return searchMovieResponse.json();
        }).then (function(searchMovieData){
            console.log("searchMovieData", searchMovieData);

            // var searchMovieTitle = searchMovieData.expression;
            var movieTitleId = searchMovieData.results[0].id;
            movieTitle = searchMovieData.results[0].title;

            getRatingApi(movieTitleId);
            getPosterApi(movieTitleId);
            // $("#post-landing").remove();
            $("#post-landing").empty();
        });
}
// ==================================  set up IMDb API for movie rating API 

function getRatingApi(movieTitleId){

    console.log("onclick2-testing");

    var requestIMDbUrl = "https://imdb-api.com/en/API/Ratings/" + IMDbAPIKey + "/" + movieTitleId;
 
    fetch(requestIMDbUrl)
        .then(function(movieRatingResponse){
            return movieRatingResponse.json();
        }).then (function(movieRatingData){

            // make consistent with the book rating 5-star scaling unit 
            movieRating = ((movieRatingData.imDb)/2);
            console.log("this is movie rating: " + movieRating);
        });
}

// ==================================  set up IMDb API for movie poster API 
function getPosterApi(movieTitleId){


    //event.preventDefault();
   
    var requestIMDbUrl = "https://imdb-api.com/en/API/Posters/" + IMDbAPIKey + "/" + movieTitleId;
 
    fetch(requestIMDbUrl)
        .then(function(moviePosterResponse){
            return moviePosterResponse.json();
        }).then (function(moviePosterData){

            console.log(moviePosterData)
           
            var moviePoster = moviePosterData.posters[0].link;
            var movieYear = moviePosterData.year;


            function displayPoster() {

                console.log("THIS IS OUR" + movieRating);

                // Make variables to hold final results content
                var finalResultsContainer = $(`<div id="final-results-container">`);
                var compareContainerOne = $(`<div id="compare-container-one">`);
                var compareOneInner = $(`<div id="compare-one-inner">`);
                var compareContainerTwo = $(`<div id="compare-container-two">`);
                var compareTwoInner = $(`<div id="compare-two-inner">`);
                var bookTitleDisplay = $(`<h1 id="book-title-display">`);
                var authorInfo = $(`<p class="media-info">`);
                var bookPublishDateDisplay = $(`<span class="media-date">`);
                var bookRatingDisplay = $(`<p id="book-rating">`);
                poster = $(`<img id="poster">`).attr("src", moviePoster);
                var movieTitleDisplay = $(`<h1 id="movie-title-display">`);
                var movieYearDisplay = $(`<p id="movie-info">`);
                var movieRatingDisplay = $(`<p id="movie-rating">`);
                var whereToWatch = $(`<p id="stream-sources">`);
                
                

        
                mainContainer.append(finalResultsContainer);
                finalResultsContainer.append(compareContainerOne);
                compareContainerOne.append(bookCover);
                compareContainerOne.append(compareOneInner);
                bookTitleDisplay.text(bookTitle);
                authorInfo.text(bookAuthor);
                bookPublishDateDisplay.text(bookPublishDate);
                bookRatingDisplay.text("Average Rating:  " + bookRating);
                compareOneInner.append(bookTitleDisplay);
                compareOneInner.append(authorInfo);
                authorInfo.append(bookPublishDateDisplay);
                compareOneInner.append(bookRatingDisplay);
                
        
                finalResultsContainer.append(compareContainerTwo);
                compareContainerTwo.append(poster);
                compareContainerTwo.append(compareTwoInner);
                movieTitleDisplay.text(movieTitle);
                movieYearDisplay.text(movieYear);
                movieRatingDisplay.text("Average Rating:  " + movieRating);
                whereToWatch.text("Where to Watch");
                compareTwoInner.append(movieTitleDisplay);
                compareTwoInner.append(movieYearDisplay);
                compareTwoInner.append(movieRatingDisplay);
                compareTwoInner.append(whereToWatch);

                // create search bar for additional searches
                var footerContainer = $(`<div id="footer-container">`);
                var searchAgainContainer = $(`<div id="search-again-container">`);
                var lilLogo = $(`<img id="lil-logo">`);
                lilLogo.attr("src", "assets/images/Logo.png");
                var searchAgainForm = $(`<form id="search-form-again">`);
                var searchAgainInput = $(`<input id="search-input-again">`);
                searchAgainInput.attr("placeholer", "Enter book title...")
                var searchAgainButton = $(`<button id="search-button-again">`)
                var magGlass = $(`<img id="mag-glass">`);
                magGlass.attr("src", "assets/images/magGLass.png");
                
                mainContainer.append(footerContainer);
                footerContainer.append(lilLogo);
                footerContainer.append(searchAgainContainer);
                searchAgainContainer.append(searchAgainForm);
                searchAgainForm.append(searchAgainInput);
                searchAgainContainer.append(searchAgainButton);
                searchAgainButton.append(magGlass);

               

                // ELLIOT CODE - create UL for search history 
                // var searchHistoryUL =  $(`<ul id="search-history-list">`);
                // searchHistoryUL.attr("type", "text");
                // searchHistoryUL.addClass("list-group");
                // console.log("searchHistoryUL");
                // $("#post-landing").append(searchHistoryUL);

                $("#search-form-again").on("submit", searchEventHandler2);
                $("#search-button-again").on("click", searchEventHandler2);
               
            }
           
            displayPoster()
    
        });
        

        $("#title-list-container").empty();



}



// ELLIOT CODE - search history function with local storage set item
function searchHistory(userInput) {



    // Push user input history (i.e. book title searched) into a list and append to html <li> tag with id="searchHistory"
    if (!searchHistoryList.includes(userInput)) {
        searchHistoryList.push(userInput);
        console.log(userInput);
        searchedBookTitles = $(`<li>${userInput}</li>`);
        searchedBookTitles.addClass("list-group-item");
        searchedBookTitles.addClass("text-decoration-underline");
        $("#search-history-list").append(searchedBookTitles);
    };

    // Save user input (book title) to local storage
    localStorage.setItem("bookTitleInput", JSON.stringify(searchHistoryList));
    console.log(searchHistoryList);
}




// ELLIOT CODE - local storage get item 
var searchHistoryArray = JSON.parse(localStorage.getItem("bookTitleInput"));

    if (searchHistoryArray !== null) {
        for (let i = 0; i < 4; i++) {
            var searchHistoryListItem = searchHistoryArray[i]
            searchHistoryList.push(searchHistoryListItem);
            var searchedBookTitles = $(`
                <li class="list-group-item">${searchHistoryListItem}</li>
                `);
            searchedBookTitles.addClass("text-primary");
            $("#search-history-list").append(searchedBookTitles);
        }
    }



// Event listeners for search form submission and search button

$("#search-form").on("submit", searchEventHandler);
$("#search-button").on("click", searchEventHandler);





