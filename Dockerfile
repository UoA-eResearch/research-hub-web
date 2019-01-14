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
COPY          /package.json .
COPY          /angular.json .
COPY          /tsconfig.json .
COPY          /tslint.json .
COPY          /protractor.conf.js .
COPY          /karma.conf.js .
COPY          /e2e ./e2e

# Install dependencies
RUN           npm install

# Copy sources
COPY          /src ./src

# Run the unit tests
# They are not currently run as there are problems
# when run on the CI server.
#RUN          npm run ci-test

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

# Copy node_modules from test stage
COPY          --from=test ./research-hub-web/node_modules ./node_modules

# Copies files required to install dependencies
COPY          /package.json .
COPY          /angular.json .
COPY          /tsconfig.json .
COPY          /tslint.json .
COPY          /protractor.conf.js .
COPY          /karma.conf.js .
COPY          /e2e ./e2e

RUN           npm rebuild

# Copy sources
COPY          /src ./src

# Build
RUN           node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng build --prod

# ================   Clean stage   ================

FROM          nginx as clean

# Build args required to work behind proxy
ARG           http_proxy
ARG           https_proxy

# Copy dist from building stage
COPY          --from=build ./research-hub-web/dist /usr/share/nginx/www

# Configure nginx
COPY          /nginx.conf /etc/nginx/nginx.conf

# Custom entrypoint to copy over env.js at runtime from volume
COPY          ./docker-entrypoint.sh /
ENTRYPOINT    ["/docker-entrypoint.sh"]
