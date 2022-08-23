[![CodeQL](https://github.com/schan-2040/black-scholes-merton-calculator/workflows/CodeQL/badge.svg)](https://github.com/schan-2040/black-scholes-merton-calculator/actions/workflows/codeql-analysis.yml)

# The Black Scholes Merton Calculator
This project launches a nice little web application that allows users to calculate European option prices using the Black Scholes Merton Differential Equation. This repository has the entire full stack encapsulated within it, with each part of the stack divided amongst the two directories **/client** and **/server**.


This application is still in continuous development as it's intended to display my growth in application development as well as financial engineering. As such, any thoughts, suggestions, and issues are always appreciated.

This application will be a component of a larger set of financial engineering and machine learning tools I'm in the works of developing.

# Instructions
## Use Docker (Easy)
Don't want to install everything? No worries, I've created a `docker-compose.yaml` which will build a multi-container web application for you using the Docker images of the `/client` and `/server` source code I've published to Docker Hub already.

To quickly get started, please ensure you have Docker installed on your machine and download the `docker-compose.yaml` file. Once downloaded, simply run in your terminal:

```sh
docker-compose up
```

You should see it pull two Docker images for the frontend and backend of the application and expose both endpoints.

Congratulations! You can now go to http://localhost:4200 to interact with the web application, or go to http://localhost:8080 to interact with the server and the API.

### Want to pull the Docker images for the frontend and backend separately?

**Frontend**
```sh
docker pull shauryachandhoke/black-scholes-merton-calculator-frontend:v1
```

**Backend**
```sh
docker pull shauryachandhoke/black-scholes-merton-calculator-backend:v1
```

### Want To Customize The Image?
I've included the Dockerfiles for the frontend and backend inside this repo! Simply make your changes and when you're done, modify the `docker-compose.yaml` file to the following:

```yaml
version: "3"

services:
  frontend:
    image: black-scholes-merton-calculator-frontend:latest
    working_dir: /code
    build:
      context: client
      dockerfile: Dockerfile
    ports:
      - "4200:4200"
    depends_on:
      - backend
    volumes:
      - ${PWD}/client/:/code
      - /code/node_modules

  backend:
    image: black-scholes-merton-calculator-backend:latest
    working_dir: /code
    build:
      context: server
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
```

Then when running `docker-compose up`, Docker will create images for the frontend and backend using your local changes instead of pulling from Docker Hub.

## Build Locally
### Instructions for setting up the web application locally can be found in the README in the `/server` and `/client` directories

***

# [Click here to see the deployed front-end application!](https://shaurya-chandhoke.github.io/black-scholes-merton-calculator) (Deployment of the backend is still a work in progress)

## Screenshots
**Homepage**
![image](https://user-images.githubusercontent.com/38062430/121475280-331f5900-c993-11eb-9c11-ff1633d3e96d.png)

**Calculator**
![image](https://user-images.githubusercontent.com/38062430/123017157-09eec780-d39a-11eb-96b1-c4c9c58b1a2c.png)




