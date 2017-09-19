var start = "661 65th St. Oakland, CA",
  end = "1790 8th St. Oakland, CA",
  waypointOne = "957 63rd St, Oakland, CA",
  waypointTwo = "5974 Marshall St, Oakland, CA";

$(document).ready(function() {
  console.log("JS is loaded");

  //AJAX call to show routes - allows to show routes on main page
  $.ajax({
    method: "GET",
    url: "/api/routes",
    success: function(data) {
      //renderOneUser(data);
      renderExplore(data);
    }
  });

  // //Handle SAVE USER button
  $("#saveRoute").on("click", newRouteSubmit);
  //Handle SAVE USER button
  $("#saveUser").on("click", newUserSubmit);
  //Handle UPDATE USER button
  $("#user-render").on("click", ".btn-edit-user", updateUserModal);
  //Sends updated info to server and DB
  $("#user-update-modal").on("click", "#updateUser", editUserSubmit);
  //handle DELETE USER button
  $("#user-render").on("click", ".btn-delete-user", deleteUserModal);
  //Sends Request to delete user from DB
  $("#user-delete-modal").on("click", "#deleteUser", deleteUserSubmit);
  //When EDIT route is clicked, open MODAL
  $("#other-routes").on("click", "#edit-route", updateRouteModal);
  //Handle Save Button for Edited Route
  $("#route-update-modal").on("click", "#updateRoute", editRouteSubmit);
  //Handle Delete Route button
  $("#other-routes").on("click", "#delete-route", deleteRouteModal);
  //Handle DELETE confirmation button from DELETE modal
  $("#route-delete-modal").on("click", "#deleteRoute", deleteRouteSubmit);
});

//Submit the new user to be CREATED
function newUserSubmit(e) {
  e.preventDefault();
  var $modal = $("#userForm");
  var $firstNameField = $modal.find("#firstName");
  var $lastNameField = $modal.find("#lastName");
  // var $usernameField = $modal.find("#username");
  var $bikeStyleField = $modal.find("#bikeStyle");
  // var $passwordField = $modal.find("#password");
  var $ageField = $modal.find("#age");

  var userToPost = {
    first_name: $firstNameField.val(),
    last_name: $lastNameField.val(),
    // username: $usernameField.val(),
    bike_style: $bikeStyleField.val(),
    // password: $passwordField.val(),
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
    $passwordField.val("");
  });
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

//Response after clicking delete user
function handleUserUpdateResponse(data) {
  console.log("Response to update", data);

  let updatedUserId = data._id;
  console.log(updatedUserId);

  clearDom();

  renderNewUpdatedUser(data);
}

//When DELETE USER button is clicked
function deleteUserSubmit(data) {
  console.log("deletion loads until here");
  data.preventDefault();
  let userId = $(this)
    .parents("#userDeleteModal")
    .data("user-id");
  console.log("This user is going to be deleted", userId);

  $("#userDeleteModal").modal("hide");

  $.ajax({
    url: "/api/users/" + userId,
    method: "DELETE",
    success: handleDeleteUserResponse
  });
}

//Delete user Response
function handleDeleteUserResponse(data) {
  var deleteUserId = data._id;
  console.log("Removing this user", deleteUserId);
  $("div[data-user-id=" + deleteUserId + "]").remove();

  clearDom();

  renderOneUser();
}

//Creates a new ROUTE on DATABASE
function newRouteSubmit(e) {
  e.preventDefault();
  var $modal = $("#routeForm");
  var $routeNameField = $modal.find("#routeName");
  var $startLatField = $modal.find("#startLat");
  var $startLonField = $modal.find("#startLon");
  var $endLatField = $modal.find("#endLat");
  var $endLonField = $modal.find("#endLon");
  var $prosField = $modal.find("#pros");
  var $consField = $modal.find("#cons");

  var routeToPost = {
    route_name: $routeNameField.val(),
    start_point: $startLatField.val(),
    end_point: $startLonField.val(),
    waypointOne: $endLatField.val(),
    waypointTwo: $endLonField.val(),
    pros: $prosField.val(),
    cons: $consField.val()
  };

  console.log("route to post", routeToPost);

  var routePostToServer = "/api/routes";

  $.post(routePostToServer, routeToPost, function(data) {
    console.log("Received data from post to /routes", data);

    //Clear form
    $routeNameField.val("");
    $startLatField.val("");
    $startLonField.val("");
    $endLatField.val("");
    $endLonField.val("");
    $prosField.val("");
    $consField.val("");

    $("#routeModal").modal();
  });
}

//When DELETE USER button is clicked
function deleteRouteSubmit(data) {
  console.log("deletion loads until here");
  data.preventDefault();
  let routeId = $(this)
    .parents("#routeDeleteModal")
    .data("route-id");
  console.log("This route is going to be deleted", routeId);

  $("#routeDeleteModal").modal("hide");

  $.ajax({
    url: "/api/routes/" + routeId,
    method: "DELETE",
    success: location.reload()
  });
}

//CLEAR THE DOM
function clearDom() {
  $("#map div").html("");
  //$("#nav-bar div").html("");
  $("#user-render div").html("");
  $("#floating-panel div").html("");
  $("#user-update-modal div").html("");
}
