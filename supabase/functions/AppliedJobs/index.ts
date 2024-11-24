
import { HTTP_STATUS_CODES } from "../_shared/_constants/StatusCodes.ts";
import { ErrorResponseImpl } from "../_error/ErrorResponse.ts";
import { ERROR_MESSAGES } from "../_shared/_constants/ErrorMessages.ts";
import { HttpMethod } from "../_shared/_constants/HttpMethods.ts";
import { handleGetAppliedJobRequest } from "../_handler/HandleAppliedJob.ts";




Deno.serve(async (req) => {
  const method=req.method;

  if (method==HttpMethod.GET) {
   return await handleGetAppliedJobRequest(req);
    
  }

  return new Response(
    JSON.stringify(new ErrorResponseImpl(HTTP_STATUS_CODES["Method Not Allowed"],ERROR_MESSAGES.MethodNotAllowed,new Date)),
    { headers: { "Content-Type": "application/json" }, status: 400 }
  );
});
