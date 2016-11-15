FROM          httpd:2.4

MAINTAINER    James Diprose
RUN           apt-get update -qq

# Copy build files
COPY          ./dist/ /usr/local/apache2/htdocs/

# Copy config
COPY          ./httpd.conf /usr/local/apache2/conf/httpd.conf

