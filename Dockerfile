ARG node_version=14.15
ARG node_image=node:${node_version}-alpine

FROM $node_image as base

# expose the port and set the work dir
EXPOSE 3001
WORKDIR /app

# configs and dependency handling
COPY package.json yarn.lock ./
COPY tsconfig.json ./

FROM base as prod
# install all dependencies in production mode
RUN yarn install --frozen-lockfile --no-progress --production
# source code of the app
COPY src/ ./src
# build the app
RUN yarn build
# run the app
CMD ["node", "./build/src/index.js"]

FROM base as dev
# install all dependencies
RUN yarn install --frozen-lockfile --no-progress
# source code and config of the app
COPY nodemon.json ./nodemon.json
COPY src/ ./src
# run the app
CMD ["yarn", "dev"]
