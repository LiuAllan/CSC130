var ACCESS_TOKEN = "4LwIrP8D8yxVsPA9kYrxKIN2CxCrAXMejA3r1_8m4GU0OtnNMm_cliJdXObpMq_UNsCnI0HCTbqgePPEV6StFPhim3L2jX65UH82zr2K60c5n7IJTUFODbEJWg6_WHYx" // Put your yelp access token here

/* 
  The "https://cors-anywhere.herokuapp.com/" app allows to circumvent the same-origin policy. It's ok to do this in a lab, but in a real application you shouldn't send requests to 3rd parties from the client-side, or have your access token here, as it makes your access token public
*/
var YELP_ENDPOINT = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3"
var SEARCH_ENDPOINT = YELP_ENDPOINT + "/businesses/search"

$(document).ready(function() {
  var coords = undefined
  // disable the search button and add a message until we get some GPS coordinates
  $("#search-button").attr('disabled', true)
  $("#error-message").append('Waiting for GPS coordinates...')

  // check if the browser supports geolocation
  if(navigator.geolocation !== undefined) {
    // if it does, watch for the changes in the GPS information
    navigator.geolocation.watchPosition(function(position) {
      // put the coordinates in the coords variable (defined line 10)
      coords = position.coords
      // re-enable the search button, and remove the error message
      $("#search-button").attr('disabled', false)
      $("#error-message").empty()
    })
  }

  $("#search-button").click(function() {
    // get the search term and the coordinates, and call requestSearch()
    requestSearch($("#search-term").val(), coords)
  })
})

/*
  This function retreives the search term that is entered in the input,
  and send an AJAX request to the YELP API
*/
function requestSearch(searchTerm, coordinates) {
  ($('#search-results')).empty()
  $('#error-message').empty()
  var requestSettings = {
    success: searchSuccess,
    error: searchError,
    data: {
      term: searchTerm,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude
    },
    headers: {
      Authorization: "Bearer " + ACCESS_TOKEN
    }
  }
  $.ajax(SEARCH_ENDPOINT, requestSettings)
}

/*
  This function adds each business in the data to the search-results div
*/
function searchSuccess(data, textStatus, jqXHR) {
  console.log("it worked")
  /*
  console.log(data)
  console.log(textStatus)
  console.log(jqXHR)
  */
  var busDiv = $("<div class= \"businessDiv\"></div>")
                 
  data.businesses.forEach(function(business) {
    var busImage = $('<img class = "pics" src="' + business.image_url + '"/>')
    
    var image = $("<span />", { html: business.image_url })
    var name = $("<span />", { html: business.name })
    var price = $("<span />", { html: business.price })
    var rating =$("<span />", { html: business.rating })
    
    var star = $('<i class=\"fa fa-star\" aria-hidden=\"true\"></i>')
    var addStar = $("<span />")
    var starNum = Math.floor(business.rating)
    
    for (var i = 0; i< starNum; i++){
      addStar.append($('<i class=\"fa fa-star\" aria-hidden=\"true\"></i>'))
    }
    
    if (business.rating > starNum) {
      addStar.append($('<i class=\"fa fa-star-half\" aria-hidden=\"true\"></i>'))
    }
    
    
    busDiv.append(busImage)
    busDiv.append(name)
    busDiv.append(price)
    /*
    UNCOMMENT THIS TO CHECK THE STARS MATCH THE RATING
    */
    //busDiv.append(rating)
    busDiv.append(addStar)
    //busDiv.appendTo($('#search-results'))
    
    var busContainer = $("<div class= \"busContainer\"></div>")
    var priceRating = $("<div class= \"priceRating\"></div>")
    var temp = $("<div class= \"temp\"></div>")
    
    busContainer.append(busImage)
    busContainer.append(name)
    priceRating.append(name)
    temp.append(price)
    temp.append(addStar)
    priceRating.append(temp)
    busContainer.append(priceRating)
    busDiv.append(busContainer)
    busDiv.appendTo($('#search-results'))
    })
}

/*
  This function adds the error message to the error-message div
*/
function searchError(jqXHR, error, errorThrown) {
 /*
  print error message when error 401 occurs
 */
  $('#error-message').empty()
  $('#error-message').append("no work such wow")
}
