# Kathu Page

Public website and booking platform for a holistic floral therapy practice serving
multi-species families (humans and companion animals). Monorepo containing the
**client** ([Astro](https://astro.build)) and the **server**
([NestJS](https://nestjs.com)), plus an AI-assisted development **workspace**.

It is a single Git repository, but each package is self-contained: it keeps its own
`pnpm-lock.yaml` and installs independently, so each side can be built and deployed
on its own.

## Structure

```text
kathu-page/
├── package.json           # root orchestration scripts (no dependencies)
├── .nvmrc                 # pinned Node version
├── README.md              # this file
├── AGENTS.md              # AI constitution        (git-ignored, local only)
├── CLAUDE.md              # Claude Code entry point (git-ignored, local only)
├── client/                # Astro app         → deploys to Vercel
│   └── package.json       #   (own pnpm-lock.yaml)
├── server/                # NestJS API        → deploys to Railway
│   └── package.json       #   (own pnpm-lock.yaml)
└── workspace/             # AI support files (git-ignored, local only)
    ├── issues/            # issues to resolve
    ├── specifications/    # specs for spec-driven coding
    ├── ui-reference/      # design references (home draft, booking modal shots)
    └── skills/            # shared/client/server skills for coding agents
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

## Client (`client/` — Astro)

```text
client/
├── public/                # static assets (images, fonts…)
├── src/
│   └── pages/             # each .astro/.md file becomes a route
└── package.json
```

Astro looks for `.astro` or `.md` files in `src/pages/`; each page is exposed as a
route based on its file name. Components live in `src/components/` and static assets
in `public/`.

Commands (run inside `client/`, or via the root scripts above):

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`            | Installs dependencies                            |
| `pnpm dev`                | Starts local dev server at `localhost:4321`      |
| `pnpm build`              | Build your production site to `./dist/`          |
| `pnpm preview`            | Preview your build locally, before deploying     |
| `pnpm astro ...`          | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help`    | Get help using the Astro CLI                     |

Learn more in the [Astro documentation](https://docs.astro.build) or the
[Astro Discord](https://astro.build/chat).

## Server (`server/` — NestJS)

[NestJS](https://nestjs.com) is a progressive Node.js framework for building
efficient and scalable server-side applications (MIT-licensed,
[TypeScript starter](https://github.com/nestjs/nest)).

Commands (run inside `server/`, or via the root scripts above):

```bash
pnpm install          # project setup

pnpm run start        # development
pnpm run start:dev    # watch mode
pnpm run start:prod   # production mode (after pnpm build)

pnpm run test         # unit tests
pnpm run test:e2e     # e2e tests
pnpm run test:cov     # test coverage

pnpm run lint         # eslint --fix
pnpm run format       # prettier
```

NestJS resources:

- [NestJS documentation](https://docs.nestjs.com) · [deployment guide](https://docs.nestjs.com/deployment)
- [NestJS Devtools](https://devtools.nestjs.com) · [enterprise support](https://enterprise.nestjs.com) · [jobs board](https://jobs.nestjs.com)

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

## AI-assisted development (`workspace/`)

The `workspace/` folder holds everything AI coding agents need for spec-driven
development. It is deliberately **not version-controlled** (git-ignored, together
with root `AGENTS.md` and `CLAUDE.md`) — these files live only on the machine where
Claude Code runs. It is a filled-in adaptation of
`sergio-hidalgo/context-engineering-templates` for the Kathu stack (Astro + React
islands + TanStack Query · NestJS on Fastify · Supabase · Stripe hosted Checkout ·
Tailwind v4 · Zustand · Zod).

| Folder                               | Purpose                                                     |
| ------------------------------------ | ----------------------------------------------------------- |
| `workspace/issues/`                  | Issues to resolve                                           |
| `workspace/specifications/`          | Specifications for spec-driven coding                       |
| `workspace/ui-reference/home/`       | Approved home page draft (`kathu-hero.html` + fonts/images) |
| `workspace/ui-reference/book-modal/` | Booking modal step-by-step screenshots                      |
| `workspace/skills/`                  | Always-on and callable skills (inventory below)             |

### Entry points

- **`CLAUDE.md`** (root) — read automatically by Claude Code; instructs it to read `AGENTS.md`.
- **`AGENTS.md`** (root) — the single constitution: root rules + client constitution + server constitution, and pointers to every skill.
- **Antigravity / other agents**: point workspace rules at root `AGENTS.md` (it serves as the constitution) and register the callable `SKILL.md` folders as persona Skills. No `mcp_config.json` entries are required.
- Invoke callable skills by folder name: *"apply the security review skill"*, *"use the booking engine skill"*.

### Skill inventory

```text
workspace/skills/
├── shared/skills/
│   ├── database_schema_root.md          always-on  tables, RLS, exclusion constraint, payment/refund columns, migrations
│   ├── api_contract_root.md             always-on  REST contract, error envelope, webhook events, lifecycle
│   ├── booking_domain_root.md           always-on  availability model, paid pipelines, discretionary refunds, vendor abstraction
│   ├── security-review/SKILL.md         callable   full audit checklist (guards, payment/refund integrity)
│   └── code-refactoring/SKILL.md        callable   smells, canonical layouts, extract steps
├── client/skills/
│   ├── frontend-patterns/SKILL.md       callable   hybrid rendering, islands, TanStack Query conventions, structure
│   ├── auth-client/SKILL.md             callable   Supabase auth-only client, JWT-forwarding api.ts, session store
│   ├── ui-components/SKILL.md           callable   design tokens (from kathu-hero.html), components, ES string table
│   └── booking-widget/SKILL.md          callable   BookingModal + Stripe redirect + return page + admin editors
└── server/skills/
    ├── server-patterns/SKILL.md         callable   Nest bootstrap, modules, guards, ZodValidationPipe, exception filter
    └── booking-engine/SKILL.md          callable   pure slot core, paid pipelines, webhook controller, refund service, vendor providers
```

Domain change vs the generic template: the Search/Saved/Deleted/Catalogue quartet is
replaced by the **paid booking domain** — `search_domain_root.md` →
`booking_domain_root.md`, `search-engine` → `booking-engine`, and a new
`booking-widget` client skill.

### Stack decisions encoded in the skills

- **Server: NestJS 11 on the Fastify adapter.** Guards replace ad-hoc auth hooks, one
  exception filter owns the error envelope, `@nestjs/schedule` owns the hold sweep,
  vendors are DI providers behind `VendorRegistry`. **class-validator is banned** —
  validation is a `ZodValidationPipe` over `@kathu/shared` schemas.
- **Payments: Stripe hosted Checkout**, two-phase pipeline (hold → webhook confirm),
  non-refundable by default, **discretionary admin refunds only**.
- **Client: TanStack Query** owns server state (registry of query keys, bounded
  polling); **Zustand** owns UI/flow state; **Astro file-based routing only** —
  TanStack Router deliberately rejected (MPA + islands, not a SPA).

### Suggested prompts (build order)

1. "Create `@kathu/shared` (Zod schemas + TS types) with a linking strategy compatible with the loose monorepo, mirroring api_contract_root.md."
2. "Create the Supabase migrations from database_schema_root.md."
3. "Use the server patterns skill: switch the server to the Fastify adapter (rawBody enabled), bootstrap, Zod-validated ConfigModule, AuthGuard/AdminGuard, ZodValidationPipe, exception filter, DbModule with repos."
4. "Use the booking engine skill: slot-core with the full test matrix, AvailabilityService + controller."
5. "Use the booking engine skill: PaymentsService, BookingsService pipelines (start/confirm/cancel/refund/sweep), webhook controller. Then the admin module."
6. "Port workspace/ui-reference/home/kathu-hero.html into Astro components per the client constitution page map, using the ui components skill tokens."
7. "Use the frontend patterns + booking widget skills: query client, key registry, BookingModal end to end, BookingReturn page."
8. "Implement /cuenta and /admin islands per the booking widget skill."
9. "Apply the security review skill to the whole repo."
