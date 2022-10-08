import { Configuration } from "../config/Configuration";
import { CurrencyType } from "../modal/CurrencyType";
import { Profile } from "../modal/response/Profile";
import Api from "./Api";
export class ProfileService {
    private baseUrl: string;

    constructor(){
        this.baseUrl = Configuration.resourceVersion;
    }

    public updateTheme(theme: string): Promise<Profile> {
        return new Promise((resolve, reject) => {
            Api.patch(`${this.baseUrl}profile/theme=${theme}`)
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

    public updateCurrency(currency: CurrencyType): Promise<Profile> {
        return new Promise((resolve, reject) => {
            Api.patch(`${this.baseUrl}profile/currency=${currency}`)
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