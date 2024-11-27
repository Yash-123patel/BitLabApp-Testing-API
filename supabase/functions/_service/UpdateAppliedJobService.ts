import updateAppliedJobById from "../_repository/UpdatAppliedJobRepository.ts";
import { AppliedJobImpl } from "../_model/AppliedJobModel.ts";

export default async function updateAppliedJobByIdFromService(updateData:AppliedJobImpl) {

    try {
        const updatedData=await updateAppliedJobById(updateData);
        return updatedData;
    } catch (error) {
        throw new Error(`Error occured While Updating Applied Job ${error}`); 
    }
    
}