FROM node:10.16.0-alpine
WORKDIR /usr/app/
COPY ./package.json ./
RUN npm install
COPY . .
CMD HOST=0.0.0.0 | node index.js