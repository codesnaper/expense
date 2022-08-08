const Dynamo = require("../util/dynamoDB");
const { Account } = require("./account");
const uuid = require('uuid');

const AccountService = {
    accountTable : process.env.ACCOUNT_TABLE,
    bankTable : process.env.BANK_TABLE,

    async getById(id, bankId){
        const params = {
            TableName: this.accountTable,
            Key: {
                ID: id,
                BANKID: bankId
            },
        };
        let res = await Dynamo.getByParam(params);
        return res;
    },

    async getByBankId(bankId){
        const params = {
            TableName: this.accountTable,
            FilterExpression: "#BANKID = :BANKID_VAL",
            ExpressionAttributeNames: {
                "#BANKID": "BANKID",
            },
            ExpressionAttributeValues: { ":BANKID_VAL": bankId }
        };
        let data =  await Dynamo.query(params);
        return data;
    },

    calculateInterest(account){
        if(account.interest){
            if(account.loanType){
                let interest = parseFloat(account.rate) / 100 /12;
                let x = Math.pow(1 + interest, account.tenure * 12);
                let monthly =  (account.principal*x*interest)/(x-1);
                let tenure = parseFloat(account.tenure) * 12
                return {
                    interestAmount: monthly.toFixed(2),
                    totalPayment: (monthly * tenure).toFixed(2),
                    totalInterest: ((monthly * tenure) - account.principal).toFixed(2)
                }
            } else{
                if(account.compoundSaving){
                    let time = parseFloat(account.compoundingYear) * parseFloat(account.tenure);
                    let maturityAmount= Math.pow(((1 + parseFloat(account.rate)) / parseFloat(account.compoundingYear)) * parseFloat(account.principal), time);
                    return {
                        maturityAmount: maturityAmount
                    };
                } else{
                    let simpleInterest = ((parseFloat(account.principal) * parseFloat(account.rate) * parseFloat(account.tenure)) / 100 );
                    return {
                        maturityAmount: parseFloat(account.principal) + simpleInterest
                    };
                }
            }
        }
        return {
            interestAmount: 0,
            totalPayment: 0,
            totalInterest: 0,
        }
        
    },

    async addAccount(data, userId) {
        let account = new Account();
        account.name = data.name;
        account.ID = uuid.v4();
        account.BANKID = data.bankId;
        account.accountNo = data.accountNo;
        account.principal = data.principal;
        account.rate = data.rate;
        account.tenure = data.tenure;
        account.loanType = data.loanType;
        account.interest = data.interest;
        account.compoundSaving = data.compoundSaving;
        account.compoundingYear = data.compoundingYear;
        account.openDate = data.openDate;
        account.emiPaid = 0;
        let interest = this.calculateInterest(account);
        if(account.loanType){
            account.interestAmount = interest.interestAmount;
            account.totalInterest = interest.totalInterest;
            account.totalPayment = interest.totalPayment;
            data.bank.debitAmount = (parseFloat(data.bank.debitAmount) + parseFloat(interest.totalPayment)).toFixed(2);
        } else{
            account.maturityAmount = interest.maturityAmount;
        }
        const dbData = await Dynamo.write(account, this.accountTable);
        dbData.bank = await this.updataBankDetail(data.bank, userId);
        return dbData;
    },

    async updataBankDetail(bank, userId){
        let key = {
            ID: bank.ID,
            USERID: userId
        }
        delete bank.ID;
        return await Dynamo.update(bank, this.bankTable, key);
    },

// rate tenure principal is mandatory
    async update(id, bankId , data) {
        const key = {
            ID: id,
            BANKID: bankId
        }
        let interest = this.calculateInterest(data);
        data.interestAmount = interest.interestAmount;
        data.totalInterest = interest.totalInterest;
        data.totalPayment = interest.totalPayment;
        return await Dynamo.update(data, this.accountTable, key);
    },

    async delete(id, bankId) {
        const key = {
            ID: id,
            BANKID: bankId
        }
        return await Dynamo.delete(key, this.accountTable);
    }
}
module.exports = AccountService;
