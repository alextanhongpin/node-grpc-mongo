PORT=3000

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

shout:
	echo ${PORT}

stub:
	protoc -I/usr/local/include -I. \
	-I${GOPATH}/src \
	-I${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \
	--go_out=plugins=grpc:. \
	proto/*.proto
gw:
	protoc -I/usr/local/include -I. \
	-I${GOPATH}/src \
	-I${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \
	--grpc-gateway_out=logtostderr=true:. \
	proto/*.proto

swagger:
	protoc -I/usr/local/include -I. \
	-I${GOPATH}/src \
	-I${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \
	--swagger_out=logtostderr=true:. \
	proto/*.proto