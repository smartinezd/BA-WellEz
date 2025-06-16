import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Dashboard data endpoints
  app.get("/api/dashboard/epics", async (_req, res) => {
    try {
      const epics = await storage.getEpics();
      res.json(epics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch epics" });
    }
  });

  app.get("/api/dashboard/okrs", async (_req, res) => {
    try {
      const okrs = await storage.getOkrs();
      res.json(okrs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch OKRs" });
    }
  });

  app.get("/api/dashboard/summaries", async (_req, res) => {
    try {
      const summaries = await storage.getSummaries();
      res.json(summaries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch summaries" });
    }
  });

  app.get("/api/dashboard/change-logs", async (_req, res) => {
    try {
      const changeLogs = await storage.getChangeLogs();
      res.json(changeLogs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch change logs" });
    }
  });

  app.get("/api/dashboard/traceability", async (_req, res) => {
    try {
      const traceability = await storage.getTraceability();
      res.json(traceability);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch traceability data" });
    }
  });

  app.get("/api/dashboard/sprint-metrics", async (_req, res) => {
    try {
      const sprintMetrics = await storage.getSprintMetrics();
      res.json(sprintMetrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sprint metrics" });
    }
  });

  app.get("/api/dashboard/risk-metrics", async (_req, res) => {
    try {
      const riskMetrics = await storage.getRiskMetrics();
      res.json(riskMetrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch risk metrics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
