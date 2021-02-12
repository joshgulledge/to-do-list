const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// the "get" information call...
router.get('/', (req, res) => {
  // set the query that i know works
  let sqlText = `SELECT * FROM "to_do_list";`;

  // send the query to the DB
  pool
    .query(sqlText)
    .then((dbRes) => {
      // send back results of the db query
      // this is an obj with "rows"
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    }); // this is the end of the db pool query
}); // end of the get call from client

module.exports = router;
