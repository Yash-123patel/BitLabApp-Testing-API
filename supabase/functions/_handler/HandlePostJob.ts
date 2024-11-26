import postJobFromService from "../_service/PostJobService.ts";
import { JobImpl } from "../_model/PostJobModel.ts";
import { HTTP_STATUS_CODES } from "../_shared/_constants/StatusCodes.ts";
import { handleInternalServerError } from "../_error/ErrorHandler.ts";
import { ValidationHandler } from "../_validation/PostJobValidationHandler.ts";
import { handleValidationError } from "../_error/ErrorHandler.ts";
import valiNullIndateJobData from "../_validation/CheckNullValidationForPost.ts";
import { handleNullErrorInJobPosting } from "../_error/ErrorHandler.ts";

export default async function handlePostJobRequest(req: Request) {
    console.log(`[INFO]  Step 2: Handler received POST request`);

    try {

        const job = await req.json();
        const jobData = new JobImpl(job);
        console.log(`[INFO]  Step 3: Job Data: ${JSON.stringify(jobData)}`);

        const nullErrorResponse = valiNullIndateJobData(jobData);
        if (nullErrorResponse) {
            console.warn(`[WARNING]  Step 4: Null values found: ${nullErrorResponse}`);
            return handleNullErrorInJobPosting("Please provide all the required fields. Null values are not accepted.");
        }

    
        const validationResult = ValidationHandler.validateJob(jobData);
        if (!validationResult.valid) {
            console.warn(`[WARNING] Step 5: Validation failed: ${JSON.stringify(validationResult.errors)}`);
            return handleValidationError(validationResult.errors[0]);
        }

        console.log(`[INFO]  Step 6: Calling Service layer to post a job`);
        const data = await postJobFromService(job);
        console.log(`[INFO] Step 7: Job inserted successfully`);

        return new Response(
            JSON.stringify(data),
            { 
                status: HTTP_STATUS_CODES.OK,
                headers: { "Content-Type": "application/json" }
            }
        );

    } catch (error) {
        console.error(`[ERROR]  Step 9: Error encountered in handler: ${error}`);
        return handleInternalServerError();
    }
}
