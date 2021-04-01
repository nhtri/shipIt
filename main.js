var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
const { Pool } = require('pg')

//MySQL connection
// var connectionString = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'network'
// });


//var connectionString =
//    'postgres://shoizafidgsclk:5aa84844e16bc84b3b49e67a16e339957d289abafdcdf3ad3f48d1c2b4b2cccf@ec2-174-129-255-35.compute-1.amazonaws.com:5432/d7fu349nrp13qh'

app.use(cors());




const pool = new Pool({ connectionString,ssl: {
    rejectUnauthorized: false
  } })

module.exports = { pool }

//Body-parser configuration
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));



var server = app.listen(process.env.PORT || 3001);

//rest api to get all results
app.get('/wifi', function (req, res) {
    console.log(req);
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

    pool.query('select * from wifi', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});




