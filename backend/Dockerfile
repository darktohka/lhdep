FROM node:20-alpine

WORKDIR /srvackage
COPY . /srv/
RUN npm install

ENTRYPOINT ["node", "index.js"]