FROM node:10.16.0-alpine as builder
RUN npm install -g @angular/cli
WORKDIR /usr/app/
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 4200
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/app/dist/client /usr/share/nginx/html