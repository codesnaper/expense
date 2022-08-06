// AuthContext.js

import Amplify from "aws-amplify";

export default function configure (){
    Amplify.configure({
        Auth: {
            
            // REQUIRED - Amazon Cognito Region
            region: ' ap-south-1',
    
            // OPTIONAL - Amazon Cognito User Pool ID
            userPoolId: 'ap-south-1_pvEuDVm63',
    
            userPoolWebClientId:'64eqld0t1cj37uufesd959t9th',
    
            // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
            mandatorySignIn: false,
            
            // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
            // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
            signUpVerificationMethod: 'code', // 'code' | 'link' 
    
            // // OPTIONAL - Configuration for cookie storage
            // // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
            // cookieStorage: {
            // // REQUIRED - Cookie domain (only required if cookieStorage is provided)
            //     domain: '.yourdomain.com',
            // // OPTIONAL - Cookie path
            //     path: '/',
            // // OPTIONAL - Cookie expiration in days
            //     expires: 365,
            // // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
            //     sameSite: "strict" | "lax",
            // // OPTIONAL - Cookie secure flag
            // // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
            //     secure: true
            // },

            
            // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
            authenticationFlowType: 'USER_SRP_AUTH',
    
             // OPTIONAL - Hosted UI configuration
            oauth: {
                domain: 'cognito-idp.ap-south-1.amazonaws.com/ap-south-1_pvEuDVm63',
                scope: ['phone', 'email', 'name'],
                redirectSignIn: 'http://localhost:3000/',
                redirectSignOut: 'http://localhost:3000/',
                responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
            }
        }
    });
}