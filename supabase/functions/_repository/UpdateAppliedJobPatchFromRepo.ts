import supabase from "../_shared/_config/supabaseClient.ts";
import { AppliedJobImpl } from "../_model/AppliedJobModel.ts";

export default async function updateJobUsingPatch(applyJobId: number,toUpdate: Partial<AppliedJobImpl>) {
    try {
       const { data, error } = await supabase
     .from('applied_job')  
     .update(toUpdate)
     .eq('applyjobid',applyJobId)
     .select('*');
 
       
        if (error) {
            throw new Error(`Error updating job with applyjobid ${applyJobId}: ${error.message}`);
        }
 
        console.log("Successfully updated job:", data);
        return data;
 
    } catch (err) {
        console.error("Error in updateAppliedJobById function:", err);
        throw err; 
    }
 }
 