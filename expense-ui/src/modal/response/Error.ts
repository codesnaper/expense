export interface ApiError {
    status: keyof typeof HttpStatus,
    message: string,
    errorCode: keyof typeof ErrorCode,
    timestamp: Date,
    field: string| null
}

enum HttpStatus{
    UNAUTHORIZED
}

export enum ErrorCode {
    MISSING_FIELD,
    SERVER_ERROR,
    DUPLICATE_FIELD,
    NO_ELEMENT,
    AUTHENTICATION,
    JWT_TOKEN_EXPIRED,
    JWT_TOKEN_INVLID,
    USER_CREATION_FAILED,
    NEW_PASSWORD_REQUIRED,
}