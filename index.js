require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});
// Exercice
let short = 1;
let listUrl = [];
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const jsonParser = bodyParser.json();
const handler = (req, res) => {
  // regex to update
  if (req.body.url.match(/https:\/\//)) {
    res.send({ original_url: req.body.url, short_url: short });
    short++;
    listUrl.push(req.body.url);
  } else res.send({ error: "invalid url" });
};
app.post("/api/shorturl", jsonParser, handler);

app.get("/api/shorturl/:text", (req, res) => {
  const getResult = parseInt(req.params.text);
  res.redirect(listUrl[getResult - 1]);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
