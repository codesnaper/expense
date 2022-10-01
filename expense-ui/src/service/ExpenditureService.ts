import { Configuration } from "../config/Configuration";
import { Expenditure } from "../modal/response/Expenditure";
import api from "./Api";

export class ExpenditureService {
    baseUrl: string;

    constructor() {
        this.baseUrl = Configuration.resourceVersion;
    }

    public addExpenditureService(expenditure: Expenditure): Promise<Expenditure>{
        return new Promise((resolve, reject) => {
            api.post(`${this.baseUrl}expenditure/`,JSON.stringify(expenditure))
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

    public fetchExpenditureByDateRange(toDate: string, fromDate: string): Promise<Expenditure[]>{
        return new Promise((resolve, reject) => {
            api.get(`${this.baseUrl}expenditure/'${toDate}'-'${fromDate}'`)
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