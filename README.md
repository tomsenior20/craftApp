<h3 align="center">Self Service Website ~ Ticket System</h3>
<div align="center">
    <h4>This applicaton has been designed as a full service solution, for everyday users and professionals. It permits the user to explore the site and submit contact form as they request some help or assistance with an issue. However, there is also an login section to where you can see the open tickets alongside deleted and archived (For admin only)! </h4>
</div>

--- 
## Hosted Application URL 
    URL:
    ```bash
        https://craftapp-frontend.onrender.com
    ```
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
    - See Archived tickets / Archive Tickets
---
## Things to note

### Pulling the code branch Locally
    Upon pulling the code down there will be a requirement for an .env file to be created for the following
    - <p>PORT ( number )</p>
    - <p>SQLLite_DB_PATH ( Location path to where the DB Is )</p> 
    - <p>NEXT_PUBLIC_APP (  set to name of the production back end service name )</p> 
    - <p>you will need this inside of the server folder, alongside having on in the public directory</p> 
--- 
### Password Creation for users.
1) Requires SHA256 Format in HEX
--- 
### Prerequisites
    <p>What things you need to install the software and how to install them </p>
    - Node JS
    - NPM
    - Bootstrap
    - Next.js
    - Typescript
--- 
### Installing

#### To run the project Locally
- Requires two terminals in a VS Instance.
- In terminal 1, type the following command: 
```bash
        node server.js
``` 
- In terminal 2, type the following command:
```bash
        npm run dev
```
## To run the project through hosted
<p> Can just access via the hosted URL.</p>
<p>Attempt to try and log in with both users</p>

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