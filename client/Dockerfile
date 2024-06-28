FROM node:18

WORKDIR /react-docker-example/

COPY public/ ./public
COPY src/ ./src
COPY package.json ./

RUN npm install

CMD ["npm", "start"]
