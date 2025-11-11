export type DocumentLink = {
  id: string;
  title: string;
  description: string;
  audience: string;
  markdownUrl: string;
  pdfUrl: string;
};

const baseGitHub = 'https://github.com/resper1965/jumpserver/blob/main';
const basePages = 'https://resper1965.github.io/jumpserver';

export const documents: DocumentLink[] = [
  {
    id: 'proposal',
    title: 'Project Proposal',
    description: 'Formal project proposal describing scope, architecture, and risk posture.',
    audience: 'LVHN IT Leadership, Ionic Management',
    markdownUrl: `${baseGitHub}/docs/proposal/LVHN-eKVM-Remote-Update-Proposal.md`,
    pdfUrl: `${basePages}/pdfs/LVHN-eKVM-Remote-Update-Proposal.pdf`
  },
  {
    id: 'questionnaire',
    title: 'Jumper Server Readiness Questionnaire',
    description: 'Required form capturing only the information needed for jumper server enablement.',
    audience: 'LVHN IT Operations',
    markdownUrl: `${baseGitHub}/docs/proposal/LVHN-Infrastructure-Questionnaire.md`,
    pdfUrl: `${basePages}/pdfs/LVHN-Infrastructure-Questionnaire.pdf`
  },
  {
    id: 'implementation-plan',
    title: 'Implementation Plan',
    description: 'Phased roadmap with time estimates and responsibilities for the combined team.',
    audience: 'Project Leadership',
    markdownUrl: `${baseGitHub}/docs/planning/Implementation-Plan.md`,
    pdfUrl: `${basePages}/pdfs/Implementation-Plan.pdf`
  },
  {
    id: 'functional-design',
    title: 'Functional Solution Design',
    description: 'Functional architecture, data flows, and stakeholder responsibilities.',
    audience: 'Architects, Engineering Leads',
    markdownUrl: `${baseGitHub}/docs/solution/Functional-Solution-Design.md`,
    pdfUrl: `${basePages}/pdfs/Functional-Solution-Design.pdf`
  },
  {
    id: 'mop',
    title: 'Method of Procedure (MOP)',
    description: 'Step-by-step execution guide for eKVM maintenance windows.',
    audience: 'Ionic Operators, LVHN IT Operations',
    markdownUrl: `${baseGitHub}/docs/procedures/MOP-eKVM-Update.md`,
    pdfUrl: `${basePages}/pdfs/MOP-eKVM-Update.pdf`
  },
  {
    id: 'user-manual',
    title: 'Operator User Manual',
    description: 'Concise operator guide with diagrams for connectivity, validation, and closure.',
    audience: 'Ionic Operators',
    markdownUrl: `${baseGitHub}/docs/procedures/User-Manual.md`,
    pdfUrl: `${basePages}/pdfs/User-Manual.pdf`
  },
  {
    id: 'security-controls',
    title: 'Security Controls Matrix',
    description: 'NIST SP 800-53, HIPAA, and CIS mapping for the jumper server solution.',
    audience: 'Security & Compliance',
    markdownUrl: `${baseGitHub}/docs/security/Security-Controls-Matrix.md`,
    pdfUrl: `${basePages}/pdfs/Security-Controls-Matrix.pdf`
  },
  {
    id: 'audit-checklist',
    title: 'Audit Readiness Checklist',
    description: 'Evidence validation checklist for auditor preparation.',
    audience: 'Compliance, Audit',
    markdownUrl: `${baseGitHub}/docs/compliance/Audit-Readiness-Checklist.md`,
    pdfUrl: `${basePages}/pdfs/Audit-Readiness-Checklist.pdf`
  },
  {
    id: 'rdp-runbook',
    title: 'RDP Hardening Guide',
    description: 'Runbook covering secure RDP configuration on the LVHN jumper server.',
    audience: 'LVHN IT Operations',
    markdownUrl: `${baseGitHub}/runbooks/RDP-Hardening-Guide.md`,
    pdfUrl: `${basePages}/pdfs/RDP-Hardening-Guide.pdf`
  },
  {
    id: 'winrm-runbook',
    title: 'WinRM Setup & File Transfer',
    description: 'Runbook for WinRM configuration and secure file transfer workflows.',
    audience: 'LVHN IT Operations',
    markdownUrl: `${baseGitHub}/runbooks/WinRM-Setup-and-File-Transfer.md`,
    pdfUrl: `${basePages}/pdfs/WinRM-Setup-and-File-Transfer.pdf`
  },
  {
    id: 'technology-stack',
    title: 'Technology Stack Specification',
    description: 'Comprehensive specification of the Microsoft-based stack supporting the project.',
    audience: 'Architects, Compliance',
    markdownUrl: `${baseGitHub}/specs/Technology-Stack-Specification.md`,
    pdfUrl: `${basePages}/pdfs/Technology-Stack-Specification.pdf`
  }
];
