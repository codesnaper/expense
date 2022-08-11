const Dynamo = require("../util/dynamoDB");
const { Category } = require("./category");
const uuid = require('uuid');

const CategoryService = {
    categoryTable : process.env.CATEGORY_TABLE,

    async getById(id,userId){
        const param = {
            TableName: this.categoryTable,
            Key: {
                ID: id,
                USERID: userId
            },
        }
        let res = await Dynamo.getByParam(param, this.categoryTable);
        return res;
    },

    async getAllByUserId(userId){
        const params = {
            TableName: this.categoryTable,
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
        let category = new Category();
        category.ID = uuid.v4();
        category.name = data.name;
        category.USERID = data.userId;
        return await Dynamo.write(category, this.categoryTable);
    },

    async update(ID, userId, data) {
        let key = {
            ID,
            USERID: userId
        }
        return await Dynamo.update(data, this.categoryTable, key);
    },

    async delete(ID, userId) {
        let key = {
            ID,
            USERID: userId
        }
        return await Dynamo.delete(key, this.categoryTable);
    }
}
module.exports = CategoryService;
