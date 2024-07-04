FROM node:20-alpine

WORKDIR /srv
COPY . /srv/
RUN npm install

ENTRYPOINT ["node", "index.js"]