import { Configuration } from "../config/Configuration";
import { ResponseList } from "../modal/ResponseList";
import { Tag } from "../modal/Tag";

export class TagService{
    baseUrl: string;

    constructor(){
        this.baseUrl = Configuration.baseUrl;
    }

    public fetchAllTag(userId: string | undefined ): Promise<ResponseList<Tag>>{
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}tag/`, {
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
}