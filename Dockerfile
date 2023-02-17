FROM node:16.18.1-alpine

# RUN apk add --no-cache curl

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN yarn && \
    yarn cache clean
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY . .

EXPOSE 80
CMD [ "yarn", "start" ]
