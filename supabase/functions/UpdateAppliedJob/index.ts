import { HttpMethod } from "../_shared/_constants/HttpMethods.ts";
import { HTTP_STATUS_CODES } from "../_shared/_constants/StatusCodes.ts";
import { ErrorResponseImpl } from "../_error/ErrorResponse.ts";
import { ERROR_MESSAGES } from "../_shared/_constants/ErrorMessages.ts";
import handleUpdateAppliedJobRequest from "../_handler/HandleUpdateAppliedJob.ts";

Deno.serve(async (req) => {
  const method=req.method;
  if(method===HttpMethod.PUT){
    console.log(`[INFO]  Step 1: Received Delete request: ${method} in index.ts`);
    return await handleUpdateAppliedJobRequest(req);

  }

  console.log(`[WARNING]  Step 1: Received non-PUT request: ${method} in index.ts`);
  return new Response(
    JSON.stringify(new ErrorResponseImpl(HTTP_STATUS_CODES.MethodNotAllowed, ERROR_MESSAGES.MethodNotAllowed, new Date())),
    { headers: { "Content-Type": "application/json" }, status: 405 }
  );
})
