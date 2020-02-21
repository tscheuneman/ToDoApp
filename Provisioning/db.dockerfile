FROM postgres:alpine

COPY ./Provisioning/deployment/init-db.sh /usr/local/init-db.sh
RUN ["chmod", "+x", "/usr/local/init-db.sh"]

CMD /usr/local/init-db.sh