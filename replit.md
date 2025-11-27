# Defense in Depth - Security Layer Visualization

## Overview
An interactive educational web application that visualizes the Defense in Depth cybersecurity model, showing how data travels through multiple security layers with animated explanations of each layer's role.

## Current State
Feature-Complete - Educational visualization platform with:
- Animated data flow through 7 security layers
- Interactive layer selection with drill-down details
- 8 interactive threat scenarios with attack path visualization
- Comparison mode with configurable layer toggles
- Educational quiz with scoring system
- Play/pause/reset controls with speed adjustment
- Dark/light theme toggle
- Loop counter for demonstration cycles

## Project Architecture

### Frontend (React + TypeScript)
- **client/src/pages/home.tsx** - Main visualization page with all components (5 tabs)
- **client/src/components/theme-provider.tsx** - Theme context provider
- **client/src/components/theme-toggle.tsx** - Theme switcher dropdown
- **client/src/App.tsx** - Main app with routing and providers

### Backend (Express)
- **server/routes.ts** - API endpoints for layers, threats, quiz, and configuration
- **server/storage.ts** - Storage interface (using in-memory storage)

### Shared
- **shared/schema.ts** - Data models for security layers, threats, layer details, and quiz questions

## API Endpoints
- `GET /api/layers` - Get all 7 security layers
- `GET /api/layers/:id` - Get specific layer by ID
- `GET /api/layers/:id/details` - Get detailed layer info with real-world examples
- `GET /api/threats` - Get all 8 threat scenarios
- `GET /api/threats/:id` - Get specific threat by ID
- `GET /api/threats/random` - Get random threat scenario
- `GET /api/quiz` - Get all quiz questions
- `GET /api/quiz/:difficulty` - Get questions by difficulty (easy/medium/hard)
- `GET /api/config` - Get visualization configuration

## Features

### 1. Visualization Tab
- Animated data flow through 7 security layers
- Real-time threat blocking visualization
- Layer-by-layer progress with visual indicators

### 2. Threats Tab
- 8 interactive attack scenarios:
  - DDoS Attack, Phishing Campaign, Ransomware Attack
  - SQL Injection, Data Exfiltration, Insider Threat
  - Advanced Persistent Threat (APT), Zero-Day Exploit
- Attack path visualization with simulation
- Severity levels, detection methods, real-world examples

### 3. Details Tab (Drill-Down)
- Real-world breach examples for each layer (with year/impact)
- Best practices for implementation
- Recommended security tools by category

### 4. Compare Tab
- Security score calculation (0-100%)
- Layer toggle switches for configuration
- Vulnerability exposure analysis
- Threat protection effectiveness display

### 5. Quiz Tab
- 10 multiple-choice questions
- Easy/Medium/Hard difficulty levels
- Explanations for each answer
- Scoring system with results

## Security Layers (Defense in Depth)
1. **Physical Security** - Access control, surveillance, secured facilities
2. **Network Security** - Segmentation, IDS/IPS, traffic monitoring
3. **Perimeter Security** - Firewalls, DMZ, VPN gateways
4. **Internal Network Security** - Zero Trust, micro-segmentation, PAM
5. **Host Security** - EDR, antivirus, patch management
6. **Application Security** - WAF, secure coding, API security
7. **Data Security** - Encryption, DLP, access controls

## Key Technologies
- React 18 with TypeScript
- Framer Motion for animations
- Tailwind CSS + shadcn/ui components
- Express.js backend
- Wouter for routing
- TanStack Query for data fetching

## Running the Project
The project runs automatically via the "Start application" workflow which executes `npm run dev`. This starts both the Express backend and Vite frontend dev server on port 5000.

## Recent Changes
- November 27, 2025: Extended features implementation
  - Added 5 new tabs with tabbed navigation
  - Implemented 8 interactive threat scenarios with attack simulation
  - Created drill-down views with real-world breach examples
  - Built comparison mode with layer configuration toggles
  - Added educational quiz with 10 questions and scoring
  - Enhanced data models in schema.ts with detailed threat/layer info
  - Expanded API endpoints for new features
