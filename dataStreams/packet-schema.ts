declare interface Packet {

    init(batchSize?: number) : Promise<void>;

    send(streamName: string, payload: Payload, streamService?: DataStream, region?: Regions): Promise<boolean>;

    sendToDynamoStream(streamName: string, packetId: string, payload: any, operationId: string) : Promise<boolean>;

    sendToVirginia(streamName: string, payload: Payload, streamService?: DataStream) : Promise<boolean>;

    sendToMumbai(streamName: string, payload: Payload, streamService?: DataStream) : Promise<boolean>;


}

declare type Payload = {
    data : string | object;
    month: string
}

declare type ActionPacket = {
    data: string | object;
    year: string
}

declare type DataStream = "DYNAMODB" | "KINESIS";

declare type Regions = "VIRGINIA" | "MUMBAI";


/*
    This is schema file... 

    a) any module that want to use dataStreams... 
        must conform to the type declarations specified here

    b) see "declare type Regions"
        you can only choose 'VIRGINIA' (or) 'MUMBAI'

    c) and structure of the object must conform to the interface Packet that we declared here...

*/