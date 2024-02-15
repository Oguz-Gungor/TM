# Installation and run

## Docker

It is fully Dockerized fullstack application. Install docker engine and run

```
    docker compose up
```

after containers' build and run stage completed, application is ready to use.


Swagger: http://localhost:8084/swagger-ui/index.html

UI: http://localhost:3000/


## Components

It is recommended to use docker. In case it is desired to use components seperately, instructions below can be followed to build and run desired component.

### Database

Application depends on PostgreSQL instance on localhost:5450. 

### Backend
* Database should be up and running before backend starts.
* Go to /api directory
* To change database port, go src/main/resources/application.yml and change 
```
    datasource:
        url:jdbc:postgresql://tm-postgres:{desiredPort}/tm-postgres
```
* Build 
  * Run command ```mvn clean install```
* Run
    * Run command ```java -jar target/api-0.0.1-SNAPSHOT.jar```
* After run, swagger( http://localhost:8084/swagger-ui/index.html) can be used for api


### Frontend
* To locally run forntend, node is required
* Frontend can run without backend, but it will show connection error if backend is not running on localhost:8084
* Go to /web directory
* Install dependencies
    * Run command ```npm install```
* Run app
   * Run command ```npm start```

# Tech stack
PostgreSQL

Java 21

Reactjs