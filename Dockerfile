FROM node:latest

# Set working directory to /app (root of your project)
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --global concurrently
RUN npm install

# Copy all project files, including the .env files
COPY . .

# Build the front-end (Next.js app located in the root)
RUN npm run build

# Expose both ports (3000 for front-end, 3010 for the server)
EXPOSE 3000 3010

# Run both the front-end (Next.js) and the back-end (server.js) concurrently
CMD ["concurrently", "\"node server/server.js\"", "\"npm run dev\""]
