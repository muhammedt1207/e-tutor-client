FROM node:21.7.3-alpine

RUN apk add --no-cache python3 g++ make

WORKDIR /app

COPY package*.json yarn.lock ./



RUN yarn install --production --ignore-engines

COPY . .

RUN yarn build

EXPOSE 5173

CMD ["yarn", "dev"]
