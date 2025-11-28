// Vercel serverless function for Express app
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createServer } from "http";
import express from "express";
import serverless from "serverless-http";
import { registerRoutes } from "../server/routes";

const app = express();
const httpServer = createServer(app);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      console.log(`${req.method} ${path} ${res.statusCode} in ${duration}ms`);
    }
  });

  next();
});

// Error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// Initialize routes once
let routesInitialized = false;
let handler: ReturnType<typeof serverless> | null = null;

const initPromise = (async () => {
  if (!routesInitialized) {
    await registerRoutes(httpServer, app);
    routesInitialized = true;
    handler = serverless(app);
  }
})();

// Export as Vercel serverless function
export default async function vercelHandler(req: VercelRequest, res: VercelResponse) {
  await initPromise;
  if (!handler) {
    res.status(500).json({ error: "Server not initialized" });
    return;
  }
  return handler(req, res);
}

