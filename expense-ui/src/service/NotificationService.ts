import { Configuration } from "../config/Configuration";
import { Client, IFrame, IMessage, StompHeaders, StompSubscription } from "@stomp/stompjs"
import { ApiError } from "../modal/response/Error";
export class NotificationService {

    private wsUrl: string = Configuration.wsUrl;

    private notificationAppDestination: string = '/expense/ws/app/notification/refresh'

    private userName: string = ``;

    private client?: Promise<Client>;

    private notificationResultCallback: (message: IMessage)=> void = ()=>{};


    constructor() {
    }

    private getClient(token: string): Promise<Client> {
        return new Promise((resolve, reject) => {

            const client: Client = new Client({
                brokerURL: this.wsUrl,
                debug: (msg: string) => {
                    if (Configuration.debug) {
                        console.log(msg);
                    }
                },
                reconnectDelay: 20000,
                logRawCommunication: Configuration.debug,
                connectHeaders: {
                    'passcode': token
                },
                connectionTimeout: Configuration.connectionTimeout
            });
            client.activate();
        
            client.onConnect = (reciept: IFrame) => {
                this.userName = reciept.headers['user-name'];
                resolve(client);
            }
            client.onStompError = (reciept: IFrame) => {
                reject({
                    status: 500,
                    errorCode: reciept.headers['message'],
                    message: reciept.body,
                    timestamp: new Date()
                })
            };
            client.onDisconnect = (reciept: IFrame) => {
                reject({
                    status: 500,
                    errorCode: reciept.headers['message'],
                    message: reciept.body,
                    timestamp: new Date()
                })
            };
        });
    }

    initialize(callback: (message: IMessage) => void) {
        this.notificationResultCallback = callback;
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            this.client = this.getClient(accessToken);
        }
        else {
            throw new Error('Re-login user');
        }
    }

    subscribeNotification(headers: StompHeaders= {}): Promise<StompSubscription> {
        this.client?.then((client: Client) => {
            client.publish({
                destination: this.notificationAppDestination,
                headers: {
                    'login': this.userName
                }
            });
        });
        return new Promise((resolve, reject) => {
            this.client?.then((client: Client) => {
                resolve(client.subscribe(`/user/queue/notification`, this.notificationResultCallback, headers));
            }).catch((err: ApiError) => {
                reject(err);
            })
        });
    }
}