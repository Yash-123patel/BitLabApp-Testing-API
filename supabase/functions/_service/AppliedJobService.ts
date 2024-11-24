import getAllAppliedJobsFromRepo from "../_repository/AppliedJobRepository.ts";

export default async function getAllAppliedJobsFromService(applicant_id: number) {
    return await getAllAppliedJobsFromRepo(applicant_id);
    
    
}