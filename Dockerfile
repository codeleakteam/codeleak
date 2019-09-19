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

FROM nginx:1.15.3-alpine
COPY --from=build /opt/app/.next /var/www
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
