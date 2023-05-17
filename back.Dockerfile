FROM node:20-alpine
  
WORKDIR /usr/src/app

COPY . .

RUN npm ci

CMD npm run start-init