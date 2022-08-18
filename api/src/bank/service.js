const Dynamo = require("../util/dynamoDB");
const { Bank } = require("./bank");
const uuid = require('uuid');

const BankService = {
    bankTable : process.env.BANK_TABLE,

    async getById(id,userId){
        const param = {
            TableName: this.bankTable,
            Key: {
                ID: id,
                USERID: userId
            },
        }
        let res = await Dynamo.getByParam(param, this.bankTable);
        return res;
    },

    async getAllByUserId(userId){
        const params = {
            TableName: this.bankTable,
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
        let bank = new Bank();
        bank.ID = uuid.v4();
        bank.name = data.name ? data.name: '';
        bank.location = data.location;
        bank.currency = data.currency;
        bank.tags = data.tags;
        bank.USERID = data.USERID;
        bank.creditAmount = data.creditAmount? data.creditAmount: 0;
        bank.debitAmount = data.debitAmount ? data.debitAmount : 0;
        bank.accounts = data.accounts ? data.accounts: 0;
        return await Dynamo.write(bank, this.bankTable);
    },

    async update(ID, userId, data) {
        let key = {
            ID,
            USERID: userId
        }
        delete data['ID']
        return await Dynamo.update(data, this.bankTable, key);
    },

    async delete(ID, userId) {
        let key = {
            ID,
            USERID: userId
        }
        return await Dynamo.delete(key, this.bankTable);
    }
}
module.exports = BankService;
