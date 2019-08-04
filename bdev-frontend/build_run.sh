#!/bin/bash

npm install
npm run build
#serve -s build -l 3000 &
nohup ./start_serve.sh > /dev/null 2>&1 & echo $! > ~/pidfile
