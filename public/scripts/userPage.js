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
            <button type="button" class="btn edit-city" data-city-id="${user[0]
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

  initMap();

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
