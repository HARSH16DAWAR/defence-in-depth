import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { securityLayers, threatScenarios, layerDetails, quizQuestions, defenseLayersData } from "@shared/schema";

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

  // API endpoint to get layer details with real-world examples
  app.get("/api/layers/:id/details", (req, res) => {
    const layerId = parseInt(req.params.id, 10);
    const details = layerDetails.find(d => d.id === layerId);
    
    if (!details) {
      return res.status(404).json({ error: "Layer details not found" });
    }
    
    res.json(details);
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

  // API endpoint to get a specific threat scenario
  app.get("/api/threats/:id", (req, res) => {
    const threatId = parseInt(req.params.id, 10);
    const threat = threatScenarios.find(t => t.id === threatId);
    
    if (!threat) {
      return res.status(404).json({ error: "Threat not found" });
    }
    
    res.json(threat);
  });

  // API endpoint to get quiz questions
  app.get("/api/quiz", (_req, res) => {
    res.json(quizQuestions);
  });

  // API endpoint to get quiz questions by difficulty
  app.get("/api/quiz/:difficulty", (req, res) => {
    const difficulty = req.params.difficulty as "easy" | "medium" | "hard";
    const filtered = quizQuestions.filter(q => q.difficulty === difficulty);
    res.json(filtered);
  });

  // API endpoint to get visualization config
  app.get("/api/config", (_req, res) => {
    res.json({
      totalLayers: securityLayers.length,
      totalThreats: threatScenarios.length,
      totalQuizQuestions: quizQuestions.length,
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
      })),
      threatSummary: threatScenarios.map(t => ({
        id: t.id,
        name: t.name,
        type: t.type,
        severity: t.severity,
        blockedAtLayer: t.blockedAtLayer
      }))
    });
  });

  // API endpoint to get defense layers for presentation
  app.get("/api/defense-layers", (_req, res) => {
    res.json(defenseLayersData);
  });

  // API endpoint to get a specific defense layer
  app.get("/api/defense-layers/:id", (req, res) => {
    const layerId = req.params.id;
    const layer = defenseLayersData.find(l => l.id === layerId);
    
    if (!layer) {
      return res.status(404).json({ error: "Defense layer not found" });
    }
    
    res.json(layer);
  });

  return httpServer;
}
