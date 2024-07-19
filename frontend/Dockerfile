FROM node:alpine

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application
COPY . .

# Make sure Vite is available globally
RUN yarn global add vite


RUN yarn build

EXPOSE 5173

CMD ["yarn", "run", "dev"]