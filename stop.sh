cat pidfile | xargs kill
pm2 stop server
pm2 delete server
