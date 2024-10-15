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

function handleErrorResponse(reqURL, res) {
    console.log("Error: " + reqURL);
    res.status(500).json({ error: "Error querying " + reqURL });
}

function checkReq(req, res) {
    if (!req.body) {
        return res.status(400).json({ error: "No data sent" });
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

app.post("/InsertIntoDeletedComments", (req, res) => {
    checkReq(req);
    const { id, Name, ContactNumber, Comment } = req.body;
    const query = 'INSERT INTO DeletedTicket (id, Name, ContactNumber, Comment) values(?, ?, ?, ?)';

    con.query(query, [id, Name, ContactNumber, Comment], (error, success) => {
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

app.get("/retrieveDeletedTickets", (req, res) => {
    checkReq(req);
    const query = 'select * from DeletedTicket';
    con.query(query, (error, result) => {
        (error) ? handleErrorResponse(req.originalUrl, res) : res.status(200).json({ Success: "Successfully got tickets", result })
    })
})

app.post("/InsertAuditLog", (req, res) => {
    checkReq(req, res);
    const { username, attempt_date, action } = req.body;
    const query = 'INSERT INTO audit_log (username, attempt_date, action) values(?, ? , ?)';
    con.query(query, [username, attempt_date, action], (error, success) => {
        (error) ? handleErrorResponse(req.originalUrl, res, error) : res.status(200).json({ message: "Successfully inserted audit", success });
    });
});

app.post("/archiveTicket", (req, res) => {
    checkReq(req, res);
    const { Name, ContactNumber, Comment, Asignee } = req.body;
    const query = "INSERT INTO ArchivedTickets (Name,ContactNumber, Comment,Asigneee) values(?,?,?,?)";
    con.query(query, [Name, ContactNumber, Comment, Asignee], (error, success) => {
        (error) ? handleErrorResponse(req.originalUrl, res, error) : res.status(200).json({ message: "Successfully Archived Ticket", success });
    })
})