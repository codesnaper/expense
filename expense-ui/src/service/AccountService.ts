import { Configuration } from "../config/Configuration";
import { AccountResponse, AccountType } from "../modal/response/Account";
import { AccountSummary } from "../modal/response/AccountSummary";
import Api from "./Api";

export class AccountService {
    baseUrl: string;

    constructor() {
        this.baseUrl = Configuration.resourceVersion;
    }

    public fetchAccounts<Type>(bankId: string, accountType: AccountType, pageNo: number = 0, pageSize: number = 10): Promise<AccountResponse<Type>> {
        return new Promise((resolve, reject) => {
            Api.get(`${this.baseUrl}bank/${bankId}/account/type=${accountType}`, {
                headers:{
                    'pageNo': new Number(pageNo).toString(),
                    'size': new Number(pageSize).toString()
                }
            })
            .then(res => resolve(res.data))
            .catch(err => reject({
                status: err.response.data?.status,
                errorCode: err.response.data?.errorCode,
                message: err.response.data? err.response.data.message: err.message,
                field: err.response.data?.field,
                timestamp: err.response.data?.timestamp
            }));
        });
    }

    public fetchAccountSummary(bankId: string): Promise<AccountSummary[]> {
        return new Promise((resolve, reject) => {
            Api.get(`${this.baseUrl}bank/${bankId}/account/summary`)
            .then(res => resolve(res.data))
            .catch(err => reject({
                status: err.response.data?.status,
                errorCode: err.response.data?.errorCode,
                message: err.response.data? err.response.data.message: err.message,
                field: err.response.data?.field,
                timestamp: err.response.data?.timestamp
            }));
        });
    }

    public saveAccount<Type>(bankId: number, accountType: AccountType, account: Type): Promise<Type>{
        return new Promise((resolve, reject) => {
            Api.post(`${this.baseUrl}bank/${bankId}/account/type=${accountType}`,JSON.stringify(account))
            .then(res => resolve(res.data))
            .catch(err => reject({
                status: err.response.data?.status,
                errorCode: err.response.data?.errorCode,
                message: err.response.data? err.response.data.message: err.message,
                field: err.response.data?.field,
                timestamp: err.response.data?.timestamp
            }));
        })
    }

    public updateAccount<Type>(bankId: number, accountType: AccountType, account: Type): Promise<Type>{
        return new Promise((resolve, reject) => {
            Api.put(`${this.baseUrl}bank/${bankId}/account/type=${accountType}`,JSON.stringify(account))
            .then(res => resolve(res.data))
            .catch(err => reject({
                status: err.response.data?.status,
                errorCode: err.response.data?.errorCode,
                message: err.response.data? err.response.data.message: err.message,
                field: err.response.data?.field,
                timestamp: err.response.data?.timestamp
            }));
        })
    }

    public deleteAccount(bankId: string, accountId: number): Promise<any>{
        return new Promise((resolve, reject) => {
            Api.delete(`${this.baseUrl}bank/${bankId}/account/${accountId}`)
            .then(res => resolve(res.data))
            .catch(err => reject({
                status: err.response.data?.status,
                errorCode: err.response.data?.errorCode,
                message: err.response.data? err.response.data.message: err.message,
                field: err.response.data?.field,
                timestamp: err.response.data?.timestamp
            }));
        })
    }
}