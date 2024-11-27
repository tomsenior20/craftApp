FROM node:latest

# Set the Working Directory to your desired location
# Here we're setting it to /app
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all relevant application files and directories
COPY ./app ./app
COPY ./public ./public
COPY ./server ./server
COPY ./.env ./
COPY ./server/.env ./server/.env 

# Build the application (if applicable)
RUN npm run build

# Expose the required ports your application runs on
EXPOSE 3000 3010

# Command to run your application
CMD ["sh", "-c", "node server/server.js & npm --prefix ./app run dev"]