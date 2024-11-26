import getAllAppliedJobsFromService from "../_service/AppliedJobService.ts";
import { HTTP_STATUS_CODES } from "../_shared/_constants/StatusCodes.ts";
import { handleBadRequestError } from "../_error/ErrorHandler.ts";
import { handleNoApplyJobError } from "../_error/ErrorHandler.ts";
import { handleInternalServerError } from "../_error/ErrorHandler.ts";



export async function handleGetAppliedJobRequest(req:Request) {
    
   
    try {
        const url = new URL(req.url);
        const applicantId = url.searchParams.get("applicant_id");
        
        console.log(`Step 2: Handler received request with applicant_id: ${applicantId}`);
    
        if (applicantId == null || isNaN(parseInt(applicantId))) {
            console.log("Step 3: Invalid applicant_id, sending error response to client.");
            return handleBadRequestError();
        }
        console.log(`Step 3: Calling service layer with applicant_id: ${applicantId}`);

        const appliedJobs=await getAllAppliedJobsFromService(parseInt((applicantId)))

        

        if (appliedJobs.length === 0) {
           console.log("Step 8: No jobs found, sending 'No ApplyJob' response to client.");
           return handleNoApplyJobError();
        }


        console.log(`Step 8: Received applied jobs data from service layer as: ${JSON.stringify(appliedJobs)}`);
        console.log("Step 9: Sending all applied jobs data to client.");
        return new Response(
            JSON.stringify(appliedJobs),
            { 
                status:HTTP_STATUS_CODES.OK,
                headers: { "content-type": "application/json" } 
            }
        );


    } catch (error) {
        console.log(`Step 9: Error encountered in handler, sending error response to client: ${error}`);
        return handleInternalServerError();
    }

   
 
    
}