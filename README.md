# Aeris Renewables — DevRev Revenue Protection Agent Prototype

An interactive 5-Step Live Flow Demonstration web application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Lucide Icons**, modeling the **Revenue Protection Agent** for Aeris Renewables.

The application demonstrates how DevRev unifies Aeris's three disparate data sources via the DevRev Knowledge Graph (`Metrics` $\rightarrow$ `Work_Items` $\rightarrow$ `Knowledge_Base` chunks) to halt active generation loss ($1,200/hr), coordinate on-call field technicians, and pre-assemble audit-ready OEM warranty recovery claims.

---

## 5-Step Live Flow Architecture

1. **Step 1: Telemetry Ingestion (SCADA Stream)**
   - Ingests raw JSON SCADA stream from Turbine T-102 (Kanyakumari Cluster).
   - Computes live financial loss rate: **$1,200/hr** derived from $(4.0\text{ MW deficit} \times \$300/\text{MWh})$.
2. **Step 2: Context Graph Linking**
   - Visualizes DevRev Knowledge Graph entity resolution across `Metric Object` $\rightarrow$ `User Object` $\rightarrow$ `Knowledge_Base Chunk`.
   - Side-by-side inspection of live fault telemetry vs. vectorized contract clause.
3. **Step 3: Sprint Injection**
   - Simulates Jira / Slack operational alert notification.
   - Triggers dynamic reprioritization of Lead Engineer Arun Kumar from routine inspection (Task #402) to the P0 Turbine T-102 outage.
4. **Step 4: Claim Pre-Assembly**
   - Renders an auto-assembled DevRev Warranty Task with side-by-side verification:
     - **Left Pane:** SCADA sensor temperature audit log (>90°C trip verification).
     - **Right Pane:** Vectorized warranty clause snippet matching Clause 4.2 with **94% confidence**.
5. **Step 5: HITL (Human-in-the-Loop) Approval Gate**
   - Site Lead review dashboard with one-click approval/rejection.
   - Generates DevRev Audit Trace Log `#TR-9902` and dispatches claim to OEM portal.

---

## Getting Started Locally

### Prerequisites
- Node.js 18.x or later (Node 20+ recommended)
- npm or yarn or pnpm

### Installation & Run

1. Clone or navigate to the project directory:
   ```bash
   cd aeris
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deploying to Vercel

### Option A: Deploy via Vercel CLI

1. Install the Vercel CLI globally (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. From the root directory, run:
   ```bash
   vercel
   ```
   Follow the interactive prompts to link or create a project.

3. To deploy directly to production:
   ```bash
   vercel --prod
   ```

### Option B: Deploy via GitHub / Git Repository

1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete DevRev Revenue Protection Agent 5-step prototype"
   git push origin main
   ```

2. Visit [vercel.com/new](https://vercel.com/new).
3. Import the `aeris` repository.
4. Framework preset will automatically be detected as **Next.js**.
5. Click **Deploy**. Zero configuration or environment variables required.

---

## Project Structure

```
├── app/
│   ├── globals.css           # Tailwind base styles and CSS variables
│   ├── layout.tsx            # Root layout with metadata and styling
│   └── page.tsx              # Main page container and executive summary
├── components/
│   ├── DemoStepper.tsx       # Core 5-step stepper navigation & state controller
│   └── steps/
│       ├── StepOneTelemetry.tsx          # Step 1: SCADA Ingestion & $1,200/hr Loss
│       ├── StepTwoContextGraph.tsx       # Step 2: DevRev Knowledge Graph Linkage
│       ├── StepThreeSprintInjection.tsx  # Step 3: Sprint Reallocation & Slack Alert
│       ├── StepFourClaimPreAssembly.tsx   # Step 4: Deterministic Claim Package
│       └── StepFiveHitlApproval.tsx      # Step 5: HITL Site Lead Approval Gate
├── lib/
│   ├── mockData.ts           # SCADA payload, sprint personnel, & vectorized PDF clause
│   └── utils.ts              # Tailwind CSS utility class merger
├── package.json              # Next.js 14, Tailwind, Lucide dependencies
├── tailwind.config.ts        # Aeris theme color extensions
├── tsconfig.json             # TypeScript configuration
├── vercel.json               # Vercel deployment build settings
└── README.md
```
