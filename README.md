# LVHN eKVM Remote Update Project

**Project Status:** 🟡 Planning Phase
**Version:** 1.0
**Last Updated:** 2025-11-11

---

> **CRITICAL OWNERSHIP NOTICE**  
> Ionic Health engineering exclusively manages all eKVM configuration, firmware, and software changes. LVHN operations is solely responsible for provisioning, hardening, and maintaining the Windows jumper server environment. Any cross-domain activity requires written change approval from both parties.

> **Network Visibility Scope**  
> Ionic Health does not require insight into LVHN’s internal network topology beyond the managed jumper server and its outbound path to Ionic-owned eKVM devices (public IP over secured maintenance windows).

## 📋 Project Overview

This repository contains the complete technical documentation, procedures, and architecture decisions for implementing secure remote updates of Ionic eKVM devices within the Lehigh Valley Health Network (LVHN) environment.

**Objective:** Enable remote eKVM firmware and software updates without Atera agents, using LVHN's SSL VPN infrastructure and a dedicated Windows jumper server, while preserving nCommand Lite P2P/WebRTC clinical runtime and maintaining full audit compliance.

**Key Outcomes:**
- ✅ Auditable change process with comprehensive evidence collection
- ✅ SHA-256 integrity verification at multiple stages
- ✅ Zero impact to clinical operations outside maintenance windows
- ✅ HIPAA, NIST SP 800-53, and CIS Controls compliance

---

## 🗂️ Repository Structure

```
jumpserver/
├── README.md                          # This file
├── docs/                              # Core documentation
│   ├── proposal/
│   │   ├── LVHN-eKVM-Remote-Update-Proposal.md
│   │   └── LVHN-Infrastructure-Questionnaire.md
│   ├── architecture/
│   │   ├── README.md
│   │   ├── ADR-TEMPLATE.md
│   │   ├── ADR-001-jumper-server-architecture.md
│   │   ├── ADR-002-no-atera-agent.md
│   │   ├── ADR-003-file-transfer-methods.md
│   │   └── ADR-005-integrity-verification.md
│   ├── compliance/
│   │   └── Audit-Readiness-Checklist.md
│   ├── procedures/
│   │   ├── MOP-eKVM-Update.md
│   │   └── User-Manual.md
│   ├── security/
│   │   └── Security-Controls-Matrix.md
│   └── solution/
│       └── Functional-Solution-Design.md
├── runbooks/
│   ├── RDP-Hardening-Guide.md
│   └── WinRM-Setup-and-File-Transfer.md
├── specs/
│   └── Technology-Stack-Specification.md
└── .github/
    ├── ISSUE_TEMPLATE/
    │   ├── bug_report.md
    │   └── feature_request.md
    └── pull_request_template.md
```

---

## 🚀 Quick Start

### For Operators (Performing Updates)

1. **Read the MOP:** [`docs/procedures/MOP-eKVM-Update.md`](docs/procedures/MOP-eKVM-Update.md)
   - Complete step-by-step execution guide
   - Pre-window checklist
   - Troubleshooting procedures

2. **Review Runbooks:**
   - **RDP Access:** [`runbooks/RDP-Hardening-Guide.md`](runbooks/RDP-Hardening-Guide.md)
   - **File Transfer (WinRM):** [`runbooks/WinRM-Setup-and-File-Transfer.md`](runbooks/WinRM-Setup-and-File-Transfer.md)

3. **Obtain Approvals:**
   - Change ticket approved by CAB
   - Network ACLs scheduled (LVHN IT)
   - JIT accounts provisioned

4. **Execute Maintenance Window:**
   - Follow MOP Section 5 (Execution Phase)
   - Collect evidence per Section 9
   - Attach evidence to change ticket

### For IT Administrators (Setup & Hardening)

1. **Jumper Server Setup:**
   - Deploy Windows Server 2019/2022
   - Apply hardening baseline: [`runbooks/RDP-Hardening-Guide.md`](runbooks/RDP-Hardening-Guide.md)
   - Configure WinRM: [`runbooks/WinRM-Setup-and-File-Transfer.md`](runbooks/WinRM-Setup-and-File-Transfer.md)

2. **Network Configuration:**
   - Create scoped ACLs (jumper IP → eKVM subnet)
   - Ports: 3389 (RDP), 5985/5986 (WinRM), 445 (SMB), 443 (HTTPS egress)
   - Default deny; time-boxed permits

