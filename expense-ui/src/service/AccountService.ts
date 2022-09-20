import { Configuration } from "../config/Configuration";
import { Account, AccountResponse, AccountType } from "../modal/response/Account";
import { BankModal } from "../modal/response/Bank";
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

    // public fetchAllSavingAccounts(): Promise<Array<Account>>{
    //     return new Promise((resolve, reject) => {
    //         Api.get(`${this.baseUrl}account/all`)
    //         .then(res => resolve(res.data))
    //         .catch(err => reject({
    //             status: err.response.data?.status,
    //             errorCode: err.response.data?.errorCode,
    //             message: err.response.data? err.response.data.message: err.message,
    //             field: err.response.data?.field,
    //             timestamp: err.response.data?.timestamp
    //         }));
    //     });
    // }

    // public addAccount(bodyData: {account:AccountResponseItem , bank: BankModal}): Promise<AccountResponseItem> {
    //     return new Promise((resolve, reject) => {
    //         Api.post(`${this.baseUrl}account/`, JSON.stringify(bodyData))
    //         .then(res => resolve(res.data))
    //         .catch(err => reject({
    //             status: err.response.data?.status,
    //             errorCode: err.response.data?.errorCode,
    //             message: err.response.data? err.response.data.message: err.message,
    //             field: err.response.data?.field,
    //             timestamp: err.response.data?.timestamp
    //         }));
    //     })
    // }

    // public updateAccount(accountId: string, bankId: string, body: AccountResponseItem): Promise<AccountResponseItem>{
    //     return new Promise((resolve, reject) => {
    //         Api.put(`${this.baseUrl}account/${accountId}/${bankId}`, JSON.stringify(body))
    //         .then(res => resolve(res.data))
    //         .catch(err => reject({
    //             status: err.response.data?.status,
    //             errorCode: err.response.data?.errorCode,
    //             message: err.response.data? err.response.data.message: err.message,
    //             field: err.response.data?.field,
    //             timestamp: err.response.data?.timestamp
    //         }));
    //     });
    // }
}