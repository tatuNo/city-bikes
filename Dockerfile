FROM node:20-alpine
  
WORKDIR /usr/src/app

COPY . .

RUN npm ci && \
  npm run build

CMD npm run start-init