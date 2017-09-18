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
  renderOneMap(route);
  console.log(route);
  route.forEach(function(route) {
    renderRouteList(route);
  });
}

function renderOneMap(route) {
  var routeTitleHtml = `
  <!-- Page Content -->
     <div class="container map-box">

       <!-- Portfolio Item Heading -->
       <h1 class="my-4">${route[0].route_name}
         <small></small>
       </h1>`;

  var routeContentHtml = `<div class="col-md-4 mapContent">
    <h3 class="my-3">Route Info</h3>
    <p></p>
    <h3 class="my-3"></h3>
    <ul>
      <li><strong>Miles:</strong> ${route[0].miles} miles</li>
      <li><strong>Climbing Feet:</strong> ${route[0].climbing_ft} ft.</li>
      <li><strong>Pros:</strong> ${route[0].pros}</li>
      <li><strong>Cons:</strong> ${route[0].cons}</li>
    </ul>
  </div>`;

  start_lat = `${route[0].start_lat}`;
  start_lon = `${route[0].start_lon}`;
  end_lat = `${route[0].end_lat}`;
  end_lon = `${route[0].end_lon}`;

  initMap();

  $("#map-title").after(routeTitleHtml);
  $("#map-content").after(routeContentHtml);
}

function renderRouteList(route) {
  console.log("getting ready for the list");

  var otherRoutesHtml = `<div class="col-md-3 col-sm-6 mb-4">
      <a href="#" class="open-route" onclick="openSelectedRoute(this)" data-route-id="${route._id}">
        <img class="img-fluid" src="/images/routes-pic.jpg" alt="">
      </a>
    <ul>
    <li><strong>Route Name:</stong> ${route.route_name}</li>
    <li><strong>Route Length:</stong> ${route.miles}</li>
  </div>
  `;

  $("#other-routes").append(otherRoutesHtml);
}

function openSelectedRoute(route) {
  let routeId = $(route).data("route-id");
  console.log(routeId);

  $.get("/api/routes/" + routeId, function(route) {
    console.log("This is the route to render", route);

    var routeTitleHtml = `
    <!-- Page Content -->
       <div class="container map-box">

         <!-- Portfolio Item Heading -->
         <h1 class="my-4">${route.route_name}
           <small></small>
         </h1>`;

    var routeContentHtml = `<div class="col-md-4 mapContent">
      <h3 class="my-3">Route Info</h3>
      <p></p>
      <h3 class="my-3"></h3>
      <ul>
        <li><strong>Miles:</strong> ${route.miles} miles</li>
        <li><strong>Climbing Feet:</strong> ${route.climbing_ft} ft.</li>
        <li><strong>Pros:</strong> ${route.pros}</li>
        <li><strong>Cons:</strong> ${route.cons}</li>
      </ul>
    </div>`;

    start_lat = `${route.start_lat}`;
    start_lon = `${route.start_lon}`;
    end_lat = `${route.end_lat}`;
    end_lon = `${route.end_lon}`;

    $("#map-box").empty();
    $("#map-content").empty();
    $(".map-box").empty();
    $(".mapContent").empty();
    $("#map-title").empty();
    // $("#other-routes").remove();

    initMap();
    // renderRouteList();

    $("#map-title").append(routeTitleHtml);
    $("#map-content").append(routeContentHtml);
  });
}
