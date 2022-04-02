import { IUser } from "./IAdmin";

export interface IOrgAuth {
    conformationToken : string,
    conformationUrl : string,
    isSuccessful : boolean,
    responseMessage : string,
    responseCode : string
}

export interface IRefreshToken {
    accessToken : string,
    refreshToken : string,
    tokenExpiryDate : string,
    audience : string
}

export interface IGeneratedToken {
    access_token : string,
    expires_in : number,
    token_type : string,
    scope : string
}

export interface IPasswordReset {
    passwordResetLink : string,
    token : string,
    isSuccessful : boolean,
    responseMessage : string,
    responseCode : string
}

export interface IVPasswordReset {
    isSuccessful : boolean,
    responseMessage : string,
    responseCode : string
}

export interface IVEmail {
    isSuccessful : boolean,
    responseMessage : string,
    responseCode : string
}

export interface ISignInResult {
    succeeded : boolean,
    isLockedOut : boolean,
    isNotAllowed : boolean,
    requiresTwoFactor : boolean
}

export interface ILoggedInDetails {
    user : IUser,
    roles : Array<string>,
    loginSuccessful : boolean,
    responseMessage : null,
    token : IRefreshToken,
    signInResult : ISignInResult
}

export interface IAuth {
    orgAuth : IOrgAuth,
    refreshToken : IRefreshToken,
    generatedToken : IGeneratedToken,
    passwordReset : IPasswordReset,
    verifyPasswordReset: IVPasswordReset; 
    verifyEmail: IVEmail; 
    loggedInDetails : ILoggedInDetails,
    loading : boolean,
    action : string,
    errors : string,
    authenticated: boolean;
}