FROM node:latest
# Work Directory
WORKDIR /app
# Copy package.json and package-lock.json (if available)
COPY package*.json ./
COPY ./app ./app
COPY ./server ./server
COPY ./.env ./server/.env
COPY .env ./
# Install project dependencies
RUN npm install
# Copy the rest of your application code
COPY . .
# If you need to run the build command (if using something like create-react-app)
RUN npm run build
# Expose the port your app runs on
EXPOSE 3000 3010

# Command to run your application
CMD ["sh", "-c", "node server/server.js & npm --prefix ./app run dev"]