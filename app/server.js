require('dotenv').config();

const http = require("http");
var mysql = require('mysql2');
var express = require("express");
const crypto = require('crypto');
const cors = require("cors");
const { error } = require('console');

const app = express();
const port = process.env.PORT || 3010;

app.get("/", (req, res) => {
    res.send("welcome");
});

app.use(cors());
app.use(express.json())

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
    (err) ? console.log("Error connecting to db ", err) : console.log("Connected!");
});

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function handleErrorResponse(reqURL) {
    console.log("Error: " + reqURL);
    res.status(500).json({ error: "Error querying " + reqURL });
}

function checkReq(req, res) {
    if (!req.body || !req.query) {
        return res.status(500).json({ error: "no data sent for " + method });
    }
}

// Select Brand Name for nav
app.get("/selectBrandName", (req, res) => {
    const query = "select BrandName from SystemConfig";
    con.query(query, (error, success) => {
        (error) ? handleErrorResponse(req.originalUrl, res) : res.json(success);
    })
})

// Select TradeMark Name
app.get("/getTrademarkName", (req, res) => {
    const query = "select TradeMarkName from SystemConfig";
    con.query(query, (error, success) => {
        (error) ? handleErrorResponse(req.originalUrl, res) : res.status(200).json(success);
    })
})


app.post('/submitForm', (req, res) => {
    checkReq(req);
    const { name, number, comment } = req.body;
    const query = "insert into ContactTickets(Name,ContactNumber,Comment) values(?,?,?)";

    con.query(query, [name, number, comment], (error, result) => {
        (error) ? handleErrorResponse(req.originalUrl) : res.status(200).json({ message: "Form Submitted Successfully", result })
    })
})

// Submit Form (Admin Form)
app.get('/loginAdminForm', (req, res) => {
    checkReq(req);
    const { username, password } = req.query;
    const hashedPassword = hashPassword(password);

    const query = 'select username,password,admin from Users where username = ? and password = ?';
    con.query(query, [username, hashedPassword], (error, result) => {
        (error) ? handleErrorResponse(req.originalUrl, res) : res.status(200).json({ type: 'success', message: 'Record retrieved', result });
    })
});

// Get All Tickets
app.get("/retrieveTicket", (req, res) => {
    checkReq(req);
    const query = 'select * from ContactTickets';
    con.query(query, (error, success) => {
        (error) ? handleErrorResponse(req.originalUrl, res) : res.status(200).json({ Success: "Successfully got tickets", Result: success })
    })
})

app.delete("/deleteTicket", (req, res) => {
    checkReq(req);
    const id = req.query.id;
    const query = 'delete from ContactTickets where id = ?'
    con.query(query, [id], (error, success) => {
        (error) ? handleErrorResponse(req.originalUrl, res) : res.status(200).json({ message: "Successfully deleted ticket", success });
    })
})

app.get("/getAssigneeList", (req, res) => {
    checkReq(req);
    const query = 'select name,id from AssignmentUsers';
    con.query(query, (error, result) => {
        (error) ? handleErrorResponse(req.originalUrl, res) : res.status(200).json({ Success: "Successfully got tickets", result })
    })
})