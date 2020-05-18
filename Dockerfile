FROM node:alpine 

WORKDIR /usr/src/app

RUN apk add postgresql-client

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]

EXPOSE 3000