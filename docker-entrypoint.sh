#!/bin/bash
ENV_FILE_PATH=/env.js

if [ -e ENV_FILE_PATH ]; then
  exec cp /env.js /usr/share/nginx/www/assets/env.js
fi

exec nginx -g 'daemon off;' "$@"

