FROM node:21.7.3-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN npm install -g yarn

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 5173

CMD ["yarn", "dev"]