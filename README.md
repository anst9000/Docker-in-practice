## demo app - developing with Docker

This demo app shows a simple user profile app set up using

- index.html with pure js and css styles
- nodejs backend with express mode
- mongodb for data storage

All components are docker-based

#### To start the application

Step 1: start mongodb and mongo-express

    docker-compose -f docker-compose.yaml up

_You can access the mongo-express under localhost:8080 from your browser_

Step 2: in mongo-express UI - create a new database "my-db"

Step 3: in mongo-express UI - create a new collection "users" in the database "my-db"

Step 4: start node server

    node server.js

_You can access the application under localhost:3000 from your browser_

#### To build a docker image from the application

    docker build -t my-app:1.0 .

The dot "." at the end of the command denotes location of the Dockerfile.

# Commands used

## Create docker network

docker network create mongo-network

## Start mongodb

```
docker run -d \
-p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=$USERNAME \
-e MONGO_INITDB_ROOT_PASSWORD=$PASSWORD \
--net mongo-network \
--name mongodb \
mongo
```

## Start mongo-express

```
docker run -d \
-p 8081:8081 \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=$USERNAME \
-e ME_CONFIG_MONGODB_ADMINPASSWORD=$PASSWORD \
-e ME_CONFIG_MONGODB_SERVER=mongodb \
--net mongo-network \
--name mongo-express \
mongo-express
```

## Running Docker Compose with environment file

> https://docs.docker.com/compose/environment-variables/

```
docker-compose --env-file ./config/.env.dev up
```
