export interface TelemetryPayload {
  asset_id: string;
  location: string;
  timestamp: string;
  fault_code: string;
  fault_description: string;
  expected_output_mw: number;
  actual_output_mw: number;
  ppa_tariff_rate_usd: number;
  calculated_loss_rate_usd_hr: number;
}

export interface OnCallEngineer {
  name: string;
  role: string;
  shift: string;
  current_sprint_task: string;
}

export interface OnDutyData {
  on_call_engineer: OnCallEngineer;
}

export interface WarrantyChunk {
  document_name: string;
  clause: string;
  page: number;
  clause_text: string;
  match_confidence: number;
}

export const telemetryPayload: TelemetryPayload = {
  asset_id: "Turbine T-102",
  location: "Kanyakumari Cluster - Site B",
  timestamp: "2026-09-06T10:15:00Z",
  fault_code: "F-802",
  fault_description: "Gearbox Overheat & Trip Signal",
  expected_output_mw: 4.0,
  actual_output_mw: 0.0,
  ppa_tariff_rate_usd: 300,
  calculated_loss_rate_usd_hr: 1200
};

export const onDutyData: OnDutyData = {
  on_call_engineer: {
    name: "Arun Kumar",
    role: "Lead Field Maintenance Engineer",
    shift: "Day Shift (08:00 - 16:00)",
    current_sprint_task: "Task #402 - Scheduled Inspection on Substation B"
  }
};

export const warrantyChunk: WarrantyChunk = {
  document_name: "Wind_Turbine_OEM_v2.pdf",
  clause: "Clause 4.2",
  page: 14,
  clause_text: "Section 4.2 Warranty Coverage: Major component overheating resulting in operational tripping (specifically fault codes F-800 through F-810) shall be fully covered for OEM parts and labor, provided telemetry evidence of temperature spikes exceeding 90°C is submitted within 72 hours of outage onset.",
  match_confidence: 0.94
};

// Additional context logs for the claim package
export const telemetryAuditLogs = [
  { timestamp: "2026-09-06T10:11:42Z", sensor: "Bearing Temp Sensor B1", reading: "78.4°C", status: "NOMINAL" },
  { timestamp: "2026-09-06T10:13:10Z", sensor: "Bearing Temp Sensor B1", reading: "93.8°C", status: "WARNING" },
  { timestamp: "2026-09-06T10:14:55Z", sensor: "Bearing Temp Sensor B1", reading: "99.2°C", status: "CRITICAL" },
  { timestamp: "2026-09-06T10:15:00Z", sensor: "SCADA Inverter Controller", reading: "0.0 MW (Trip F-802)", status: "OFFLINE" }
];
