FROM mhart/alpine-node:8.11.4
WORKDIR /usr/src/accomplice
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4431
CMD [ "node", "server.js" ]