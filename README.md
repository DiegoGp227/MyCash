<div align="center">

# MyCash 💰

**A full-stack personal finance management app built with Next.js, Express, and PostgreSQL**

[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL_17-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

</div>

---

## Overview

MyCash is a **production-grade personal finance application** that gives users a complete view of their financial life. Manage multiple accounts, categorize transactions, set budgets, track savings goals, monitor debts, and analyze spending through a rich analytics dashboard — all in one place.

Built as a **full-stack project** (React frontend + Node.js REST API + PostgreSQL) with a focus on data integrity, clean architecture, and real-world financial logic such as custom billing cycles and atomic multi-account transfers.

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 16** (Turbopack) | React framework, file-based routing, App Router |
| **React 19** | UI library |
| **TypeScript** | End-to-end type safety |
| **Tailwind CSS 4** | Utility-first styling (PostCSS-first config) |
| **Easy-Peasy** | Global state management (Redux-style, minimal boilerplate) |
| **SWR** | Server state caching with stale-while-revalidate |
| **React Hook Form + Zod** | Form handling with schema-based validation |
| **TanStack React Table** | Headless, fully typed data tables |
| **Recharts** | Composable chart library (8+ chart types) |
| **Axios** | HTTP client with interceptors for auth token injection |
| **Vitest + Testing Library** | Unit and integration testing |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express** | REST API server |
| **TypeScript** | Strongly typed backend |
| **Prisma ORM** | Type-safe database access with migrations |
| **PostgreSQL 17** | Relational database (DECIMAL precision for financial data) |
| **JWT + bcryptjs** | Authentication and password hashing |
| **Zod** | Runtime request validation |
| **Docker + Docker Compose** | Containerized development and deployment |

---

## Features

### Accounts & Transactions
- **Multi-account support** — Cash, Bank, Credit Card, Savings, Investment, Digital Wallet
- **Transaction management** — Create, edit, delete income/expense entries with categories and notes
- **Inter-account transfers** — Atomic balance updates across two accounts in a single DB transaction
- **Advanced filtering** — Filter by date, account, category, and transaction type

### Budgets & Goals
- **Monthly budgets** — Allocate spending limits per category or subcategory
- **Budget vs. actual tracking** — Real-time comparison of planned vs. spent amounts
- **Savings goals** — Create goals with target amounts, track contributions and progress
- **Debt tracking** — Log debts with interest rates, payment history, due dates, and status

### Analytics Dashboard
- Income vs. Expenses trend (line chart)
- Expenses by category breakdown (pie / bar chart)
- Budget vs. Actual comparison
- Cash flow analysis and account balance evolution
- Expense heatmap and top spending categories
- Income distribution breakdown

### Configuration & UX
- **Custom billing cycle** — Define a cutoff day (1–31) to match your bank's billing period
- **10+ currencies** — USD, EUR, GBP, COP, MXN, BRL, ARS, CLP, PEN, JPY
- **Dark / Light mode** — Purple-accented theme with smooth transitions
- **Fully responsive** — Collapsible sidebar on desktop, drawer navigation on mobile

---

## Architecture Highlights

**Type-safe full stack** — Zod schemas are defined once and used for validation on both the frontend (React Hook Form) and the backend (Express middleware), ensuring consistent contracts.

**Financial data integrity** — All monetary values use `DECIMAL(15,2)` in PostgreSQL to avoid floating-point errors. Multi-step operations (transfers, goal contributions) use Prisma transactions for atomicity.

**Custom period system** — A utility layer computes billing periods based on the user's cutoff day, correctly handling months of varying length. Used across dashboards and budget calculations for accurate cycle-based reporting.

**Layered backend architecture** — Each domain module (accounts, transactions, budgets, etc.) owns its controllers, services, validation schemas, and types. A structured `AppError` hierarchy (BadRequestError, UnauthorizedError, NotFoundError, ConflictError) serializes consistently to the frontend.

**Auth flow** — JWT tokens injected automatically via an Axios interceptor. A global 401 handler logs the user out and redirects to `/auth` when a token expires, with no per-request error handling needed in components.

**SWR for server state** — Data is fetched and cached at the hook level. Mutations call SWR's `mutate()` to keep UI in sync without full page reloads.

---

## Getting Started

### Prerequisites
- [Docker](https://www.docker.com/) and Docker Compose
- [pnpm](https://pnpm.io/) `>= 10`
- Node.js `>= 20`

### Run with Docker Compose

```bash
# Clone the repository
git clone https://github.com/your-username/MyCash.git
cd MyCash

# Copy environment variables
cp .env.example .env   # fill in your values

# Start all services (frontend, backend, PostgreSQL)
docker compose up --build
```

The app will be available at `http://localhost:3000`.

### Run locally (without Docker)

```bash
# Backend
cd back
pnpm install
pnpm prisma:migrate
pnpm prisma:seed   # optional seed data
pnpm dev           # http://localhost:4000

# Frontend (separate terminal)
cd front
pnpm install
pnpm dev           # http://localhost:3000
```

### Run tests

```bash
cd front
pnpm test          # Vitest
pnpm test:coverage # Coverage report
```

---

## Project Structure

```
MyCash/
├── back/                        # Express REST API
│   ├── src/
│   │   ├── modules/             # Feature modules (auth, transactions, budgets…)
│   │   │   └── [module]/
│   │   │       ├── controllers  # Request/response handling
│   │   │       ├── services     # Business logic
│   │   │       ├── schemas      # Zod validation
│   │   │       └── types        # TypeScript interfaces
│   │   ├── middlewares/         # Auth guard, error handler
│   │   ├── errors/              # Typed error hierarchy
│   │   └── utils/               # Period calculation, helpers
│   └── prisma/
│       └── schema.prisma        # DB schema + migrations
│
├── front/                       # Next.js frontend (App Router)
│   ├── app/                     # Pages and layouts
│   ├── src/
│   │   └── [feature]/           # Feature-scoped hooks, services, types, components
│   ├── store/                   # Easy-Peasy global store
│   └── provider/                # React providers (store, theme)
│
└── compose.yml                  # Docker Compose config
```

---

## Key Design Decisions

| Decision | Rationale |
|---|---|
| Easy-Peasy over Redux | Sufficient for auth state scope; dramatically less boilerplate |
| SWR over React Query | Lightweight, idiomatic for Next.js, covers the caching needs here |
| Prisma transactions for transfers | Prevents balance inconsistencies under concurrent writes |
| DECIMAL(15,2) in DB | Eliminates floating-point drift on financial calculations |
| Cutoff-day period model | Matches how real bank cycles work, not arbitrary month boundaries |
| Layered error classes | Consistent HTTP status codes and serialization across all endpoints |

---

<div align="center">

Made by [Diego GP](https://github.com/DiegoGP94)

</div>
