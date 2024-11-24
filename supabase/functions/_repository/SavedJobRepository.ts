import supabase from "../_shared/_config/supabaseClient.ts";
import { SavedJobImpl } from "../_model/SavedJobModel.ts";

export default async function getAllSavedJobsFromRepo(applicantregistration_id:number) {
    const{data:savedJobs,error}=await supabase
    .from('saved_job')
    .select('*')
    .eq('applicantregistration_id',applicantregistration_id);

    if(error)       
      return { error: error.message };  
          
    if(savedJobs.length === 0) 
         return null;
          
    return savedJobs.map((job:SavedJobImpl)=>new SavedJobImpl(job)); 
   
}