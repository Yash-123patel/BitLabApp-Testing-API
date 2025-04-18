// Job Interface
export interface Job {
    id: number;
    alert_count: number;
    creation_date: string;
    description: string;
    employee_type: string;
    industry_type: string;
    job_status: string;
    job_title: string;
    location: string;
    max_salary: number;
    maximum_experience: number;
    min_salary: number;
    minimum_experience: number;
    minimum_qualification: string;
    new_status: string;
    promote: string;
    recent_application_date_time: string;
    specialization: string;
    status: string;
    job_recruiter_recruiter_id: number;
    is_saved: string;
    visitor_count: number;
    joburl: string;
  }
  
  
  export class JobImpl implements Job {
    id: number;
    alert_count: number;
    creation_date: string;
    description: string;
    employee_type: string;
    industry_type: string;
    job_status: string;
    job_title: string;
    location: string;
    max_salary: number;
    maximum_experience: number;
    min_salary: number;
    minimum_experience: number;
    minimum_qualification: string;
    new_status: string;
    promote: string;
    recent_application_date_time: string;
    specialization: string;
    status: string;
    job_recruiter_recruiter_id: number;
    is_saved: string;
    visitor_count: number;
    joburl: string;
  
    constructor(data: Job) {
      this.id = data.id;
      this.alert_count = data.alert_count;
      this.creation_date = data.creation_date;
      this.description = data.description;
      this.employee_type = data.employee_type;
      this.industry_type = data.industry_type;
      this.job_status = data.job_status;
      this.job_title = data.job_title;
      this.location = data.location;
      this.max_salary = data.max_salary;
      this.maximum_experience = data.maximum_experience;
      this.min_salary = data.min_salary;
      this.minimum_experience = data.minimum_experience;
      this.minimum_qualification = data.minimum_qualification;
      this.new_status = data.new_status;
      this.promote = data.promote;
      this.recent_application_date_time = data.recent_application_date_time;
      this.specialization = data.specialization;
      this.status = data.status;
      this.job_recruiter_recruiter_id = data.job_recruiter_recruiter_id;
      this.is_saved = data.is_saved;
      this.visitor_count = data.visitor_count;
      this.joburl = data.joburl;
    }
  }
  