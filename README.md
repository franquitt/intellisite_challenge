# IntelliSite Challenge
## About
This is a project that solves the challenge of intellisite for the fullstack position.
It consists of:

- A container with node and express as a backend
- A container with node-red as a frontend
- A container with MongoDB
- Docker and docker-compose

## Get started
Edit the docker compose file at the root and mount your anomaly json file
in the backend container. Example:

```yaml
challenge_backend:
    ...
    volumes:
    - /home/me/sandbox/events.json:/uploads/events.json
```

Start and build your docker compose
```bash
docker-compose up --build -d
```
Now use the CLI to populate the database with your file
```bash
docker exec -it challenge_backend cli --help
docker exec -it challenge_backend cli file_upload --file /uploads/events.json
```

- Node-red Editor: http://localhost:1880/#flow
- Node-red UI: http://localhost:1880/ui/
- Backend API: http://localhost:8000/api/anomalies
