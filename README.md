<h3 align="center">Self Service Website ~ Ticket System</h3>
<div align="center">
    <h4>This applicaton has been designed as a full service solution, for everyday users and professionals. It permits the user to explore the site and submit contact form as they request some help or assistance with an issue. However, there is also an login section to where you can see the open tickets alongside deleted and archived (For admin only)! </h4>
</div>

--- 
### Hosted Application URL 
URL:
```bash
    https://craftapp-frontend.onrender.com
```
## Secrurity Aspects Added.
# Hemlet Package
- frameguard - Prevents people from being able to iframe your website for malicious purposes.
- noSniff - Prevents user being able to alter MIME time and execute incorrect code.
- hidePoweredBy - Remove identification of what server site is using, prevents exploitation.
- contentSecurityPolicy - setting to false prevents cross site sripting attacks.

```bash
app.use(
    helmet({
        frameguard: { action: 'deny' }, 
        noSniff: true,
        hidePoweredBy: true,
        contentSecurityPolicy: false,
    }));
```
# Cors Policy also adapted to the security aspect.

---     
## General User:
- Explore website
- Submit Contact Forms
- Sign Into Portal
- See Current tickets
- See Deleted tickets / Delete Tickets

## Admin User:
- Explore website
- Submit Contact Forms
- Sign Into Portal
- See Current tickets
- See Deleted tickets / Delete Tickets
---
## Things to note

## Pulling the code branch Locally
Upon pulling the code down there will be a requirement for an .env file to be created for the following
- PORT ( number )
- SQLLite_DB_PATH ( Location path to where the DB Is )
- NEXT_PUBLIC_APP (  set to name of the production back end service name )
- you will need this inside of the server folder, alongside having on in the public directory
--- 
### Password Creation for users.
1) Requires SHA256 Format in HEX
--- 
## Prerequisites
What things you need to install the software and how to install them
- Node JS
- NPM
- Bootstrap
- Next.js
- Typescript
--- 
### Installing

## Troubleshooting 
If you access the hosted site, and in the top left cornet "TS LTD" isn't showing with CORS Errors in dev tools. 
- This is usually down to the server not catching up instantly, a quich cache and hard re-load will resolve this issue.

#### To run the project Locally
- Pre Requisited mean we would need an .env file locally.
- Create .env file, in the root directory of the project ( Not included into git for security puposes )
- Including the values for the .env, so this can be tested if required by the marker.
```bash
    NEXT_PUBLIC_BACKEND_PORT=4025
    NEXT_PUBLIC_FRONTEND_PORT=4000
    NEXT_PUBLIC_APP=localhost
    SQLLite_DB_PATH=app\database\database.db
```
---
- Requires two terminals in a VS Instance.
- In terminal 1, type the following command: 
```bash
    node server.js
``` 
- In terminal 2, type the following command:
```bash
    npm run dev
```
- Access localhost:3000

## For credentials, please see Report document.

## To run the project through hosted
Can just access via the hosted URL, either local or hosted:

Hosted:
```bash
    https://craftapp-frontend.onrender.com
```
Local
```bash
    localhost:3000
```
Attempt to try and log in with both users
--- 

## Built using the following frameworks.
- [Express](https://expressjs.com/) - Server Framework
- [React] - Frontend
- [Typescript] - Frontend
- [Jest] - Testing
- [NodeJs](https://nodejs.org/en/) - Server Environment
---
## Author:
- [@tomsenior20](https://github.com/tomsenior20) - Idea & work
---