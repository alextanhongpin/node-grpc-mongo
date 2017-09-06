build:
	echo "Building alextanhongpin/node-grpc"
	docker build -t alextanhongpin/node-grpc .

build-client:
	echo "Building alextanhongpin/node-grpc-client"
	docker build -f Dockerfile.client -t alextanhongpin/node-grpc-client .