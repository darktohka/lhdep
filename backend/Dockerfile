FROM node:20-alpine

WORKDIR /srv
COPY . /srv/
RUN npm install

ENTRYPOINT ["npm", "run", "start"]