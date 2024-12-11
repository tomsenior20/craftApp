require('dotenv').config();

const express = require("express");
const next = require("next");
const sqlite3 = require('sqlite3').verbose();
const cors = require("cors");
const crypto = require('crypto');
const helmet = require('helmet');


// Check if we are in development mode
const dev = process.env.NODE_ENV !== "production";

const app = express();
const port = process.env.NEXT_PUBLIC_BACKEND_PORT || 8989;
const dbPath = process.env.SQLLite_DB_PATH || '/database/database.db';

// Custom HTTP Headers
// const corsOptions = {
//     origin: (origin, callback) => {
//         const allowedOrigins = [
//             "*",
//         ];
//         if (allowedOrigins.includes(origin) || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
//     methods: ["GET", "POST", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
// };

// Middleware
app.use(
    helmet({
        frameguard: { action: 'deny' }, 
        noSniff: true,
        hidePoweredBy: true,
        contentSecurityPolicy: false,
    }));
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());

// URL of Database is in ENV File
const db = new sqlite3.Database(dbPath, (error) => {
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
    res.status(200).send("Service is running");
});

// Select Brand Name for navigation
app.get("/selectBrandName", async (req, res) => {
    const query = "SELECT BrandName FROM SystemConfig";
    try {
        db.all(query, [], (error, results) => {
            if (!error) {
                res.json(results);
            }
        })
    } catch (error) {
        return handleErrorResponse(req.originalUrl, res, error);
    }
});

// Select TradeMark Name
app.get("/getTrademarkName", async (req, res) => {
    const query = "SELECT TradeMarkName FROM SystemConfig";
    try {
        db.all(query, [], (error, results) => {
            if (!error) {
                res.status(200).json(results);
            }
        })
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
        db.run(query, [name, number, comment], (error, result) => {
            if (!error) {
                res.status(200).json({ message: "Form Submitted Successfully", result });
            }
        })
    } catch (error) {
        return handleErrorResponse(req.originalUrl, res, error);
    }
});

// Admin Login Form
app.get('/loginAdminForm', async (req, res) => {
    checkReq(req, res);
    const { username, password } = req.query;
    const hashedPassword = hashPassword(password);
    const query = 'SELECT * FROM Users WHERE username = ? AND password = ?';
    try {
        db.get(query, [username, hashedPassword], (error, result) => {
            if (!error) {
                res.status(200).json({ type: 'success', message: 'Record retrieved', result });
            }
        })
    } catch (error) {
        return handleErrorResponse(req.originalUrl, res, error);
    }
});

app.get('/checkLocked', async (req, res) => {
    checkReq(req, res);
    const { username } = req.query;
    const query = 'SELECT locked FROM Users WHERE username = ?';
    try {
        db.get(query, [username], (error, result) => {
            if (!error) {
                res.status(200).json({ type: 'success', message: 'Record retrieved', result });
            }
        })
    } catch (error) {
        return handleErrorResponse(req.originalUrl, res, error);
    }
});

app.post('/lockAccount', async (req, res) => {
    checkReq(req, res)
    const query = 'UPDATE Users SET locked = 1 WHERE username = ?';
    const { username } = req.body;
    try {
        db.run(query, [username], (error, results) => {
            if (!error) {
                res.status(200).json({ message: "Successfully deleted ticket", results });
            }
        })
    }
    catch (error) {
        console.log("Error locking account", error);
    }
})

// Get All Tickets
app.get("/retrieveTicket", async (req, res) => {
    const query = 'SELECT * FROM ContactTickets';
    try {
        db.all(query, (error, results) => {
            if (!error) {
                res.status(200).json({ Success: "Successfully got tickets", Result: results });
            }
        })
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
        db.run(query, [id], (error, results) => {
            if (!error) {
                res.status(200).json({ message: "Successfully deleted ticket", results });
            }
        })
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
        db.run(query, [id, Name, ContactNumber, Comment], (error, results) => {
            if (!error) {
                res.status(200).json({ message: "Successfully inserted into deleted comments", results });
            }
        })
    } catch (error) {
        return handleErrorResponse(req.originalUrl, res, error);
    }
});

