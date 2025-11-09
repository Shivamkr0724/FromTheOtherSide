import path from "node:path";
import fs from "node:fs/promises";
import { sendResponse } from "./sendResponse.js";
import { getContentType } from "./getContentType.js";

export async function serveStatic(req, res, baseDir) {
  const publicDir = path.join(baseDir, "public");
  const filePath = path.join(
    publicDir,
    req.url === "/" ? "index.html" : req.url
  );

  const ext = path.extname(filePath);
  const contentType = getContentType(ext);

  try {
    // Try to read and serve the requested static file
    const content = await fs.readFile(filePath);
    sendResponse(res, 200, contentType, content);
  } catch (err) {
    if (err.code === "ENOENT") {
      try {
        // 🧩 React Single Page App fallback:
        // Serve index.html for all unknown routes
        const indexPath = path.join(publicDir, "index.html");
        const indexContent = await fs.readFile(indexPath);
        sendResponse(res, 200, "text/html", indexContent);
      } catch (reactErr) {
        // ⚠️ Fallback in case index.html is missing
        sendResponse(res, 404, "text/plain", "404 Not Found");
      }
    } else {
      sendResponse(
        res,
        500,
        "text/html",
        `<html><h1>Server Error: ${err.code}</h1></html>`
      );
    }
  }
}



// import path from 'node:path'
// import fs from 'node:fs/promises'
// import { sendResponse } from './sendResponse.js'
// import { getContentType } from './getContentType.js'

// export async function serveStatic(req, res, baseDir){
//     const publicDir = path.join(baseDir,'public')
//     const filePath = path.join(
//         publicDir,
//         req.url === '/' ? 'index.html' : req.url
//     )

//     const ext = path.extname(filePath)
//     const contentType = getContentType(ext)

//     try{
//        const content = await fs.readFile(filePath)
//        sendResponse(res, 200, contentType, content)
//     }catch(err){
//         if(err.code === 'ENOENT'){
//             const content = await fs.readFile(path.join(publicDir,'404.html'))
//             sendResponse(res, 404, 'text/html',content)
//         }
//         else{
//             sendResponse(res, 500, 'text/html',`html><h1>Server Error: ${err.code}</h1></html>`)
//         }
//     }
// }