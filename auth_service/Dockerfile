FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4001

CMD [ "npm" , "start" ]