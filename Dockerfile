FROM node:latest

# Set Working Directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the application files
COPY ./app ./app
COPY ./server ./server

# Copy the external .env file to the root of the container
COPY ./.env ./.env

# Copy the internal .env file from the server directory
COPY ./server/.env ./server/.env

# Copy any additional files if necessary
COPY . .

# Build the application
RUN npm run build

# Expose the required ports your application runs on
EXPOSE 3000 3010

# Command to run your application
CMD ["sh", "-c", "node server/server.js & npm --prefix ./app run dev"]