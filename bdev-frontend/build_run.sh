#!/bin/bash

npm install
npm run build
#serve -s build -l 3000 &
((serve -s build -l 3000) & echo $! > /home/ubuntu/breakingdev19/pidfile &)
