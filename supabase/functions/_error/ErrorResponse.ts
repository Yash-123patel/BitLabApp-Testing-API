interface ErrorResponse {
    statusCode: number;
    errorMessage: string;
    errorTime: Date;
    customCode?: number; 
}


export class ErrorResponseImpl implements ErrorResponse {
    statusCode: number;
    errorMessage: string;
    errorTime: Date;
    customCode?: number;

    constructor(statusCode: number, errorMessage: string, errorTime: Date, customCode?: number) {
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
        this.errorTime = errorTime;
        this.customCode = customCode;
    }
}

