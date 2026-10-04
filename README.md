# Workffice Monorepo

## Structure
- apps/workffice-frontend -> React frontend
- apps/workffice-backend -> Spring Boot backend

## Local development
Run the full stack from the repository root:

```bash
npm install
npm run dev
```

This starts:
- Frontend on http://localhost:3000
- Backend on http://localhost:8080

The setup includes live reload for both apps:
- React uses the CRA development server
- Spring Boot uses devtools auto-reload

If you want to start them separately:

```bash
npm run dev:frontend
npm run dev:backend
```

If the backend stops because of stale H2 files, run:

```bash
./scripts/dev.sh
```
