import { Configuration } from "../config/Configuration";
import { ResponseList } from "../modal/ResponseList";
import { Tag } from "../modal/response/Tag";
import Api from "./Api";

export class TagService{
    baseUrl: string;

    constructor(){
        this.baseUrl = Configuration.resourceVersion;
    }

    public fetchAllTag(): Promise<ResponseList<Tag>>{
        return new Promise((resolve, reject) => {
            Api.get(`${this.baseUrl}tag/`)
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

    public saveTag(tag: Tag): Promise<Tag>{
        return new Promise((resolve, reject) => {
            Api.post(`${this.baseUrl}tag/`, tag)
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