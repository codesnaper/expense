import { Configuration } from "../config/Configuration";
import { Client, CompatClient, IMessage } from "@stomp/stompjs"
export class NotificationService{


    client: Client;


    constructor(){
        this.client = new Client({
            brokerURL: Configuration.wsUrl,
            onConnect: ()=>{
                alert('connect')
            },
            debug: (msr) => console.log(msr),
            connectHeaders: {
                'passcode': 'eyJraWQiOiIzQ0FTQ3dVd0ZNYzJmMUtOZmRRbnVNVmE4WFdGMit4c2lhWnFYQ0VRZ2ZvPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxNzUwNWYxYS0zNmQxLTQ5MmYtODlhYS0xYTg1OGQxOTU5OGMiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX3B2RXVEVm02MyIsImNsaWVudF9pZCI6IjY0ZXFsZDB0MWNqMzd1dWZlc2Q5NTl0OXRoIiwib3JpZ2luX2p0aSI6IjQyZjFlNWQ0LWM5NzQtNDA2Yy04N2M4LTY2ZGYzNmI1ZDk4MyIsImV2ZW50X2lkIjoiNTM4YzQ2ZjMtMjY1ZC00MTUwLWJhZWEtNmZiMWNjMWY4MGJhIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY2MzE4Njc0MiwiZXhwIjoxNjYzMjA0NzQyLCJpYXQiOjE2NjMxODY3NDIsImp0aSI6IjkyZWVjNWUzLWFlOTQtNDUzZi1iOGY2LTE0ODJiNTRjZDc3NCIsInVzZXJuYW1lIjoiMTc1MDVmMWEtMzZkMS00OTJmLTg5YWEtMWE4NThkMTk1OThjIn0.0UtNPr6kdxKTG4XsTTw-uQUC7FPD0mJ7VfmTh_VMLcJDHWT8wV3LXPcgwk6imWBtMWdQbFTpe23VNEm_gudktTGCo8XWgkv_ZLACVPCvTWRL_AqlGXGA6EMTz6b0JH45wskGx2k_oPHCrF_a96A-UbKqHn5CVe_ntk1QLmpo_ENpZQKLm38PuFbhFSRgtXPT4dk1zj30z_GM8BYg2MlCDUu7JY2GRUFaFrYhyLInzXPNLQvJF7WgRv_sJfitbOeCoCvFsdbaVOsq50XmWkcYcTKRO_ohPOH8gZ2ts9J3DGU1B04H0erbZdO_vJhJxyoVL5SOn0szY3yoJOcm25GUHg'
            },


            
        })
        this.client.activate();
        // while(!this.client.active){
        //     console.log('not active');
        // }
        this.client.onConnect = () => {
           
            this.client.subscribe('/topic/*', (msg: IMessage) => {
                console.log('recieve')
                    alert(JSON.stringify(msg.headers))
                    alert(JSON.stringify(msg.body));
                })

                this.client.publish({
                    destination: '/expense/ws/app/generate'
                })
            
        }
    }



}