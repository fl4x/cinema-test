const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const cinemasController = require('./controllers/cinemasController');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', cinemasController);

app.listen(port, () => {
  console.log("Cinema server is running on port: localhost: " + port);
});