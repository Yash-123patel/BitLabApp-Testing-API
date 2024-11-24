interface ErrorResponse{
    statusCode:number;
    errorMessage:string;
    errorTime:Date;
}

export class ErrorResponseImpl implements ErrorResponse{
    statusCode:number;
    errorMessage:string;
    errorTime:Date;
    
    constructor(statusCode:number,errorMessage:string,errorTime:Date){
        this.statusCode=statusCode;
        this.errorMessage=errorMessage;
        this.errorTime=errorTime;
    }
}