const path = require("path");
const express = require("express");
const hbs = require("hbs");

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

app.get("/weather", (req, res) => {
  res.send({
    location: "Monroe, Louisiana",
    forecast: "Mostly sunny with a high of 85°F",
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
