import supabase from "../_shared/_config/supabaseClient.ts";
import { AppliedJobImpl } from "../_model/AppliedJobModel.ts";

export default async function getAllAppliedJobsFromRepo(applicant_id: number) {
  const { data:appliedJobs, error } = await supabase
    .from('applied_job') 
    .select('*')
    .eq('applicant_id', applicant_id);  

  if (error) 
    return { error: error.message };  
  
  if (appliedJobs.length === 0) 
    return null;
  
  return appliedJobs.map((job:AppliedJobImpl)=>new AppliedJobImpl(job)); 
}
