const packet = {};

var ifLearningKinesis = true;
const data_stream = require("../kinesis/kinesis-library");
// const data_stream = ifLearningKinesis ? require("../kinesis/kinesis-library") : require("../dynamoStream/dynamoStream-library");

packet.init = async function (batchSize) {
    debug("Initiating packet");
    data_stream.clientConnect();
    batchLimit = !isNaN(batchSize) ? Number(batchSize) : 10;
  };


packet.send = async function (streamName, payload, streamService, region) {
  const packet = createPacket(payload);
  
  result = prodPacket(streamName, packet, streamService, region);

  /*       we will not execute this at this moment
      result = devPacket(streamName, packet, streamService);
  */

}

packet.sendToDynamoStream = async function (streamName, packetId, payload, operationId) {
  console.log("not implementing dynamo stream");
  console.log(" we are focussed only on kinesis stream");
}

packet.sendToVirginia = async function (streamName, payload, streamService) {
  return packet.send(streamName, payload, streamService, "VIRGINIA");
}

packet.sendToMumbai = async function (streamName, payload, opts, streamService) {
  console.log("not implemented yet");
}

/**************************       PRIVATE METHODS       ********/
function prodPacket(streamName, packet, streamService, region) {
  
  // here we use same functionality for prodPacket (or) devPacket...
  // but in nodejs microservices lib... in prodPacket(), we did
  const result = data_stream.send(streamName, packet);
  return result;

}

function devPacket(streamName, packet, stream) {
  const result = data_stream.send(streamName, packet);
  return result;
}

function createPacket(payload, opts) {
  const actionPacket = {
    data        :   JSON.stringify(payload.data),
    year        :   "2021"
  }
  return actionPacket
}

function getDate(date = "") {
  return "someDate"
}

module.exports = packet;