// Get Assignee List
app.get("/getAssigneeList", async (req, res) => {
    const query = 'SELECT name, id FROM AssignmentUsers';
    try {
        db.all(query, (error, results) => {
            if (!error) {
                res.status(200).json({ Success: "Successfully got assignees", results });
            }
        })
    } catch (error) {
        return handleErrorResponse(req.originalUrl, res, error);
    }
});

// Retrieve Deleted Tickets
app.get("/retrieveDeletedTickets", async (req, res) => {
    const query = 'SELECT * FROM DeletedTicket';
    try {
        db.all(query, (error, results) => {
            if (!error) {
                res.status(200).json({ Success: "Successfully retrieved deleted tickets", results });
            }
        })
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
        db.run(query, [username, attempt_date, action], (error, results) => {
            if (!error) {
                res.status(200).json({ message: "Successfully inserted audit log", results });
            }
        })
    } catch (error) {
        return handleErrorResponse(req.originalUrl, res, error);
    }
});

app.post("/AllocateAssignee", async (req, res) => {
    checkReq(req, res);
    const { name, AssignedTo } = req.body;
    const query = "INSERT INTO Assignee (name, AssignedTo) VALUES (?,?)";
    try {
        db.run(query, [name, AssignedTo], (error, results) => {
            if (!error) {
                res.status(200).json({ message: "Successfully inserted audit log", results });
            }
        })
    }
    catch (error) {
        return handleErrorResponse(req.originalUrl, res, error);
    }
})

// Archive Ticket
app.post("/archiveTicket", async (req, res) => {
    checkReq(req, res);
    const { Name, ContactNumber, Comment, Assignee } = req.body;
    const contactNumberInt = parseInt(ContactNumber, 10);
    const query = "INSERT INTO ArchivedTickets (Name, ContactNumber, Comment, Asignee) VALUES (?, ?, ?, ?)";
    try {
        db.run(query, [Name, contactNumberInt, Comment, Assignee], (error, results) => {
            if (!error) {
                res.status(200).json({ message: "Successfully Archived Ticket", results });
            }
        })
    } catch (error) {
        return handleErrorResponse(req.originalUrl, res, error);
    }
});

app.get('/getContactAndAssignee', async (req, res) => {
    checkReq(req, res);
    const { Name } = req.query;
    const query = "SELECT * From ContactTickets JOIN Assignee ON ContactTickets.Name = Assignee.name where Assignee.name = ?";
    try {
        db.get(query, [Name], (error, results) => {
            if (!error) {
                res.status(200).json({ Success: "Successfully got full ContactTicket and Assignee", results });
            }
        })
    } catch (error) {
        return handleErrorResponse(req.originalUrl, res, error);
    }

})

// Get Settings
app.get('/getSettings', async (req, res) => {
    checkReq(req, res);
    const { Code } = req.query;
    const query = 'SELECT Code, Active FROM SETTINGS WHERE Code = ? LIMIT 1';
    try {
        db.get(query, [Code], (error, results) => {
            if (!error) {
                res.status(200).json({ Success: "Successfully got settings", results });
            }
        })
    } catch (error) {
        return handleErrorResponse(req.originalUrl, res, error);
    }
});

// Get Archive API Call.
app.get('/getArchiveTicket', async (req, res) => {
    checkReq(req, res);
    const query = 'SELECT * from ArchivedTickets';
    try {
        db.all(query, (error, results) => {
            if (!error) {
                res.status(200).json({ Success: "Successfully got Archived Tickets", results });
            }
        })
    } catch (error) {
        return handleErrorResponse(req.originalUrl, res, error);
    }
});

const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://${process.env.NEXT_PUBLIC_APP}:${port}`);
});


// process.on('SIGTERM', () => {
//     console.log('SIGTERM signal received: closing HTTP server');
//     if (server) {
//         server.close(() => {
//             console.log('HTTP server closed');
//             process.exit(0);
//         });
//     } else {
//         console.log('Server is not initialized.');
//         process.exit(1);
//     }
// });

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