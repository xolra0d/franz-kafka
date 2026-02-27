Franz Kafka
---

Small fullstack project featuring Franz Kafka library. 

## How to run

1. Build and run backend. (optional)
```shell
cd backend
docker build -t kafka_backend .
docker run -it --name kafka_backend -p 3243:80 kafka_backend
```
2. Build and run frontend. `BACKEND_IP` is `addr:port` of your backend, e.g., `http://localhost:3243`. Use `https://franz.xolra0d.com` for demo.
```shell
cd frontend
docker build -t kafka_frontend .
docker run -it --name kafka_frontend -p 3244:80 -e VITE_BACKEND_IP=BACKEND_IP kafka_backend
```
3. Go to http://localhost:3244. Enjoy.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
