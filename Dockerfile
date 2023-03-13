# FROM node:16.18.1-alpine

# # RUN apk add --no-cache curl

# # Create app directory
# WORKDIR /app

# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# COPY package*.json ./

# RUN yarn && \
#     yarn cache clean

# COPY . ./
# # COPY ./src ./
# # COPY tailwind.config.js ./
# RUN yarn build
# # If you are building your code for production
# # RUN npm ci --only=production
# # Bundle app source

# EXPOSE 3000
# CMD [ "yarn", "start" ]

FROM thanhth22/nginx-react:latest
COPY build /usr/share/nginx/html