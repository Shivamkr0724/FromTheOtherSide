import http from "node:http";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import { serveStatic } from "./utils/serveStatic.js";
import { handleGet, handlePost, handleNews } from "./handlers/routesHandlers.js";

dotenv.config();

// ✅ Connect to MongoDB once when server starts
await connectDB();

const PORT = 8000;
const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.url === "/api") {
    if (req.method === "GET") {
      return await handleGet(res);
    } else if (req.method === "POST") {
      return handlePost(req, res);
    }
  } else if (req.url === "/api/news") {
    return await handleNews(req, res);
  } else if (!req.url.startsWith("/api")) {
    return await serveStatic(req, res, __dirname);
  }
});

server.listen(PORT, () =>
  console.log(`Server is running on PORT ${PORT}`)
);





// import http from "node:http"
// import { serveStatic } from "./utils/serveStatic.js";
// import { handleGet, handlePost , handleNews } from "./handlers/routesHandlers.js";


// const PORT = 8000;
// const __dirname = import.meta.dirname

// const server = http.createServer(async (req, res) => {
//   // ✅ CORS Headers — must come before anything else
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//   // ✅ Handle preflight (OPTIONS) requests quickly
//   if (req.method === "OPTIONS") {
//     res.writeHead(204);
//     return res.end();
//   }

//   // ✅ Your existing routes below
//   if (req.url === "/api") {
//     if (req.method === "GET") {
//       return await handleGet(res);
//     } else if (req.method === "POST") {
//       return handlePost(req, res);
//     }
//   } else if (req.url === "/api/news") {
//     return await handleNews(req, res);
//   } else if (!req.url.startsWith("/api")) {
//     return await serveStatic(req, res, __dirname);
//   }
// });

// server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`) )