3. **SIEM Integration:**
   - Forward Windows Security, RDP, PowerShell logs
   - Configure alert rules: [`docs/security/Security-Controls-Matrix.md`](docs/security/Security-Controls-Matrix.md)

### For Security/Compliance Teams (Audit & Review)

1. **Compliance Mapping:** [`docs/security/Security-Controls-Matrix.md`](docs/security/Security-Controls-Matrix.md)
   - NIST SP 800-53 controls
   - HIPAA Security Rule alignment
   - CIS Controls v8 mapping

2. **Audit Preparation:** [`docs/compliance/Audit-Readiness-Checklist.md`](docs/compliance/Audit-Readiness-Checklist.md)
   - Pre-audit validation checklist
   - Evidence collection requirements
   - Sample audit questions with references

3. **Architecture Decisions:** [`docs/architecture/README.md`](docs/architecture/README.md)
   - ADR index with rationale for key decisions
   - Security trade-offs documented

---

## 📚 Key Documents

### Essential Reading (Start Here)

| Document | Purpose | Audience |
|----------|---------|----------|
| [**Project Proposal**](docs/proposal/LVHN-eKVM-Remote-Update-Proposal.md) | Formal project proposal (10-14 pages); business case, scope, architecture, risks | LVHN IT Leadership, Ionic Management |
| [**Method of Procedure (MOP)**](docs/procedures/MOP-eKVM-Update.md) | Complete execution guide for updates; pre-window, execution, post-window | Operators, LVHN IT Operations |
| [**Security Controls Matrix**](docs/security/Security-Controls-Matrix.md) | NIST/HIPAA/CIS compliance mapping | Security, Compliance, Auditors |
| [**Implementation Plan**](docs/planning/Implementation-Plan.md) | Phased roadmap with estimated durations and responsibilities | Project Leadership |
| [**Pinexio Portal (Vercel-ready)**](portal/) | Next.js static portal based on the Pinexio template, featuring the interactive jumper readiness form | Stakeholder Communications |

### Architecture & Design

| Document | Purpose |
|----------|---------|
| [ADR-001: Jumper Server Architecture](docs/architecture/ADR-001-jumper-server-architecture.md) | Why dedicated Windows jumper server vs. direct VPN access |
| [ADR-002: No Atera Agent](docs/architecture/ADR-002-no-atera-agent.md) | Rationale for removing Atera; using native Windows protocols |
| [ADR-003: File Transfer Methods](docs/architecture/ADR-003-file-transfer-methods.md) | HTTPS, RDP drive mapping, WinRM, SMB decision matrix |
| [ADR-005: SHA-256 Verification](docs/architecture/ADR-005-integrity-verification.md) | Integrity verification approach (3-stage hash validation) |

### Runbooks & Technical Guides

| Document | Purpose |
|----------|---------|
| [RDP Hardening Guide](runbooks/RDP-Hardening-Guide.md) | Comprehensive RDP security configuration (NLA, TLS, account lockout, legal banner) |
| [WinRM Setup & File Transfer](runbooks/WinRM-Setup-and-File-Transfer.md) | WinRM configuration, PowerShell Remoting, file copy procedures |

### Compliance & Audit

| Document | Purpose |
|----------|---------|
| [Audit Readiness Checklist](docs/compliance/Audit-Readiness-Checklist.md) | Quarterly pre-audit validation; evidence requirements; sample Q&A |

---

## 🔒 Security & Compliance

### Security Frameworks Implemented

- ✅ **NIST SP 800-53 Rev. 5** – 43 of 45 controls fully implemented
- ✅ **HIPAA Security Rule (45 CFR § 164.312)** – All technical safeguards addressed
- ✅ **CIS Controls v8** – Critical controls 1, 4, 5, 6, 8, 10, 13, 14
- ✅ **CIS Benchmark for Windows Server** – RDP and WinRM hardening aligned

### Key Security Controls

| Control | Implementation |
|---------|----------------|
| **Access Control** | Named JIT accounts (MFA), time-boxed privileges, network ACLs (jumper IP only) |
| **Encryption** | TLS 1.2+ for RDP/WinRM, SHA-256 integrity verification |
| **Audit Logging** | Comprehensive Windows event logging forwarded to SIEM; 6-year retention |
| **DLP** | Clipboard/printer/COM port redirection disabled; drive mapping time-boxed |
| **Malware Protection** | AV/EDR scans pre-transfer; mandatory hash verification |
| **Incident Response** | Defined escalation paths, rollback procedures, SIEM alerting |

