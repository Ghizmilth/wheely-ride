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
