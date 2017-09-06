# node-grpc-mongo

Note that `.env` is not normally committed to the repository. For demonstration purpose on how to manage environment variables, this file is included in this repo.


## Setup
```
$ yarn global add grpc-tools
$ yarn add grpc
$ yarn add google-protobuf
```
## Generate service

```
$ grpc_tools_node_protoc --js_out=import_style=commonjs,binary:. --grpc_out=. --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` proto/transaction.proto
```
