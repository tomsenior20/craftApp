FROM node:14-alpine3.16

WORKDIR /app

COPY . .

EXPOSE 80

RUN npm install

CMD [ "npm", "start", "run" ]