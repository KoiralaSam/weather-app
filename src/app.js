const path = require("path");
const express = require("express");

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.static(path.join(__dirname, "../public")));

app.get("/weather", (req, res) => {
  res.send({
    location: "Monroe, Louisiana",
    forecast: "Mostly sunny with a high of 85°F",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
