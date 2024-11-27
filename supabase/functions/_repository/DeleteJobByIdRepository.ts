import supabase from "../_shared/_config/supabaseClient.ts";


export async function getJobIdCount(Jobid:number) 
{
    console.log(`Step 5: Received Jobid in repository: ${Jobid}`);
    console.log("Step 6: Connecting to Supabase database to retrieve applied jobs.");
    const {data,error}=await supabase
        .from('jobs')
        .select('*')
        .eq('id',Jobid);

        
       if(error){
        throw new Error(`Error While getting job by id ${error.message}`);
       }
       console.log(data);
       return data;
}

export default async function deleteJobByIdFromRepo(Jobid:number) {
    console.log(`Step 5: Received Jobid in repository: ${Jobid}`);
    console.log("Step 6: Connecting to Supabase database to retrieve applied jobs.");
    const{data,error}=await supabase
       .from('jobs')
       .delete()
       .eq('id',Jobid);

       if(error){
        throw new Error(`Error While Deleting job ${error.message}`);
       }
       console.log(data);
       return data;
    
}