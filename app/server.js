require('dotenv').config();

const express = require("express");
const next = require("next");
const mysql = require('mysql2');
const cors = require("cors");
const crypto = require('crypto');

// Check if we are in development mode
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();
const port = process.env.PORT || 8989;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MySQL Database
const con = mysql.createConnection({
    host: "localhost",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE_NAME
});

con.connect(err => {
    if (err) {
        console.log("Error connecting to db ", err);
    } else {
        console.log("Connected to the database!");
    }
});

// Function to hash passwords
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Function to handle error responses
function handleErrorResponse(reqURL, res) {
    console.log("Error: " + reqURL);
    res.status(500).json({ error: "Error querying " + reqURL });
}

// Function to check request body
function checkReq(req, res) {
    if (!req.body) {
        return res.status(400).json({ error: "No data sent" });
    }
}

// API Endpoints
app.get("/", (req, res) => {
    res.send("Welcome");
});

// Select Brand Name for navigation
app.get("/selectBrandName", (req, res) => {
    const query = "SELECT BrandName FROM SystemConfig";
    con.query(query, (error, results) => {
        if (error) {
            return handleErrorResponse(req.originalUrl, res);
        }
        res.json(results);
    });
});

// Select TradeMark Name
app.get("/getTrademarkName", (req, res) => {
    const query = "SELECT TradeMarkName FROM SystemConfig";
    con.query(query, (error, results) => {
        if (error) {
            return handleErrorResponse(req.originalUrl, res);
        }
        res.status(200).json(results);
    });
});

// Submit Form
app.post('/submitForm', (req, res) => {
    checkReq(req, res);
    const { name, number, comment } = req.body;
    const query = "INSERT INTO ContactTickets (Name, ContactNumber, Comment) VALUES (?, ?, ?)";
    con.query(query, [name, number, comment], (error, result) => {
        if (error) {
            return handleErrorResponse(req.originalUrl, res);
        }
        res.status(200).json({ message: "Form Submitted Successfully", result });
    });
});

// Admin Login Form
app.get('/loginAdminForm', (req, res) => {
    checkReq(req, res);
    const { username, password } = req.query;
    const hashedPassword = hashPassword(password);

    const query = 'SELECT username, password, admin FROM Users WHERE username = ? AND password = ?';
    con.query(query, [username, hashedPassword], (error, result) => {
        if (error) {
            return handleErrorResponse(req.originalUrl, res);
        }
        res.status(200).json({ type: 'success', message: 'Record retrieved', result });
    });
});

// Get All Tickets
app.get("/retrieveTicket", (req, res) => {
    checkReq(req, res);
    const query = 'SELECT * FROM ContactTickets';
    con.query(query, (error, results) => {
        if (error) {
            return handleErrorResponse(req.originalUrl, res);
        }
        res.status(200).json({ Success: "Successfully got tickets", Result: results });
    });
});

// Delete Ticket
app.delete("/deleteTicket", (req, res) => {
    checkReq(req, res);
    const id = req.query.id;
    const query = 'DELETE FROM ContactTickets WHERE id = ?';
    con.query(query, [id], (error, results) => {
        if (error) {
            return handleErrorResponse(req.originalUrl, res);
        }
        res.status(200).json({ message: "Successfully deleted ticket", results });
    });
});

// Insert Into Deleted Comments
app.post("/InsertIntoDeletedComments", (req, res) => {
    checkReq(req, res);
    const { id, Name, ContactNumber, Comment } = req.body;
    const query = 'INSERT INTO DeletedTicket (id, Name, ContactNumber, Comment) VALUES (?, ?, ?, ?)';
    con.query(query, [id, Name, ContactNumber, Comment], (error, results) => {
        if (error) {
            return handleErrorResponse(req.originalUrl, res);
        }
        res.status(200).json({ message: "Successfully inserted into deleted comments", results });
    });
});

// Get Assignee List
app.get("/getAssigneeList", (req, res) => {
    checkReq(req, res);
    const query = 'SELECT name, id FROM AssignmentUsers';
    con.query(query, (error, results) => {
        if (error) {
            return handleErrorResponse(req.originalUrl, res);
        }
        res.status(200).json({ Success: "Successfully got assignees", results });
    });
});

// Retrieve Deleted Tickets
app.get("/retrieveDeletedTickets", (req, res) => {
    checkReq(req, res);
    const query = 'SELECT * FROM DeletedTicket';
    con.query(query, (error, results) => {
        if (error) {
            return handleErrorResponse(req.originalUrl, res);
        }
        res.status(200).json({ Success: "Successfully retrieved deleted tickets", results });
    });
});

// Insert Audit Log
app.post("/InsertAuditLog", (req, res) => {
    checkReq(req, res);
    const { username, attempt_date, action } = req.body;
    const query = 'INSERT INTO audit_log (username, attempt_date, action) VALUES (?, ?, ?)';
    con.query(query, [username, attempt_date, action], (error, results) => {
        if (error) {
            return handleErrorResponse(req.originalUrl, res);
        }
        res.status(200).json({ message: "Successfully inserted audit log", results });
    });
});

// Archive Ticket
app.post("/archiveTicket", (req, res) => {
    checkReq(req, res);
    const { Name, ContactNumber, Comment, Assignee } = req.body;
    const contactNumberInt = parseInt(ContactNumber, 10);

    const query = "INSERT INTO ArchivedTickets (Name, ContactNumber, Comment, Asignee) VALUES (?, ?, ?, ?)";
    con.query(query, [Name, contactNumberInt, Comment, Assignee], (error, results) => {
        if (error) {
            return handleErrorResponse(req.originalUrl, res);
        }
        res.status(200).json({ message: "Successfully Archived Ticket", results });
    });
});

// Get Settings
app.get('/getSettings', (req, res) => {
    checkReq(req, res);
    const { Code } = req.query;
    const query = 'SELECT Code, Active FROM SETTINGS WHERE Code = ? LIMIT 1';
    con.query(query, [Code], (error, results) => {
        if (error) {
            return handleErrorResponse(req.originalUrl, res);
        }
        res.status(200).json({ Success: "Successfully got settings", results });
    });
});

// Handle Next.js pages and API requests
app.all('*', (req, res) => {
    return handle(req, res);
});

// Start the Next.js app
nextApp.prepare().then(() => {
    app.listen(port, (err) => {
        if (err) throw err;
        console.log(`Server running at http://localhost:${port}`);
    });
});
