$(document).ready(function() {
  console.log("JS is loaded");

  //AJAX call to show routes - allows to show routes on main page

  // $.ajax({
  //   method: "GET",
  //   url: "/api/routes",
  //   success: function(data) {
  //     renderRoutes(data);
  //   }
  // });

  initMap();
});

// //render routes on HTML
// function renderRoutes(data) {
//   console.log("This is just a test");
// }

function initMap() {
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: { lat: 37.77, lng: -122.447 }
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
      origin: { lat: 37.77, lng: -122.447 }, // Haight.
      destination: { lat: 37.768, lng: -122.511 }, // Ocean Beach.
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
