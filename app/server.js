const http = require("http");
var mysql = require('mysql');
var express = require("express");
require('dotenv').config();

const app = express();
const port = 3010;

app.get("/", (req, res) => {
    res.send("welcome");
});


app.listen(port, () => {
    console.log(`Server running at ${port}`);
});


var con = mysql.createConnection({
    host: "localhost",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    Database: process.env.MYSQL_DATABASE_NAME
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});