import { esES } from "@mui/x-date-pickers";
import { Configuration } from "../config/Configuration";
import { BankModal, BankModalsResponse, ResponseDelete } from "../modal/bank";
import { ApiError,  ErrorCode } from "../modal/response/Error";
import { LoginCredential, User, UserToken } from "../modal/response/User";
import Api from "./Api";
export class UserService {
    baseUrl: string;

    constructor(){
        this.baseUrl = Configuration.baseUrl;
    }

    public loginUser(credential: LoginCredential, rememberFlag: boolean = false): Promise<User> {
        return new Promise((resolve, reject) => {
            Api.post('login', JSON.stringify(credential))
            .then(res => {
                localStorage.setItem('token', res.headers['authorization']);
                if(rememberFlag){
                    localStorage.setItem('expire', res.headers['expire']);
                    localStorage.setItem('refreshToken', res.headers['refreshtoken']);
                }
                const user: User = res.data;
                localStorage.setItem('user', JSON.stringify(user));
                resolve(user);
            })
            .catch(err => {
                const error: ApiError = {
                    status: err.response.data?.status,
                    errorCode: err.response.data?.errorCode,
                    message: err.response.data? err.response.data.message: err.message,
                    field: err.response.data?.field,
                    timestamp: err.response.data?.timestamp
                }
                reject(error)
            });
        })
    }
}