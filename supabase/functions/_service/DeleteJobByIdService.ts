import deleteJobByIdFromRepo from "../_repository/DeleteJobByIdRepository.ts";

export default async function deleteJobByIdFromService(Jobid:number) {
    console.log(`Step 4: Received request in service layer with Job Id: ${Jobid}. Calling repository layer to fetch applied jobs.`);
    try {
        const deleteData=await deleteJobByIdFromRepo(Jobid);
        return deleteData;
        
    } catch (error) {
        console.error(`Error in service layer while Deleting jobs: ${error}`);
        throw new Error(`Error While Deleting job ${error}`);
        
    }
    
}