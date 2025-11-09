// utils/parseJSONbody.js
export async function parseJsonBody(req) {
  let body = "";

  try {
    for await (const chunk of req) {
      body += chunk;
    }

    if (!body) {
      // Empty body is fine; just return {}
      return {};
    }

    return JSON.parse(body);
  } catch (err) {
    console.error("❌ Error parsing JSON body:", err);
    // Instead of throwing, reject cleanly so your handler can send a 400
    throw new Error("Invalid JSON body");
  }
}
