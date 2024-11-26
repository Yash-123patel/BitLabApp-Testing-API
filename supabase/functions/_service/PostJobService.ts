import postJobFromRepo from "../_repository/PostJobRepository.ts";
import { JobImpl } from "../_model/PostJobModel.ts";


export default async function postJobFromService(job:JobImpl) {
    console.log("Step 5: Job Data recieved Succesully In Service")
    try {
       console.log("Step 6: Calling JobPostRepository to post Job");
        
        const data= await postJobFromRepo(job);
        console.log("Step 10: Job Posted Sucessfully got posted data from repository");
        
        return data;
        
    } catch (error) {
        console.log("Step 10: GEttng some errors is service: "+error);
        throw new Error("An unexpected error occurred while posting the job."+error);  
    }
   
}