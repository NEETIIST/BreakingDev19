FROM node:10.15.3
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g nodemon

EXPOSE 3000 4000
CMD [ "nodemon", "server" ]
