"use client";

import React, { useState } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  Send, 
  RotateCcw, 
  ExternalLink,
  ClipboardList,
  Sparkles
} from "lucide-react";
import { telemetryPayload, onDutyData, warrantyChunk } from "@/lib/mockData";

export default function StepFiveHitlApproval() {
  const [claimStatus, setClaimStatus] = useState<"pending" | "approved" | "rejected">("pending");
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);

  const handleApprove = () => {
    setClaimStatus("approved");
  };

  const handleRejectConfirm = () => {
    setClaimStatus("rejected");
    setShowRejectModal(false);
  };

  const handleReset = () => {
    setClaimStatus("pending");
    setRejectReason("");
  };

  return (
    <div className="space-y-6">
      {/* Site Lead Approval Header */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-800">
              Human-in-the-Loop (HITL) Gate
            </span>
            <span className="text-xs text-slate-500">• Site Lead Approval Dashboard</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Warranty Claim Package #CLM-2026-F802
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Aeris Kanyakumari Site Lead review required before submission to OEM Service Portal (Vestas/Gamesa).
          </p>
        </div>

        {/* Current State Badge */}
        <div>
          {claimStatus === "pending" && (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              Awaiting Site Lead Review
            </span>
          )}
          {claimStatus === "approved" && (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Claim Submitted to OEM
            </span>
          )}
          {claimStatus === "rejected" && (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">
              <XCircle className="w-4 h-4 text-rose-600" />
              Manual Review Requested
            </span>
          )}
        </div>
      </div>

      {/* Success Banner when Approved */}
      {claimStatus === "approved" && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xl animate-fade-in space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/20">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold">
                  Claim successfully submitted to OEM portal!
                </h3>
                <p className="text-xs text-emerald-100">
                  DevRev Audit Trace Log <span className="font-mono font-bold text-white">#TR-9902</span> generated and cryptographically anchored.
                </p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Demo
            </button>
          </div>
          <div className="pt-2 border-t border-white/20 text-[11px] text-emerald-100 flex flex-wrap justify-between gap-2">
            <span>OEM Ticket Reference: <strong>OEM-VST-2026-9902</strong></span>
            <span>Estimated Recovery: <strong>$48,500 USD</strong></span>
            <span>Target Response Window: <strong>48 Hours</strong></span>
          </div>
        </div>
      )}

      {/* Reject Notice */}
      {claimStatus === "rejected" && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-center justify-between text-xs">
          <div>
            <strong>Claim Sent for Manual Investigation:</strong> Assigned back to Site Technical Lead. Reason: &quot;{rejectReason || "Additional oil sensor chromatography data requested"}&quot;.
          </div>
          <button
            onClick={handleReset}
            className="text-xs underline font-semibold text-rose-700 hover:text-rose-900"
          >
            Reset
          </button>
        </div>
      )}

      {/* Review Summary Checklist */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-slate-700" />
          Deterministic Evidence Package Summary
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-800">Incident Details</div>
            <div className="flex justify-between text-slate-600">
              <span>Turbine Asset:</span>
              <span className="font-semibold text-slate-800">{telemetryPayload.asset_id}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Location:</span>
              <span>{telemetryPayload.location}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Fault Trigger:</span>
              <span className="font-mono text-red-600 font-semibold">{telemetryPayload.fault_code}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Assigned Engineer:</span>
              <span>{onDutyData.on_call_engineer.name}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-800">Warranty Contract Mapping</div>
            <div className="flex justify-between text-slate-600">
              <span>OEM Document:</span>
              <span className="font-semibold text-slate-800">{warrantyChunk.document_name}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Matched Clause:</span>
              <span>{warrantyChunk.clause} (Pg {warrantyChunk.page})</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Vector Match:</span>
              <span className="font-semibold text-emerald-700">{(warrantyChunk.match_confidence * 100).toFixed(0)}% Confidence</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Telemetry Evidence:</span>
              <span className="text-emerald-700 font-medium">Spike 99.2°C &gt; 90°C threshold</span>
            </div>
          </div>
        </div>

        {/* Action Buttons for HITL Gate */}
        {claimStatus === "pending" && (
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-3">
            <button
              onClick={handleApprove}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              Approve Warranty Claim Submission
            </button>

            <button
              onClick={() => setShowRejectModal(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-rose-300 text-rose-700 hover:bg-rose-50 active:scale-95 font-semibold text-xs transition-all"
            >
              <XCircle className="w-4 h-4" />
              Reject / Request Manual Review
            </button>
          </div>
        )}
      </div>

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-900">Request Manual Claim Audit</h3>
            </div>
            <p className="text-xs text-slate-600">
              Specify the reason for withholding automated submission to the OEM warranty portal:
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Need physical oil sample analysis report before submitting..."
              className="w-full h-24 p-3 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectConfirm}
                className="px-4 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-sm"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
