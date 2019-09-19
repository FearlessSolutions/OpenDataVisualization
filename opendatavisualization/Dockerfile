# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /opendatavisualization

# add `/app/node_modules/.bin` to $PATH
ENV PATH /opendatavisualization/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /opendatavisualization/package.json

RUN npm install

# start app
CMD ["npm", "start"]
