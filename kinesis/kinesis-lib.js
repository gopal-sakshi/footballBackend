/*
    kinesisLib ----> it is just combination of 
                        kinesis-library & 
                        kinesis-adapter
    
    Look into it carefully...

*/

var kinesisLib = {}

kinesisLib.clientConnect = (region) => {
    kinesisLib.client = new aws.Kinesis({
      region : 'VIRGINIA'
    });
}

kinesisLib.putData = function (data, stream, Pkey) {
    const result = kinesisLib.client.putRecord(params).promise().catch((err) => {})
}

kinesisLib.getData = async function getData (stream, timeStamp) {}

kinesisLib.send = async function (stream, packet) {
    // await kinesisLib.putData(batch, stream);
}

module.exports = kinesisLib;