### Compliance Attestation

This project has been designed to satisfy audit requirements for:
- Joint Commission (medical device management)
- HIPAA Privacy and Security Rules
- SOC 2 Type II (if applicable)
- FDA 21 CFR Part 11 (electronic records)

**Audit Evidence:** All updates generate evidence packages with 10+ artifacts (logs, hashes, screenshots, transcripts). See [`MOP § 9`](docs/procedures/MOP-eKVM-Update.md#9-evidence-collection).

---

## 🏗️ Architecture Overview

### Maintenance Access Path

```
┌─────────────┐   SSL VPN (MFA)   ┌──────────────┐   RDP 3389      ┌────────────┐
│  Operator   │ ───────────────→  │   Windows    │ ─────────────→  │    eKVM    │
│ Workstation │   443/HTTPS        │   Jumper     │   (NLA, TLS)    │   Device   │
└─────────────┘                    │   Server     │                 └────────────┘
                                   │              │   WinRM 5986
                                   │  - Hardened  │ ─────────────→
                                   │  - Logged    │   (file xfer)
                                   │  - Scoped    │
                                   └──────────────┘   SMB 445
                                          │        ─────────────→
                                          │          (alternate)
                                          ▼
                                    HTTPS 443
                                   (Ionic CDN)
```

**Clinical Path (Unchanged):**
```
┌──────────┐   P2P/WebRTC   ┌─────────┐
│Clinician │◄──────────────►│  eKVM   │
│    PC    │   Direct       │ Device  │
└──────────┘   Connection   └─────────┘
```

### Essential Prerequisites (GO/NO-GO)

| # | Prerequisite | Owner |
|---|--------------|-------|
| 1 | eKVM OS access via RDP/WinRM during maintenance window | LVHN IT |
| 2 | HTTPS egress from jumper server to Ionic CDN (allowlisted) | LVHN IT |
| 3 | RDP drive mapping enabled (GPO configuration) | LVHN IT |
| 4 | File transfer jumper → eKVM (WinRM, RDP, or SMB) | LVHN IT |
| 5 | Named JIT accounts with MFA | LVHN IT |
| 6 | SIEM ingestion of logs from jumper + eKVM | LVHN IT |

**Critical Owner Statement:**
> 🔴 **LVHN Responsibility:** Security hardening, monitoring, and compliance of the Windows jumper server are LVHN's sole responsibility. Ionic provides implementation guidance only.

---

## 🛠️ Implementation Phases

### Phase 1: Planning (Weeks 1-2)
- [x] Project proposal approved
- [x] Prerequisites confirmed feasible
- [ ] Jumper server provisioned (LVHN IT)
- [ ] Network ACL rules drafted
- [ ] Training materials developed

### Phase 2: Pilot (Week 3)
- [ ] Pilot target devices selected (2-3 eKVM devices)
- [ ] Dry-run connectivity tests
- [ ] Execute pilot update per MOP
- [ ] Collect evidence packages
- [ ] Lessons learned review

### Phase 3: Rollout (Weeks 4-8)
- [ ] Phase 3a: 25% of fleet (Week 4-5)
- [ ] Phase 3b: 50% of fleet (Week 6)
- [ ] Phase 3c: 100% of fleet (Week 7-8)
- [ ] Final compliance review

### Phase 4: Closure (Week 9)
- [ ] Final audit evidence compiled
- [ ] Project retrospective
- [ ] Operational handoff to LVHN IT
- [ ] Quarterly review schedule established

---

## 👥 Roles & Responsibilities (RACI)

| Activity | LVHN IT | Ionic Engineering | LVHN Security | LVHN Compliance |
|----------|---------|-------------------|---------------|-----------------|
| **Jumper Server Hardening** | R/A | C | C | I |
| **Network ACL Configuration** | R/A | C | C | I |
| **Execute Updates (MOP)** | R | A | I | I |
| **Collect Evidence** | R | A | I | C |
| **SIEM Monitoring** | R/A | I | C | I |
| **Incident Response** | R/A | C | R | I |
| **Compliance Audits** | C | I | R | A |

**Legend:** R = Responsible, A = Accountable, C = Consulted, I = Informed

---

## 🐛 Issue Tracking & Contributions

### Reporting Issues

Use GitHub Issues with provided templates:
- **Bug Report:** [`/.github/ISSUE_TEMPLATE/bug_report.md`](.github/ISSUE_TEMPLATE/bug_report.md)
- **Feature Request:** [`/.github/ISSUE_TEMPLATE/feature_request.md`](.github/ISSUE_TEMPLATE/feature_request.md)

### Pull Requests

All documentation updates, procedure enhancements, and runbook changes should be submitted via Pull Request using the template: [`/.github/pull_request_template.md`](.github/pull_request_template.md)

**Review Process:**
1. Technical review by Ionic engineering
2. Operational review by LVHN IT
3. Security review (if security-related changes)
4. Compliance review (if audit-related changes)

---

## 📞 Contact & Support

| Role | Contact | Availability |
|------|---------|--------------|
| **Ionic Technical Support** | support@ionic.com | 24/7 |
| **LVHN IT Operations** | it-ops@lvhn.org | Business hours + on-call |
| **LVHN Information Security** | infosec@lvhn.org | Business hours + on-call |
| **LVHN Change Management** | changemanager@lvhn.org | Business hours |
| **Project Lead (Ionic)** | [Name] @ [email] | Business hours |
| **Project Lead (LVHN)** | [Name] @ [email] | Business hours |

**Emergency Bridge Line:** [Conference number] (activated during maintenance windows)

---

## 📅 Project Timeline

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| Project Kickoff | 2025-11-11 | ✅ Complete |
| Prerequisites Confirmed | 2025-11-18 | 🟡 In Progress |
| Jumper Server Hardened | 2025-11-22 | ⚪ Pending |
| Pilot Execution | 2025-11-25 | ⚪ Pending |
| Phase 1 Rollout (25%) | 2025-12-02 | ⚪ Pending |
| Phase 2 Rollout (50%) | 2025-12-09 | ⚪ Pending |
| Phase 3 Rollout (100%) | 2025-12-16 | ⚪ Pending |
| Project Closure | 2025-12-23 | ⚪ Pending |

---

## 📖 Additional Resources

### Internal References
- [MOP Full Text](docs/procedures/MOP-eKVM-Update.md)
- [ADR Index](docs/architecture/README.md)
- [Runbooks Directory](runbooks/)

### External Standards
- [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
- [CIS Benchmark: Windows Server 2019](https://www.cisecurity.org/benchmark/microsoft_windows_server)
- [HIPAA Security Rule](https://www.hhs.gov/hipaa/for-professionals/security/index.html)
- [Microsoft RDP Best Practices](https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/rds-security)

### Vendor Documentation
- [Ionic eKVM Documentation](https://docs.ionic.com) (replace with actual link)
- [nCommand Lite User Guide](https://docs.ionic.com/ncommand) (replace with actual link)

---

## 📄 License & Confidentiality

**Confidentiality:** This repository contains proprietary technical information and is intended solely for LVHN and Ionic personnel involved in this project.

**Restrictions:**
- Do not share outside LVHN/Ionic without written approval
- Do not publish to public repositories
- PHI/PII must never be committed to this repository

**Document Classification:** Internal – Technical Implementation

---

## 🔄 Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-11-11 | Ionic Team | Initial repository setup; proposal, MOPs, runbooks, ADRs |

---

## ✅ Approval

**Project Charter Approved By:**

| Name | Role | Date | Signature |
|------|------|------|-----------|
| [Name] | Director, IT Infrastructure (LVHN) | ___________ | ___________ |
| [Name] | CISO (LVHN) | ___________ | ___________ |
| [Name] | Project Lead (Ionic) | ___________ | ___________ |

---

**For questions or clarifications, contact the project leads listed in the [Contact & Support](#contact--support) section.**

---

*Last updated: 2025-11-11*

## 🌐 Client Documentation Portal

A GitHub Pages site can be enabled to share the complete documentation set with LVHN:

1. In GitHub, open *Settings → Pages* and select the `main` branch with `/docs` folder.
2. Share the generated URL (e.g., `https://<org>.github.io/jumpserver/`) with the client.
3. The portal (`docs/index.md`) lists every document with direct links and PDF downloads.
4. PDFs are rebuilt automatically by the `Generate Documentation PDFs` workflow on every push to `main` or via manual dispatch.
5. LVHN can download the questionnaire, complete it offline, and return responses by email or an agreed secure channel.

### Hosting on Vercel

The `portal/` directory already follows the [Pinexio template](https://pinexio.vercel.app/docs/getting-started/installation). Create a Vercel project pointing to that folder, set the build command to `pnpm run build`, and output directory to `out`. Enable password protection or SSO within Vercel if access control is required.