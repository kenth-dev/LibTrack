
KENNETH GASMEN
11:34 PM
# LibTrack Frontend

Scaffolded Vite + React + TypeScript frontend for LibTrack.

Quick start (run locally):

```powershell
cd frontend
npm install
npm run dev
```

Build:

```powershell
npm run build
```

Run tests:

```powershell
npm run test
```

Type check only:

```powershell
npx tsc --noEmit
```

Notes:
- API base URL is taken from `frontend/.env` as `VITE_API_BASE_URL`.
- Pages located in `src/pages/`; components in `src/components/`; API helper is `src/api/index.ts`.
- Theme variables are in `src/styles/theme.css` (dark-academia direction).
jci-pbmb-ihb