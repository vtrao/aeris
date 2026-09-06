import React from "react";
import DemoStepper from "@/components/DemoStepper";
import { 
  Wind, 
  ShieldCheck, 
  Layers, 
  ExternalLink, 
  CheckCircle, 
  Flame,
  ArrowUpRight
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 selection:bg-emerald-500 selection:text-black">
      {/* Background radial accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent pointer-events-none blur-3xl -z-10" />

      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20">
              <Wind className="w-5 h-5 font-bold" />
            </div>
            <div>
              <div className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-2">
                <span>Aeris Renewables</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  DevRev Agent Demo
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Revenue Protection Agent • Live Ingestion & Grounded Recovery
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Kanyakumari Cluster (Site B)</span>
            </div>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition shadow-sm"
            >
              <span>Vercel Ready</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Deliverable 1: What Should We Build First, and Why?</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            5-Step Live Flow: <span className="text-emerald-400">Revenue Protection Agent</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
            The Revenue Protection Agent unifies Aeris&apos;s three existing data sources via DevRev&apos;s Knowledge Graph 
            (<span className="text-emerald-400 font-semibold">Metrics</span> $\rightarrow$ <span className="text-purple-400 font-semibold">Work_Items</span> $\rightarrow$ <span className="text-blue-400 font-semibold">Knowledge_Base chunks</span>) 
            to halt active generation loss ($1,200/hr), coordinate field dispatch, and deterministically auto-assemble audit-ready OEM warranty claims.
          </p>
        </div>

        {/* 5-Step Stepper Component */}
        <DemoStepper />

        {/* Value Matrix / Architecture Reference */}
        <div className="pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-bold text-slate-200 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              Source A: Operational Telemetry
            </div>
            <p className="text-slate-400 leading-relaxed">
              Mapped to <strong>Metric Custom Objects</strong>. Continuously assesses expected vs. actual output (4.0 MW $\rightarrow$ 0.0 MW) and calculates hourly financial leakage ($1,200/hr).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-bold text-slate-200 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              Source B: Field & Sprint Coordination
            </div>
            <p className="text-slate-400 leading-relaxed">
              Mapped to <strong>Work_Item Objects</strong>. Cross-checks active on-call rosters and automatically reprioritizes Arun Kumar from routine inspection to active P0 generation outage.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-bold text-slate-200 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Source C: Grounded Warranty Recovery
            </div>
            <p className="text-slate-400 leading-relaxed">
              Mapped to <strong>Knowledge_Base Chunks</strong>. Matches fault F-802 with 94% confidence to Clause 4.2 of <code>Wind_Turbine_OEM_v2.pdf</code> for deterministic $48,500 recovery.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-slate-800 text-center text-xs text-slate-500">
        Aeris Renewables &bull; DevRev Revenue Protection Agent Prototype &bull; Designed for Vercel Deployment
      </footer>
    </main>
  );
}
