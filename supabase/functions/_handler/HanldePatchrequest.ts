import { HTTP_STATUS_CODES } from "../_shared/_constants/StatusCodes.ts";
import { handleBadRequestError, handleInternalServerError } from "../_error/ErrorHandler.ts";
import {getAppliedJobData} from "../_repository/UpdatAppliedJobRepository.ts";
import updateUsingPatchFromService from "../_service/UpdateAppliedJobUsingPatch.ts";
import { ErrorResponseImpl } from "../_error/ErrorResponse.ts";
import { AppliedJobImpl } from "../_model/AppliedJobModel.ts";

export default async function handleAppliedJobPatchRequest(req:Request) {  
    try {
        const Jobdata=await req.json();
        const appliedJob:Partial<AppliedJobImpl>= Jobdata;
     
        
        if ((!appliedJob.applyjobid)) {
            return handleBadRequestError("Please Provide applyJobId");
           
        }
        if ((!appliedJob.applicant_status)) {
            return handleBadRequestError("Please Provide applicant_status");
           
        }
        
        const getAppliedJob=await getAppliedJobData(appliedJob.applyjobid);

        if(!getAppliedJob ||getAppliedJob.length==0){
            return new Response(JSON.stringify(new ErrorResponseImpl(HTTP_STATUS_CODES.NotFound,"No Data Present In Table With this ApplyJobId",new Date())),{status:HTTP_STATUS_CODES.NotFound, 
                                                                   headers: { "content-type": "application/json" }});
        }
    
       
        
        
        console.log(`Step 3: Calling service layer with : ${getAppliedJob}`);
        const updatedData=await updateUsingPatchFromService(appliedJob.applyjobid||10,appliedJob);

        
        console.log(`Step 8: Received Update Job message from service layer as: ${JSON.stringify(updatedData)}`);
        console.log("Step 9: Sending  Update Message  to client.");
        return new Response(
            JSON.stringify({
                message: "Data Updated Successfully",
                data: updatedData
            }),
            { 
                status: HTTP_STATUS_CODES.OK,
                headers: { "content-type": "application/json" }
            }
        );

       
    } catch (error) {
         console.log(`Step 9: Error encountered in handler, sending error response to client: ${error}`);
         return handleInternalServerError();
    }
}