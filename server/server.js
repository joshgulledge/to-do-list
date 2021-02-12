// bring in express library
const express = require('express');
const app = express();
const toDoRouter = require('./routes/toDoItems.js');

// make the static pages "public"
app.use(express.static('server/public'));

// let it read json and encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create the server listen function
const port = 5000;
app.listen(port, function () {
  console.log('Server is listening on ', port);
});

// use the router
app.use('/toDoItem', toDoRouter);
