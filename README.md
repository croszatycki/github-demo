# Github demo 
Simple `expressjs` server application for providing a short user repository details

## Requirements
Application is using `redis` for caching data. 
By default, application is using local redis instance without authentication, and on the default port number

Dockerized versions is not requiring redis

## Installation

```sh
npm install
```

## Usage

```sh
npm start
```

then

```sh
curl http://localhost:5000/repositories/USER_NAME/REPO_NAME
```

## Usage for development
```sh
npm run start:dev
```

## Tests
```sh
npm run test
```

## Caching 

Application is using `redis` for caching executed requests, by default `redis` is holding those data for 60 seconds. 
This can be changed in `.env` file

## Docker
There is preconfigured Docker image and docker-compose file with redis

```sh
docker-compose up
```