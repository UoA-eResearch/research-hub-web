#!/bin/bash

if [ "$1" == "--local" ]; then
  # If the local flag is passed, we run a version of the web project set up for development.
  # Run an install to make sure new Node dependencies since last Docker image build are installed.
  npm install
  ./node_modules/@angular/cli/bin/ng serve --port 80 --host 0.0.0.0 --disable-host-check -c local
  exit
fi

env_js_path=/env.js

if [ -e $env_js_path ]; then
  cp $env_js_path /usr/share/nginx/www/assets/env.js
fi

exec nginx -g 'daemon off;' "$@"
