# My-Cool-Terra-Project
Project for Terra Hackclub

## Getting started

Install dependencies from the repository root:

```sh
npm install
```

Run the Vite frontend and Node.js backend in separate terminals, both from the
repository root:

```sh
npm run dev
```

```sh
node Server.js
```

Open the Vite URL printed in the first terminal (usually
http://localhost:5173). The React code is in `src/`, and the Vite config and
HTML entry are at the repository root. During development, requests to `/api`
are proxied to the Express backend on port 3001. `api/health.js` provides the
same health endpoint as a Vercel serverless function.

Useful commands:

- `npm run dev` — run the Vite frontend only.
- `npm run build` — build the frontend for production.
- `node Server.js` — run the Express backend only.
- `npm start` — also run the Express backend.

Vercel is configured to detect Vite at the repository root, build the frontend,
and serve its output from `dist/`. The health endpoint is deployed as a Vercel
function. Other Express routes in `Server.js` need corresponding Vercel
functions before they will be available in a Vercel deployment.
