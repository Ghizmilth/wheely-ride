function index(req, res) {
  res.json({
    message: "Welcome to Wheely Ride",
    documentation: "https://github.com/Ghizmilth/wheely-ride",
    base_url: "localhost:3000",
    endpoints: [
      {
        method: "GET",
        path: "/api",
        description: "Describes available endpoints"
      }
    ]
  });
}

module.exports = {
  index: index
};
