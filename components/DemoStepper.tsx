"use client";

import React, { useState } from "react";
import { 
  ArrowRight, 
  ArrowLeft, 
  Activity, 
  Network, 
  BellRing, 
  FileCheck, 
  ShieldCheck, 
  RotateCcw,
  Sparkles
} from "lucide-react";
import StepOneTelemetry from "./steps/StepOneTelemetry";
import StepTwoContextGraph from "./steps/StepTwoContextGraph";
import StepThreeSprintInjection from "./steps/StepThreeSprintInjection";
import StepFourClaimPreAssembly from "./steps/StepFourClaimPreAssembly";
import StepFiveHitlApproval from "./steps/StepFiveHitlApproval";

const steps = [
  {
    id: 1,
    title: "Telemetry Ingestion",
    shortTitle: "1. SCADA Ingestion",
    description: "Real-time SCADA ingestion & $1,200/hr financial loss triage calculation",
    icon: Activity,
  },
  {
    id: 2,
    title: "Context Graph Linking",
    shortTitle: "2. Graph Linking",
    description: "DevRev unified linkage: Metric → User → Knowledge_Base contract chunk",
    icon: Network,
  },
  {
    id: 3,
    title: "Sprint Injection",
    shortTitle: "3. Sprint Injection",
    description: "Automated Jira reprioritization & Slack operational notification",
    icon: BellRing,
  },
  {
    id: 4,
    title: "Claim Pre-Assembly",
    shortTitle: "4. Claim Pre-Assembly",
    description: "Deterministic audit package: Telemetry evidence matched to OEM clause (94%)",
    icon: FileCheck,
  },
  {
    id: 5,
    title: "HITL Approval Gate",
    shortTitle: "5. HITL Gate",
    description: "Site Lead human-in-the-loop validation & trace log #TR-9902 generation",
    icon: ShieldCheck,
  },
];

export default function DemoStepper() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
  };

  const currentStepData = steps[currentStep - 1];
  const StepIcon = currentStepData.icon;

  return (
    <div className="space-y-6">
      {/* Step Progress Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 p-3 md:p-4 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`flex items-center gap-2.5 p-2.5 md:p-3 rounded-xl text-left transition-all text-xs font-medium ${
                  isActive
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-[1.02]"
                    : isCompleted
                    ? "bg-emerald-50 text-emerald-900 hover:bg-emerald-100/70 border border-emerald-200"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100/80 border border-slate-200"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                    isActive
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : isCompleted
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="truncate">
                  <div className="font-semibold truncate">{step.shortTitle}</div>
                  <div className={`text-[10px] truncate ${isActive ? "text-slate-300" : "text-slate-500"}`}>
                    {isCompleted ? "Completed" : isActive ? "Active Step" : "Pending"}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Stage Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
        {/* Step Banner */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <StepIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Step {currentStep} of {steps.length}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-300">{currentStepData.title}</span>
              </div>
              <h2 className="text-lg md:text-xl font-extrabold tracking-tight text-white mt-0.5">
                {currentStepData.description}
              </h2>
            </div>
          </div>

          {/* Quick Trigger Button in Header */}
          <div className="flex items-center gap-2">
            {currentStep < steps.length ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-md active:scale-95"
              >
                <span>Trigger Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all border border-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart Flow</span>
              </button>
            )}
          </div>
        </div>

        {/* Step Dynamic Content Body */}
        <div className="p-6 md:p-8 bg-slate-50/50 min-h-[460px]">
          {currentStep === 1 && <StepOneTelemetry />}
          {currentStep === 2 && <StepTwoContextGraph />}
          {currentStep === 3 && <StepThreeSprintInjection />}
          {currentStep === 4 && <StepFourClaimPreAssembly />}
          {currentStep === 5 && <StepFiveHitlApproval />}
        </div>

        {/* Bottom Navigation Bar */}
        <div className="px-6 py-4 bg-white border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition ${
              currentStep === 1
                ? "opacity-40 cursor-not-allowed bg-slate-50 text-slate-400 border-slate-200"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50 active:scale-95"
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Previous
          </button>

          <div className="flex items-center gap-1.5">
            {steps.map((s) => (
              <div
                key={s.id}
                className={`h-2 rounded-full transition-all ${
                  s.id === currentStep
                    ? "w-8 bg-slate-900"
                    : s.id < currentStep
                    ? "w-2 bg-emerald-500"
                    : "w-2 bg-slate-200"
                }`}
              />
            ))}
          </div>

          {currentStep < steps.length ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 active:scale-95 shadow-md transition"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 shadow-md transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Flow</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
