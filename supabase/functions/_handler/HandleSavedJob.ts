import { HTTP_STATUS_CODES } from "../_shared/_constants/StatusCodes.ts";
import { ERROR_MESSAGES } from "../_shared/_constants/ErrorMessages.ts";
import { ErrorResponseImpl } from "../_error/ErrorResponse.ts";
import getAllSavedJobsFromService from "../_service/SavedJobService.ts";

export default async function handleGetSavedJobRequest(req:Request) {
    const currentTime=new Date();
    try {
        const url=new URL(req.url);
        const applicantregistration_id=url.searchParams.get("applicantregistration_id");

        if(applicantregistration_id==null||isNaN(parseInt(applicantregistration_id))){
            return new Response(
                JSON.stringify(new ErrorResponseImpl(HTTP_STATUS_CODES["Bad Request"]
                    ,ERROR_MESSAGES.BadRequest,currentTime)),
                    { headers:{"content-type":"application/json"}}
            )
        }
        const savedJobs=await getAllSavedJobsFromService(parseInt(applicantregistration_id));

        if(!savedJobs){
            return new Response(
                JSON.stringify(new ErrorResponseImpl(HTTP_STATUS_CODES.No_SavedJob
                    ,ERROR_MESSAGES.No_SavedJob,currentTime)),
                    { headers:{"content-type":"application/json"}}
            )
        }
        return new Response(
            JSON.stringify(savedJobs),
            { 
                status:HTTP_STATUS_CODES.OK,
                headers: { "content-type": "application/json" } 
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify(new ErrorResponseImpl(HTTP_STATUS_CODES["Internal Server Error"],ERROR_MESSAGES.InternalServerError,currentTime)),
            {headers:{"content-type":"application/json"}}
        ) 
    }
}