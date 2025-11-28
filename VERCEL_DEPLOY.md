# Deploying to Vercel

This guide will help you deploy the CyberDefenseViz application to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Git repository (GitHub, GitLab, or Bitbucket)

## Quick Start

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   
   Follow the prompts, then deploy to production:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. **Push your code to Git** (GitHub, GitLab, or Bitbucket)

2. **Go to [vercel.com/new](https://vercel.com/new)**

3. **Import your repository**

4. **Vercel will auto-detect settings from `vercel.json`**, but verify:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`

5. **Click Deploy**

## Project Structure

- `api/index.ts` - Serverless function that handles all API routes using Express
- `vercel.json` - Vercel configuration with routing rules
- `dist/public/` - Built static files (created during `npm run build`)
- `server/routes.ts` - API route definitions

## How It Works

1. **API Routes** (`/api/*`): 
   - Rewritten to `/api` serverless function
   - Handled by Express app in `api/index.ts`
   - Uses `serverless-http` to wrap Express for Vercel

2. **Static Files** (`/*`): 
   - Served from `dist/public/` directory
   - All routes rewrite to `/index.html` for SPA routing

3. **Build Process**:
   - `npm run build` creates `dist/public/` (frontend) and `dist/index.cjs` (server bundle)
   - Vercel serves static files and routes API calls to serverless function

## Configuration Files

### `vercel.json`
- Defines build settings and routing rules
- Routes `/api/*` to serverless function
- Routes everything else to static files

### `api/index.ts`
- Wraps Express app with `serverless-http`
- Initializes routes on first request
- Handles all API endpoints

## Environment Variables

If your app needs environment variables:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variables for Production, Preview, and Development
3. Redeploy after adding variables

## Troubleshooting

### Build Fails
- ✅ Check `package.json` has all dependencies
- ✅ Verify Node.js version (Vercel uses 20.x by default)
- ✅ Check build logs in Vercel dashboard

### API Routes Return 404
- ✅ Verify `api/index.ts` exports default handler
- ✅ Check Vercel function logs
- ✅ Ensure routes are registered with `/api` prefix

### Static Files Not Loading
- ✅ Verify `outputDirectory: "dist/public"` in `vercel.json`
- ✅ Check that build creates files in `dist/public/`
- ✅ Ensure `index.html` exists in build output

### TypeScript Errors
- ✅ Ensure `@vercel/node` and `serverless-http` are installed
- ✅ Check that TypeScript compiles without errors

## Important Notes

⚠️ **WebSocket Support**: WebSocket connections (`ws`) don't work on Vercel serverless functions. If you need WebSockets, consider:
- Using Vercel's Edge Functions
- Using a different platform (Railway, Render, etc.)
- Using a separate WebSocket service

⚠️ **Cold Starts**: First request to API routes may be slower due to serverless cold starts

⚠️ **File System**: Vercel serverless functions are read-only. Use environment variables or external storage for dynamic data.

## Testing Locally

You can test the Vercel setup locally:
```bash
npm install -g vercel
vercel dev
```

This runs a local server that mimics Vercel's environment.

