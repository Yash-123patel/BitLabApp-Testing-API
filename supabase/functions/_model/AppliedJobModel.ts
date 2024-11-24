interface AppliedJob{
    applyjobid:number;
    applicant_status:string;
    application_date:Date;
    applicant_id:number;
    job_id:number;
    change_date:Date;
}

export class AppliedJobImpl implements AppliedJob{

    applyjobid:number;
    applicant_status:string;
    application_date:Date;
    applicant_id:number;
    job_id:number;
    change_date:Date;

    constructor(appliedJob:AppliedJob){
        this.applyjobid=appliedJob.applyjobid;;
        this.applicant_status=appliedJob.applicant_status;
        this.application_date=appliedJob.application_date;
        this.applicant_id=appliedJob.applicant_id;
        this.job_id=appliedJob.job_id;
        this.change_date=appliedJob.change_date;
    }
}