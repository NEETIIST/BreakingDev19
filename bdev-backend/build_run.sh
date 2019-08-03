#!/bin/bash

npm install
#pm2 start server.js -- --production
pm2 reload server
