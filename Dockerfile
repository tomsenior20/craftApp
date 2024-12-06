FROM node:20

# Set working directory to /app
WORKDIR /app

# Copy package files first to leverage caching
COPY package*.json ./
RUN npm install
COPY . .

# Build the front-end (Next.js app located in the root)
RUN npm run build

# Expose both ports (3000 for front-end, 3010 for the server)
EXPOSE 5000 4000

# Install concurrently to run both front-end and back-end
RUN npm install -g concurrently

# Run both the front-end (Next.js) and the back-end (server.js) concurrently
CMD ["concurrently",  "\"npm run start\""]