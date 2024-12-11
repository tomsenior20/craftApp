FROM node:20

# Set working directory to /app
WORKDIR /app

# Copy package files first to leverage caching
COPY package*.json ./
RUN npm install
COPY . .

ARG NEXT_PUBLIC_BACKEND_PORT=4025
ARG NEXT_PUBLIC_FRONTEND_PORT=4000
ARG SQLLite_DB_PATH=app\database\database.db
ARG NEXT_PUBLIC_APP=localhost


ENV NEXT_PUBLIC_BACKEND_PORT=4025
ENV NEXT_PUBLIC_FRONTEND_PORT=4000
ENV SQLLite_DB_PATH=/app/database/database.db
ENV NEXT_PUBLIC_APP=localhost

# Build the front-end (Next.js app located in the root)
RUN npm run build
EXPOSE 4000 4025
# Install concurrently to run both front-end and back-end
RUN npm install -g concurrently
# Run both the front-end (Next.js) and the back-end (server.js) concurrently
CMD ["concurrently", "\"node server.js\"", "\"npm start\""]