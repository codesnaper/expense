const Dynamo = require("../util/dynamoDB");
const { Limit } = require("./limit");
const uuid = require('uuid');

const LimitService = {
    limitTable : process.env.LIMIT_TABLE,

    async getById(id,userId){
        const param = {
            TableName: this.limitTable,
            Key: {
                ID: id,
                USERID: userId
            },
        }
        let res = await Dynamo.getByParam(param, this.limitTable);
        return res;
    },

    async getAllByUserId(userId){
        const params = {
            TableName: this.limitTable,
            FilterExpression: "#USERID = :userId_val",
            ExpressionAttributeNames: {
                "#USERID": "USERID",
            },
            ExpressionAttributeValues: { ":userId_val": userId }
        };
        const item =  await Dynamo.query(params);
        return item;
    },

    async add(data) {
        let limit = new Limit();
        limit.ID = uuid.v4();
        limit.USERID = data.USERID;
        limit.accountID = data.accountID;
        limit.amount = data.amount;
        limit.categoryID = data.categoryID;
        limit.created = data.created;
        limit.maxThreshold = data.maxThreshold;
        limit.renew = data.renew;
        limit.warnThresold = data.warnThresold;
        return await Dynamo.write(bank, this.limitTable);
    },

    async update(ID, userId, data) {
        let key = {
            ID,
            USERID: userId
        }
        return await Dynamo.update(data, this.limitTable, key);
    },

    async delete(ID, userId) {
        let key = {
            ID,
            USERID: userId
        }
        return await Dynamo.delete(key, this.limitTable);
    }
}
module.exports = LimitService;
