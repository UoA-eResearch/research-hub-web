#!/bin/bash

exec cp /env.js /usr/share/nginx/www/assets/env.js
exec nginx -g 'daemon off;' "$@"

