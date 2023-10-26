# City bikes

Application for displaying data from journeys made with city bikes in the Helsinki Capital area.

Datasets used:

Journeys

- https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
- https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
- https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv

Stations

- https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv

## Prerequisites

App is developed and tested in Linux environment. If on Windows, use [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) to make sure everything works correctly.

- [Docker](https://docs.docker.com/get-docker/),
  version used in development 20.10.14

- [Node](https://nodejs.org/en/download),
  version used in development v20.1.0

## Installation

To get started, clone the repository.

### Production

Start production ready build in docker compose.

```
docker compose -f compose.yml -p citybikes-prod up
```

Build takes few minutes to set up the environment, initializing the database and starting the project.
Once the database is initialized, service is available in port 3001.

### Development

Install dependencies.

```
npm install
```

For development, use compose.dev.yml to setup the database for the app.

```
docker compose -f compose.dev.yml -p citybikes-dev up
```

Create .env file with the following content to project root.

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/citybikes
TEST_DATABASE_URL=postgresql://postgres:postgres@localhost:5433/citybikes
```

Initialize the database with journey & station data. Initialization takes few minutes to complete.

```
npm run init-db
```

Start frontend and backend in development mode.

```
npm run dev
```

```
npm run dev-server
```

Project contains tests for api and end to end tests. End to end test expect, that frontend and backend are running, frontend is running on port 5173 and the database is 
initialized.

```
npm run test
```

```
npm run test-e2e
```

Run end to end tests in interactive mode.

```
npm run cypress-open
```

Database volumes are binded to api/database & api/database-dev. To reset database, delete volumes and image and build new instance with docker compose.

## Features

App uses React in frontend, NodeJS & Express in backend and PostgreSQL with Postgis extension as a database.

List of journeys are offered from

```
/api/journeys
```

Query parameters distance, duration and station can be used to filter journeys.
For distance and duration use comma separated values for minimum and maximum values, for example

```
/api/journeys?distance=50,100
```

Returns journeys whose distance is in between 50 and 100.
For searching journeys with station name, use query parameter station

```
/api/journeys?station=kamppi
```

to find journeys whose return or departure station name includes the parameter.
Journeys endpoint support sorting for distance, duration and station names(departureStation, returnStation).

Ascending

```
/api/journeys?sort=distance
```

Descending

```
/api/journeys?sort=-distance
```

Stations are offered from

```
/api/stations
```

For stations, use query parameter search for searching station by name.

Single station data is offered from

```
/api/stations/:id
```

Stations and journeys use offset pagination with query parameters limit & offset.
Default limit is set to 10.

In UI, journey table data is sortable by clicking column header.
On stations page, station locations are shown on the map. To find stations by area, draw circle to the map by choosing drawing tool from the right hand corner of the map.

To visit single station page, click on station name or address in either table.
On single station page there is charts for station data. Top 10 return & departure station locations are shown on the map.
