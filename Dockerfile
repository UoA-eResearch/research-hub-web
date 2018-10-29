# ================   Unit test stage  ================

FROM          markadams/chromium-xvfb-js as test

# Build args required to work behind proxy
ARG           http_proxy
ARG           https_proxy

# Install curl (used to install nodejs) and build-essential (for compiling native nodejs libraries)
RUN           apt-get update -qq && apt-get install -qqy curl build-essential git

# Install nodejs and update npm to latest version
RUN           curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN           apt-get update -qq && apt-get install -y nodejs

WORKDIR       /research-hub-web/

# Copies files required to install dependencies
COPY          /package.json /research-hub-web/package.json
COPY          /.angular-cli.json /research-hub-web/.angular-cli.json
COPY          /tsconfig.json /research-hub-web/tsconfig.json
COPY          /tslint.json /research-hub-web/tslint.json
COPY          /protractor.conf.js /research-hub-web/protractor.conf.js
COPY          /karma.conf.js /research-hub-web/karma.conf.js
COPY          /e2e /research-hub-web/e2e

# Install dependencies
RUN           npm install

# Copy sources
COPY          /src /research-hub-web/src

# ================   Build stage   ================

FROM          nginx as build

# Build args required to work behind proxy
ARG           http_proxy
ARG           https_proxy

# Install curl (used to install nodejs) and build-essential (for compiling native nodejs libraries)
RUN           apt-get update -qq && apt-get install -qqy curl build-essential git

# Install nodejs and update npm to latest version
RUN           curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN           apt-get update -qq && apt-get install -y nodejs

WORKDIR       /research-hub-web/

# Copy node_modules folder from test stage
COPY          --from=test ./research-hub-web/node_modules/ /research-hub/web/node_modules

# Copy sources
COPY          /src /research-hub-web/src

# Build  with angular-cli
RUN           node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng build --prod --environment=prod

# ================   Clean stage   ================ 

FROM          nginx as clean

# Copy dist from building stage
COPY          --from=build ./research-hub-web/dist /usr/share/nginx/www

# Configure nginx
COPY          /nginx.conf /etc/nginx/nginx.conf

# Custom entrypoint to copy over env.js at runtime from volume
COPY          ./docker-entrypoint.sh /
ENTRYPOINT    ["/docker-entrypoint.sh"]

