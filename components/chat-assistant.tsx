"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  DollarSign,
  Wrench,
  ShieldAlert,
  AlertTriangle,
  FileText,
  ChevronDown,
  RotateCcw,
  CheckCircle2,
  Maximize2,
  Minimize2,
  Minus,
} from "lucide-react";

export type ChatWindowMode = "minimized" | "floating" | "fullscreen";

export interface QAItem {
  id: number;
  question: string;
  shortLabel: string;
  category: "triage" | "portfolio" | "field" | "warranty" | "governance" | "guardrails";
  answer: {
    sections: {
      title: string;
      iconType: "dollar" | "wrench" | "shield" | "alert" | "file";
      badge: string;
      badgeColor: string;
      content: string;
    }[];
  };
}

export const PRELOADED_QUESTIONS: QAItem[] = [
  {
    id: 1,
    question: "Turbine T-102 is underperforming. What is the business impact, what action is currently underway, and is there a warranty recovery opportunity?",
    shortLabel: "Turbine T-102 Impact & Warranty",
    category: "triage",
    answer: {
      sections: [
        {
          title: "Business Impact",
          iconType: "dollar",
          badge: "$1,200/hr Loss",
          badgeColor: "bg-red-500/20 text-red-300 border-red-500/30",
          content: "Turbine T-102 (Kanyakumari Cluster) is suffering a 4 MW generation deficit due to Fault F-802 (Gearbox Overheat), incurring an active financial loss rate of $1,200/hr ($300/MWh PPA rate)."
        },
        {
          title: "Active Action",
          iconType: "wrench",
          badge: "Nudge Dispatched",
          badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
          content: "Dispatched high-priority nudge to lead engineer Arun Kumar. Recommended reprioritizing this job over lower-value Sprint Task #402."
        },
        {
          title: "Warranty Opportunity",
          iconType: "shield",
          badge: "Clause 4.2 Matched",
          badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
          content: "Matched against Wind_Turbine_OEM_v2.pdf (Clause 4.2). 100% component replacement covered if claim is submitted within 72 hours of fault logging. Auto-assembled claim package is pending HITL site lead approval."
        }
      ]
    }
  },
  {
    id: 2,
    question: "What is our current total portfolio loss rate across all southern clusters?",
    shortLabel: "Total Southern Portfolio Loss Rate",
    category: "portfolio",
    answer: {
      sections: [
        {
          title: "Portfolio Status",
          iconType: "dollar",
          badge: "$2,850/hr Total Bleed",
          badgeColor: "bg-red-500/20 text-red-300 border-red-500/30",
          content: "Current active revenue leakage across Kanyakumari, Thoothukudi, and Tirunelveli clusters is $2,850/hr."
        },
        {
          title: "Primary Drivers",
          iconType: "alert",
          badge: "2 Critical Assets",
          badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
          content: "Turbine T-102 ($1,200/hr - Gearbox Overheat) and Turbine T-204 ($1,650/hr - Inverter Trip)."
        },
        {
          title: "Mitigation",
          iconType: "wrench",
          badge: "Jira Sprint Injected",
          badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
          content: "2 active field interventions injected into current Jira engineering sprints."
        }
      ]
    }
  },
  {
    id: 3,
    question: "Which field engineer is assigned to the Turbine T-102 overheat issue?",
    shortLabel: "Assigned Field Engineer (T-102)",
    category: "field",
    answer: {
      sections: [
        {
          title: "Assigned Lead",
          iconType: "wrench",
          badge: "Arun Kumar (Lead)",
          badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
          content: "Arun Kumar (On-duty Field Lead, Kanyakumari Cluster)."
        },
        {
          title: "Current Task Context",
          iconType: "file",
          badge: "Task #402 Routine",
          badgeColor: "bg-slate-500/20 text-slate-300 border-slate-500/30",
          content: "Originally assigned to routine maintenance Task #402 (Substation B inspection)."
        },
        {
          title: "Agent Action",
          iconType: "shield",
          badge: "Capacity Reallocated",
          badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
          content: "Nudge card dispatched to reallocate Arun's immediate capacity to T-102 to halt $1,200/hr financial bleed."
        }
      ]
    }
  },
  {
    id: 4,
    question: "What specific contract clause covers the gearbox failure on Turbine T-102?",
    shortLabel: "Gearbox Contract Clause & Coverage",
    category: "warranty",
    answer: {
      sections: [
        {
          title: "Contract File",
          iconType: "file",
          badge: "OEM Contract v2",
          badgeColor: "bg-slate-500/20 text-slate-300 border-slate-500/30",
          content: "Wind_Turbine_OEM_v2.pdf"
        },
        {
          title: "Clause Reference",
          iconType: "shield",
          badge: "Clause 4.2 (Pg 14)",
          badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
          content: "Clause 4.2 (Major Drives & Overheat Coverage), Page 14."
        },
        {
          title: "Key Terms & Deadlines",
          iconType: "alert",
          badge: "94% Match Confidence",
          badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
          content: "Covers full OEM replacement costs provided telemetry logs prove temperatures exceeded 95°C and claim notice is submitted within 72 hours of initial sensor trip."
        }
      ]
    }
  },
  {
    id: 5,
    question: "What happens if the site manager rejects the agent's recommended task injection?",
    shortLabel: "Site Lead Rejection & Fallback",
    category: "governance",
    answer: {
      sections: [
        {
          title: "HITL Fallback & Audit",
          iconType: "file",
          badge: "Trace View Logged",
          badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
          content: "If rejected, the agent logs the manager's override rationale into the DevRev trace view."
        },
        {
          title: "Dynamic Routing",
          iconType: "wrench",
          badge: "Azure AD Directory",
          badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
          content: "The agent recalculates financial exposure and routes the task to the next available qualified technician in the enterprise directory (Azure AD graph) without altering active sprint baselines."
        }
      ]
    }
  },
  {
    id: 6,
    question: "How does the platform prevent sending dispatches based on stale SCADA telemetry?",
    shortLabel: "Stale SCADA Telemetry Guardrail",
    category: "guardrails",
    answer: {
      sections: [
        {
          title: "Data Freshness Guardrail",
          iconType: "alert",
          badge: "< 15m Freshness Check",
          badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
          content: "The system validates telemetry timestamps prior to executing loss calculations."
        },
        {
          title: "Fail-Safe Mechanism",
          iconType: "shield",
          badge: "Automated Pause",
          badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
          content: "If sensor link latency exceeds 15 minutes, financial loss calculations freeze, active nudges are paused, and an amber warning banner notifies operators: \"Telemetry stale—automated dispatches paused.\""
        }
      ]
    }
  }
];

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text?: string;
  structuredResponse?: QAItem["answer"];
  isFallback?: boolean;
  timestamp: string;
}

