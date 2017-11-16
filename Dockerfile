FROM          nginx
MAINTAINER    James Diprose "j.diprose@auckland.ac.nz"

# Build args required to work behind proxy
ARG           http_proxy
ARG           https_proxy

# Install curl (used to install nodejs) and build-essential (for compiling native nodejs libraries)
RUN           apt-get update -qq
RUN           apt-get install -qqy curl build-essential git

# Install nodejs and update npm to latest version
RUN           curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN           apt-get install -y nodejs
#RUN           npm install -g npm

# Install angular-cli
RUN           npm install -g @angular/cli@1.5.0

# Copies all files and maintains directory structure


# Get dependencies
WORKDIR       /research-hub-web/
COPY          /package.json /research-hub-web/package.json
RUN           npm install

# Copy src files after getting deps so we don't have to redownload them when sources change
COPY          /e2e /research-hub-web/e2e
COPY          /src /research-hub-web/src
COPY          /.angular-cli.json /research-hub-web/.angular-cli.json
COPY          /tsconfig.json /research-hub-web/tsconfig.json
COPY          /tslint.json /research-hub-web/tslint.json
COPY          /protractor.conf.js /research-hub-web/protractor.conf.js
COPY          /karma.conf.js /research-hub-web/karma.conf.js

# Build with @angular/cli
ARG           WEB_ENVIRONMENT
RUN           node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng build --prod --environment=$WEB_ENVIRONMENT

# Configure nginx
RUN           cp -a ./dist/. /usr/share/nginx/www/
COPY          /nginx.conf /etc/nginx/nginx.conf
