FROM node:15.4 

WORKDIR /apod-backend

COPY package*.json ./
RUN npm install
COPY . .
CMD npm start

