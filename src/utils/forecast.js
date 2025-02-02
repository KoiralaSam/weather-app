const request = require("postman-request");

const forecast = (lat, long, callback) => {
  const url =
    "https://api.weatherstack.com/current?access_key=a7fee0e4376e199506bd874b3e536ffa&query=" +
    lat +
    "," +
    long +
    "&units=m";
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback(
        `Unable to find weather. Error Code: ${body.error.code}`,
        undefined
      );
    } else {
      callback(undefined, body.current);
    }
  });
};

module.exports = forecast;
