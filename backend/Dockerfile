FROM node:20-alpine

COPY . /srv/
RUN npm install

WORKDIR /srv
ENTRYPOINT ["npm", "run", "start"]