#!/bin/bash
env_js_path=/env.js

if [ -e $env_js_path ]; then
  cp $env_js_path /usr/share/nginx/www/assets/env.js
fi

exec nginx -g 'daemon off;' "$@"
