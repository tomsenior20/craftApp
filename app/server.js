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
    if (err) {
        console.log("Error connecting to db ", err);
    } else {
        console.log("Connected!");
    }
});

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

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


app.post('/submitForm', (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: "No Data Sent" });
    }

    const { name, number, comment } = req.body;
    const query = "insert into ContactTickets(Name,ContactNumber,Comment) values(?,?,?)";
    con.query(query, [name, number, comment], (error, result) => {
        if (error) {
            console.log("error submitting form");
            res.status(500).json({ error: "Error submitting form" });
        }
        else {
            res.status(200).json({ message: "Form Submitted Successfully", result })
        }
    })
})

// Submit Form (Admin Form)
app.get('/loginAdminForm', (req, res) => {
    if (!req.query) {
        return res.status(400).json({ error: 'Failed to submit form' });
    }

    const { username, password } = req.query;
    const hashedPassword = hashPassword(password);

    const query = 'select username,password,admin from Users where username = ? and password = ?';

    con.query(query, [username, hashedPassword], (error, result) => {
        if (error) {
            console.log("Error submitting form");
            res.status(400).json({ error: 'Error Logging in' });
        } else {
            res.status(200).json({ type: 'success', message: 'Record retrieved', result });
        }
    })
});

// Get All Tickets
app.get("/retrieveTicket", (req, res) => {
    if (!req.query) {
        return res.status(400).json({ Error: "Error getting Tickets" });
    }
    const query = 'select * from ContactTickets';

    con.query(query, (error, success) => {
        if (error) {
            console.log("Error getting form");
            res.status(400).json({ error: "Error getting tickets" });
        } else {
            res.status(200).json({ Success: "Successfully got tickets", Result: success })
        }
    })
})

app.delete("/deleteTicket", (req, res) => {
    if (!req.body) {
        res.status(500).json({ Error: "Error deleting ticket" });
    }

    const id = req.query.id;
    const query = 'delete from ContactTickets where id = ?'

    con.query(query, [id], (error, success) => {
        if (error) {
            res.status(500).json({ error: "error deleting ticket" });
        } else {
            res.status(200).json({ message: "Successfully deleted ticket", success });
        }
    })
})