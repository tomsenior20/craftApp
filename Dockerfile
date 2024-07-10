FROM node:14-alpine3.16

WORKDIR /src

COPY . .

RUN npm install

CMD [ "npm", "start", "run" ]