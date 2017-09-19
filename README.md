# wheely-ride

# biking-app

This is a Bike Riding app that allows people to explore interesting bike rides around their area with different difficulty levels. All the outes are created by the riders. This app is specially helpful for those visitors who don;t know the area very well and would love to find an easy way to find a route they like and can enjoy. It will help people explore new areas and challenge themselves on a sport they like.

[Heroku app link](https://wheely-app.herokuapp.com/)

### Technologies Used

- Express.js
- Node.js
- HTML
- CSS
- Google Maps API
- Express
- MongoDB
- Bootstrap Wireframes

### Installation steps

- Open ```terminal``` in your computer
- Fork this repo and clone to your prefered working directory by using ```git clone https://github.com/Ghizmilth/wheely-ride.git```
- use ```npm init``` to initiate your app
- Then install packages ```npm install --save express mongoose bower bootstrap cookie parser body-parser```
- To run your app, ```mongod``` and ```node server.js```
- Go to your browser and open ```http://localhost:3000/```
-

### User Stories

- Users will be able to see a honme page with bike ride challenges
- Users won't need to be logged in to access information about the ride
- Users will be able to see the routes on a map and be able to select the marker of the area they would like to try
- Once the have selected, they will be able to see detailed information about the route: miles, climing ft, pros and cons
- Website will be accessible without an user name or account
- Users will be able to post a route of preference and make it public for people to explore
- Users will be able to post see bike riding tips 


### Wireframes:

- [Home Page](https://i.imgur.com/VEXjiq0.png)
- [Explore Routes](https://i.imgur.com/u2ifJa5.png)
- [Create Route](https://i.imgur.com/XRoFDPJ.png)
- [Biking Info](https://i.imgur.com/94NU7LI.png)
- [About Page](https://i.imgur.com/qPtCZyX.png)

### Data Models:

[Data Model](https://i.imgur.com/d0GGSTs.png)

### Unsolved problems

- Auth using passport is not completed, part of its dependencies are intalled and it only worked for the main page 
  that it was installed on.
- Sessions would not keep opened after switching to another page
- Handlebars or other EJS file system is required to keep an active session using Passport

### Future Features
- Add an user account
- Add map altitude feature
- Add map GPS tracking
- Usability on an Phone App
- Share time and date of rides from registered users to registered users



