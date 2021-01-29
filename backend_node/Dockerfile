FROM node:15-alpine

RUN mkdir /uploads
WORKDIR /app
COPY package.json ./package.json

RUN npm i
COPY . .
COPY bin/cli.sh /bin/cli
EXPOSE 8000

CMD [ "node", "index.js" ]
