# Use the official Node.js 16 image as the base image
FROM node:21

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "dev"]