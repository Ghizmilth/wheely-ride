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

  //Handle SAVE USER button
  $("#userForm").on("click", "#saveUser", newUserSubmit);
  //Handle UPDATE USER button
  $("#user-render").on("click", ".btn-edit-user", updateUserModal);
  //Sends updated info to server and DB
  $("#user-update-modal").on("click", "#updateUser", editUserSubmit);
  //handle DELETE USER button
  $("#user-render").on("click", ".btn-delete-user", deleteUserModal);
  //Sends Request to delete user from DB
  $("#user-delete-modal").on("click", "#deleteUser", deleteUserSubmit);
});

//render map on HTML
function renderRoutes(data) {
  initMap();
}

//Submit the new user to be CREATED
function newUserSubmit(e) {
  e.preventDefault();
  var $modal = $("#userForm");
  var $firstNameField = $modal.find("#firstName");
  var $lastNameField = $modal.find("#lastName");
  var $usernameField = $modal.find("#username");
  var $bikeStyleField = $modal.find("#bikeStyle");
  var $passwordField = $modal.find("#password");
  var $ageField = $modal.find("#age");

  var userToPost = {
    first_name: $firstNameField.val(),
    last_name: $lastNameField.val(),
    username: $usernameField.val(),
    bike_style: $bikeStyleField.val(),
    password: $passwordField.val(),
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

    //passNewUserData(data);
  });
}

// function goToProfile(data) {
//   location.assign("/user_profile");
// }

//Passes new user data to be rendered when created Profile
// function passNewUserData(data) {
//   console.log("This is the data that will be used for profiles", data);
//   goToProfile();
//   $(".user-profile-name").append("Hidaner");
// }

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

//CLEAR THE DOM
function clearDom() {
  $("#map div").html("");
  //$("#nav-bar div").html("");
  $("#user-render div").html("");
  $("#floating-panel div").html("");
  $("#user-update-modal div").html("");
}
