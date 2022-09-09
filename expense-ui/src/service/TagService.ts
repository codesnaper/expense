import { Configuration } from "../config/Configuration";
import { ResponseList } from "../modal/ResponseList";
import { Tag } from "../modal/Tag";
import Api from "./Api";

export class TagService{
    baseUrl: string;

    constructor(){
        this.baseUrl = Configuration.baseUrl+Configuration.resourceVersion;
    }

    public fetchAllTag(): Promise<ResponseList<Tag>>{
        return new Promise((resolve, reject) => {
            Api.get('tag/')
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