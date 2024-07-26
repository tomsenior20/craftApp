const http = require("http");
var mysql = require('mysql');
var express = require("express");
require('dotenv').config();
const cors = require("cors");

const app = express();
const port = 3010;

app.get("/", (req, res) => {
    res.send("welcome");
});

app.use(cors());


app.listen(port, () => {
    console.log(`Server running at ${port}`);
});


var con = mysql.createConnection({
    host: "localhost",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE_NAME
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


// Select Brand Name for nav
app.get("/selectBrandName", (req, res) => {
    const query = "select BrandName from SystemConfig";
    con.query(query, (error, success) => {
        if (error) {
            console.log("Error when querying for brandname");
            res.status(500).json({ error: "Error Querying BrandName" })
        }
        else {
            res.json(success);
        }
    })
})

// Select TradeMark Name
app.get("/getTrademarkName", (req, res) => {
    const query = "select TradeMarkName from SystemConfig";
    con.query(query, (error, success) => {
        if (error) {
            console.log("Error Querying TradmarkName Query");
            res.status(500).json({ error: "Error Querying Trademarkname" })
        }
        else {
            res.json(success);
        }
    })
})