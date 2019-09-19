FROM node:latest


# Create app directory

RUN mkdir /root/app

WORKDIR /root/app

#Install app dependencies
#

RUN cd /root/app
COPY package*.json /root/app/
RUN npm install


COPY . /root/app/

EXPOSE 3000

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait

RUN chmod +x /wait

CMD /wait
