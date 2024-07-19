# Use a specific version of Node.js with Alpine
FROM node:21.7.3-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies required for building native modules
RUN apk add --no-cache python3 make g++

# Install Yarn globally
RUN npm install -g yarn

# Install project dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Expose the port the app runs on
EXPOSE 5173

# Command to run the application
CMD ["yarn", "dev"]
