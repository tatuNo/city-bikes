FROM node:20-alpine
  
WORKDIR /usr/src/app

ENV DOCKERIZE_VERSION v0.6.1

COPY . .

RUN npm ci && \
  npm run build

RUN apk add --no-cache openssl

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

CMD ["dockerize", "-wait", "tcp://db:5432", "npm", "run", "start-init"]