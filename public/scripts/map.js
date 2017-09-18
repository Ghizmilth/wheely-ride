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

  var otherRoutesHtml = `<div class="col-md-3 col-sm-6 mb-4" id="routeSection">
      <a href="#" class="open-route" onclick="openSelectedRoute(this)" data-route-id="${route._id}">
        <img class="img-fluid" src="/images/routes-pic.jpg" alt="">
      </a>
      <ul>
        <li><strong>Route Name:</stong> ${route.route_name}</li>
        <li><strong>Route Length:</stong> ${route.miles}</li
          <hr>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" id="edit-route"><span class="glyphicon glyphicon-pencil" aria-hidden="true" data-route-id="${route._id}"></span></button>
          <button type="button" class="btn btn-primary" id="delete-route"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
        </div>
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
    $("#map-content").after(routeContentHtml);
  });
}

//**UPDATES ROUTE INFORMATION WHEN UPDATE BUTTON IS CLICKED
function updateRouteModal(route) {
  console.log(route);
  let $routeUpdate = $(route.target);
  let routeId = $routeUpdate.data("routeId");
  console.log("edit route", routeId);

  $.get("/api/routes/" + routeId, function(editRoute) {
    console.log("got back the user object", editRoute);

    let routeToEdit = `<div class="container">
       <div class="modal" tabindex="-1" role="dialog" id="routeUpdateModal" data-route-id="${editRoute._id}">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                
                <h4 class="modal-title">Edit Bike Route</h4>
              </div>
              <div class="modal-body">

                <fieldset class='form-horizontal'>

                  <div class="form-group">
                    <label class="col-md-4 control-label" for="firstName"></label>
                    <div class="col-md-4">
                      <input id="routeName" name="route_name" type="text" placeholder="Route Name" class="form-control input-md" required="" value="${editRoute.route_name}">
                    </div>
                  </div>

                  <!-- Text input-->
                  <div class="form-group">
                    <label class="col-md-4 control-label" for="lastName"></label>
                    <div class="col-md-4">
                      <input id="startLat" name="start_lat" type="text" placeholder="Starting Latitude" class="form-control input-md" value="${editRoute.start_lat}">
                    </div>
                  </div>

                  <!-- Text input-->
                  <div class="form-group">
                    <label class="col-md-4 control-label" for="username"></label>
                    <div class="col-md-4">
                      <input id="startLon" name="start_lon" type="text" placeholder="Starting Longitude" class="form-control input-md" value="${editRoute.start_lon}">
                    </div>
                  </div>

                  <!-- Text input-->
                  <div class="form-group">
                    <label class="col-md-4 control-label" for="bikeStyle"></label>
                    <div class="col-md-4">
                      <input id="endLat" name="end_lat" type="text" placeholder="Ending Latitude" class="form-control input-md" value="${editRoute.end_lat}">
                    </div>
                  </div>

                  <!-- Text input-->
                  <div class="form-group">
                    <label class="col-md-4 control-label" for="age"></label>
                    <div class="col-md-4">
                      <input id="endLon" name="end_lon" type="text" placeholder="Ending Longitude" class="form-control input-md" value="${editRoute.end_lon}">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-md-4 control-label" for="firstName"></label>
                    <div class="col-md-4">
                      <input id="miles" name="length" type="text" placeholder="Length of Ride" class="form-control input-md" required="" value="${editRoute.miles}">
                    </div>
                  </div>

                  <!-- Text input-->
                  <div class="form-group">
                    <label class="col-md-4 control-label" for="lastName"></label>
                    <div class="col-md-4">
                      <input id="climbingFt" name="climbing_ft" type="text" placeholder="Climbing Feet" class="form-control input-md" value="${editRoute.climbing_ft}">
                    </div>
                  </div>

                  <!-- Text input-->
                  <div class="form-group">
                    <label class="col-md-4 control-label" for="pros"></label>
                    <div class="col-md-4">
                      <input id="pros" name="likes" type="text" placeholder="Route Pros" class="form-control input-md" value="${editRoute.pros}">
                    </div>
                  </div>

                  <!-- Text input-->
                  <div class="form-group">
                    <label class="col-md-4 control-label" for="cons"></label>
                    <div class="col-md-4">
                      <input id="cons" name="dislikes" type="text" placeholder="Route Cons" class="form-control input-md" value="${editRoute.cons}">
                    </div>
                  </div>

                  <!-- Text input-->
                  <div class="form-group">
                    <label class="col-md-4 control-label" for="city"></label>
                    <div class="col-md-4">
                      <input id="city" name="city-loc" type="text" placeholder="City Location" class="form-control input-md" value="${editRoute.city}">
                    </div>
                  </div>

                </fieldset>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="updateUser">Update Rider</button>
              </div>
            </div>
          </div>
        </div>
      </div>`;

    //Renders modal into the HTML after loading the user INFORMATION
    $("#route-update-modal").prepend(routeToEdit);

    //Calls modal to Show Up
    $("#routeUpdateModal").modal();
  });
}
