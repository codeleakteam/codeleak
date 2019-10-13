FROM node:10.16.3-alpine as build

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG CODE_ENV=production
ENV CODE_ENV $NODE_ENV

WORKDIR /opt/app
COPY package.json yarn.lock ./

RUN yarn 

COPY . .
RUN yarn run build:next

CMD ["/opt/app/node_modules/pm2/bin/pm2-runtime", "start", "pm2-apps.json"]
