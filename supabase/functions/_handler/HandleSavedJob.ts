import { HTTP_STATUS_CODES } from "../_shared/_constants/StatusCodes.ts";
import getAllSavedJobsFromService from "../_service/SavedJobService.ts";
import { handleBadRequestError } from "../_error/ErrorHandler.ts";
import {handleNoSavedJobError} from "../_error/ErrorHandler.ts";
import { handleInternalServerError } from "../_error/ErrorHandler.ts";


export default async function handleGetSavedJobRequest(req:Request) {
    
    try {
        const url=new URL(req.url);
        const applicantregistration_id=url.searchParams.get("applicantregistration_id");
        console.log(`Step 2: Handler received request with applicantregistration_id: ${applicantregistration_id}`);
    

        if(applicantregistration_id==null||isNaN(parseInt(applicantregistration_id))){
            console.log("Step 3: Invalid applicantregistration_id, sending error response to client.");
            return handleBadRequestError();
        }

        console.log(`Step 3: Calling service layer with applicantregistration_id: ${applicantregistration_id}`);
        const savedJobs=await getAllSavedJobsFromService(parseInt(applicantregistration_id));

        if(savedJobs.length==0){
            console.log("Step 8: No jobs found, sending 'No SavedJob' response to client.");
            return handleNoSavedJobError();
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
         return handleInternalServerError();
    }
}