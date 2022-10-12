import { ApiError } from "../modal/response/Error";
import { PasswordReset } from "../modal/PasswordReset";
import { LoginCredential, User, UserToken } from "../modal/response/User";
import Api from "./Api";
export class UserService {

    constructor() { }

    public loginUser(credential: LoginCredential, rememberFlag: boolean = false): Promise<User> {
        return new Promise((resolve, reject) => {
            Api.post('login', JSON.stringify(credential))
                .then(res => {
                    localStorage.setItem('token', res.headers['authorization']);
                    if (rememberFlag) {
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
                        message: err.response.data ? err.response.data.message : err.message,
                        field: err.response.data?.field,
                        timestamp: err.response.data?.timestamp
                    }
                    reject(error)
                });
        })
    }

    public sendForgotPasswordCode(username: String): Promise<void> {
        return new Promise((resolve, reject) => {
            Api.get(`confirmationCode?username=${username}`)
            .then(() => resolve())
            .catch(err => reject({
                status: err.response.data?.status,
                errorCode: err.response.data?.errorCode,
                message: err.response.data ? err.response.data.message : err.message,
                field: err.response.data?.field,
                timestamp: err.response.data?.timestamp
            }));  
        });
    }

    public forgotPassword(forgotPassword: PasswordReset): Promise<void> {
        return new Promise((resolve, reject) => {
            Api.post(`forgotPassword`, JSON.stringify(forgotPassword))
                .then(() => resolve())
                .catch(err => reject({
                    status: err.response.data?.status,
                    errorCode: err.response.data?.errorCode,
                    message: err.response.data ? err.response.data.message : err.message,
                    field: err.response.data?.field,
                    timestamp: err.response.data?.timestamp
                }));
        });
    }

    public newUser(user: User): Promise<void> {
        return new Promise((resolve, reject) => {
            Api.post(``, JSON.stringify(user))
                .then(() => resolve())
                .catch(err => reject({
                    status: err.response.data?.status,
                    errorCode: err.response.data?.errorCode,
                    message: err.response.data ? err.response.data.message : err.message,
                    field: err.response.data?.field,
                    timestamp: err.response.data?.timestamp
                }));
        });
    }
}