<h3 align="center">Self Service Website ~ Ticket System</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<h1>This applicaton has been designed as a full service solution, for everyday users and professsionals </h1>
<h2>Allowing users to log new tickets, whilst professionals to maintain and see all tickets</h2>

## 🧐 About <a name = "about"></a>

This project reflects currrent systems within workforce architecture, this solution allows a fully condensed solution allowing users to control how there workforce works. It allows for deletion and archiving of tickets, whilst being able to select the assignee of the new tickets.

## Things to note

### Pulling the code branch
Upon pulling the code down there will be a requirement for an .env file to be created for the following:
    1: PORT ( number )
    2: SQLLite_DB_PATH ( Location path to where the DB Is )
    3: NEXT_PUBLIC_APP ( set to localhost)

you will need this inside of the server folder, alongside having on in the public directory.

### Password Creation for users.
1) Requires SHA256 Format in HEX

### Prerequisites

What things you need to install the software and how to install them.

1. Node JS
2. NPM
3. Bootstrap
4. Next.js
5. Typescript

### Installing

1. To run the project

- npm run start

## 🎈 Usage <a name="usage"></a>

# Admin User ~ Should be able to perform following scenario:

1. See Open Tickets.
2. See Deleted Tickets.
3. Archive & Delete Tickets.
4. See Archived Tickets.

# Non Admin User ~ Should be able to perform following scenario:

1. See Open Tickets.
2. See Deleted Tickets.
3. Delete Tickets.

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@tomsenior20](https://github.com/tomsenior20) - Idea & work
