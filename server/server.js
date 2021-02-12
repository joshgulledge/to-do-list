// bring in express library
const express = require('express');
const app = express();

const port = 5000;

// make the static pages "public"
app.use(express.static('server/public'));

// let it read json and encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create the server listen function
app.listen(port, function () {
  console.log('Server is listening on ', port);
});
