"use client";

import React, { useState } from "react";
import { Copy, Check, Activity, DollarSign, Zap, AlertTriangle } from "lucide-react";
import { telemetryPayload } from "@/lib/mockData";

export default function StepOneTelemetry() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(telemetryPayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mwDeficit = (telemetryPayload.expected_output_mw - telemetryPayload.actual_output_mw).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Top Banner Alert */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-900 dark:text-red-200">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-500/20 text-red-600 animate-pulse">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-sm">Active Generation Outage Detected</div>
            <div className="text-xs text-red-700/80 dark:text-red-300/80">
              {telemetryPayload.location} • {telemetryPayload.asset_id} • SCADA Stream #892-A
            </div>
          </div>
        </div>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-700 dark:text-red-300">
          Trip: {telemetryPayload.fault_code}
        </span>
      </div>

      {/* Financial Loss Calculation Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-red-500 to-rose-700 text-white shadow-lg shadow-red-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-red-100">
              Live Revenue Loss Rate
            </span>
            <DollarSign className="w-5 h-5 text-red-200" />
          </div>
          <div className="text-3xl font-extrabold tracking-tight">
            ${telemetryPayload.calculated_loss_rate_usd_hr.toLocaleString()}
            <span className="text-base font-normal text-red-100"> / hr</span>
          </div>
          <div className="mt-2 text-xs text-red-100/90 bg-white/10 rounded-lg p-2 font-mono">
            Loss = ({mwDeficit} MW deficit) × ${telemetryPayload.ppa_tariff_rate_usd}/MWh
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Generation Deficit
            </span>
            <Zap className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {mwDeficit} <span className="text-base font-normal text-slate-500">MW</span>
          </div>
          <div className="mt-2 text-xs text-slate-600 flex justify-between">
            <span>Expected: <strong>{telemetryPayload.expected_output_mw} MW</strong></span>
            <span>Actual: <strong className="text-red-600">{telemetryPayload.actual_output_mw} MW</strong></span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              PPA Contract Tariff
            </span>
            <Activity className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            ${telemetryPayload.ppa_tariff_rate_usd}
            <span className="text-base font-normal text-slate-500"> / MWh</span>
          </div>
          <div className="mt-2 text-xs text-slate-600">
            Site: {telemetryPayload.location}
          </div>
        </div>
      </div>

      {/* Raw Ingestion SCADA Payload */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="ml-2 font-mono text-xs text-slate-400">
              telemetry_payload.scada.json
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy Payload"}
          </button>
        </div>
        <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto text-emerald-400">
          <pre>{JSON.stringify(telemetryPayload, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
