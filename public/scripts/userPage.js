//**RENDERS ONE USER PROFILE ON PAGE
function renderOneUser(user) {
  console.log("user goes here");

  //user.routesHtml = user[0].routes.map(oneRoute).join("");

  var oneUser = `
  <div class="container">
      <div class="row city" data-city-id="${user[0]._id}">
          <div class="row"
            <div class="col-md-12" id="style-city">
              <h2>${user[0].first_name} ${user[0].last_name}</h2>
            </div>
          </div>

        <div class="user-info">
          <div class="row">
            <div class="col-md-12" id="user-facts">
                <ul id="edit-list">
                    <li id="coordinatesInfo">Username: ${user[0].username}</li>
                    <li id="cityPopulation">Bike Style: ${user[0]
                      .bike_style}</li>
                    <li id="cityArea">Age: ${user[0].age}</li>
                </ul>
            </div>
          </div>
        </div>
        <div class="edition-button">
            <button type="button" class="btn btn-edit-user" data-user-id="${user[0]
              ._id}">Update User
            </button>
        </div>

        <hr/>
          <h3>My Routes</h3>
        <div class="row" id="clear-this-also">
            <button type="button" class="btn btn-add-route">Add a Route</button>
        </div>
        <hr>

        <div id="routes-render">
          <p>${user[0].routes[0].route_name}</P>
          <p>${user[0].routes[0].start_lat}</P>
          <p>${user[0].routes[0].start_lon}</P>
          <p>${user[0].routes[0].end_lat}</P>
          <p>${user[0].routes[0].end_lon}</P>
          <p>${user[0].routes[0].miles}</P>
          <p>${user[0].routes[0].climbing_ft}</P>
          <p>${user[0].routes[0].pros}</P>
          <p>${user[0].routes[0].cons}</P>
          <p>${user[0].routes[0].city}</P>
        </div>

      </div>
  </div>



  `;

  start_lat = `${user[0].routes[0].start_lat}`;
  start_lon = `${user[0].routes[0].start_lon}`;
  end_lat = `${user[0].routes[0].end_lat}`;
  end_lon = `${user[0].routes[0].end_lon}`;

  //initMap();

  $("#user-render").append(oneUser);
}

//Render One Route
// function oneLandmark(landmark) {
//   return `
//         <div class="container">
//           <div class="row">
//             <div class="col-md-3 col-sx-12 thumbnail landmark-photo" class="landmark-image">
//               <img src="${route.}">
//             </div>
//            <div class="col-md-12" id='style-city'>
//               <h2>${landmark.name}</h2>
//               <p>${landmark.address}</p>
//               <p>${landmark.comments}</P>
//        </div>
//       </div>
//      </div>
//      <hr>`;
// }

//**UPDATES USER INFORMATION WHEN UPDATE BUTTON IS CLICKED
function updateUserModal(user) {
  console.log(user);
  let $userUpdate = $(user.target);
  let userId = $userUpdate.data("user-id");
  console.log("edit user", userId);

  $.get("/api/users/" + userId, function(editUser) {
    console.log("got back the user object", editUser);

    let userToEdit = `<div class="container">
       <div class="modal" tabindex="-1" role="dialog" id="userUpdateModal" data-user-id="${editUser._id}">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Edit Rider Profile</h4>
              </div>
              <div class="modal-body">

                <fieldset class='form-horizontal'>

                  <div class="form-group">
                    <label class="col-md-4 control-label" for="firstName">First Name</label>
                    <div class="col-md-4">
                      <input id="firstName" name="firstName" type="text" placeholder="" value="${editUser.first_name}" class="form-control updated-first-name input-md" required="">
                    </div>
                  </div>


                  <div class="form-group">
                    <label class="col-md-4 control-label" for="lastName">Last Name</label>
                    <div class="col-md-4">
                      <input id="lastName" name="lastName" type="text" placeholder="" value="${editUser.last_name}" class="form-control updated-last-name input-md">
                    </div>
                  </div>


                  <div class="form-group">
                    <label class="col-md-4 control-label" for="username">Username</label>
                    <div class="col-md-4">
                      <input id="username" name="username" type="text" placeholder="" value="${editUser.username}" class="form-control updated-username input-md">
                    </div>
                  </div>


                  <div class="form-group">
                    <label class="col-md-4 control-label" for="bikeStyle">Bike Style</label>
                    <div class="col-md-4">
                      <input id="bikeStyle" name="bikeStyle" type="text" placeholder="" value="${editUser.bike_style}" class="form-control updated-bike-style input-md">
                    </div>
                  </div>


                  <div class="form-group">
                    <label class="col-md-4 control-label" for="age">Age</label>
                    <div class="col-md-4">
                      <input id="age" name="age" type="number" placeholder="" value="${editUser.age}" class="form-control updated-age input-md">
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
    $("#user-update-modal").prepend(userToEdit);

    //Calls modal to Show Up
    $("#userUpdateModal").modal();
  });
}

//Renders the updated info for the user
function renderNewUpdatedUser(newUser) {
  //confirm the user Id is correct
  let userId = newUser._id;
  console.log("rendering user", userId);
  //get informaton from the current user to be rendered
  clearDom();
  //user.routesHtml = newUser.routes.map(oneRoute).join("");
  var oneUserHtml = `
<div class="container">
    <div class="row city" data-city-id="${newUser._id}">
        <div class="row"
          <div class="col-md-12" id="style-city">
            <h2>${newUser.first_name} ${newUser.last_name}</h2>
          </div>
        </div>

      <div class="user-info">
        <div class="row">
          <div class="col-md-12" id="user-facts">
              <ul id="edit-list">
                  <li id="coordinatesInfo">Username: ${newUser.username}</li>
                  <li id="cityPopulation">Bike Style: ${newUser.bike_style}</li>
                  <li id="cityArea">Age: ${newUser.age}</li>
              </ul>
          </div>
        </div>
      </div>
      <div class="edition-button">
          <button type="button" class="btn btn-edit-user" data-user-id="${newUser._id}">Update User
          </button>
      </div>

      <hr/>
        <h3>My Routes</h3>
      <div class="row" id="clear-this-also">
          <button type="button" class="btn btn-add-route">Add a Route</button>
      </div>
      <hr>

      <div id="routes-render">
        <p>${newUser.routes[0].route_name}</P>
        <p>${newUser.routes[0].start_lat}</P>
        <p>${newUser.routes[0].start_lon}</P>
        <p>${newUser.routes[0].end_lat}</P>
        <p>${newUser.routes[0].end_lon}</P>
        <p>${newUser.routes[0].miles}</P>
        <p>${newUser.routes[0].climbing_ft}</P>
        <p>${newUser.routes[0].pros}</P>
        <p>${newUser.routes[0].cons}</P>
        <p>${newUser.routes[0].city}</P>
      </div>

    </div>
</div>`;

  start_lat = `${newUser.routes[1].start_lat}`;
  start_lon = `${newUser.routes[1].start_lon}`;
  end_lat = `${newUser.routes[1].end_lat}`;
  end_lon = `${newUser.routes[1].end_lon}`;

  initMap();

  $("#user-render").append(oneUserHtml);
}
