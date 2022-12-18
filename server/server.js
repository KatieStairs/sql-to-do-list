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
        SELECT * FROM "tasks"
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
        ("task")
        VALUES
        ($1);
    `
    let sqlValues = [req.body.name, req.body.type];
    

let taskToDo= [
    {
    task: 'wash dishes'
    },
    {
    task: 'do laundry'
    },
    {
    task: 'cook dinner'
    }
];
})



app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})