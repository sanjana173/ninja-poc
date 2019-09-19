FROM mongo:latest

RUN mkdir /root/data

WORKDIR /root/data

RUN cd /root/data

COPY init.json /root/data/

COPY . /root/data/

CMD mongoimport --host mongodb --db Users --collection users --type json --file init.json --jsonArray