import { Configuration } from "../config/Configuration";
import { AccountResponse, AccountResponseItem } from "../modal/Account";
import { BankModal } from "../modal/bank";
import Api from "./Api";

export class AccountService {
    baseUrl: string;

    constructor() {
        this.baseUrl = Configuration.baseUrl+Configuration.resourceVersion;
    }

    public fetchAccounts(bankId: string): Promise<AccountResponse> {
        return new Promise((resolve, reject) => {
            Api.get(`${this.baseUrl}account/${bankId}`)
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

    public addAccount(bodyData: {account:AccountResponseItem , bank: BankModal}): Promise<AccountResponseItem> {
        return new Promise((resolve, reject) => {
            Api.post(`${this.baseUrl}account/`, JSON.stringify(bodyData))
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

    public updateAccount(accountId: string, bankId: string, body: AccountResponseItem): Promise<AccountResponseItem>{
        return new Promise((resolve, reject) => {
            Api.put(`${this.baseUrl}account/${accountId}/${bankId}`, JSON.stringify(body))
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
}