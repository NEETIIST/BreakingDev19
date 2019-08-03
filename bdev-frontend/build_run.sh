#!/bin/bash

npm install
npm run build
CMD=serve -s build -l 3000
nohup $CMD & echo $! > ~/pidfile
