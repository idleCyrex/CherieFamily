# CherieFamily

Welcome to CherieFamily! This repository hosts a modern React project.

## About

Cherié Family is a Colombian exporter delivering Cavendish bananas, Arabica coffee, and Porcelain cacao nibs straight from local farms to Europe. They focus on quality and sustainability, ensuring fresh, premium agricultural products reach international markets

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

// Backend integration removed from this project. This repository now contains the frontend only.
