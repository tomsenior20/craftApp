require('dotenv').config();

const express = require("express");
const next = require("next");
// const mysql = require('mysql2/promise'); // Use promise-based MySQL library
const sqlite3 = require('sqlite3').verbose();
const cors = require("cors");
const crypto = require('crypto');

// Check if we are in development mode
const dev = process.env.NODE_ENV !== "production";

const app = express();
const port = process.env.PORT || 8989;

// Middleware
app.use(cors());
app.use(express.json());

// Create a connection pool for MySQL Database
// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE_NAME
// });

const db = new sqlite3.Database('/app/database/database.db', (error) => {
    if (error) {
        console.log("Error Connecting to database");
    } else {
        console.log("Connected to the database");
    }
})


// Function to hash passwords
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Function to handle error responses
function handleErrorResponse(reqURL, res, error) {
    console.error("Error querying " + reqURL + ": ", error);
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
app.get("/selectBrandName", async (req, res) => {
    const query = "SELECT BrandName FROM SystemConfig";
    try {
        const [results] = await pool.query(query);
        res.json(results);
    } catch (error) {
        return handleErrorResponse(req.originalUrl, res, error);
    }
});

// Select TradeMark Name
app.get("/getTrademarkName", async (req, res) => {
    const query = "SELECT TradeMarkName FROM SystemConfig";
    try {
        const [results] = await pool.query(query);
        res.status(200).json(results);
    } catch (error) {
        return handleErrorResponse(req.originalUrl, res, error);
    }
});

// Submit Form
app.post('/submitForm', async (req, res) => {
    checkReq(req, res);
    const { name, number, comment } = req.body;
    const query = "INSERT INTO ContactTickets (Name, ContactNumber, Comment) VALUES (?, ?, ?)";
    try {
        const [result] = await pool.query(query, [name, number, comment]);
        res.status(200).json({ message: "Form Submitted Successfully", result });
    } catch (error) {
        return handleErrorResponse(req.originalUrl, res, error);
    }
});

// Admin Login Form
app.get('/loginAdminForm', async (req, res) => {
    checkReq(req, res);
    const { username, password } = req.query;
    const hashedPassword = hashPassword(password);
    const query = 'SELECT username, password, admin FROM Users WHERE username = ? AND password = ?';
    try {
        const [result] = await pool.query(query, [username, hashedPassword]);
        res.status(200).json({ type: 'success', message: 'Record retrieved', result });
    } catch (error) {
        return handleErrorResponse(req.originalUrl, res, error);
    }
});

// Get All Tickets
app.get("/retrieveTicket", async (req, res) => {
    const query = 'SELECT * FROM ContactTickets';
    try {
        const [results] = await pool.query(query);
        res.status(200).json({ Success: "Successfully got tickets", Result: results });
    } catch (error) {
        return handleErrorResponse(req.originalUrl, res, error);
    }
});

// Delete Ticket
app.delete("/deleteTicket", async (req, res) => {
    checkReq(req, res);
    const id = req.query.id;
    const query = 'DELETE FROM ContactTickets WHERE id = ?';
    try {
        const [results] = await pool.query(query, [id]);
        res.status(200).json({ message: "Successfully deleted ticket", results });
    } catch (error) {
        return handleErrorResponse(req.originalUrl, res, error);
    }
});

// Insert Into Deleted Comments
app.post("/InsertIntoDeletedComments", async (req, res) => {
    checkReq(req, res);
    const { id, Name, ContactNumber, Comment } = req.body;
    const query = 'INSERT INTO DeletedTicket (id, Name, ContactNumber, Comment) VALUES (?, ?, ?, ?)';
    try {
        const [results] = await pool.query(query, [id, Name, ContactNumber, Comment]);
        res.status(200).json({ message: "Successfully inserted into deleted comments", results });
    } catch (error) {
        return handleErrorResponse(req.originalUrl, res, error);
    }
});

// Get Assignee List
app.get("/getAssigneeList", async (req, res) => {
    const query = 'SELECT name, id FROM AssignmentUsers';
    try {
        const [results] = await pool.query(query);
        res.status(200).json({ Success: "Successfully got assignees", results });
    } catch (error) {
        return handleErrorResponse(req.originalUrl, res, error);
    }
});

// Retrieve Deleted Tickets
app.get("/retrieveDeletedTickets", async (req, res) => {
    const query = 'SELECT * FROM DeletedTicket';
    try {
        const [results] = await pool.query(query);
        res.status(200).json({ Success: "Successfully retrieved deleted tickets", results });
    } catch (error) {
        return handleErrorResponse(req.originalUrl, res, error);
    }
});

// Insert Audit Log
app.post("/InsertAuditLog", async (req, res) => {
    checkReq(req, res);
    const { username, attempt_date, action } = req.body;
    const query = 'INSERT INTO audit_log (username, attempt_date, action) VALUES (?, ?, ?)';
    try {
        const [results] = await pool.query(query, [username, attempt_date, action]);
        res.status(200).json({ message: "Successfully inserted audit log", results });
    } catch (error) {
        return handleErrorResponse(req.originalUrl, res, error);
    }
});

// Archive Ticket
app.post("/archiveTicket", async (req, res) => {
    checkReq(req, res);
    const { Name, ContactNumber, Comment, Assignee } = req.body;
    const contactNumberInt = parseInt(ContactNumber, 10);
    const query = "INSERT INTO ArchivedTickets (Name, ContactNumber, Comment, Asignee) VALUES (?, ?, ?, ?)";
    try {
        const [results] = await pool.query(query, [Name, contactNumberInt, Comment, Assignee]);
        res.status(200).json({ message: "Successfully Archived Ticket", results });
    } catch (error) {
        return handleErrorResponse(req.originalUrl, res, error);
    }
});

// Get Settings
app.get('/getSettings', async (req, res) => {
    checkReq(req, res);
    const { Code } = req.query;
    const query = 'SELECT Code, Active FROM SETTINGS WHERE Code = ? LIMIT 1';
    try {
        const [results] = await pool.query(query, [Code]);
        res.status(200).json({ Success: "Successfully got settings", results });
    } catch (error) {
        return handleErrorResponse(req.originalUrl, res, error);
    }
});

const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


// Get Archive API Call.
app.get('/getArchiveTicket', async (req, res) => {
    checkReq(req, res);
    const query = 'SELECT * from ArchivedTickets';
    try {
        const [results] = await pool.query(query);
        res.status(200).json({ Success: "Successfully got Archived Tickets", results });
    } catch (error) {
        return handleErrorResponse(req.originalUrl, res, error);
    }
});

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    if (server) {
        server.close(() => {
            console.log('HTTP server closed');
            process.exit(0);
        });
    } else {
        console.log('Server is not initialized.');
        process.exit(1);
    }
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    if (server) {
        server.close(() => {
            console.log('HTTP server closed');
            process.exit(0);
        });
    } else {
        console.log('Server is not initialized.');
        process.exit(1);
    }
});