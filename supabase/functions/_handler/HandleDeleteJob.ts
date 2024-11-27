import { HTTP_STATUS_CODES } from "../_shared/_constants/StatusCodes.ts";
import { handleBadRequestError } from "../_error/ErrorHandler.ts";
import { handleInternalServerError } from "../_error/ErrorHandler.ts";
import deleteJobByIdFromService from "../_service/DeleteJobByIdService.ts";
import { getJobIdCount } from "../_repository/DeleteJobByIdRepository.ts";

export default async function handleDeleteJobByIdRequest(req:Request) {  
    try {
        const formData=await req.formData();
        const jobId=formData.get('jobId');
        console.log(`Step 2: Handler received request with Jobid: ${jobId}`);
       
        if((typeof jobId!=='string')||jobId==null||isNaN(parseInt(jobId))){
            console.log("Step 3: Invalid Jobid, sending error response to client.");
            return handleBadRequestError("Invalid Jobid");
        }
        const jobCount=await getJobIdCount(parseInt(jobId));
        
        if(jobCount.length>0){
            console.log(`Step 3: Calling service layer with JobId: ${jobId}`);
            const deleteJob=await deleteJobByIdFromService(parseInt(jobId));

            console.log(`Step 8: Received Delete Job message from service layer as: ${JSON.stringify(deleteJob)}`);
            console.log("Step 9: Sending  DeleteJob Message  to client.");
            return new Response(
                JSON.stringify("JOb Deleted Successfully"),
                { 
                    status:HTTP_STATUS_CODES.OK,
                    headers: { "content-type": "application/json" } 
                }
            );
        }

        return new Response(JSON.stringify("Job Id Not Present In Table"),{status:HTTP_STATUS_CODES.NotFound});

       
    } catch (error) {
         console.log(`Step 9: Error encountered in handler, sending error response to client: ${error}`);
         return handleInternalServerError();
    }
}