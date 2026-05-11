/* Rules engine.
 *
 * Pure function: take extracted letter text, return a classification with
 * letter type, deadline, plain-language summary, and recommended next actions.
 *
 * v0.1 implementation: load rule YAML files from /rules/co at build time
 * (via a Vite import-glob or a build step) and apply pattern matching.
 *
 * Stub for the scaffold. Replace with real logic in v0.1 build.
 */

export type LetterType =
  | "renewal_request"
  | "renewal_reminder"
  | "procedural_termination"
  | "substantive_denial"
  | "termination"
  | "rate_change"
  | "exemption_decision"
  | "redetermination"
  | "work_requirement_notification"
  | "work_requirement_noncompliance"
  | "fair_hearing_notice"
  | "service_plan_change"
  | "unknown";

export interface NextAction {
  label: string;
  detail: string;
  urgency: "now" | "this-week" | "this-month";
}

export interface LetterClassification {
  type: LetterType;
  confidence: number;
  deadlineISO: string | null;
  daysUntilDeadline: number | null;
  plainLanguageSummary: string;
  doNothingConsequence: string;
  nextActions: NextAction[];
}

export function classifyLetter(_text: string): LetterClassification {
  return {
    type: "unknown",
    confidence: 0,
    deadlineISO: null,
    daysUntilDeadline: null,
    plainLanguageSummary: "Scaffold: classifier not implemented yet.",
    doNothingConsequence: "Scaffold: not implemented yet.",
    nextActions: [],
  };
}
