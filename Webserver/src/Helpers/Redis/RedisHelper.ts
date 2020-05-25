import redis from 'redis';
require('dotenv').config();

export class RedisHelper {
    _initalized: any;
    client: any;
    constructor() {
        this.client = redis.createClient({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        });
    }

    setValue(keyName: string, value: any, type: string = 'EX', time: number = 86400) {
        let returnData = value;
        if(typeof(value) == 'object') {
            returnData = JSON.stringify(value);
        }
        if(type == 'EX' || type == 'PX') {
            this.client.set(keyName, returnData, type, time);
        } else {
            this.client.set(keyName, returnData, type);
        }
    }

    async getValue(keyName: string, isObj=true) {
        this.client.get(keyName, (err, reply) => {
            if(err) return false;
            return isObj ? JSON.parse(reply) : reply;
        });
    }
}