export class BankService {

    constructor(){
        this.baseUrl = 'http://localhost:3000/';
    }

    fetchBanks(userId){
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}bank/`, {
                headers: {
                    'user-id': userId,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            })
            .then(res=> res.json())
            .then(res => resolve(res))
            .catch(err => reject(err));
        })
    }

    getBankById(id, userId) {
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
        })
    }

    addBank(data){
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}bank/`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })
            .then(res=> res.json())
            .then(res => resolve(res))
            .catch(err => reject(err));
        })
    }

    updateBank(data, id , userId){
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}bank/${id}`, {
                headers: {
                    'user-id': userId,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                method: 'PUT',
                body: JSON.stringify(data),
            })
            .then(res=> res.json())
            .then(res => resolve(res))
            .catch(err => reject(err));
        })
    }

    deleteBank(id, userId){
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}bank/${id}`, {
                headers: {
                    'user-id': userId,
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