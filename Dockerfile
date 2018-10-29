#
#  Building Stage
#

FROM          nginx as building
MAINTAINER    Sam Kavanagh "s.kavanagh@auckland.ac.nz"

# Build args required to work behind proxy
ARG           http_proxy
ARG           https_proxy

# Install curl (used to install nodejs) and build-essential (for compiling native nodejs libraries)
RUN           apt-get update -qq && apt-get install -qqy curl build-essential git

# Install nodejs and update npm to latest version
RUN           curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN           apt-get update -qq && apt-get install -y nodejs

# Install angular-cli
RUN           npm install -g @angular/cli@1.6.8

WORKDIR       /research-hub-web/

# Copies files required to install dependencies
COPY          /package.json /research-hub-web/package.json
COPY          /.angular-cli.json /research-hub-web/.angular-cli.json
COPY          /tsconfig.json /research-hub-web/tsconfig.json
COPY          /tslint.json /research-hub-web/tslint.json
COPY          /protractor.conf.js /research-hub-web/protractor.conf.js
COPY          /karma.conf.js /research-hub-web/karma.conf.js
COPY          /e2e /research-hub-web/e2e
RUN           npm install

# Copy sources
COPY          /src /research-hub-web/src

# Build  with angular-cli
RUN           node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng build --prod --environment=prod


#
# Testing stage
#

FROM          markadams/chromium-xvfb-js as testing
WORKDIR       /
COPY          --from=building /research-hub-web .
ENTRYPOINT    npm run test

#
# Running Stage
#

FROM          nginx as running

# Copy dist from building stage
COPY          --from=building ./dist /usr/share/nginx/www

# Configure nginx
COPY          /nginx.conf /etc/nginx/nginx.conf

COPY          ./docker-entrypoint.sh /
ENTRYPOINT    ["/docker-entrypoint.sh"]

