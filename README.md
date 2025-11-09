# CherieFamily

Welcome to CherieFamily! This repository hosts a modern React project.


## Features
- Fully responsive design
- React-based frontend

## Demo

[Visit the website:](https://www.cheriefamily.com/) 

## Getting Started
To get a local copy up and running: 

**Frontend**

1. Clone the repo:
 ```bash
git clone https://github.com/idleCyrex/CherieFamily.git
```
3. Install frontend dependencies:
 ```bash
npm install
```
5. Start the development server:
 ```bash
npm run dev
```

## Deploying to Vercel

This is a Single Page App (Vite + React). To support deep links like `/order` on Vercel:

- Ensure the project root in Vercel is set to the `Frontend/` folder.
- Build command: `npm run build`
- Output directory: `dist`
- Routing: `vercel.json` is included to rewrite non-file routes to `index.html`.

Environment variables (set in Vercel Project Settings -> Environment Variables):

- `VITE_API_URL` — your Backend URL, e.g. `https://api.yourdomain.com` or your Render/Fly/Heroku URL

Backend ENV (in your backend host):

- `APP_URL` — e.g. `https://www.cheriefamily.com` (used for Stripe success/cancel fallbacks)
- Optional overrides: `SUCCESS_URL`, `CANCEL_URL`

Stripe webhook Note: Point your webhook to `${BACKEND_URL}/webhook`.
