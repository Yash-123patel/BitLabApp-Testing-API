import handlePostJobRequest from "../_handler/HandlePostJob.ts"
import { HTTP_STATUS_CODES } from "../_shared/_constants/StatusCodes.ts"
import { ERROR_MESSAGES } from "../_shared/_constants/ErrorMessages.ts"
import { HttpMethod } from "../_shared/_constants/HttpMethods.ts";
import { ErrorResponseImpl } from "../_error/ErrorResponse.ts";

Deno.serve(async (req) => {
   
  const method = req.method;

  if (method === HttpMethod.POST) {
    console.log(`[INFO]  Step 1: Received POST request in index.ts`);
    try {
      return await handlePostJobRequest(req);
    } catch (error) {
      console.error(`[ERROR]  Error processing POST request: ${error}`);
      return new Response(
        JSON.stringify(new ErrorResponseImpl(HTTP_STATUS_CODES["Internal Server Error"], "Internal Server Error", new Date())),
        { headers: { "Content-Type": "application/json" }, status: 500 }
      );
    }
  }

  console.log(`[WARNING]  Step 1: Received non-POST request: ${method} in index.ts`);
  return new Response(
    JSON.stringify(new ErrorResponseImpl(HTTP_STATUS_CODES["Method Not Allowed"], ERROR_MESSAGES.MethodNotAllowed, new Date())),
    { headers: { "Content-Type": "application/json" }, status: 405 }
  );
});
