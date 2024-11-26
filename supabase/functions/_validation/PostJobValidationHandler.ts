import { JobImpl } from "../_model/PostJobModel.ts";

export class ValidationHandler {
    static validateJob(job: JobImpl): { valid: boolean; errors: string[] } {
      const errors: string[] = [];
      this.validateField(job.job_title, "job_title", 3, errors);
     
      this.validateField(job.description, "description", 10, errors);
  
      this.validateField(job.location, "location", 3, errors);
  
      this.validateSalary(job.min_salary, job.max_salary, errors);
  
      this.validateExperience(job.minimum_experience, job.maximum_experience, errors);
  
      this.validateEnum(job.job_status, "job_status", ["active", "inactive"], errors);
  
      this.validateUrl(job.joburl, errors);
  
      this.validateField(job.employee_type, "employee_type", 3, errors);
      this.validateField(job.industry_type, "industry_type", 3, errors);
      
      return errors.length > 0 ? { valid: false, errors } : { valid: true, errors: [] };
    }
  
    private static validateField(value: string, fieldName: string, minLength: number, errors: string[]): void {
      if (!value || value.length < minLength) {
        errors.push(`${fieldName} must have at least ${minLength} characters.`);
      }
    }
  
    private static validateSalary(minSalary: number, maxSalary: number, errors: string[]): void {
      if (minSalary <= 0 || maxSalary <= 0) {
        errors.push("Salaries must be greater than 0.");
      }
      if (minSalary > maxSalary) {
        errors.push("Minimum salary cannot be greater than maximum salary.");
      }
    }
  
    private static validateExperience(minExperience: number, maxExperience: number, errors: string[]): void {
      if (minExperience < 0 || maxExperience < 0) {
        errors.push("Experience levels must be greater than or equal to 0.");
      }
      if (minExperience > maxExperience) {
        errors.push("Minimum experience cannot be greater than maximum experience.");
      }
    }
  
    private static validateEnum(value: string, fieldName: string, validValues: string[], errors: string[]): void {
      if (!validValues.includes(value)) {
        errors.push(`${fieldName} must be one of the following: ${validValues.join(", ")}.`);
      }
    }
  
    private static validateUrl(url: string, errors: string[]): void {
      const urlPattern = /^(https?:\/\/)?([\w\d\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlPattern.test(url)) {
        errors.push("Job URL is invalid.");
      }
    }
  }
  