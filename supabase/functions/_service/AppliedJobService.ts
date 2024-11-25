import getAllAppliedJobsFromRepo from "../_repository/AppliedJobRepository.ts";

export default async function getAllAppliedJobsFromService(applicant_id: number) {
    console.log(`Step 4: Received request in service layer with applicant_id: ${applicant_id}. Calling repository layer to fetch applied jobs.`);
    
    try {
        const appliedJobs = await getAllAppliedJobsFromRepo(applicant_id);
        return appliedJobs;
    } catch (error) {
        console.error(`Error in service layer while fetching applied jobs: ${error}`);
        throw new Error(`An error occurred while fetching applied jobs for applicant_id: ${applicant_id}. Error: ${error}`);
 
    }
}
