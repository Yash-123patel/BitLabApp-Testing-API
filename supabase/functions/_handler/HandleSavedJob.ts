import { HTTP_STATUS_CODES } from "../_shared/_constants/StatusCodes.ts";
import { ERROR_MESSAGES } from "../_shared/_constants/ErrorMessages.ts";
import { ErrorResponseImpl } from "../_error/ErrorResponse.ts";
import getAllSavedJobsFromService from "../_service/SavedJobService.ts";

export default async function handleGetSavedJobRequest(req:Request) {
    const currentTime=new Date();
    try {
        const url=new URL(req.url);
        const applicantregistration_id=url.searchParams.get("applicantregistration_id");
        console.log(`Step 2: Handler received request with applicantregistration_id: ${applicantregistration_id}`);
    

        if(applicantregistration_id==null||isNaN(parseInt(applicantregistration_id))){
            console.log("Step 3: Invalid applicantregistration_id, sending error response to client.");
            return new Response(
                JSON.stringify(new ErrorResponseImpl(HTTP_STATUS_CODES["Bad Request"]
                    ,ERROR_MESSAGES.BadRequest,currentTime)),
                    { headers:{"content-type":"application/json"}}
            )
        }
        console.log(`Step 3: Calling service layer with applicantregistration_id: ${applicantregistration_id}`);
        const savedJobs=await getAllSavedJobsFromService(parseInt(applicantregistration_id));

        if(!savedJobs){
            console.log("Step 8: No jobs found, sending 'No SavedJob' response to client.");
            return new Response(
                JSON.stringify(new ErrorResponseImpl(HTTP_STATUS_CODES.No_SavedJob
                    ,ERROR_MESSAGES.No_SavedJob,currentTime)),
                    { headers:{"content-type":"application/json"}}
            )
        }
        console.log(`Step 8: Received applied jobs data from service layer as: ${JSON.stringify(savedJobs)}`);
        console.log("Step 9: Sending all applied jobs data to client.");
        return new Response(
            JSON.stringify(savedJobs),
            { 
                status:HTTP_STATUS_CODES.OK,
                headers: { "content-type": "application/json" } 
            }
        );
    } catch (error) {
         console.log(`Step 9: Error encountered in handler, sending error response to client: ${error}`);
        return new Response(
            JSON.stringify(new ErrorResponseImpl(HTTP_STATUS_CODES["Internal Server Error"],ERROR_MESSAGES.InternalServerError,currentTime)),
            {headers:{"content-type":"application/json"}}
        ) 
    }
}