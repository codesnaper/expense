import { Configuration } from "../config/Configuration";
import { BankModal, BankModalsResponse, ResponseDelete } from "../modal/bank";

export class BankService {
    baseUrl: string;

    constructor(){
        this.baseUrl = Configuration.baseUrl;
    }

    public fetchBanks(userId: string | undefined ): Promise<BankModalsResponse>{
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}bank/`, {
                headers: {
                    'user-id': userId? userId: '',
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            })
            .then(res=> res.json())
            .then(res => resolve(res))
            .catch(err => reject(err));
        });
    }

    public getBankById(id: string, userId: string): Promise<BankModal> {
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}bank/${id}`, {
                headers: {
                    'user-id': userId,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            })
            .then(res=> res.json())
            .then(res => resolve(res))
            .catch(err => reject(err));
        });
    }

    public addBank(bank: BankModal): Promise<BankModal>{
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}bank/`, {
                method: 'POST',
                body: JSON.stringify(bank),
                headers: {
                    "Content-Type": "application/json",
                    "user-id": bank.USERID
                },
            })
            .then(function(res) {    
                if(res.ok)
                {
                  return res.json();         
                }
                throw new Error(res.statusText);
            }) 
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err);
            });
        })
    }

    updateBank(bank: BankModal, id: string , userId: string| undefined): Promise<BankModal>{
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}bank/${id}`, {
                headers: {
                    'user-id': userId? userId: '',
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                method: 'PUT',
                body: JSON.stringify(bank),
            })
            .then(res=> res.json())
            .then(res => resolve(res))
            .catch(err => reject(err));
        })
    }

    deleteBank(id: string, userId: string| undefined): Promise<ResponseDelete>{
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}bank/${id}`, {
                headers: {
                    'user-id': userId? userId: '',
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                method: 'DELETE'
            })
            .then(res=> res.json())
            .then(res => resolve(res))
            .catch(err => reject(err));
        })
    }
}