FROM node:20

# Set working directory to /app
WORKDIR /app

# Copy package files first to leverage caching
COPY package*.json ./
RUN npm install
COPY . .

COPY ./app/database/database.db /app/database/database.db

# Build the front-end (Next.js app located in the root)
RUN npm run build

# Expose both ports (3000 for front-end, 3010 for the server)
EXPOSE 3000 3010

# Install concurrently to run both front-end and back-end
RUN npm install -g concurrently

# Run both the front-end (Next.js) and the back-end (server.js) concurrently
CMD ["concurrently", "\"npm run start\"", "\"npm run server\""]