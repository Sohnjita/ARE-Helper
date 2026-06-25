import type { Division, DivisionMeta } from "./types";

export const DIVISION_ORDER: Division[] = ["PcM", "PjM", "PA", "PPD", "PDD", "CE"];

export const DIVISIONS: Record<Division, DivisionMeta> = {
  PcM: {
    code: "PcM",
    name: "Practice Management",
    shortDescription: "Running an architecture firm: business ops, finances, risk, and practice-wide compliance.",
    color: "#7C3AED",
    contentAreas: [
      { code: "BO", name: "Business Operations" },
      { code: "FIN", name: "Finances" },
      { code: "PRM", name: "Practice-Wide Risk Management" },
      { code: "PMM", name: "Practice Methodologies & Contracts" },
      { code: "CRP", name: "Codes & Regulations Related to Practice" },
    ],
  },
  PjM: {
    code: "PjM",
    name: "Project Management",
    shortDescription: "Running a single project: work plans, contracts, project risk, and quality control.",
    color: "#2563EB",
    contentAreas: [
      { code: "RM", name: "Resource Management" },
      { code: "PWP", name: "Project Work Planning" },
      { code: "CON", name: "Project Contracts & Delivery Methods" },
      { code: "PRR", name: "Project Risk Management" },
      { code: "QC", name: "Quality Control & Quality Assurance" },
    ],
  },
  PA: {
    code: "PA",
    name: "Programming & Analysis",
    shortDescription: "Defining the problem: site analysis, codes, programming, and feasibility.",
    color: "#059669",
    contentAreas: [
      { code: "ESE", name: "Environmental & Socio-Economic Site Conditions" },
      { code: "CRA", name: "Codes & Regulations Analysis" },
      { code: "SCH", name: "Site Conditions, Hazards & Existing/Historic Buildings" },
      { code: "PRO", name: "Programming & Space Requirements" },
      { code: "BUD", name: "Project Budgeting & Feasibility" },
    ],
  },
  PPD: {
    code: "PPD",
    name: "Project Planning & Design",
    shortDescription: "Designing the solution: systems integration, code compliance, and accessibility.",
    color: "#D97706",
    contentAreas: [
      { code: "ENV", name: "Environmental Context & Sustainability" },
      { code: "BSM", name: "Building Systems, Materials & Assemblies Integration" },
      { code: "COST", name: "Project Costs & Budgeting" },
      { code: "CODE", name: "Code Compliance & Life Safety" },
      { code: "DSN", name: "Building & Site Design, incl. Accessibility" },
    ],
  },
  PDD: {
    code: "PDD",
    name: "Project Development & Documentation",
    shortDescription: "Documenting the design: materials/systems integration, drawings, and specifications.",
    color: "#DB2777",
    contentAreas: [
      { code: "INT", name: "Integration of Materials & Systems" },
      { code: "DOC", name: "Construction Documentation" },
      { code: "SPEC", name: "Project Manual & Specifications" },
    ],
  },
  CE: {
    code: "CE",
    name: "Construction & Evaluation",
    shortDescription: "Building it: preconstruction, observation, submittals/RFIs/change orders, and closeout.",
    color: "#DC2626",
    contentAreas: [
      { code: "PRE", name: "Preconstruction Activities" },
      { code: "OBS", name: "Construction Observation & Administration" },
      { code: "ADM", name: "Administrative Procedures & Protocols" },
      { code: "CLO", name: "Project Closeout & Evaluation" },
    ],
  },
};
