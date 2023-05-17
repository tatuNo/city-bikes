FROM node:20-alpine
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

RUN apk add --update curl && \
  mkdir -p ./api/data/stations && \
  curl -L -o ./api/data/stations/stations.csv https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv

RUN mkdir -p ./api/data/journeys && \
  curl -L -o ./api/data/journeys/2021-05.csv https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv && \
  curl -L -o ./api/data/journeys/2021-06.csv https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv && \
  curl -L -o ./api/data/journeys/2021-07.csv https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv

CMD npm run start-init