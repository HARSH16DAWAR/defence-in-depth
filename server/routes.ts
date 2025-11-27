import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { securityLayers, threatScenarios } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // API endpoint to get all security layers
  app.get("/api/layers", (_req, res) => {
    res.json(securityLayers);
  });

  // API endpoint to get a specific security layer
  app.get("/api/layers/:id", (req, res) => {
    const layerId = parseInt(req.params.id, 10);
    const layer = securityLayers.find(l => l.id === layerId);
    
    if (!layer) {
      return res.status(404).json({ error: "Layer not found" });
    }
    
    res.json(layer);
  });

  // API endpoint to get all threat scenarios
  app.get("/api/threats", (_req, res) => {
    res.json(threatScenarios);
  });

  // API endpoint to get a random threat scenario
  app.get("/api/threats/random", (_req, res) => {
    const randomIndex = Math.floor(Math.random() * threatScenarios.length);
    res.json(threatScenarios[randomIndex]);
  });

  // API endpoint to get visualization config
  app.get("/api/config", (_req, res) => {
    res.json({
      totalLayers: securityLayers.length,
      animationDefaults: {
        baseInterval: 2000,
        minSpeed: 0.5,
        maxSpeed: 2,
        defaultSpeed: 1
      },
      layerSummary: securityLayers.map(l => ({
        id: l.id,
        name: l.name,
        shortName: l.shortName,
        color: l.color
      }))
    });
  });

  return httpServer;
}
