FROM node:alpine

WORKDIR /app

COPY package.json yarn.lock

RUN npm install -g yarn 

RUN yarn install

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm","run","dev"]