export default function ChatAssistant() {
  const [viewMode, setViewMode] = useState<ChatWindowMode>("floating");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "👋 Welcome to the DevRev Revenue Protection Assistant. Ask me anything about real-time SCADA telemetry, financial loss rates, on-call engineer dispatches, or OEM contract warranty coverage across the southern wind clusters.",
      timestamp: "Just now"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Set default view mode to minimized on small screens upon initial mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setViewMode("minimized");
    }
  }, []);

  // Lock background scroll when in fullscreen mode
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (viewMode === "fullscreen") {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [viewMode]);

  // Handle ESC key to exit fullscreen back to floating
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (viewMode === "fullscreen") {
          setViewMode("floating");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (viewMode !== "minimized") {
      scrollToBottom();
    }
  }, [messages, isTyping, viewMode]);

  const handleSelectQuestion = (qa: QAItem) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: qa.question,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        structuredResponse: qa.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputVal.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // Check if query closely matches any preloaded question
    const matched = PRELOADED_QUESTIONS.find((item) =>
      item.question.toLowerCase().includes(query.toLowerCase()) ||
      query.toLowerCase().includes(item.shortLabel.toLowerCase())
    );

    setTimeout(() => {
      if (matched) {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          structuredResponse: matched.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          isFallback: true,
          text: "I am currently running in offline demo mode. Please select one of the preloaded operational queries above to view live DevRev Knowledge Graph retrievals.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };
        setMessages((prev) => [...prev, botMsg]);
      }
      setIsTyping(false);
    }, 600);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "bot",
        text: "Chat cleared. You can select any preloaded question below to explore grounded Knowledge Graph context.",
        timestamp: "Just now"
      }
    ]);
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case "dollar":
        return <DollarSign className="w-3.5 h-3.5 text-rose-400" />;
      case "wrench":
        return <Wrench className="w-3.5 h-3.5 text-blue-400" />;
      case "shield":
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
      case "alert":
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-slate-300" />;
    }
  };

  const isFullscreen = viewMode === "fullscreen";
  const isMinimized = viewMode === "minimized";

  return (
    <>
      {/* 3. Minimized View (Floating Launcher Button) */}
      {isMinimized && (
        <button
          onClick={() => setViewMode("floating")}
          aria-label="Open AI Assistant"
          className="fixed bottom-6 right-6 z-50 h-14 px-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border border-emerald-300/40 flex items-center gap-2.5"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-slate-950" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full" />
          </div>
          <span className="text-xs tracking-tight font-black uppercase whitespace-nowrap">
            DevRev Assistant
          </span>
        </button>
      )}

      {/* Fullscreen Backdrop Blur Container */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setViewMode("floating")}
        />
      )}

      {/* Main Chat Window (Floating or Fullscreen) */}
      {!isMinimized && (
        <div
          className={
            isFullscreen
              ? "fixed inset-0 z-50 p-3 sm:p-6 md:p-8 flex flex-col h-screen w-screen transition-all duration-300 animate-in fade-in"
              : "fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[600px] max-h-[85vh] flex flex-col shadow-2xl rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden transition-all duration-300"
          }
        >
          {/* Inner Container for Fullscreen (Max Width 5xl) or Floating */}
          <div
            className={`w-full h-full flex flex-col overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl ${
              isFullscreen
                ? "max-w-5xl mx-auto rounded-3xl border-slate-700/80 ring-1 ring-white/10"
                : "rounded-2xl"
            }`}
          >
            {/* Window Header */}
            <div className="px-5 py-3.5 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-slate-950 shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>DevRev Revenue Protection Agent</span>
                    <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      {isFullscreen ? "Full-Screen View" : "Live Q&A"}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                    SCADA Telemetry • Sprint Work_Items • OEM Contracts
                  </div>
                </div>
              </div>

              {/* Control Action Buttons */}
              <div className="flex items-center gap-1 text-slate-400">
                <button
                  onClick={handleClearHistory}
                  title="Clear Chat History"
                  className="p-1.5 rounded-lg hover:text-slate-200 hover:bg-slate-800 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Full-Screen / Floating Restore Toggle */}
                <button
                  onClick={() => setViewMode(isFullscreen ? "floating" : "fullscreen")}
                  title={isFullscreen ? "Restore Floating View" : "Expand Full-Screen View"}
                  className="p-1.5 rounded-lg hover:text-slate-200 hover:bg-slate-800 transition"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>

                {/* Minimize Button */}
                <button
                  onClick={() => setViewMode("minimized")}
                  title="Minimize"
                  className="p-1.5 rounded-lg hover:text-slate-200 hover:bg-slate-800 transition"
                >
                  <Minus className="w-4 h-4" />
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setViewMode("minimized")}
                  title="Close"
                  className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Suggested Quick Question Pills Section */}
            <div className="px-4 py-3 bg-slate-900/60 border-b border-slate-800/80 flex-shrink-0">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-2">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Suggested Grounded Inquiries:</span>
                </div>
                {isFullscreen && (
                  <span className="text-[10px] text-slate-500 font-mono">
                    Press ESC to exit Full-Screen
                  </span>
                )}
              </div>

              {/* Responsive Pill Layout: Multi-column grid on fullscreen, horizontal scroll on floating */}
              {isFullscreen ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {PRELOADED_QUESTIONS.map((qa) => (
                    <button
                      key={qa.id}
                      onClick={() => handleSelectQuestion(qa)}
                      className="text-left text-xs font-medium p-2.5 rounded-xl bg-slate-800/70 hover:bg-emerald-500/15 text-slate-200 hover:text-emerald-300 border border-slate-700/80 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
                    >
                      <span className="font-semibold text-slate-100">{qa.shortLabel}</span>
                      <span className="text-[11px] text-slate-400 truncate mt-1">
                        {qa.question}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-700">
                  {PRELOADED_QUESTIONS.map((qa) => (
                    <button
                      key={qa.id}
                      onClick={() => handleSelectQuestion(qa)}
                      className="flex-shrink-0 text-[11px] font-medium px-2.5 py-1.5 rounded-lg bg-slate-800/90 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-slate-700/80 hover:border-emerald-500/40 transition-all text-left whitespace-nowrap"
                    >
                      {qa.shortLabel}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Chat Feed */}
            <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 bg-slate-950/70">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 text-xs md:text-sm ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 text-emerald-400 mt-0.5">
                      <Bot className="w-4 h-4 md:w-4.5 md:h-4.5" />
                    </div>
                  )}

                  <div
                    className={`rounded-2xl p-4 transition-all ${
                      msg.sender === "user"
                        ? "bg-emerald-600 text-white shadow-md rounded-tr-none max-w-[85%] md:max-w-[70%]"
                        : "bg-slate-900 border border-slate-800 text-slate-200 shadow-sm rounded-tl-none w-full max-w-[95%] md:max-w-[85%]"
                    }`}
                  >
                    {/* Free Text */}
                    {msg.text && (
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    )}

                    {/* Structured Preloaded Answer Sections */}
                    {msg.structuredResponse && (
                      <div
                        className={
                          isFullscreen
                            ? "grid grid-cols-1 md:grid-cols-3 gap-3 mt-1"
                            : "space-y-3 mt-1"
                        }
                      >
                        {msg.structuredResponse.sections.map((sec, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 flex flex-col justify-between"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5 font-bold text-slate-100 text-xs">
                                {renderIcon(sec.iconType)}
                                <span>{sec.title}</span>
                              </div>
                              <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${sec.badgeColor}`}
                              >
                                {sec.badge}
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed font-normal">
                              {sec.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div
                      className={`mt-2 text-[10px] font-mono ${
                        msg.sender === "user" ? "text-emerald-200 text-right" : "text-slate-500"
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 text-slate-300 mt-0.5">
                      <User className="w-4 h-4 md:w-4.5 md:h-4.5" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3 text-xs items-center">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 text-emerald-400">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none px-4 py-2.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[10px] text-slate-400 ml-1 font-mono">
                      Retrieving from DevRev Graph...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar Form */}
            <form
              onSubmit={handleSendMessage}
              className="p-3.5 bg-slate-900 border-t border-slate-800 flex items-center gap-2 flex-shrink-0"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask about T-102, loss rate, Arun Kumar, or Clause 4.2..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
              />
              <button
                type="submit"
                disabled={!inputVal.trim() || isTyping}
                aria-label="Send query"
                className="p-2.5 md:px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-bold transition active:scale-95 flex items-center gap-1.5 text-xs md:text-sm"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
