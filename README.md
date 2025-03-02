# 📦 Node.js + Prisma + PostgreSQL + Redis (Development Setup)

This project sets up a **Node.js** application with **Prisma** ORM, connected to **PostgreSQL** and **Redis** using **Docker Compose** for database management — all while keeping the Node.js app running locally for fast development.

---

## 🚀 **Project Structure**

```
📦 image-processing-api
├── 📦 prisma
│   └── 📄 schema.prisma
├── 📦 src
│   └── 📄 index.ts
├── 📦 dist
│   └── 📄 index.js
├── 📄 docker-compose.dev.yml
├── 📄 Dockerfile (optional)
├── 📄 .env
├── 📄 package.json
├── 📄 tsconfig.json
└── 📄 README.md
```

---

## 🛠️ **Tools and Technologies**

- **Node.js** (v22.12.0 via Volta) — Runtime for JavaScript
- **TypeScript** — Typed superset of JavaScript
- **Prisma** — ORM for database management
- **PostgreSQL** — Relational database
- **Redis** — In-memory data store
- **Docker & Docker Compose** — Containerization and orchestration
- **ts-node-dev** — Hot-reloading for TypeScript
- **Express** — Web framework for Node.js
- **Joi** — Schema validation
- **Morgan** — HTTP request logger
- **dotenv** — Environment variable management

---

## 🌿 **Setup Instructions**

### 1️⃣ **Install dependencies**

Ensure you have **Node.js** (v22.12.0) and **Docker** installed on your system.

1. Install dependencies:

```bash
npm install
```

---

To start the containers:

```bash
npm run docker:up
```

Stop the containers:

```bash
npm run docker:down
```

---

### 3️⃣ **Database configuration**

Add your database URLs to the **`.env`** file:

```plaintext
DATABASE_URL=postgresql://postgres:password@localhost:5432/mydatabase
REDIS_URL=redis://localhost:6379
PORT=3000
NODE_ENV=development
```

---

---

### 4 **Running the app**

Ensure the databases are running:

```bash
npm run docker:up
```

Run the Node.js app:

```bash
# Start with ts-node-dev (hot-reloading)
npm run dev

# OR build and run the compiled JS
npm run build
npm start
```

### 5 **Prisma Studio**

To visually interact with your Postgres data, use Prisma Studio:

```bash
npx prisma studio
```

---

## ✅ **Commands Summary**

- **Start Postgres and Redis:**

```bash
npm run docker:up
```

- **Stop containers:**

```bash
npm run docker:down
```

- **Run Prisma migrations:**

```bash
npx prisma migrate dev --name init
```

- **Generate Prisma client:**

```bash
npx prisma generate
```

- **Launch Prisma Studio:**

```bash
npx prisma studio
```

- **Run the app (dev mode with ts-node-dev):**

```bash
npm run dev
```

- **Build TypeScript:**

```bash
npm run build
```

- **Run compiled JavaScript:**

```bash
npm start
```

---

## 📚 **Notes**

- Ensure Docker is running before using Docker Compose.
- The Node.js app uses the `.env` file for configuration.
- Prisma generates a client after every migration — don’t forget to run `npx prisma generate`.

---
