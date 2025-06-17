import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      console.log(logLine);
    }
  });

  next();
});

// Register API routes
const init = async () => {
  await registerRoutes(app);

  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, "../public")));

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error(err);
  });

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

init().catch(console.error);