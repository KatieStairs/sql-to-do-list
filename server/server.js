// Importing the express node module:
const express = require('express');
const bodyParser = require('body-parser');

// Import the pool we configured. It lets us connect to our db:
const pool = require('./modules/pool.js');

// Using express to create an instance of an app (or server).
const app = express();

// Create a variable whose value is the port address.
const PORT = 5000;

// Teach our server how to read incoming data (req.body):
app.use(bodyParser.urlencoded({ extended: true }));
// Teach our server how to read incoming JSON data (req.body *from Postman*):
app.use(bodyParser.json())

// Tell our server where the static assets live:
app.use(express.static('server/public'));

app.get('/taskList', (req, res) => {
    console.log('in GET /taskList');
    let sqlQuery = `
        SELECT * FROM "taskList"
            ORDER BY "id";
    `;
    pool.query(sqlQuery)
        .then((dbRes) => {
            let dataFromTaskList = dbRes.rows;
            res.send(dataFromTaskList);
        })
        .catch((dbErr) => {
            res.sendStatus(500);
        })
})

app.post('/taskList', (req, res) => {
    console.log('in POST /taskList');
    console.log(req.body);
// Dummy Data for client.js:
    let sqlQuery = `
        INSERT INTO "taskList"
        ("task", "complete")
        VALUES
        ($1, $2);
    `
    let sqlValues = [req.body.task, req.body.complete];
    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((dbErr) => {
            console.log('Err in POST /taskList', dbErr);
            res.sendStatus(500)
        })
})

app.put('/taskList/:id', (req, res) => {
    console.log('req.params:', req.params);
    console.log('req.body:', req.body);

    let idToUpdate = req.params.id;
    let taskComplete = req.body.complete;

    let sqlQuery = `
        UPDATE "taskList"
            SET "complete"=$1
            WHERE "id"=$2;
    `
    let sqlValues = [taskComplete, idToUpdate];

    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {
            res.sendStatus(200);
        })
        .catch((dbErr) => {
            console.log('something happened in PUT /taskList/:id', dbErr);
            res.sendStatus(500);
        })
})

app.delete('/taskList/:id', (req, res) => {
    console.log(req.params);
    let idToDelete = req.params.id;

    let sqlQuery = `
        DELETE FROM "taskList"
            WHERE "id"=$1;
    `
    let sqlValues = [idToDelete];
    pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
        res.sendStatus(200);
    })
    .catch((dbErr) => {
        console.log('something happened in DELETE /taskList/:id', dbErr);
        res.sendStatus(500);
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})