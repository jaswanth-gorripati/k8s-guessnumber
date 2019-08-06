const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const keys = require('./keys');

let host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;
let app = express();
app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// // Postgres Client Setup
// const { Pool } = require('pg');
// const pgClient = new Pool({
//     user: keys.pgUser,
//     host: keys.pgHost,
//     database: keys.pgDatabase,
//     password: keys.pgPassword,
//     port: keys.pgPort
// });
// pgClient.on('error', () => console.log('Lost PG connection'));

// pgClient
//     .query('CREATE TABLE IF NOT EXISTS rgn (rgnfor VARCHAR,number INT)')
//     .catch(err => console.log(err));

// Redis Client Setup
const redis = require('redis');
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});
const redisPublisher = redisClient.duplicate();

var t1 = 0;
var t1random;
app.listen(port, host, function(err, data) {
    if (err) {
        console.log("Cannot start the sever ")
    } else {
        console.log("server started at http://" + host + ":" + port)
    }
})
app.get("/", function(req, res) {
    res.send(" slash App working ")
})

app.get("/api/", function(req, res) {
    res.send(" api App working ")
})

app.post("/sett1value", function(req, res) {
    t1 = 0;
    t1random = Math.floor(Math.random() * 100) + 1
    console.log(t1random)
    redisClient.flushall()
        // pgClient.query('DELETE FROM rgn WHERE rgnfor=$1', ["t1rn"])
        // pgClient.query('INSERT INTO rgn(rgnfor,number) VALUES($1,$2)', ["t1rn", t1random]);
    res.status(200).send(true)
})

app.post("/guessNumber", async function(req, res) {
    t1 += 1;
    let number = req.body.number
        //let rowsfrom = await pgClient.query('SELECT number FROM rgn WHERE rgnfor=$1', ["t1rn"]);
        //t1random = rowsfrom.rows[0].number
    console.log(t1random)
        //let hintStr = number <= t1random ? "lesser" : "greater"
    let hintStr = (number < t1random) ? "lesser" : ((number > t1random) ? "greater" : "equals")
    if (t1 < 10 && hintStr != "equals") {
        redisClient.hset('t1en', number, hintStr);
        res.status(200).send({ "result": "Entered number " + number + " is " + hintStr + " than the Random number, AND YOU ONLY  GOT " + (10 - t1) + " chances left" })
    } else {
        t1 = 0;
        t1random = Math.floor(Math.random() * 100) + 1
            // pgClient.query('DELETE FROM rgn WHERE rgnfor=$1', ["t1rn"])
            // pgClient.query('INSERT INTO rgn(rgnfor,number) VALUES($1,$2)', ["t1rn", newt1random]);
        redisClient.flushall()
        res.status(200).send({ "result": "Congratulations" })
    }
})

app.get("/entered", async function(req, res) {
    console.log("entered")
    await redisClient.hgetall('t1en', (err, values) => {
        console.log(values)
        if (err) {
            res.send({ "result": err })
        } else {
            res.send({ "result": values });
        }

    });
})