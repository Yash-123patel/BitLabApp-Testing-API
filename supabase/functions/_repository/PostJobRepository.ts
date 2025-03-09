import supabase from "../_shared/_config/supabaseClient.ts";
import { JobImpl } from "../_model/PostJobModel.ts";

export default async function postJobFromRepo(job: JobImpl) {
    console.log("Step 7: Got Data From Service Layer");
    console.log("Step 8: Creating Database Connection")
    const { data, error } = await supabase
        .from('job')
        .insert([
            {
                alert_count: job.alert_count,
                creation_date: job.creation_date,
                description: job.description,
                employee_type: job.employee_type,
                industry_type: job.industry_type,
                job_status: job.job_status,
                job_title: job.job_title,
                location: job.location,
                max_salary: job.max_salary,
                maximum_experience: job.maximum_experience,
                min_salary: job.min_salary,
                minimum_experience: job.minimum_experience,
                minimum_qualification: job.minimum_qualification,
                new_status: job.new_status,
                promote: job.promote,
                recent_application_date_time: job.recent_application_date_time,
                specialization: job.specialization,
                status: job.status,
                job_recruiter_recruiter_id: job.job_recruiter_recruiter_id,
                is_saved: job.is_saved,
                visitor_count: job.visitor_count,
                joburl: job.joburl
            }
        ])
        .select();  
    if (error) {
        console.log("Step 9: Getting some error while inserting data", data);
        throw new Error(`Error inserting job: ${error.message}`);
    }

    if (!data || data.length === 0) {
        console.log("Step 9: Inserted job data: but not got object back from database", data);
        throw new Error("Job insertion succeeded, but no data was returned.");
    }
    console.log("Step 9: Inserted job data:", data);

    return data;
}
