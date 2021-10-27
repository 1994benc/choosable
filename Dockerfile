FROM node:16-bullseye
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install --production
COPY . ./
CMD ["yarn", "start"]