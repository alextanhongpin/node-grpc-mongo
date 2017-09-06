// GENERATED CODE -- DO NOT EDIT!

'use strict'
var grpc = require('grpc')
var proto_transaction_pb = require('../proto/transaction_pb.js')

function serialize_transaction_TransactionRequest (arg) {
  if (!(arg instanceof proto_transaction_pb.TransactionRequest)) {
    throw new Error('Expected argument of type transaction.TransactionRequest')
  }
  return new Buffer(arg.serializeBinary())
}

function deserialize_transaction_TransactionRequest (buffer_arg) {
  return proto_transaction_pb.TransactionRequest.deserializeBinary(new Uint8Array(buffer_arg))
}

function serialize_transaction_TransactionResponse (arg) {
  if (!(arg instanceof proto_transaction_pb.TransactionResponse)) {
    throw new Error('Expected argument of type transaction.TransactionResponse')
  }
  return new Buffer(arg.serializeBinary())
}

function deserialize_transaction_TransactionResponse (buffer_arg) {
  return proto_transaction_pb.TransactionResponse.deserializeBinary(new Uint8Array(buffer_arg))
}

var TransactionService = exports.TransactionService = {
  getTransaction: {
    path: '/transaction.Transaction/GetTransaction',
    requestStream: false,
    responseStream: false,
    requestType: proto_transaction_pb.TransactionRequest,
    responseType: proto_transaction_pb.TransactionResponse,
    requestSerialize: serialize_transaction_TransactionRequest,
    requestDeserialize: deserialize_transaction_TransactionRequest,
    responseSerialize: serialize_transaction_TransactionResponse,
    responseDeserialize: deserialize_transaction_TransactionResponse
  }
  // option (google.api.http) = {
  //     get: "/v1/transactions"
  // };
}

exports.TransactionClient = grpc.makeGenericClientConstructor(TransactionService)
