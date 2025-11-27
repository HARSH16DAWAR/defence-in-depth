# Defense in Depth - Security Layer Visualization

## Overview
An interactive web application that visualizes the Defense in Depth cybersecurity model, showing how data travels through multiple security layers with animated explanations of each layer's role.

## Current State
MVP Complete - Fully functional visualization with:
- Animated data flow through 7 security layers
- Interactive layer selection
- Threat visualization with blocking animations
- Play/pause/reset controls with speed adjustment
- Dark/light theme toggle
- Loop counter for demonstration cycles

## Project Architecture

### Frontend (React + TypeScript)
- **client/src/pages/home.tsx** - Main visualization page with all components
- **client/src/components/theme-provider.tsx** - Theme context provider
- **client/src/components/theme-toggle.tsx** - Theme switcher dropdown
- **client/src/App.tsx** - Main app with routing and providers

### Backend (Express)
- **server/routes.ts** - API endpoints for layer data and threat scenarios
- **server/storage.ts** - Storage interface (using in-memory storage)

### Shared
- **shared/schema.ts** - Data models for security layers and threats

## API Endpoints
- `GET /api/layers` - Get all 7 security layers
- `GET /api/layers/:id` - Get specific layer by ID
- `GET /api/threats` - Get all threat scenarios
- `GET /api/threats/random` - Get random threat scenario
- `GET /api/config` - Get visualization configuration

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
- November 27, 2025: Initial MVP implementation
  - Created visualization with 7 animated security layers
  - Added threat blocking visualization
  - Implemented animation controls (play/pause, speed, reset)
  - Added dark/light theme support
  - Created backend API endpoints
