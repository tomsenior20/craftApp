FROM node:20

# Set working directory to /app
WORKDIR /app

# Copy package files first to leverage caching
COPY package*.json ./
RUN npm install
COPY . .

# Build the front-end (Next.js app located in the root)
RUN npm run server
RUN npm run build

# Expose both ports (3000 for front-end, 3010 for the server)
EXPOSE 3000 3010

# Run both the front-end (Next.js) and the back-end (server.js) concurrently
CMD ["concurrently", "node", "server/server.js", "npm", "run", "dev"]