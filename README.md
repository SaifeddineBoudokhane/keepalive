# Keepalive

A minimal Next.js app with an API route that pings a target URL. Includes a Vercel cron that calls the route every 5 minutes.

## Endpoint
- `GET /api/ping` – fetches `https://bhb-cosmetic.onrender.com/api/storefront/products?limit=1` and returns the result in JSON.

## Local development
```bash
npm install
npm run dev
```
Visit `http://localhost:3000/api/ping` to trigger a ping.

## Deploying to Vercel
- This repo includes `vercel.json` with a cron schedule: `*/5 * * * *` hitting `/api/ping`.
- Import the project into Vercel. Cron will run automatically after deploy.
