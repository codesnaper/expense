import { Configuration } from "../config/Configuration";
import { BankModal, BankModalsResponse, ResponseDelete } from "../modal/response/Bank";
import Api from "./Api";

export class BankService {
    baseUrl: string;

    constructor(){
        this.baseUrl = Configuration.resourceVersion;
    }

    public fetchBanks(): Promise<BankModalsResponse>{
        return new Promise((resolve, reject) => {
            Api.get(`${this.baseUrl}bank/`)
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

    public getBankById(id: string): Promise<BankModal> {
        return new Promise((resolve, reject) => {
            Api.get(`${this.baseUrl}bank/${id}`)
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

    public addBank(bank: BankModal): Promise<BankModal>{
        return new Promise((resolve, reject) => {
            Api.post(`${this.baseUrl}bank/`,JSON.stringify(bank))
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

    updateBank(bank: BankModal): Promise<BankModal>{
        return new Promise((resolve, reject) => {
            Api.put(`${this.baseUrl}bank/`, JSON.stringify(bank))
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

    deleteBank(id: string): Promise<ResponseDelete>{
        return new Promise((resolve, reject) => {
            Api.delete(`${this.baseUrl}bank/${id}`)
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