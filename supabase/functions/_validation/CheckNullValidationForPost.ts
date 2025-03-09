import { JobImpl } from "../_model/PostJobModel.ts";
import { ErrorResponseImpl } from "../_error/ErrorResponse.ts";

export default function valiNullIndateJobData(job:JobImpl) {
    const missingFields: string[] = [];

    if (job.alert_count == null) missingFields.push("alert_count");
    if (job.creation_date == null) missingFields.push("creation_date");
    if (!job.description) missingFields.push("description");
    if (!job.employee_type) missingFields.push("employee_type");
    if (!job.industry_type) missingFields.push("industry_type");
    if (!job.job_status) missingFields.push("job_status");
    if (!job.job_title) missingFields.push("job_title");
    if (!job.location) missingFields.push("location");
    if (job.max_salary == null) missingFields.push("max_salary");
    if (job.maximum_experience == null) missingFields.push("maximum_experience");
    if (job.min_salary == null) missingFields.push("min_salary");
    if (job.minimum_experience == null) missingFields.push("minimum_experience");
    if (!job.minimum_qualification) missingFields.push("minimum_qualification");
    if (!job.new_status) missingFields.push("new_status");
    if (!job.promote) missingFields.push("promote");
    if (!job.recent_application_date_time) missingFields.push("recent_application_date_time");
    if (!job.specialization) missingFields.push("specialization");
    if (!job.status) missingFields.push("status");
    if (job.job_recruiter_recruiter_id == null) missingFields.push("job_recruiter_recruiter_id");
    if (!job.is_saved) missingFields.push("is_saved");
    if (!job.joburl) missingFields.push("joburl");

    if (missingFields.length > 0) {
        return new ErrorResponseImpl(400, `Missing required fields: ${missingFields.join(", ")}`, new Date());
    }
}
