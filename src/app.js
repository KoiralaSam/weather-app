const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

//Define path for express config
const viewPath = path.join(__dirname, "../template/views");
const publicDirPath = path.join(__dirname, "../public");
const partialDirPath = path.join(__dirname, "../template/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

hbs.registerPartials(partialDirPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Samarpan Koirala",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Samarpan Koirala",
  });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help", name: "Samarpan Koirala" });
});

app.get("/weather", async (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address",
    });
  }
  await geocode(
    req.query.address,
    async (error, { lattitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      await forecast(lattitude, longitude, (error, forecast) => {
        if (error) {
          return res.send({
            error: error,
          });
        }
        res.send({
          address: req.query.address,
          location,
          forecast: `It is ${forecast.weather_descriptions[0]}. It is currently ${forecast.temperature} degrees out. There is a ${forecast.precip}% chance of rain.`,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Samarpan Koirala",
    errorMessage: "ARTICLE PAGE NOT FOUND",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Samarpan Koirala",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
