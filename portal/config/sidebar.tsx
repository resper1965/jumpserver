import {
  FileText,
  BookOpen,
  Shield,
  Settings,
  Terminal,
  FileCheck,
  Network,
  ClipboardList,
} from 'lucide-react';

export const sidebarNav = [
  {
    title: 'Project Documentation',
    icon: <FileText className="h-5 w-5" />,
    defaultOpen: true,
    pages: [
      { title: 'Project Proposal', href: '/docs/proposal' },
      { title: 'Infrastructure Questionnaire', href: '/docs/questionnaire' },
      { title: 'Implementation Plan', href: '/docs/implementation' },
      { title: 'Functional Design', href: '/docs/functional-design' },
    ],
  },
  {
    title: 'Architecture & Design',
    icon: <Network className="h-5 w-5" />,
    defaultOpen: true,
    pages: [
      { title: 'ADR-001: Jumper Server', href: '/docs/architecture/adr-001' },
      { title: 'ADR-002: No Atera Agent', href: '/docs/architecture/adr-002' },
      { title: 'ADR-003: File Transfer', href: '/docs/architecture/adr-003' },
      { title: 'ADR-004: RDP Protocol', href: '/docs/architecture/adr-004' },
      { title: 'ADR-005: Integrity Verification', href: '/docs/architecture/adr-005' },
    ],
  },
  {
    title: 'Operations',
    icon: <Terminal className="h-5 w-5" />,
    defaultOpen: false,
    pages: [
      { title: 'Method of Procedure (MOP)', href: '/docs/procedures/mop' },
      { title: 'User Manual', href: '/docs/procedures/manual' },
      { title: 'RDP Hardening Guide', href: '/docs/runbooks/rdp' },
      { title: 'WinRM Setup', href: '/docs/runbooks/winrm' },
    ],
  },
  {
    title: 'Security & Compliance',
    icon: <Shield className="h-5 w-5" />,
    defaultOpen: false,
    pages: [
      { title: 'Security Controls Matrix', href: '/docs/security/controls' },
      { title: 'Audit Readiness Checklist', href: '/docs/compliance/audit' },
      { title: 'Technology Stack', href: '/docs/specs/tech-stack' },
    ],
  },
  {
    title: 'Interactive Tools',
    icon: <ClipboardList className="h-5 w-5" />,
    defaultOpen: false,
    pages: [
      { title: 'Questionnaire Form', href: '/questionnaire' },
    ],
  },
];
