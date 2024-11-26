import { ErrorResponseImpl } from "./ErrorResponse.ts";
import { ERROR_MESSAGES } from "../_shared/_constants/ErrorMessages.ts";
import { HTTP_STATUS_CODES } from "../_shared/_constants/StatusCodes.ts";

export function handleBadRequestError(): Response {
    const currentTime=new Date();
    return new Response(
        JSON.stringify(new ErrorResponseImpl(
            HTTP_STATUS_CODES["Bad Request"],
            ERROR_MESSAGES.BadRequest,
            currentTime
        )),
        {
            headers: { "Content-Type": "application/json" }
        }
    );
}


export function handleNoApplyJobError(): Response {
    const currentTime = new Date();

    return new Response(
        JSON.stringify(new ErrorResponseImpl(
            HTTP_STATUS_CODES.No_ApplyJob,
            ERROR_MESSAGES.No_ApplyJob,
            currentTime
        )),
        { headers: { "Content-Type": "application/json" } }
    );
}

export function handleNoSavedJobError(): Response {
    const currentTime = new Date();

    return new Response(
        JSON.stringify(new ErrorResponseImpl(
            HTTP_STATUS_CODES.No_SavedJob,
            ERROR_MESSAGES.No_SavedJob,
            currentTime
        )),
        { headers: { "Content-Type": "application/json" } }
    );
}

export  function handleValidationError(erroMessgae:string): Response {
    const currentTime = new Date();

    return new Response(
        JSON.stringify(new ErrorResponseImpl(HTTP_STATUS_CODES["Validation Failed"],erroMessgae,currentTime)),
        { headers: { "Content-Type": "application/json" } }
    );
}
export  function handleNullErrorInJobPosting(erroMessgae:string): Response {
    const currentTime = new Date();

    return new Response(
        JSON.stringify(new ErrorResponseImpl(HTTP_STATUS_CODES["Validation Failed"],erroMessgae,currentTime)),
        { headers: { "Content-Type": "application/json" } }
    );
}


export  function handleInternalServerError(): Response {
    const currentTime = new Date();

    return new Response(
        JSON.stringify(new ErrorResponseImpl(
            HTTP_STATUS_CODES["Internal Server Error"],
            ERROR_MESSAGES.InternalServerError,
            currentTime
        )),
        { headers: { "Content-Type": "application/json" } }
    );
}
