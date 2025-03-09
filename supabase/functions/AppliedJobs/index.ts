
import { HttpMethod } from "../_shared/_constants/HttpMethods.ts";
import { handleGetAppliedJobRequest } from "../_handler/HandleAppliedJob.ts";


Deno.serve(async (req) => {
  const method = req.method;
  const url = new URL(req.url);

  if (method === HttpMethod.GET) {
    console.log("Step 1: Received GET request in index.ts");

    return await handleGetAppliedJobRequest(req);
  }

  console.log(`Step 1: Received non-GET request: ${method} in index.ts`);

  return new Response(
    JSON.stringify({
      statusCode: 405,
      message: "Method Not Allowed",
      timestamp: new Date(),
    }),
    { headers: { "Content-Type": "application/json" }, status: 405 }
  );
});
