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
      renderOneUser(data);
      //renderRoutes(data);
    }
  });

  //Add User button CLICKED
  $(".btn-add-user").on("click", addUserModal);
  //Handle SAVE USER button
  $("#userModal").on("click", "#saveUser", newUserSubmit);
  //Handle UPDATE USER button
  $("#user-render").on("click", ".btn-edit-user", updateUserModal);
  //Sends updated info to server and DB
  $("#user-update-modal").on("click", "#updateUser", editUserSubmit);
});

//render map on HTML
function renderRoutes(data) {
  initMap();
}

//Handles when ADD A NEW USER button has been clicked
function addUserModal(e) {
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

function editUserSubmit(edit) {
  edit.preventDefault();
  let userId = $(this)
    .parents("#userUpdateModal")
    .data("user-id");
  console.log(userId);

  $("#userUpdateModal").modal("hide");

  let userData = {
    first_name: $(".updated-first-name").val(),
    last_name: $(".updated-last-name").val(),
    username: $(".updated-username").val(),
    bike_style: $(".updated-bike-style").val(),
    age: $(".updated-age").val()
  };

  console.log(
    "Editing this user",
    userId,
    "with this following info",
    userData
  );

  $.ajax({
    method: "PUT",
    url: "/api/users/" + userId,
    data: userData,
    success: handleUserUpdateResponse
  });
}

function handleUserUpdateResponse(data) {
  console.log("Response to update", data);

  let updatedUserId = data._id;
  console.log(updatedUserId);

  // clearDom();
  //
  // renderNewUpdatedUser(userData);
}
