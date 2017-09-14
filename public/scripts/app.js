//map coordinate cariables
var start_lat = 37.77,
  start_lon = -122.447,
  end_lat = 37.768,
  end_lon = -122.511;

$(document).ready(function() {
  console.log("JS is loaded");

  //AJAX call to show routes - allows to show routes on main page
  $.ajax({
    method: "GET",
    url: "/api/users",
    success: function(data) {
      renderRoutes(data);
    }
  });

  //Add USer button CLICKED
  $(".btn-add-user").on("click", addUserButton);
  //Handle SAVE USER button
  $("#userModal").on("click", "#saveUser", newUserSubmit);
});

//render map on HTML
function renderRoutes(data) {
  initMap();
}

//Handles when ADD A NEW USER button has been clicked
function addUserButton(e) {
  console.log("Add User Button Clicked");
  $("#userModal").modal(); //display the ADD USER modal
}

//Submit the new user to be CREATED
function newUserSubmit(e) {
  e.preventDefault();
  var $modal = $("#userModal");
  var $firstNameField = $modal.find("#firstName");
  var $lastNameField = $modal.find("#lastName");
  var $usernameField = $modal.find("#username");
  var $bikeStyleField = $modal.find("#bikeStyle");
  var $ageField = $modal.find("#age");

  var userToPost = {
    first_name: $firstNameField.val(),
    last_name: $lastNameField.val(),
    username: $usernameField.val(),
    bike_style: $bikeStyleField.val(),
    age: $ageField.val()
  };

  console.log("User to post", userToPost);

  var userPostToServer = "/api/users";

  $.post(userPostToServer, userToPost, function(data) {
    console.log("Received data from post to /users", data);

    //Clear form
    $firstNameField.val("");
    $lastNameField.val("");
    $usernameField.val("");
    $bikeStyleField.val("");
    $ageField.val("");
  });

  //Hide Modal
  $("#userModal").modal("hide");
}
