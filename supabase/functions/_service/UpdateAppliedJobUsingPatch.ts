import updateJobUsingPatch from "../_repository/UpdateAppliedJobPatchFromRepo.ts";
import { AppliedJobImpl } from "../_model/AppliedJobModel.ts";

export default async function updateUsingPatchFromService(applyJobId: number, toUpdate: Partial<AppliedJobImpl>) {
    try {
        
        const updatedData = await updateJobUsingPatch(applyJobId, toUpdate);
        return updatedData;
    } catch (error) {// Detailed error message with the applyJobId
        throw new Error(`Error occurred while updating Applied Job with ID ${applyJobId}: ${error}`);
    }
}