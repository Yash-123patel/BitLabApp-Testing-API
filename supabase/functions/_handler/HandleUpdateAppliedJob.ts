import { HTTP_STATUS_CODES } from "../_shared/_constants/StatusCodes.ts";
import { handleBadRequestError, handleInternalServerError } from "../_error/ErrorHandler.ts";
import {getAppliedJobData} from "../_repository/UpdatAppliedJobRepository.ts";
import { AppliedJobImpl } from "../_model/AppliedJobModel.ts";
import updateAppliedJobByIdFromService from "../_service/UpdateAppliedJobService.ts";
import { ErrorResponseImpl } from "../_error/ErrorResponse.ts";

export default async function handleUpdateAppliedJobRequest(req:Request) {  
    try {
        const data:AppliedJobImpl=await req.json();
        const requiredFields = ["applyjobid", "applicant_status", "application_date","applicant_id","job_id","change_date"]; 
    
       const missingFields = requiredFields.filter(
           (field) => !Object.hasOwn(data, field)
       );
       if(missingFields.length>0){
        return handleBadRequestError("Provide All the fields");
       }

        console.log(data);

        const getAppliedJob=await getAppliedJobData(data.applyjobid);

        if(!getAppliedJob ||getAppliedJob.length==0){
            
            return new Response(JSON.stringify(new ErrorResponseImpl(HTTP_STATUS_CODES.NotFound,"No Data Present In Table With this ApplyJobId",new Date())),{status:HTTP_STATUS_CODES.NotFound, 
            headers: { "content-type": "application/json" }});
            
        }
        
        console.log(`Step 3: Calling service layer with : ${getAppliedJob}`);
        const updatedData=await updateAppliedJobByIdFromService(data);

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