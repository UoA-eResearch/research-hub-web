FROM          uoacer/httpd-angular2-base
MAINTAINER    James Diprose "j.diprose@auckland.ac.nz"

# Copies all files and maintains directory structure
COPY          / /research-hub/

# Build research hub with angular-cli
WORKDIR       /research-hub/
RUN           npm install
RUN           ng build --target=production --environment=prod

# Configure Apache server
RUN           cp -a ./dist/. /usr/local/apache2/htdocs/
RUN           cp httpd.conf /usr/local/apache2/conf/httpd.conf
RUN           cp httpd-ssl.conf /usr/local/apache2/conf/extra/httpd-ssl.conf
