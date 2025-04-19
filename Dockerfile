# Use Node.js base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of app
COPY . .

# Set environment variable for Fly
ENV PORT 8080

# Expose the port Fly expects
EXPOSE 8080

# Start the app
CMD ["npm", "run", "server-dev"]
