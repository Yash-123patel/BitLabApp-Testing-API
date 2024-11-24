import getAllSavedJobsFromRepo from "../_repository/SavedJobRepository.ts";

export default async function getAllSavedJobsFromService(applicantregistration_id:number) {
    return await getAllSavedJobsFromRepo(applicantregistration_id);
}