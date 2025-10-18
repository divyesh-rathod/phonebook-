# PhoneBook

This is first my live demostartion

A simple phonebook example app with a Node/Express backend and a React + Vite frontend. The repository contains two folders:

- `backend` — small Express server (index.js)
- `frontend` — React app built with Vite and a local `db.json` for json-server

## Prerequisites

- Node.js (v18+ recommended)
- npm (comes with Node)

## Quick start (development)

Open two terminals (or use a multiplexer) and run the backend and frontend separately.

1. Backend (API)

```bash
cd backend
npm install
# development with auto-restart (uses node --watch)
npm run dev
# or to run normally:
npm start
```

The backend default script runs `index.js` and listens on the port configured inside the backend (check `backend/index.js`).

2. Frontend (React + Vite) + local JSON server

```bash
cd frontend
npm install
# Start Vite dev server
npm run dev
# In a separate terminal, start the JSON server that serves db.json on port 3001
npm run server
```

Vite typically serves the frontend on http://localhost:5173. The JSON server runs on port 3001 by the script in `package.json`.

## Build / Production preview

To build the frontend bundle:

```bash
cd frontend
npm run build
npm run preview
```

For a production Node backend start, from `backend`:

```bash
npm install --production
npm start
```

## Notes

- The frontend `package.json` includes a `server` script that uses `json-server -p 3001 db.json` to provide a simple REST API for local testing.
- The backend has `dev` script defined as `node --watch index.js` and a `start` script `node index.js`.
- If ports collide, adjust them in the server files or the `db.json` / frontend config.

## Troubleshooting

- If `npm run dev` fails due to missing packages, double-check `npm install` completed successfully in both `backend` and `frontend`.
- If the frontend can't reach the API, confirm json-server (port 3001) and/or backend are running and CORS is configured.

## That's it

You can use this repository to demo the app live. The key commands are above — start backend, start json-server, and start the Vite dev server.

## Live demo

The app is live at: https://phonebook-o04b.onrender.com/

This site is hosted on Render. The deployment was done by building the frontend, copying the built `dist` into the backend, and then deploying the backend to Render (the backend serves the static files with `express.static("dist")`).

## Deployment (how I deployed to Render)

These are the manual steps used to publish the site to Render.

1. Build the frontend

```bash
cd frontend
npm install
npm run build
```

2. Copy the built frontend into the backend `dist` folder

From the `frontend` directory you can copy the `dist` output into the backend folder:

```bash
# from the frontend folder
cp -r dist ../backend/dist
```

On Windows when using PowerShell you might use `xcopy` or use Git Bash / WSL so `cp -r` works.

3. Push backend (with `dist`) to your Git repo and deploy on Render

```bash
cd ../backend
npm install
git add dist -A
git commit -m "Deploy: add frontend build"
git push origin main
# Then trigger a deploy on Render (if connected to the repo it will auto-deploy)
```

The backend serves the static frontend from `dist` and the API endpoints under `/api`.
