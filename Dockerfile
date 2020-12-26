FROM node:12.18.4-alpine3.12 as builder

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --quite
# RUN npm audit fix

COPY . ./

CMD npm run start
