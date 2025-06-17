// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  epics;
  stories;
  okrs;
  summaries;
  changeLogs;
  traceabilityMap;
  sprintMetrics;
  riskMetrics;
  currentId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.epics = /* @__PURE__ */ new Map();
    this.stories = /* @__PURE__ */ new Map();
    this.okrs = /* @__PURE__ */ new Map();
    this.summaries = /* @__PURE__ */ new Map();
    this.changeLogs = /* @__PURE__ */ new Map();
    this.traceabilityMap = /* @__PURE__ */ new Map();
    this.sprintMetrics = /* @__PURE__ */ new Map();
    this.riskMetrics = /* @__PURE__ */ new Map();
    this.currentId = 1;
    this.seedData();
  }
  seedData() {
    const epicData = [
      { name: "User Authentication Redesign", epicId: "EPIC-001", completion: 78, testCoverage: 65, riskScore: 2.1, status: "On Track" },
      { name: "Payment Gateway Integration", epicId: "EPIC-005", completion: 45, testCoverage: 23, riskScore: 8.2, status: "At Risk" },
      { name: "Mobile App MVP", epicId: "EPIC-012", completion: 58, testCoverage: 67, riskScore: 5.8, status: "Behind" }
    ];
    epicData.forEach((epic) => {
      const id = this.currentId++;
      this.epics.set(id, { ...epic, id });
    });
    const okrData = [
      { title: "Improve Customer Satisfaction", description: "Increase NPS score to 8.5+", progress: 85, quarter: "Q1 2024", storiesAligned: 12 },
      { title: "Reduce Processing Time", description: "Cut workflow time by 30%", progress: 92, quarter: "Q1 2024", storiesAligned: 8 },
      { title: "Expand Market Reach", description: "Enter 3 new markets", progress: 42, quarter: "Q1 2024", storiesAligned: 15 }
    ];
    okrData.forEach((okr) => {
      const id = this.currentId++;
      this.okrs.set(id, { ...okr, id });
    });
    const summaryData = [
      { storyId: "US-2847", description: "Payment processing blocked due to API changes. Requires immediate attention.", severity: "Critical", nextStep: "Contact vendor support", createdAt: new Date(Date.now() - 2 * 60 * 60 * 1e3) },
      { storyId: "US-2901", description: "UI/UX review pending for 3 days. Design team bandwidth constraint identified.", severity: "Attention", nextStep: "Escalate to design lead", createdAt: new Date(Date.now() - 4 * 60 * 60 * 1e3) },
      { storyId: "US-2789", description: "Database migration completed successfully. Performance metrics improved by 23%.", severity: "Info", nextStep: "Update documentation", createdAt: new Date(Date.now() - 6 * 60 * 60 * 1e3) },
      { storyId: "US-2756", description: "Authentication module deployed to production. All tests passing.", severity: "Success", nextStep: "Monitor metrics", createdAt: new Date(Date.now() - 8 * 60 * 60 * 1e3) }
    ];
    summaryData.forEach((summary) => {
      const id = this.currentId++;
      this.summaries.set(id, { ...summary, id });
    });
    const changeLogData = [
      {
        title: 'Story US-2934 created in Epic-005 "Payment Gateway Integration"',
        description: "Added new story for implementing PayPal integration with error handling and retry logic.",
        author: "Mike Chen",
        type: "Story Creation",
        impact: "High",
        createdAt: new Date(Date.now() - 2 * 60 * 1e3)
      },
      {
        title: "Sprint 23 rescoped - 3 stories moved to Sprint 24",
        description: "Moved US-2889, US-2891, and US-2893 due to capacity constraints and dependency issues.",
        author: "Lisa Park",
        type: "Sprint Planning",
        impact: "Medium",
        createdAt: new Date(Date.now() - 15 * 60 * 1e3)
      },
      {
        title: "Ownership transfer: Epic-012 reassigned to Team Bravo",
        description: "Mobile App MVP Epic transferred from Team Alpha to Team Bravo due to expertise alignment.",
        author: "David Kim",
        type: "Ownership Transfer",
        impact: "High",
        createdAt: new Date(Date.now() - 32 * 60 * 1e3)
      }
    ];
    changeLogData.forEach((log2) => {
      const id = this.currentId++;
      this.changeLogs.set(id, { ...log2, id });
    });
    const traceabilityData = [
      {
        storyId: "US-2847",
        commits: 7,
        tests: 12,
        deployment: "v2.1.3",
        unitTests: "8/8 \u2713",
        integrationTests: "3/3 \u2713",
        e2eTests: "1 Pending",
        stagingStatus: "\u2713 Deployed",
        productionStatus: "Scheduled"
      }
    ];
    traceabilityData.forEach((trace) => {
      const id = this.currentId++;
      this.traceabilityMap.set(id, { ...trace, id });
    });
    const sprintData = [
      {
        sprintNumber: 23,
        successProbability: 78,
        plannedPoints: 89,
        estimatedCompletion: 82,
        velocity: 76
      }
    ];
    sprintData.forEach((sprint) => {
      const id = this.currentId++;
      this.sprintMetrics.set(id, { ...sprint, id });
    });
    const riskData = [
      {
        riskScore: 6.8,
        blockersCount: 7,
        delaysCount: 12,
        missingDataCount: 5,
        recommendation: "Address critical blockers in Epic-005 and Epic-012 to reduce risk score."
      }
    ];
    riskData.forEach((risk) => {
      const id = this.currentId++;
      this.riskMetrics.set(id, { ...risk, id });
    });
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async getEpics() {
    return Array.from(this.epics.values());
  }
  async getStories() {
    return Array.from(this.stories.values());
  }
  async getOkrs() {
    return Array.from(this.okrs.values());
  }
  async getSummaries() {
    return Array.from(this.summaries.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  async getChangeLogs() {
    return Array.from(this.changeLogs.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  async getTraceability() {
    return Array.from(this.traceabilityMap.values());
  }
  async getSprintMetrics() {
    return Array.from(this.sprintMetrics.values());
  }
  async getRiskMetrics() {
    return Array.from(this.riskMetrics.values());
  }
};
var storage = new MemStorage();

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/dashboard/epics", async (_req, res) => {
    try {
      const epics = await storage.getEpics();
      res.json(epics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch epics" });
    }
  });
  app2.get("/api/dashboard/okrs", async (_req, res) => {
    try {
      const okrs = await storage.getOkrs();
      res.json(okrs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch OKRs" });
    }
  });
  app2.get("/api/dashboard/summaries", async (_req, res) => {
    try {
      const summaries = await storage.getSummaries();
      res.json(summaries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch summaries" });
    }
  });
  app2.get("/api/dashboard/change-logs", async (_req, res) => {
    try {
      const changeLogs = await storage.getChangeLogs();
      res.json(changeLogs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch change logs" });
    }
  });
  app2.get("/api/dashboard/traceability", async (_req, res) => {
    try {
      const traceability = await storage.getTraceability();
      res.json(traceability);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch traceability data" });
    }
  });
  app2.get("/api/dashboard/sprint-metrics", async (_req, res) => {
    try {
      const sprintMetrics = await storage.getSprintMetrics();
      res.json(sprintMetrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sprint metrics" });
    }
  });
  app2.get("/api/dashboard/risk-metrics", async (_req, res) => {
    try {
      const riskMetrics = await storage.getRiskMetrics();
      res.json(riskMetrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch risk metrics" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import http from "http";
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  const startServer = async (initialPort) => {
    const server = http.createServer(app);
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }
    const tryPort = async (port2) => {
      try {
        await new Promise((resolve, reject) => {
          server.listen(port2, "127.0.0.1").once("listening", resolve).once("error", reject);
        });
        return port2;
      } catch (err) {
        if (err.code === "EADDRINUSE") {
          log(`Port ${port2} is in use, trying ${port2 + 1}...`);
          return tryPort(port2 + 1);
        }
        throw err;
      }
    };
    const port = await tryPort(initialPort);
    log(`Server is running on port ${port}`);
  };
  await startServer(5e3);
})();
