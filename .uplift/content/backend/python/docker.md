### Getting Started with Docker

```console
make python-start
```

This will pull the containers, install everything needed and start the server on [localhost:8000](http://localhost:8000).

You can check other Docker related commands in the provided `Makefile` and `docker-compose.backend.yml`. See `docker/Docker.server/Dockerfile` for the Docker setup, and note that poetry is set up to export to `requirements.txt`.