DROP TABLE IF EXISTS ArchivedTickets;
CREATE TABLE ArchivedTickets(
    id INTEGER PRIMARY KEY,
    Name TEXT,
    ContactNumber INTEGER, 
    Comment TEXT,
    Asignee TEXT
);

DROP TABLE IF EXISTS AssignmentUsers;
CREATE TABLE AssignmentUsers(
    id INTEGER PRIMARY KEY,
    name TEXT
);

DROP TABLE IF EXISTS audit_log;
CREATE TABLE audit_log(
    id INTEGER PRIMARY KEY,
    username TEXT,
    attempt_date DATETIME,
    action TEXT
);

DROP TABLE IF EXISTS ContactTickets;
CREATE TABLE ContactTickets(
    id INTEGER PRIMARY KEY,
    Name TEXT,
    ContactNumber INTEGER, 
    Comment TEXT
);

DROP TABLE IF EXISTS DeletedTicket;
CREATE TABLE DeletedTicket(
    id INTEGER PRIMARY KEY, 
    Name TEXT,
    ContactNumber TEXT,
    Comment TEXT
)

DROP TABLE IF EXISTS Settings;
CREATE TABLE Settings(
    id INTEGER PRIMARY KEY, 
    Code TEXT,
    Active INTEGER, 
    Description TEXT
);

DROP TABLE IF EXISTS SystemConfig;
CREATE TABLE SystemConfig(
    id INTEGER PRIMARY KEY, 
    BrandName TEXT,
    TradeMarkName TEXT
);

DROP TABLE IF EXISTS Users;
CREATE TABLE Users(
    id INTEGER PRIMARY KEY, 
    username TEXT,
    password TEXT,
    admin INTEGER
);


