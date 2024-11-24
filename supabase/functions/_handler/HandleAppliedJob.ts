import getAllAppliedJobsFromService from "../_service/AppliedJobService.ts";
import { ERROR_MESSAGES } from "../_shared/_constants/ErrorMessages.ts";
import { HTTP_STATUS_CODES } from "../_shared/_constants/StatusCodes.ts";
import { ErrorResponseImpl } from "../_error/ErrorResponse.ts";



export async function handleGetAppliedJobRequest(req:Request) {
    const currentTime=new Date();
   
    try {
        const url = new URL(req.url);
        const applicantId = url.searchParams.get("applicant_id");
    
        if (applicantId == null || isNaN(parseInt(applicantId))) {
            return new Response(
                JSON.stringify(new ErrorResponseImpl(HTTP_STATUS_CODES["Bad Request"]
                    ,ERROR_MESSAGES.BadRequest,currentTime)),
                    { headers:{"content-type":"application/json"}}
            )
        }
        
        const appliedJobs=await getAllAppliedJobsFromService(parseInt((applicantId)))
        if (appliedJobs==null) {
            return new Response(
                JSON.stringify(new ErrorResponseImpl(HTTP_STATUS_CODES.No_ApplyJob
                    ,ERROR_MESSAGES.No_ApplyJob,currentTime)),
                    { headers:{"content-type":"application/json"}}
            )
        }
        return new Response(
            JSON.stringify(appliedJobs),
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