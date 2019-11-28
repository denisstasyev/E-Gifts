<p align="center">
  <img alt="E-Gifts logo" src="docs/logos/transparent.png" width="100px" />
  <h1 align="center">E-Gifts - Brings gifts to AR & VR!</h1>
</p>

You have found the E-Gifts GitHub repository, which is our graduation project of the TechnoTrack FullStack development course by Mail.Ru.

## Index

1. [Quick Overview](#quick-overview)
2. [Quick Start](#quick-start)
3. [Contributors Links](#contributors-links)
4. [Available Scripts](#available-scripts)

## Quick Overview

E-Gift is a web resource on which everyone can send a greeting gift in AR/VR to someone.

## Quick Start

> To run this project, you must have [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

> Before starting this project, look at the "Initial Setup" part of frontend/README.md

In the project directory, you can run:

### `make`

Installs all necessary dependencies via Docker and Docker Compose and runs the application.

### `make down`

Stops the application and deletes Docker container with all dependencies (Docker images are still available).

## Contributors Links

If you find a bug, use the [Bug Report Form](https://github.com/denisstasyev/E-Gifts/issues/new?template=bug_report.md).

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
