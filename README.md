# IntelliSite Challenge
## About
This is a project that solves the challenge of intellisite for the fullstack position.
It consists of:

* A container with node and express:
  - HTTP API for anomalies and users
  - CLI
  - Swagger-ui endpoint
* A container with node-red as a frontend
* A container with MongoDB
* Docker and docker-compose

The description of the challenge is in the folder **requirements**.

## Get started
Edit the docker compose file at the root and mount your anomaly json file
in the backend container.
By default, the *events.json* file of the activity is already mounted. 
Example:

```yaml
challenge_backend:
    ...
    volumes:
    - ./requirements/resources/events.json:/uploads/events.json
```

Start and build your docker compose
```bash
docker-compose up --build -d
```
Now use the CLI to populate the database with your file.
You can use the default mounted file **/uploads/events.json** for this.
```bash
docker exec -it challenge_backend cli --help
docker exec -it challenge_backend cli file_upload --file /uploads/events.json
```

# URLS of interest
- Node-red Editor: http://localhost:1880/#flow
- Node-red UI: http://localhost:1880/ui/
- Backend API: http://localhost:8000/api/anomalies
- Swagger endpoint: http://localhost:8000/api/docs
