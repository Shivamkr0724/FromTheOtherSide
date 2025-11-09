import { addNewShighting } from "../utils/addNewShightings.js";
import { getData } from "../utils/getData.js";
import { sanitizeInput } from "../utils/sanitizeInput.js";
import { sendResponse } from "../utils/sendResponse.js";
import { stories } from "../data/stories.js";
import { parseJSONbody } from "../utils/parseJSONbody.js";

// 🧩 Handle GET requests
export async function handleGet(res) {
  const data = await getData();
  const content = JSON.stringify(data);
  sendResponse(res, 200, "application/json", content);
}

// 🧩 Handle POST requests (single or multiple encounters)
    export async function handlePost(req, res) {
  try {
    const parsedBody = await parseJSONbody(req);
    console.log("📦 RAW REQUEST BODY:");
    console.dir(parsedBody, { depth: null });

    const sanitizedBody = sanitizeInput(parsedBody);
    console.log("🧹 Sanitized body:");
    console.dir(sanitizedBody, { depth: null });

    let saved;
    if (Array.isArray(sanitizedBody)) {
      saved = await addMultipleShightings(sanitizedBody);
    } else {
      saved = await addNewShighting(sanitizedBody);
    }

    sendResponse(res, 201, "application/json", JSON.stringify(saved));
  } catch (err) {
    console.error("❌ Error in handlePost:", err.message);
    sendResponse(res, 400, "application/json", JSON.stringify({ error: err.message }));
  }
}


// 🧩 Handle Server-Sent Events for live story updates
export async function handleNews(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * stories.length);
    res.write(
      `data: ${JSON.stringify({
        event: "news-update",
        story: stories[randomIndex],
      })}\n\n`
    );
  }, 3000);
}
