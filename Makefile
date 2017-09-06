build-server:
	echo "Building alextanhongpin/node-grpc-server"
	docker build -t alextanhongpin/node-grpc-server .

build-client:
	echo "Building alextanhongpin/node-grpc-client"
	docker build -f Dockerfile.client -t alextanhongpin/node-grpc-client .

up:
	docker-compose up -d

call:
	curl http://localhost:4000