const AWS = require('aws-sdk');

let options = {};
if (process.env.IS_OFFLINE) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'DEFAULT_ACCESS_KEY',
        secretAccessKey: 'DEFAULT_SECRET'
    };
}


const documentClient = new AWS.DynamoDB.DocumentClient(options);

const Dynamo = {
    async get(ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID,
            },
        };
        const data = await documentClient.get(params).promise();
        return data;
    },

    async getByParam(params) {
        const data = await documentClient.get(params).promise();
        return data;
    },

    async query(param){
        const data =  await documentClient.scan(param).promise();
        return data;
    },

    async delete(key, TableName) {
        const params = {
            TableName,
            Key: key,
        };
        const data = await documentClient.delete(params).promise();
        return data;
    },

    async write(data, TableName) {
        if (!data.ID) {
            throw Error('no ID on the data');
        }
        const params = {
            TableName,
            Item: data,
        };
        const res = await documentClient.put(params).promise();
        if (!res) {
            throw Error(`There was an error inserting ID of ${data.ID} in table ${TableName}`);
        }
        return data;
    },

    async update(item, TableName, key) {
        let updateExpression = 'set';
        let ExpressionAttributeNames = {};
        let ExpressionAttributeValues = {};
        for (const property in item) {
            updateExpression += ` #${property} = :${property} ,`;
            ExpressionAttributeNames['#' + property] = property;
            ExpressionAttributeValues[':' + property] = item[property];
        }
        updateExpression = updateExpression.slice(0, -1);
        const params = {
            TableName,
            Key: key,
            UpdateExpression: updateExpression,
            ExpressionAttributeNames: ExpressionAttributeNames,
            ExpressionAttributeValues: ExpressionAttributeValues
        };
        const res = await documentClient.update(params).promise();
        if (!res) {
            throw Error(`There was an error updateing data for ID of ${data.ID} in table ${TableName}`);
        }
        return item;
    }
};
module.exports = Dynamo;