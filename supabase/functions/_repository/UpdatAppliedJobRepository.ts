import supabase from "../_shared/_config/supabaseClient.ts";
import { AppliedJobImpl } from "../_model/AppliedJobModel.ts";

export  async function getAppliedJobData(appliedJobId:number) {
    const{data,error}=await supabase
         .from('applied_job')
         .select('*')
         .eq('applyjobid',appliedJobId);

         if(error){
            throw new Error(`Error While getting Applied job data by id ${error.message}`);
         }
         console.log(data);

         return data;
    
}
export default async function updateAppliedJobById(updateData: AppliedJobImpl) {
   try {
      const { data, error } = await supabase
    .from('applied_job')  
    .update(updateData)
    .eq('applyjobid',updateData.applyjobid)
    .select('*');

      
       if (error) {
           throw new Error(`Error updating job with applyjobid ${updateData.applyjobid}: ${error.message}`);
       }

       console.log("Successfully updated job:", data);
       return data;

   } catch (err) {
       console.error("Error in updateAppliedJobById function:", err);
       throw err; 
   }
}
