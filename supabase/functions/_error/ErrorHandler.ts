import { ErrorResponseImpl } from "./ErrorResponse.ts";
import { ERROR_MESSAGES } from "../_shared/_constants/ErrorMessages.ts";
import { HTTP_STATUS_CODES } from "../_shared/_constants/StatusCodes.ts";

export function handleBadRequestError() {
    return new Response(
        JSON.stringify(new ErrorResponseImpl(
            HTTP_STATUS_CODES.BadRequest,
            "Invalid applicant_id",
            new Date(),
        )),
        {
            status: HTTP_STATUS_CODES.BadRequest,
            headers: { "content-type": "application/json" },
        }
    );
}

export function handleValidationError(errorMessage: string): Response {
    const currentTime = new Date();

    return new Response(
        JSON.stringify(new ErrorResponseImpl(
            HTTP_STATUS_CODES.BadRequest,
            errorMessage,
            currentTime,
            HTTP_STATUS_CODES.ValidationFailed
        )),
        {
            status: HTTP_STATUS_CODES.BadRequest,
            headers: { "content-type": "application/json" },
        }
    );
}

export function handleNullErrorInJobPosting(errorMessage: string): Response {
    const currentTime = new Date();

    return new Response(
        JSON.stringify(new ErrorResponseImpl(
            HTTP_STATUS_CODES.BadRequest,
            errorMessage,
            currentTime,
            HTTP_STATUS_CODES.ValidationFailed
        )),
        {
            status: HTTP_STATUS_CODES.BadRequest,
            headers: { "content-type": "application/json" },
        }
    );
}

export function handleInternalServerError(): Response {
    const currentTime = new Date();

    return new Response(
        JSON.stringify(new ErrorResponseImpl(
            HTTP_STATUS_CODES.InternalServerError,
            ERROR_MESSAGES.InternalServerError,
            currentTime,
        )),
        {
            status: HTTP_STATUS_CODES.InternalServerError,
            headers: { "content-type": "application/json" },
        }
    );
}




export function handleNoAppliedJobsFound() {
    return new Response(
        JSON.stringify({
            message: "No applied jobs found for the given applicant."
        }),
        {
            status: HTTP_STATUS_CODES.OK, 
            headers: { "content-type": "application/json" },
        }
    );
}

export function handleNoSavedJobsFound(): Response {
    return new Response(
        JSON.stringify({
            message: "No saved jobs found for the given applicant."
        }),
        {
            status: HTTP_STATUS_CODES.OK, 
            headers: { "content-type": "application/json" },
        }
    );
}

