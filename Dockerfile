FROM          uoacer/httpd-angular2-base
MAINTAINER    James Diprose

COPY          * /research-hub/

# Build research hub with angilar-cli
WORKDIR       /research-hub/
RUN           npm install
RUN           ng build --target=production --environment=prod

# Configure Apache server
RUN           cp -a ./dist /usr/local/apache2/htdocs/
RUN           cp httpd.conf /usr/local/apache2/conf/httpd.conf

