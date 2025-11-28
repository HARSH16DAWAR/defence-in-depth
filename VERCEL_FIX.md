# Vercel Deployment Fix

## Current Configuration

### vercel.json (Minimal)
```json
{
  "rewrites": [
    {
      "source": "/((?!api).*)",
      "destination": "/index.html"
    }
  ]
}
```

### package.json
- Added `"engines": { "node": "20.x" }` to specify Node.js version
- Has `@vercel/node` and `serverless-http` dependencies

### API Function
- Located at: `api/index.ts`
- Exports default async function with VercelRequest/VercelResponse
- Wraps Express app with serverless-http

## If You Still Get "Function Runtimes must have a valid version" Error:

### Option 1: Delete .vercel folder (if it exists)
```bash
# If you have a .vercel folder, delete it
rm -rf .vercel
# Or on Windows:
rmdir /s .vercel
```

### Option 2: Try explicit runtime configuration
If the minimal config doesn't work, try this vercel.json:
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "functions": {
    "api/**/*.ts": {
      "runtime": "nodejs20.x"
    }
  },
  "rewrites": [
    {
      "source": "/((?!api).*)",
      "destination": "/index.html"
    }
  ]
}
```

### Option 3: Check Vercel Dashboard Settings
1. Go to your project in Vercel Dashboard
2. Settings → General
3. Check "Node.js Version" - should be 20.x
4. Check "Build & Development Settings"
5. Make sure "Framework Preset" is set to "Other" or "None"

### Option 4: Clear Vercel Cache
1. In Vercel Dashboard → Settings → General
2. Click "Clear Build Cache"
3. Redeploy

## Testing the API

After deployment, test these URLs:
- `https://your-app.vercel.app/api/test` - Should return JSON
- `https://your-app.vercel.app/api/defense-layers` - Should return defense layers array
- `https://your-app.vercel.app/presentation` - Should load the presentation page

## Check Function Logs

1. Go to Vercel Dashboard → Your Project → Functions
2. Click on `api/index.ts`
3. View logs to see what requests are being received
4. Look for initialization errors or route matching issues

