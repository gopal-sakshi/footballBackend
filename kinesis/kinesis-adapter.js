const adapter = {};

let client={};

adapter.connect = (region) => {
    try {
        client = new aws.Kinesis({region: 'VIRGINIA'})
    } catch(error) {
        console.error('PROBLEM CREATING KINESIS-CLIENT ', error);
    }
    return client;
}

adapter.putRecord = async function (stream, record, pKey) {
    const params = {
        Data         : record && typeof record == 'string' ? record : JSON.stringify(record),
        PartitionKey : pKey || `pk-${new Date().getTime()}`,
        StreamName   : stream
    };
    try {
        const result = await client.putRecord(params).promise();
        console.log(`⟴  KINESIS `, result);
        return result;
    } catch (error) {
        throw error;
    }
}

adapter.putBatchRecords = async function (stream, records) {
        
    // await client.putRecords(params).promise();
    console.log("not implemented yet");
    
    /*
        client.putRecords()
        client.putRecord()
    */
}

adapter.getRecords = async function (stream) {
    const arr = [];
    
    const params = {
        StreamName        : stream,
        ShardIteratorType : 'LATEST',
        ShardId           : ''
    };

    const result = await client.listShards({ StreamName: stream }).promise();
    console.log(result);
}

adapter.getRecordsByTS = async function (stream, timeStamp) {
    console.log("not implemented yet");
}

module.exports = adapter;