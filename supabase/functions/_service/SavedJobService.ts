import getAllSavedJobsFromRepo from "../_repository/SavedJobRepository.ts";

export default async function getAllSavedJobsFromService(applicantregistration_id:number) {
    console.log(`Step 4: Received request in service layer with applicantregistration_id: ${applicantregistration_id}. Calling repository layer to fetch saved jobs.`);
    try {
        const appliedJobs = await  getAllSavedJobsFromRepo(applicantregistration_id);
        return appliedJobs;
    } catch (error) {
        console.error(`Error in service layer while fetching applied jobs: ${error}`);
        throw new Error(`An error occurred while fetching applied jobs for applicant_id: ${applicantregistration_id}. Error: ${error}`);
 
    }
}