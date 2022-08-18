// AuthContext.js

import Amplify from "aws-amplify";

export default function configure() {
    Amplify.configure({
        Auth: {
            region: ' ap-south-1',
            userPoolId: 'ap-south-1_pvEuDVm63',
            userPoolWebClientId: '64eqld0t1cj37uufesd959t9th',
            mandatorySignIn: false,
            signUpVerificationMethod: 'code', // 'code' | 'link'       
            authenticationFlowType: 'USER_SRP_AUTH',
            oauth: {
                domain: 'cognito-idp.ap-south-1.amazonaws.com/ap-south-1_pvEuDVm63',
                scope: ['phone', 'email', 'name'],
                redirectSignIn: 'http://localhost:3000/',
                redirectSignOut: 'http://localhost:3000/',
                responseType: 'code' 
            }
        }
    });
}