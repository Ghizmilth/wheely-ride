function initMap() {
  console.log("map is initiated");
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat: 37.8054, lng: -122.3401 }
  });
  directionsDisplay.setMap(map);

  calculateAndDisplayRoute(directionsService, directionsDisplay);
  document.getElementById("mode").addEventListener("change", function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var selectedMode = document.getElementById("mode").value;
  directionsService.route(
    {
      // origin: { lat: 37.77, lng: -122.447 }, // Haight.
      // destination: { lat: 37.768, lng: -122.511 }, // Ocean Beach.
      origin: {
        lat: parseFloat(start_lat),
        lng: parseFloat(start_lon)
      }, // Haight.
      destination: {
        lat: parseFloat(end_lat),
        lng: parseFloat(end_lon)
      }, // Ocean Beach.

      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode[selectedMode]
    },
    function(response, status) {
      if (status == "OK") {
        directionsDisplay.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}

//render map on HTML
function renderExplore(route) {
  console.log("Map second part initiaded");
  console.log(route);
  route.forEach(function(route) {
    renderRouteList(route);
  });
}

function renderRouteList(route) {
  console.log("getting ready for the list");
  var routeHtml = `
        <div class="row city" data-city-id="${route._id}">

        <div class="row"
          <div class="col-md-3 col-sx-12 thumbnail city-photo" id="city-image">
            <img src="${route.route_name}"></img>
          </div>
          <div class="col-md-12" id='style-city'>
            <h2>${route.pros}</h2>
            <p>${route.cons}</P>
          </div>

          </div>

          <div class="city-info">
            <div class="row">
              <div class="col-md-12" id="city-facts">
                <ul id="edit-list">
                  <li id="coordinatesInfo">Coordinates: ${route.miles}</li>
                  <li id="cityPopulation">Population: ${route.climbing_ft}</li>
                  <li id="cityArea">City Area: ${route.miles}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="edition-button">
          <button type="button" class="btn edit-city" data-city-id="${route._id}">Update City</button>
          </div>

          <hr/>


            <h3>Landmarks</h3>
            <div class="row" id="clear-this-also">
              <button type="button" class="btn btn-add-landmark add-this-landmark">Add Landmark</button>
            </div>

            <hr>

          <div id="landmarks-render">

          </div>
        </div>
        `;
  $("#routeInfo").prepend(routeHtml);
  //initMap();
}
