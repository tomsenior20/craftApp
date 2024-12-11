FROM node:20

# Set working directory to /app
WORKDIR /app

# Copy package files first to leverage caching
COPY package*.json ./
RUN npm install
COPY . .

# ARG NEXT_PUBLIC_BACKEND_PORT
# ARG NEXT_PUBLIC_FRONTEND_PORT
# ARG SQLLite_DB_PATH
# ARG NEXT_PUBLIC_APP


# ENV NEXT_PUBLIC_BACKEND_PORT=$NEXT_PUBLIC_BACKEND_PORT
# ENV NEXT_PUBLIC_FRONTEND_PORT=$NEXT_PUBLIC_FRONTEND_PORT
# ENV SQLLite_DB_PATH=$SQLLite_DB_PATH
# ENV NEXT_PUBLIC_APP=$NEXT_PUBLIC_APP


# Build the front-end (Next.js app located in the root)
RUN npm run build

# Expose both ports (3000 for front-end, 3010 for the server)
EXPOSE 5000 4000 4025

# Install concurrently to run both front-end and back-end
RUN npm install -g concurrently

# Run both the front-end (Next.js) and the back-end (server.js) concurrently
CMD ["concurrently", "\"node server.js\"", "\"npm start\""]