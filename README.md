Franz Kafka
---

Small fullstack project featuring Franz Kafka library. 

## How to run

1. Build and run backend. (optional)
```shell
cd backend
docker build -t kafka_backend .
docker run -d --name kafka_backend -p 8333:80 kafka_backend
```
2. Build and run frontend. `BACKEND_IP` is `addr:port` of your backend, e.g., `http://localhost:3243`. Use `https://franz.xolra0d.com` for demo.
```shell
cd frontend
docker build --build-arg VITE_BACKEND_IP=BACKEND_IP -t kafka_frontend .
docker run -d --name kafka_frontend -p 5173:80 kafka_frontend
```
3. Go to http://localhost:3244. Enjoy.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
