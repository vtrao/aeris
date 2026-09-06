"use client";

import React from "react";
import { ArrowRight, Cpu, User, FileText, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { telemetryPayload, onDutyData, warrantyChunk } from "@/lib/mockData";

export default function StepTwoContextGraph() {
  return (
    <div className="space-y-6">
      {/* Visual Graph Linking Bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60 shadow-xl text-white">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-semibold text-slate-100">
              DevRev Knowledge Graph Unified Linkage
            </h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
            3 Entities Resolved in 140ms
          </span>
        </div>

        {/* 3 Node Visual Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative items-stretch">
          {/* Node 1: Metric */}
          <div className="p-4 rounded-xl bg-slate-800/80 border border-blue-500/40 relative group hover:border-blue-400 transition-all">
            <div className="flex items-center gap-2 mb-2 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              <span>Metric Custom Object</span>
            </div>
            <div className="text-base font-bold text-white mb-1">
              {telemetryPayload.asset_id}
            </div>
            <div className="text-xs text-slate-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Fault Code:</span>
                <span className="font-mono text-amber-400 font-semibold">{telemetryPayload.fault_code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Diagnosis:</span>
                <span className="truncate max-w-[150px]">{telemetryPayload.fault_description}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Loss Rate:</span>
                <span className="text-rose-400 font-semibold">${telemetryPayload.calculated_loss_rate_usd_hr}/hr</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-blue-300">
              <CheckCircle2 className="w-3.5 h-3.5" /> Telemetry Linked
            </div>
          </div>

          {/* Node 2: User */}
          <div className="p-4 rounded-xl bg-slate-800/80 border border-purple-500/40 relative group hover:border-purple-400 transition-all">
            <div className="flex items-center gap-2 mb-2 text-purple-400 text-xs font-semibold uppercase tracking-wider">
              <User className="w-4 h-4" />
              <span>User Object</span>
            </div>
            <div className="text-base font-bold text-white mb-1">
              {onDutyData.on_call_engineer.name}
            </div>
            <div className="text-xs text-slate-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Role:</span>
                <span>{onDutyData.on_call_engineer.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Shift:</span>
                <span>{onDutyData.on_call_engineer.shift}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Active Task:</span>
                <span className="text-amber-300 truncate max-w-[140px]">#402 Substation</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-purple-300">
              <CheckCircle2 className="w-3.5 h-3.5" /> Shift Roster Active
            </div>
          </div>

          {/* Node 3: Knowledge Base Chunk */}
          <div className="p-4 rounded-xl bg-slate-800/80 border border-emerald-500/40 relative group hover:border-emerald-400 transition-all">
            <div className="flex items-center gap-2 mb-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>Knowledge_Base Chunk</span>
            </div>
            <div className="text-base font-bold text-white mb-1 flex items-center justify-between">
              <span>{warrantyChunk.document_name}</span>
            </div>
            <div className="text-xs text-slate-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Matched:</span>
                <span className="font-semibold text-emerald-300">{warrantyChunk.clause} (Pg {warrantyChunk.page})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Confidence:</span>
                <span className="font-mono text-emerald-400 font-bold">
                  {(warrantyChunk.match_confidence * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Notice Window:</span>
                <span className="text-slate-200">72 Hours</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" /> OEM Covered
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Context Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Card: Fault Context */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Asset Fault State
              </h4>
              <span className="px-2 py-0.5 rounded text-xs font-mono font-medium bg-amber-50 text-amber-700 border border-amber-200">
                SCADA Match
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {telemetryPayload.asset_id} • {telemetryPayload.fault_description}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Telemetry confirmed bearing temperature spike exceeding 95°C followed by automatic generator protection trip.
              Asset is located in the <strong>{telemetryPayload.location}</strong> with an active $300/MWh PPA off-take contract.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <strong>DevRev Agent Action:</strong> Linked operational metric directly to OEM warranty clauses within 1 second of ingestion.
          </div>
        </div>

        {/* Right Card: Matched Contract Clause */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Vectorized Contract Match
              </h4>
              <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Confidence: {(warrantyChunk.match_confidence * 100).toFixed(0)}%
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {warrantyChunk.document_name} • {warrantyChunk.clause}
            </h3>
            <blockquote className="p-3 rounded-xl bg-emerald-50/50 border-l-4 border-emerald-500 text-xs text-slate-800 leading-relaxed italic mb-4">
              &ldquo;{warrantyChunk.clause_text}&rdquo;
            </blockquote>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <strong>Key Eligibility:</strong> Fault {telemetryPayload.fault_code} falls explicitly within the F-800 through F-810 OEM coverage range.
          </div>
        </div>
      </div>
    </div>
  );
}
