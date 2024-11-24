interface SavedJob{
    id:number;
    applicantregistration_id:number;
    job_id:number;
    save_job_status:string;
}

export class SavedJobImpl implements SavedJob{
    id:number;
    applicantregistration_id:number;
    job_id:number;
    save_job_status:string;
    
    constructor(savedJob:SavedJob){
        this.id=savedJob.id;
        this.applicantregistration_id=savedJob.applicantregistration_id;
        this.job_id=savedJob.job_id;
        this.save_job_status=savedJob.save_job_status;
    }
}