const request = require("postman-request");

const geocode = (address, callback) => {
  const geocodeURl =
    "https://api.mapbox.com/search/geocode/v6/forward?q=" +
    encodeURIComponent(address) +
    "&access_token=pk.eyJ1Ijoic2FtYXJwYW5rb2lyYWxhIiwiYSI6ImNtNmJlc2x0YTA3Zm0ybHEzazVxZDVpY24ifQ.ZJMFbDaSF-g8lUpLgggQNg";

  request({ url: geocodeURl, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const lattitude = body.features[0].geometry.coordinates[1];
      const longitude = body.features[0].geometry.coordinates[0];
      callback(undefined, {
        lattitude,
        longitude,
        location: body.features[0].properties.full_address,
      });
    }
  });
};
module.exports = geocode;
