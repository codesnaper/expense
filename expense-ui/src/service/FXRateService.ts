import { Configuration } from "../config/Configuration";
import { CurrencyType } from "../modal/CurrencyType";
import { FxRate } from "../modal/response/FxRate";
import Api from "./Api";
export class FXRateService {
    private baseUrl: string;

    constructor(){
        this.baseUrl = Configuration.resourceVersion;
    }

    public getRate(toCurrencyType?: CurrencyType, fromCurrencyType?: CurrencyType): Promise<number> {
        return new Promise((resolve, reject) => {
            Api.get(`${this.baseUrl}fxrate?toCurrencyType=${toCurrencyType}&fromCurrencyType=${fromCurrencyType}`,
                {
                    headers: {
                        'Accept': 'text/plain'
                    }
                }
            )
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

    public getRates(currencyType?: CurrencyType): Promise<FxRate[]> {
        return new Promise((resolve, reject) => {
            Api.get(`${this.baseUrl}fxrate/all?currencyType=${currencyType}`)
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