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
COPY          / /research-hub-web/

# Build research hub with angular-cli
WORKDIR       /research-hub-web/
RUN           npm install
ARG           WEB_ENVIRONMENT
RUN           node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng build --prod --environment=$WEB_ENVIRONMENT

# Configure nginx
RUN           cp -a ./dist/. /usr/share/nginx/www/
RUN           cp nginx.conf /etc/nginx/nginx.conf
