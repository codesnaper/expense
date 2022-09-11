import { Configuration } from "../config/Configuration";
import { Category } from "../modal/response/Category";
import { ResponseList } from "../modal/ResponseList";
import Api from "./Api";

export class CategoryService{
    baseUrl: string;
    
    constructor(){
        this.baseUrl = Configuration.resourceVersion;
    }

    public fetchCategory(pageNo: number =0, pageSize: number = 10): Promise<ResponseList<Category>> {
        return new Promise((resolve, reject) => {
            Api.get(`${this.baseUrl}category/`,{
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

    public addCategory(category: Category): Promise<Category>{
        return new Promise((resolve, reject) => {
            Api.post(`${this.baseUrl}category/`,JSON.stringify(category))
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

    public updateCategory(category: Category): Promise<Category>{
        return new Promise((resolve, reject) => {
            Api.put(`${this.baseUrl}category/`, JSON.stringify(category))
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

    public deleteCategory(id: number): Promise<any>{
        return new Promise((resolve, reject) => {
            Api.delete(`${this.baseUrl}category/${id}`)
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