var kinesis = {};

kinesis.clientConnect = adapter.connect;
kinesis.batchSize = 10;

kinesis.send = async function (stream, packet) {
    if (!stream || !packet) {
        console.log("some error empty - stream/packet")
    }
    const result = adapter.putRecord(stream, packet);
    return result;
}

kinesis.sendBatch = async function (stream, packets) {
    console.log("not implemented yet...")
    // just call adapter.putBatchRecords();
}
module.exports = kinesis;