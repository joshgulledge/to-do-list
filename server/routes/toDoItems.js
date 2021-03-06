const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// the "get" information call...
router.get('/', (req, res) => {
  // set the query that i know works
  let SQLtext = `SELECT * FROM "to_do_list"
  ORDER BY "id" ASC;`;

  // send the query to the DB
  pool
    .query(SQLtext)
    .then((dbRes) => {
      // send back results of the db query
      // this is an obj with "rows"
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    }); // this is the end of the db pool query
}); // END OF GET FUNCTION

// this will receive the inputs and send them to the dataBase
router.post('/postOnServer', (req, res) => {
  // the req is the obj from the client.
  // should like like display below function
  // console.log('req.body is:', req.body);

  // use this as a security from SQL injection
  let queryArg = [
    req.body.newTask.task_name,
    req.body.newTask.completion_time,
    req.body.newTask.complete,
  ];
  // this is the code we send to the db
  let SQLtext = `
  INSERT INTO "to_do_list"
  ("task_name", "completion_time", "complete")
  VALUES
  ($1, $2, $3);
  `;

  // send the stuff
  pool
    .query(SQLtext, queryArg)
    .then((dbRes) => {
      res.send('it worked');
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
}); // END POST FUNCTION

/*
{
  newTask: {
    task_name: someNameHere
    completion_time: someNumberHere
    complete: false
  }
}
*/

router.delete('/:id', (req, res) => {
  // grab the id of task that was clicked
  let taskId = req.params.id;

  // console.log('task id is ', taskId);

  // the SQL code for the database
  let SQLtext = `
  DELETE FROM "to_do_list"
  WHERE "id"=$1
  `;

  // actually send to the db
  pool
    .query(SQLtext, [taskId])
    .then((dbRes) => {
      // console.log('dbRes', dbRes);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  const taskId = req.params.id;

  // console.log(req.body.isComplete);
  const newValue = `${req.body.isComplete === 'true' ? 'false' : 'true'}`;

  const SQLtext = `
  UPDATE "to_do_list"
  SET "complete" = $1
  WHERE "id" = $2
  `;

  pool
    .query(SQLtext, [newValue, taskId])
    .then((dbRes) => {
      // console.log('dbRes', dbRes);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = router;
