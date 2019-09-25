<p align="center">
  <img alt="E-Gifts logo" src="docs/logos/transparent.png" width="100px" />
  <h1 align="center">E-Gifts</h1>
  <h2 align="center">Brings gifts to AR/VR!</h2>
</p>

## Quick Overview

TechnoTrack FullStack development course by Mail.Ru graduation project.

## Quick Start

> To run this project, you must have [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

In the project directory, you can run:

### `make`

Installs all necessary dependencies via Docker and Docker Compose and runs the application.

### `make down`

Stops the application and deletes Docker container with all dependencies (Docker images are still available).

## Available Scripts

### `make up`

Launches the application and installs (if necessary) some Docker images.

### `make stop`

Stops running containers without removing them.

### `make restart`

Relaunches the application.

### `make build`

Builds all custom Docker images.

### `make install`

Builds and runs the application (the same as `make`).

### `make rm`

Deletes all installed Docker images (except for Node).

### `make logs`

Shows all logs.
