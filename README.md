# Kathu Page

Monorepo containing the **client** ([Astro](https://astro.build)) and the
**server** ([NestJS](https://nestjs.com)). It is a single Git repository, but
each package is self-contained: it keeps its own `pnpm-lock.yaml` and installs
independently, so each side can be built and deployed on its own.

## Structure

```text
kathu-page/
├── package.json          # root orchestration scripts (no dependencies)
├── .nvmrc                # pinned Node version
├── client/               # Astro app        → deploys to Vercel
│   └── package.json
└── server/               # NestJS API       → deploys to Railway
    └── package.json
```

## Requirements

- Node `>=22.12.0` (see `.nvmrc` — run `nvm use`)
- [pnpm](https://pnpm.io) `>=10`

## Getting started

```sh
# Install dependencies for both packages
pnpm install:all

# Run both dev servers together (client + server)
pnpm dev

# …or run them individually
pnpm dev:client     # Astro   → http://localhost:4321
pnpm dev:server     # NestJS  → http://localhost:3000
```

### All root scripts

| Command               | Action                                   |
| :-------------------- | :--------------------------------------- |
| `pnpm install:all`    | Install deps for client **and** server   |
| `pnpm dev`            | Run both dev servers concurrently        |
| `pnpm dev:client`     | Run only the Astro dev server            |
| `pnpm dev:server`     | Run only the NestJS dev server (watch)   |
| `pnpm build`          | Build both packages                      |
| `pnpm build:client`   | Build only the client                    |
| `pnpm build:server`   | Build only the server                    |
| `pnpm test:server`    | Run server unit tests                    |
| `pnpm lint:server`    | Lint the server                          |

> Each package can also be used directly: `cd client && pnpm dev`.

## Deployment

Both platforms connect to the **same** GitHub repository and each targets its
own subdirectory, so client and server deploy independently.

### Client → Vercel

1. Import this repo as a new Vercel project.
2. Set **Root Directory** to `client`.
3. Vercel auto-detects Astro (build `astro build`, output `dist/`).
4. (Optional) Enable path-based build skipping so pushes that don't touch
   `client/` don't redeploy it.

### Server → Railway

1. Create a Railway service from this repo.
2. Set **Root Directory** to `server`.
3. Set **Watch Paths** to `server/**` so only server changes trigger a deploy.
4. Start command: `pnpm start:prod` (after `pnpm build`); set `PORT` via env.
