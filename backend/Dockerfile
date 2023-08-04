FROM node:16.14.0

RUN mkdir /app
ADD . /app
WORKDIR /app

RUN rm -rf node_modules; rm -rf package-lock.json
RUN npm install
