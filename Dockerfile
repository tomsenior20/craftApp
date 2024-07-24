FROM node:latest

WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# If you need to run the build command (if using something like create-react-app)
RUN npm run build

# Expose the port your app runs on
EXPOSE 80

# Command to run your application
CMD ["npm", "start"]
