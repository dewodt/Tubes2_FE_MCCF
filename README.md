# Wikirace

## How to run

1. Make sure Docker Desktop is running
2. For development (with hot reload), run

- Build docker image

```bash
docker compose -f "docker-compose.development.yml" build
```

- Run docker container

```bash
docker compose -f "docker-compose.development.yml" up
```

3. For production, run

```bash
docker compose -f "docker-compose.production.yml" up --build
```

4. Visit [http://localhost:3000](http://localhost:3000)
5. To stop the process, find the container id

```bash
docker ps
```

6. Stop the process

```bash
docker stop <container_id>
```
