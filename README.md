# Flight Info API

# Node Express Service

[![CircleCI](https://circleci.com/gh/and-spuds/Flight-Info-API.svg?style=svg)](https://circleci.com/gh/and-spuds/Flight-Info-API)
[![codecov](https://codecov.io/gh/and-spuds/Flight-Info-API/branch/master/graph/badge.svg)](https://codecov.io/gh/and-spuds/Flight-Info-API)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/339f25c83c65484a9a20cfec9c6a9af6)](https://app.codacy.com/project/flimflamjim/Flight-Info-API/dashboard)

This is a skeleton service that uses NodeJS 8 and Express. It contains the following:

* Yarn for dependency management
* Jest for testing + coverage (must be > 80%)
* Supertest for testing the express server
* JSON configs for multi-environment setup
* EditorConfig for code formatting
* Swagger for API docs
* Pino for server logging and HTTP logs
* Dockerfile and Docker Compose to run the service

## Prerequisites

In order to build the project, you will have to install the following:

* [NodeJS 8](https://nodejs.org/en/download) 
* [Docker](https://www.docker.com/get-docker)
    
## Build

### Yarn

```
yarn install
```

### Docker

```
docker build -t andspuds/flight-info-api .
```


## Run

### Yarn

Development:
```
yarn serve
```

Production:
```
yarn forever
```

### Docker

Environment variables:

* ENVIRONMENT = Spring Profile to use for configurations *default*, *dev* or *prod* (required)

```
docker-compose up --build
```

If you need to change any of the environment variables, please use the `.env` file.

## Linting

To run ESLint, execute:

```
yarn lint
```

## Testing

To run the unit and integration tests, execute:

```
yarn test
```

## Documentation

Once you run the application, the documentation of the API can be found at: http://localhost:8080/swagger
