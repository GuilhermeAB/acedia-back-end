FROM node:14-alpine
WORKDIR /acedia
COPY . /acedia
RUN yarn install
EXPOSE 3000