import { Configuration } from "../config/Configuration";
import { EnhancedLimit, Limit } from "../modal/response/Limit";
import { ResponseList } from "../modal/ResponseList";
import Api from "./Api";

export class LimitService{
    baseUrl: string;
    
    constructor(){
        this.baseUrl = Configuration.resourceVersion;
    }

    public fetchLimits(pageNo: number =0, pageSize: number = 10): Promise<ResponseList<EnhancedLimit>> {
        return new Promise((resolve, reject) => {
            Api.get(`${this.baseUrl}limit`,{
                headers:{
                    'pageNo': Number(pageNo).toString(),
                    'pageSize': Number(pageSize).toString()
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

    // public fetchAllCategory(): Promise<Array<Category>> {
    //     return new Promise((resolve, reject) => {
    //         Api.get(`${this.baseUrl}category/all`)
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

    public addLimit(limit: Limit): Promise<Limit>{
        return new Promise((resolve, reject) => {
            Api.post(`${this.baseUrl}limit`,JSON.stringify(limit))
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

    public updateLimit(limit: Limit): Promise<Limit>{
        return new Promise((resolve, reject) => {
            Api.put(`${this.baseUrl}limit`, JSON.stringify(limit))
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

    public deleteLimit(id: number): Promise<any>{
        return new Promise((resolve, reject) => {
            Api.delete(`${this.baseUrl}limit/${id}`)
            .then(res => resolve({}))
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