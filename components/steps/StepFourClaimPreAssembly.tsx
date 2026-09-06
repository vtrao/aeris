"use client";

import React from "react";
import { FileCheck, Shield, Clock, CheckCircle2, AlertOctagon, FileSpreadsheet } from "lucide-react";
import { telemetryPayload, warrantyChunk, telemetryAuditLogs } from "@/lib/mockData";

export default function StepFourClaimPreAssembly() {
  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-indigo-900 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-700">
            <FileSpreadsheet className="w-5 h-5 text-indigo-200" />
          </div>
          <div>
            <div className="font-bold text-sm">
              DevRev Auto-Assembled Warranty Claim Evidence Package
            </div>
            <div className="text-xs text-indigo-200">
              Claim ID: <span className="font-mono text-white">CLM-2026-F802-T102</span> • Status: Draft (Pending HITL Review)
            </div>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          Deterministic Proof Match
        </span>
      </div>

      {/* Side-by-Side View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Pane: Extracted SCADA Telemetry Logs & Audit Trail */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-sm text-slate-800">
                SCADA Sensor Telemetry Audit Trail
              </h3>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              4 Data Points Attached
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Continuous telemetry records proving gearbox temperature spiked past the OEM 90°C trip threshold before generator shutdown:
          </p>

          {/* Telemetry Log Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Timestamp (UTC)</th>
                  <th className="py-2.5 px-3">Sensor Target</th>
                  <th className="py-2.5 px-3">Reading</th>
                  <th className="py-2.5 px-3">Condition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {telemetryAuditLogs.map((log, index) => (
                  <tr key={index} className={log.reading.includes("99") ? "bg-red-50/60 font-semibold" : ""}>
                    <td className="py-2 px-3 text-slate-600">{log.timestamp.split("T")[1]}</td>
                    <td className="py-2 px-3 text-slate-800 font-sans">{log.sensor}</td>
                    <td className="py-2 px-3 text-slate-900 font-bold">{log.reading}</td>
                    <td className="py-2 px-3">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                        log.status === "CRITICAL" || log.status === "OFFLINE"
                          ? "bg-red-100 text-red-700"
                          : log.status === "WARNING"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Audit Verification Stamp */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              Cryptographic SCADA signature verified against Aeris Secure Gateway #GW-09.
            </span>
          </div>
        </div>

        {/* Right Pane: Vectorized Warranty Clause Snippet */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-sm text-slate-800">
                Vectorized Warranty Clause Match
              </h3>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
              Match Confidence: {(warrantyChunk.match_confidence * 100).toFixed(0)}%
            </span>
          </div>

          <div className="text-xs text-slate-600 flex items-center justify-between">
            <span><strong>Source Contract:</strong> {warrantyChunk.document_name}</span>
            <span><strong>Location:</strong> Page {warrantyChunk.page}, {warrantyChunk.clause}</span>
          </div>

          {/* Highlighted Clause Blockquote */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-slate-800 space-y-2">
            <div className="text-[11px] uppercase font-bold tracking-wider text-emerald-800">
              Matched Contract Section
            </div>
            <p className="text-xs italic leading-relaxed text-slate-900">
              &ldquo;{warrantyChunk.clause_text}&rdquo;
            </p>
          </div>

          {/* Automated Check Compliance Box */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-600">Fault Code in Eligible Range (F-800 to F-810):</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> F-802 (Valid)
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-600">Temperature Spike &gt; 90°C Proof:</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 99.2°C logged (Valid)
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-600">Claim Filing Window (72 hours):</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 71.7h remaining
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center justify-between">
            <span>Estimated Direct Cost Recovery:</span>
            <span className="text-sm font-extrabold text-emerald-800">$48,500 USD (Parts + Labor)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
