import { Layers, Shield, Workflow } from 'lucide-react';

export const sidebarNav = [
  {
    title: 'Overview & Planning',
    icon: <Layers className="h-5 w-5" />,
    defaultOpen: true,
    href: '/docs/overview/project-proposal',
    pages: [
      {
        title: 'Project Proposal',
        href: '/docs/overview/project-proposal',
      },
      {
        title: 'Implementation Plan',
        href: '/docs/overview/implementation-plan',
      },
      {
        title: 'Functional Solution Design',
        href: '/docs/overview/functional-solution-design',
      },
      {
        title: 'Technology Stack Specification',
        href: '/docs/overview/technology-stack-specification',
      },
    ],
  },
  {
    title: 'Operations & Runbooks',
    icon: <Workflow className="h-5 w-5" />,
    defaultOpen: true,
    href: '/docs/operations/method-of-procedure',
    pages: [
      {
        title: 'Method of Procedure',
        href: '/docs/operations/method-of-procedure',
      },
      {
        title: 'Operator User Manual',
        href: '/docs/operations/operator-user-manual',
      },
      {
        title: 'Jumper Readiness Questionnaire',
        href: '/docs/operations/jumper-server-readiness-questionnaire',
      },
      {
        title: 'RDP Hardening Guide',
        href: '/docs/operations/rdp-hardening-guide',
      },
      {
        title: 'WinRM Setup & File Transfer',
        href: '/docs/operations/winrm-setup-and-file-transfer',
      },
    ],
  },
  {
    title: 'Security & Compliance',
    icon: <Shield className="h-5 w-5" />,
    defaultOpen: true,
    href: '/docs/security/security-controls-matrix',
    pages: [
      {
        title: 'Security Controls Matrix',
        href: '/docs/security/security-controls-matrix',
      },
      {
        title: 'Audit Readiness Checklist',
        href: '/docs/security/audit-readiness-checklist',
      },
    ],
  },
];
