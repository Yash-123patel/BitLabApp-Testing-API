import supabase from "../_shared/_config/supabaseClient.ts";
import { SavedJobImpl } from "../_model/SavedJobModel.ts";

export default async function getAllSavedJobsFromRepo(applicantregistration_id:number) {
  console.log(`Step 5: Received applicantregistration_id in repository: ${applicantregistration_id}`);
  console.log("Step 6: Connecting to Supabase database to retrieve applied jobs.");
   try {
    const{data:savedJobs,error}=await supabase
    .from('saved_job')
    .select('*')
    .eq('applicantregistration_id',applicantregistration_id);

    if(error)   
      {
        console.log(`Step 7: Error encountered in repository layer: ${error.message}`);
        throw new Error(error.message);  
      }    
    
          
      if (savedJobs.length === 0) {
        console.log(`Step 7: No saved jobs found for applicantregistration_id: ${applicantregistration_id}.`);
        return [];
      }
        
      console.log("Step 7: Successfully retrieved saved jobs, returning to service layer.");
      return savedJobs.map((job:SavedJobImpl)=>new SavedJobImpl(job)); 
    
   } catch (err) {
    console.log(`Unexpected error in repository layer: ${err}`);
    throw new Error(`An error occurred in the repository layer while fetching applied jobs: ${err}`); 
    
   }
   
}