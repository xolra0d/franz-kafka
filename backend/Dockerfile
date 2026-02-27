FROM golang:1.25-alpine AS builder

RUN apk add --no-cache \
    gcc \
    musl-dev \
    build-base \ 
    git

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=1 GOOS=linux GOARCH=amd64 go build -o app

FROM alpine:latest

WORKDIR /root/

COPY --from=builder /app/app .

EXPOSE 80

CMD ["./app"]
