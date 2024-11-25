import supabase from "../_shared/_config/supabaseClient.ts";
import { AppliedJobImpl } from "../_model/AppliedJobModel.ts";

export default async function getAllAppliedJobsFromRepo(applicant_id: number) {
  console.log(`Step 5: Received applicant_id in repository: ${applicant_id}`);
  console.log("Step 6: Connecting to Supabase database to retrieve applied jobs.");

  try {
    const { data: appliedJobs, error } = await supabase
      .from('applied_job') 
      .select('*')
      .eq('applicant_id', applicant_id);  

    if (error) {
      console.log(`Step 7: Error encountered in repository layer: ${error.message}`);
      throw new Error(error.message);
    }

    if (appliedJobs.length === 0) {
      console.log(`Step 7: No applied jobs found for applicant_id: ${applicant_id}.`);
      return [];
    }

    console.log("Step 7: Successfully retrieved applied jobs, returning to service layer.");
    return appliedJobs.map((job: AppliedJobImpl) => new AppliedJobImpl(job));

  } catch (err) {
    console.log(`Unexpected error in repository layer: ${err}`);
    throw new Error(`An error occurred in the repository layer while fetching applied jobs: ${err}`); 
  }
}
