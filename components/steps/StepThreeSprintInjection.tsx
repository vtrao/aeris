"use client";

import React, { useState } from "react";
import { 
  BellRing, 
  Send, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  UserCheck, 
  MessageSquare,
  Sparkles
} from "lucide-react";
import { telemetryPayload, onDutyData } from "@/lib/mockData";

export default function StepThreeSprintInjection() {
  const [reprioritized, setReprioritized] = useState(false);
  const [fieldNotified, setFieldNotified] = useState(false);

  return (
    <div className="space-y-6">
      {/* Simulation Banner */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 text-white text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Active Agent Orchestration: Automated Jira Sprint Reallocation & Slack Alert Dispatch</span>
        </div>
        <span className="font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
          Latency: &lt; 2.4s
        </span>
      </div>

      {/* Simulated Jira / Slack Notification Card */}
      <div className="rounded-2xl border-2 border-red-500/40 bg-white shadow-xl overflow-hidden">
        {/* Card Header (Slack / Jira Style) */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center shadow-md animate-bounce">
              <BellRing className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight flex items-center gap-2">
                <span>#devrev-ops-alerts</span>
                <span className="text-[10px] bg-red-500/30 text-red-300 px-2 py-0.2 rounded-full font-mono uppercase">
                  P0 Outage
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                App: Revenue-Protection-Bot • Just now
              </div>
            </div>
          </div>
          <span className="text-xs text-slate-300 font-mono bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
            Sprint 34 - Week 2
          </span>
        </div>

        {/* Message Body */}
        <div className="p-6 space-y-4">
          <div className="p-4 rounded-xl bg-red-50/80 border border-red-200 text-slate-800">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🚨</span>
              <div className="space-y-1">
                <div className="font-bold text-base text-red-950">
                  HIGH FINANCIAL LOSS ALERT: {telemetryPayload.asset_id} losing ${telemetryPayload.calculated_loss_rate_usd_hr.toLocaleString()}/hr (Fault {telemetryPayload.fault_code}).
                </div>
                <div className="text-sm text-red-800 font-medium">
                  Recommending immediate reprioritization for <strong>{onDutyData.on_call_engineer.name}</strong> over {onDutyData.on_call_engineer.current_sprint_task}.
                </div>
              </div>
            </div>
          </div>

          {/* Context Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-slate-400 font-semibold mb-1 uppercase tracking-wide">
                Current Scheduled Task
              </div>
              <div className="font-medium text-slate-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {onDutyData.on_call_engineer.current_sprint_task}
              </div>
              <div className="mt-1 text-slate-500 text-[11px]">
                Impact: Routine inspection ($0/hr risk)
              </div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="text-emerald-700 font-semibold mb-1 uppercase tracking-wide">
                Proposed Agent Action
              </div>
              <div className="font-semibold text-emerald-900 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                Priority Ticket: Dispatch to {telemetryPayload.asset_id}
              </div>
              <div className="mt-1 text-emerald-800 text-[11px]">
                Impact: Protects ${telemetryPayload.calculated_loss_rate_usd_hr}/hr revenue
              </div>
            </div>
          </div>

          {/* Interactive Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setReprioritized(true)}
              disabled={reprioritized}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-md ${
                reprioritized
                  ? "bg-emerald-600 text-white cursor-default"
                  : "bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:opacity-90 active:scale-95"
              }`}
            >
              {reprioritized ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Reprioritization Accepted (Sprint Updated)
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  Accept Reprioritization
                </>
              )}
            </button>

            <button
              onClick={() => setFieldNotified(true)}
              disabled={fieldNotified}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs border transition-all ${
                fieldNotified
                  ? "bg-slate-100 text-slate-500 border-slate-200 cursor-default"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50 active:scale-95 shadow-sm"
              }`}
            >
              {fieldNotified ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Field Team Notified (SMS / Push Sent)
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-slate-500" />
                  Notify Field Team
                </>
              )}
            </button>
          </div>

          {/* Feedback Banner if both clicked */}
          {reprioritized && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs flex items-center justify-between">
              <span>
                <strong>DevRev Synchronization:</strong> Arun Kumar has been reassigned to Outage Work_Item #WO-802. Substation B inspection rescheduled to next sprint.
              </span>
              <span className="font-mono text-[10px] text-emerald-700">Sprint Sync: Active</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
