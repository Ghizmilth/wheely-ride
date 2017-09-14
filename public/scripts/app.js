var start_lat = 37.77,
  start_lon = -122.447,
  end_lat = 37.768,
  end_lon = -122.511;
//const map = require("./map.js");

$(document).ready(function() {
  console.log("JS is loaded");

  //AJAX call to show routes - allows to show routes on main page

  $.ajax({
    method: "GET",
    url: "/api/routes",
    success: function(data) {
      renderRoutes(data);
    }
  });

  //  initMap();
});

//render routes on HTML

function renderRoutes(data) {
  initMap();
}
