# LVHN Infrastructure Questionnaire – eKVM Remote Update Project

**Document Control**
- **Version:** 1.0
- **Date:** 2025-11-11
- **Classification:** Internal – Discovery Document
- **Purpose:** Gather LVHN infrastructure information to tailor implementation approach
- **Audience:** LVHN IT Infrastructure, Security, and Operations Teams

---

> **Configuration Custody Notice**  
> Ionic Health engineering exclusively manages all eKVM configuration, firmware, and software changes. LVHN operations is solely responsible for provisioning, hardening, and maintaining the Windows jumper server environment. Any activity outside these custody boundaries requires written approval from both teams.

## Instructions

**Purpose of this Questionnaire:**
This document helps Ionic understand LVHN's existing infrastructure to ensure the eKVM Remote Update solution integrates seamlessly with your environment.

**How to Complete:**
1. Fill in all applicable fields with your current infrastructure details
2. Mark "Not Applicable" or "N/A" if a section doesn't apply
3. Add comments/notes where additional context is helpful
4. Return completed document to: [Ionic Project Manager Email]
5. Target completion date: [Date]

**Confidentiality:**
All information provided will be treated as confidential and used solely for project planning purposes.

---

## Table of Contents

1. [Network Infrastructure](#1-network-infrastructure)
2. [SSL VPN Solution](#2-ssl-vpn-solution)
3. [Firewall and Network Security](#3-firewall-and-network-security)
4. [Active Directory and Identity](#4-active-directory-and-identity)
5. [SIEM and Logging](#5-siem-and-logging)
6. [Privileged Access Management (PAM)](#6-privileged-access-management-pam)
7. [Endpoint Security](#7-endpoint-security)
8. [Windows Infrastructure](#8-windows-infrastructure)
9. [Change Management](#9-change-management)
10. [Compliance and Audit](#10-compliance-and-audit)
11. [Operational Support](#11-operational-support)
12. [eKVM Environment](#12-ekvm-environment)

---

## 1. Network Infrastructure

### 1.1 General Network Information

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **Primary data center location(s):** | | (City, state, or facility name) |
| **Number of sites/locations with eKVM devices:** | | |
| **Network topology:** [ ] Flat [ ] Segmented [ ] Micro-segmented [ ] Other: ______ | | |
| **VLAN structure for eKVM devices:** | | (e.g., dedicated VLAN, shared clinical VLAN) |
| **Network switch vendor(s):** | | (e.g., Cisco, Arista, Juniper, HP) |
| **Router vendor(s):** | | |
| **Do you use network segmentation for medical devices?** [ ] Yes [ ] No | | |

### 1.2 IP Address Management

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **eKVM device subnet(s):** | | (e.g., 10.60.200.0/24) |
| **Jumper server proposed subnet:** | | (e.g., 10.50.100.0/24) |
| **Available IP addresses for jumper server:** | | (Static IP required) |
| **DHCP used for eKVM devices?** [ ] Yes [ ] No | | |
| **DNS servers (primary/secondary):** | | |
| **Internal DNS domain:** | | (e.g., lvhn.local, lvhn.org) |

### 1.3 Network Bandwidth and Performance

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **Bandwidth between jumper server location and eKVM subnet:** | _____ Mbps / Gbps | |
| **Latency between jumper and eKVM devices (if known):** | _____ ms | |
| **Internet egress bandwidth (for HTTPS downloads):** | _____ Mbps / Gbps | |
| **Proxy/web gateway required for internet access?** [ ] Yes [ ] No | | If yes, provide details below |
| **Proxy server details (if applicable):** | | (IP, port, authentication method) |

### 1.4 Allowlisted Domains (for HTTPS Downloads)

**Can the following domains be allowlisted for jumper server internet access?**

| Domain | Allowlisted? | Notes |
|--------|--------------|-------|
| downloads.ionic.com | [ ] Yes [ ] No [ ] Need approval | |
| cdn.ionic.com | [ ] Yes [ ] No [ ] Need approval | |
| updates.ionic.com | [ ] Yes [ ] No [ ] Need approval | |
| Other required domains: ___________ | [ ] Yes [ ] No [ ] Need approval | |

---

## 2. SSL VPN Solution

### 2.1 VPN Platform Information

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **VPN vendor and product:** | [ ] Palo Alto GlobalProtect<br>[ ] Cisco AnyConnect<br>[ ] Fortinet FortiClient<br>[ ] Pulse Secure<br>[ ] Microsoft Always On VPN<br>[ ] Other: ______ | |
| **VPN software version:** | | |
| **VPN gateway IP/hostname:** | | |
| **VPN client OS support:** | [ ] Windows 10<br>[ ] Windows 11<br>[ ] macOS<br>[ ] Linux<br>[ ] Other: ______ | |

### 2.2 VPN Authentication and Access

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **MFA required for VPN access?** [ ] Yes [ ] No | | |
| **MFA solution:** | [ ] Duo Security<br>[ ] Microsoft Authenticator<br>[ ] RSA SecurID<br>[ ] OKTA<br>[ ] Ping Identity<br>[ ] YubiKey<br>[ ] Other: ______ | |
| **VPN authentication method:** | [ ] Active Directory<br>[ ] RADIUS<br>[ ] LDAP<br>[ ] SAML<br>[ ] Other: ______ | |
| **Split tunneling enabled?** [ ] Yes [ ] No | | (Required for Ionic CDN access) |
| **VPN IP pool/subnet:** | | (e.g., 10.200.0.0/24) |
| **Maximum concurrent VPN sessions allowed:** | | |

### 2.3 VPN Access for Maintenance Operations

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **Can VPN access be granted to Ionic technicians?** [ ] Yes [ ] No [ ] Need approval | | |
| **VPN access provisioning time (SLA):** | _____ hours/days | |
| **VPN session timeout:** | _____ hours | |
| **VPN access approval process:** | | (e.g., ticket submission, manager approval) |

---

## 3. Firewall and Network Security

### 3.1 Firewall Platform

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **Firewall vendor and model:** | [ ] Palo Alto PA-Series<br>[ ] Cisco ASA / Firepower<br>[ ] Fortinet FortiGate<br>[ ] Check Point<br>[ ] Juniper SRX<br>[ ] Other: ______ | |
| **Firewall software version:** | | |
| **Firewall management tool:** | [ ] Panorama (Palo Alto)<br>[ ] ASDM / FMC (Cisco)<br>[ ] FortiManager (Fortinet)<br>[ ] SmartConsole (Check Point)<br>[ ] Other: ______ | |
| **Number of firewalls in environment:** | | |

### 3.2 Firewall Rule Management

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **Firewall rule request process:** | [ ] Service ticket<br>[ ] Change request<br>[ ] Email request<br>[ ] Self-service portal<br>[ ] Other: ______ | |
| **Average time to implement firewall rules:** | _____ hours/days | |
| **Can time-based firewall rules be configured?** [ ] Yes [ ] No | | (Enable ports only during maintenance windows) |
| **Default firewall policy:** | [ ] Default deny<br>[ ] Default allow<br>[ ] Other: ______ | |
| **Firewall logging enabled?** [ ] Yes [ ] No | | |
| **Firewall logs forwarded to SIEM?** [ ] Yes [ ] No | | |

### 3.3 Required Firewall Rules for Project

**Can the following firewall rules be implemented?**

| Rule | Source | Destination | Port | Protocol | Time-Based? | Possible? |
|------|--------|-------------|------|----------|-------------|-----------|
| VPN → Jumper (RDP) | VPN pool | Jumper server IP | 3389 | TCP | No | [ ] Yes [ ] No |
| Jumper → eKVM (RDP) | Jumper server IP | eKVM subnet | 3389 | TCP | Yes (maintenance window) | [ ] Yes [ ] No |
| Jumper → eKVM (WinRM HTTPS) | Jumper server IP | eKVM subnet | 5986 | TCP | Yes (maintenance window) | [ ] Yes [ ] No |
| Jumper → eKVM (WinRM HTTP) | Jumper server IP | eKVM subnet | 5985 | TCP | Yes (maintenance window) | [ ] Yes [ ] No |
| Jumper → eKVM (SMB) | Jumper server IP | eKVM subnet | 445 | TCP | Yes (maintenance window) | [ ] Yes [ ] No |
| Jumper → Internet (HTTPS) | Jumper server IP | Ionic CDN | 443 | TCP | No | [ ] Yes [ ] No |

**Additional firewall constraints or requirements:**
```
[Describe any additional firewall policies, compliance requirements, or restrictions]
```

---

## 4. Active Directory and Identity

### 4.1 Active Directory Environment

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **AD domain name:** | | (e.g., lvhn.local) |
| **AD forest functional level:** | [ ] Windows Server 2012 R2<br>[ ] Windows Server 2016<br>[ ] Windows Server 2019<br>[ ] Windows Server 2022<br>[ ] Other: ______ | |
| **AD domain functional level:** | [ ] Windows Server 2012 R2<br>[ ] Windows Server 2016<br>[ ] Windows Server 2019<br>[ ] Windows Server 2022<br>[ ] Other: ______ | |
| **Number of AD domain controllers:** | | |
| **AD domain controller OS version:** | | |

### 4.2 Account Management

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **Account naming convention for admin accounts:** | | (e.g., firstname.lastname.admin) |
| **JIT (Just-In-Time) account provisioning available?** [ ] Yes [ ] No | | |
| **JIT account provisioning process:** | | (e.g., ServiceNow request, manual creation) |
| **JIT account provisioning SLA:** | _____ hours/days | |
| **Account expiration supported?** [ ] Yes [ ] No | | (Accounts auto-disable after time period) |
| **Shared/service accounts permitted?** [ ] Yes [ ] No [ ] With approval | | |

### 4.3 Group Policy (GPO)

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **GPO management tool:** | [ ] GPMC (Group Policy Management Console)<br>[ ] Third-party tool: ______<br>[ ] Other: ______ | |
| **Can GPOs be created for jumper server?** [ ] Yes [ ] No | | |
| **Can GPOs be created for eKVM devices?** [ ] Yes [ ] No | | |
| **GPO change request process:** | | |
| **GPO change SLA:** | _____ hours/days | |
| **Time-based GPO application supported?** [ ] Yes [ ] No | | (Apply settings only during maintenance windows) |

### 4.4 Password Policies

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **Minimum password length:** | _____ characters | |
| **Password complexity required?** [ ] Yes [ ] No | | |
| **Password expiration:** | _____ days | |
| **Password history:** | _____ passwords remembered | |
| **Account lockout threshold:** | _____ failed attempts | |
| **Account lockout duration:** | _____ minutes | |

---

## 5. SIEM and Logging

### 5.1 SIEM Platform

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **SIEM vendor and product:** | [ ] Microsoft Sentinel<br>[ ] Splunk<br>[ ] IBM QRadar<br>[ ] LogRhythm<br>[ ] ArcSight<br>[ ] Elastic (ELK)<br>[ ] Other: ______ | |
| **SIEM version:** | | |
| **SIEM deployment model:** | [ ] On-premises<br>[ ] Cloud (SaaS)<br>[ ] Hybrid | |
| **SIEM log retention period:** | _____ days/months/years | |

### 5.2 Log Collection and Forwarding

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **Log collection method:** | [ ] Windows Event Forwarding (WEF)<br>[ ] Agent-based (specify): ______<br>[ ] Syslog<br>[ ] API integration<br>[ ] Other: ______ | |
| **Can jumper server logs be forwarded to SIEM?** [ ] Yes [ ] No | | |
| **Can eKVM device logs be forwarded to SIEM?** [ ] Yes [ ] No | | |
| **Log forwarding setup SLA:** | _____ hours/days | |
| **Average log ingestion latency:** | _____ seconds/minutes | |

### 5.3 Required Event Logs

**Can the following Windows event logs be collected?**

| Log Source | Log Name | Can Collect? | Notes |
|------------|----------|--------------|-------|
| Jumper Server | Security | [ ] Yes [ ] No | Event IDs: 4624, 4625, 4672, 4688, 4776 |
| Jumper Server | System | [ ] Yes [ ] No | |
| Jumper Server | Application | [ ] Yes [ ] No | |
| Jumper Server | TerminalServices-LocalSessionManager/Operational | [ ] Yes [ ] No | RDP events 21, 22, 24, 25 |
| Jumper Server | PowerShell/Operational | [ ] Yes [ ] No | ScriptBlock logging 4104 |
| Jumper Server | WinRM/Operational | [ ] Yes [ ] No | |
| eKVM Devices | Security | [ ] Yes [ ] No | Event IDs: 4624, 4625, 4688 |
| eKVM Devices | Application | [ ] Yes [ ] No | Installer events |

### 5.4 SIEM Alerting

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **Can custom SIEM alerts be created?** [ ] Yes [ ] No | | |
| **Alert notification methods:** | [ ] Email<br>[ ] SMS<br>[ ] Ticketing system<br>[ ] Webhook<br>[ ] Other: ______ | |
| **24/7 SOC monitoring?** [ ] Yes [ ] No | | |
| **Average incident response time:** | _____ minutes/hours | |

---

## 6. Privileged Access Management (PAM)

### 6.1 PAM Solution

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **PAM solution in use?** [ ] Yes [ ] No [ ] Planned | | |
| **PAM vendor and product:** | [ ] CyberArk Privileged Access Manager<br>[ ] BeyondTrust Privileged Remote Access<br>[ ] Thycotic Secret Server<br>[ ] Microsoft LAPS<br>[ ] Delinea (Centrify)<br>[ ] Other: ______<br>[ ] None | |
| **PAM version:** | | |
| **PAM deployment model:** | [ ] On-premises<br>[ ] Cloud (SaaS)<br>[ ] Hybrid | |

### 6.2 PAM Capabilities

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **Password vaulting/rotation?** [ ] Yes [ ] No | | |
| **Session recording?** [ ] Yes [ ] No | | |
| **Privileged session monitoring (real-time)?** [ ] Yes [ ] No | | |
| **MFA for privileged access?** [ ] Yes [ ] No | | |
| **Just-in-Time (JIT) access?** [ ] Yes [ ] No | | |
| **Time-based access grants?** [ ] Yes [ ] No | | (e.g., 4-hour access window) |

### 6.3 PAM Integration for Project

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **Can jumper server be managed via PAM?** [ ] Yes [ ] No [ ] TBD | | |
| **Can eKVM local admin accounts be managed via PAM?** [ ] Yes [ ] No [ ] TBD | | |
| **PAM access request SLA:** | _____ minutes/hours | |
| **Can Ionic technicians request PAM access?** [ ] Yes [ ] No [ ] Need approval | | |

---

## 7. Endpoint Security

### 7.1 Antivirus / EDR Solution

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **Antivirus/EDR vendor:** | [ ] Microsoft Defender for Endpoint<br>[ ] CrowdStrike Falcon<br>[ ] Symantec Endpoint Protection<br>[ ] Trend Micro<br>[ ] Carbon Black<br>[ ] SentinelOne<br>[ ] Other: ______ | |
| **AV/EDR version:** | | |
| **AV/EDR deployment model:** | [ ] On-premises<br>[ ] Cloud (SaaS)<br>[ ] Hybrid | |
| **AV/EDR management console:** | | (URL or server name) |

### 7.2 AV/EDR Configuration

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **Real-time protection enabled?** [ ] Yes [ ] No | | |
| **On-demand scanning supported?** [ ] Yes [ ] No | | |
| **Automatic definition updates?** [ ] Yes [ ] No | | |
| **Definition update frequency:** | [ ] Hourly<br>[ ] Daily<br>[ ] Weekly<br>[ ] Other: ______ | |
| **Quarantine/remediation automatic?** [ ] Yes [ ] No | | |

### 7.3 Endpoint Security for Project

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **Can AV/EDR be deployed on jumper server?** [ ] Yes [ ] No [ ] Already deployed | | |
| **Is AV/EDR already on eKVM devices?** [ ] Yes [ ] No [ ] Unknown | | |
| **Can files be scanned before installation?** [ ] Yes [ ] No | | (Scan firmware before transfer) |
| **File scanning SLA (scan time):** | _____ seconds/minutes | |

---

## 8. Windows Infrastructure

### 8.1 Windows Server Environment

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **Windows Server licensing:** | [ ] Standard<br>[ ] Datacenter<br>[ ] Core-based<br>[ ] Volume licensing (EA)<br>[ ] Other: ______ | |
| **Preferred Windows Server version for jumper server:** | [ ] Windows Server 2022<br>[ ] Windows Server 2019<br>[ ] Windows Server 2016<br>[ ] Other: ______ | |
| **Virtualization platform:** | [ ] VMware vSphere<br>[ ] Microsoft Hyper-V<br>[ ] Nutanix<br>[ ] Citrix Hypervisor<br>[ ] Physical server<br>[ ] Other: ______ | |
| **VM provisioning SLA:** | _____ hours/days | (If jumper server will be VM) |

### 8.2 Windows Update Management

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **Windows Update method:** | [ ] WSUS<br>[ ] SCCM (Microsoft Configuration Manager)<br>[ ] Windows Update for Business<br>[ ] Manual<br>[ ] Other: ______ | |
| **Patch deployment schedule:** | [ ] Monthly (Patch Tuesday)<br>[ ] Bi-weekly<br>[ ] Quarterly<br>[ ] Other: ______ | |
| **Patch testing before production?** [ ] Yes [ ] No | | |
| **Emergency patch deployment SLA:** | _____ hours/days | |

### 8.3 Certificate Services

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **AD Certificate Services (AD CS) deployed?** [ ] Yes [ ] No | | |
| **Certificate Authority (CA) type:** | [ ] Enterprise CA<br>[ ] Standalone CA<br>[ ] Third-party CA<br>[ ] Self-signed only<br>[ ] None | |
| **Certificate auto-enrollment supported?** [ ] Yes [ ] No | | |
| **Certificate validity period (default):** | _____ months/years | |
| **Can certificates be issued for RDP/WinRM?** [ ] Yes [ ] No | | |

---

## 9. Change Management

### 9.1 Change Management Process

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **Change management tool:** | [ ] ServiceNow<br>[ ] BMC Remedy<br>[ ] Jira Service Management<br>[ ] Cherwell<br>[ ] Other: ______ | |
| **Change ticket required for maintenance?** [ ] Yes [ ] No | | |
| **Change approval process:** | [ ] CAB (Change Advisory Board)<br>[ ] Manager approval<br>[ ] Automated approval<br>[ ] Other: ______ | |
| **Standard change pre-approval available?** [ ] Yes [ ] No | | (Repeatable updates) |
| **Emergency change process available?** [ ] Yes [ ] No | | |

### 9.2 Change Windows and Scheduling

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **Standard maintenance windows:** | [ ] Weekday evenings<br>[ ] Weekends<br>[ ] Monthly scheduled<br>[ ] Other: ______ | |
| **Preferred maintenance window day/time:** | | (e.g., Saturday 2 AM - 6 AM) |
| **Advance notice required for changes:** | _____ days/weeks | |
| **Can maintenance windows be scheduled ad-hoc?** [ ] Yes [ ] No | | |
| **Blackout periods (no changes allowed):** | | (e.g., fiscal year-end, holidays) |

---

## 10. Compliance and Audit

### 10.1 Regulatory Requirements

**Which regulations/standards apply to your environment?**

| Regulation/Standard | Applies? | Notes |
|---------------------|----------|-------|
| HIPAA | [ ] Yes [ ] No | |
| HITECH | [ ] Yes [ ] No | |
| Joint Commission | [ ] Yes [ ] No | |
| SOC 2 | [ ] Yes [ ] No | |
| PCI-DSS | [ ] Yes [ ] No | |
| NIST SP 800-53 | [ ] Yes [ ] No | |
| NIST Cybersecurity Framework | [ ] Yes [ ] No | |
| CIS Controls | [ ] Yes [ ] No | |
| FDA 21 CFR Part 11 | [ ] Yes [ ] No | (If applicable to medical devices) |
| State-specific regulations | [ ] Yes [ ] No | (e.g., NY SHIELD Act, CCPA) |

### 10.2 Audit and Evidence

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **Audit log retention requirement:** | _____ days/months/years | |
| **Audit frequency:** | [ ] Annual<br>[ ] Bi-annual<br>[ ] Quarterly<br>[ ] Other: ______ | |
| **External auditors:** | | (Firm name, if applicable) |
| **Evidence package requirements:** | | (File formats, storage location, etc.) |
| **Tamper-evident logging required?** [ ] Yes [ ] No | | |

### 10.3 Security Baselines

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **Security baseline applied to Windows servers:** | [ ] CIS Benchmark<br>[ ] Microsoft Security Baseline<br>[ ] DISA STIG<br>[ ] Custom baseline<br>[ ] Other: ______ | |
| **Security baseline version:** | | |
| **Baseline compliance scanning tool:** | [ ] CIS-CAT<br>[ ] Microsoft Secure Score<br>[ ] Nessus<br>[ ] Qualys<br>[ ] Other: ______ | |
| **Compliance scan frequency:** | [ ] Weekly<br>[ ] Monthly<br>[ ] Quarterly<br>[ ] Other: ______ | |

---

## 11. Operational Support

### 11.1 IT Operations Team

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **IT operations team size:** | _____ FTEs | |
| **Windows Server administrators:** | _____ FTEs | |
| **Network engineers:** | _____ FTEs | |
| **Security analysts:** | _____ FTEs | |
| **24/7 on-call support?** [ ] Yes [ ] No | | |
| **IT service desk hours:** | | (e.g., 8 AM - 5 PM Mon-Fri) |

### 11.2 Support and Escalation

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **IT service desk ticketing system:** | [ ] ServiceNow<br>[ ] Jira<br>[ ] BMC Remedy<br>[ ] Cherwell<br>[ ] Other: ______ | |
| **Service desk phone/email:** | | |
| **Escalation contacts (name/role/phone/email):** | | |
| **After-hours support contact:** | | |
| **Average incident response time:** | _____ minutes/hours | |

### 11.3 Vendor Management

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **Vendor onboarding process:** | | (Background checks, NDAs, etc.) |
| **Vendor access provisioning SLA:** | _____ days/weeks | |
| **Vendor access review frequency:** | [ ] Monthly<br>[ ] Quarterly<br>[ ] Annually<br>[ ] Other: ______ | |
| **Vendor remote access method:** | [ ] VPN<br>[ ] Jump server<br>[ ] Third-party tool (TeamViewer, etc.)<br>[ ] Other: ______ | |

---

## 12. eKVM Environment

### 12.1 eKVM Device Inventory

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **Total number of eKVM devices:** | | |
| **eKVM devices per location/site:** | | (If applicable) |
| **eKVM device naming convention:** | | (e.g., EKVM-SITE-001) |
| **eKVM device inventory maintained in:** | [ ] Asset management system<br>[ ] Spreadsheet<br>[ ] CMDB<br>[ ] Other: ______ | |
| **Inventory system accessible to Ionic?** [ ] Yes [ ] No [ ] Export provided | | |

### 12.2 eKVM Network Configuration

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **eKVM devices domain-joined?** [ ] Yes [ ] No [ ] Some | | |
| **eKVM devices static IP or DHCP?** [ ] Static [ ] DHCP [ ] Mixed | | |
| **eKVM device VLAN(s):** | | |
| **eKVM devices accessible from jumper server location?** [ ] Yes [ ] No [ ] Unknown | | |
| **Average network latency to eKVM devices:** | _____ ms | |

### 12.3 eKVM Current Management

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **Current remote management tool for eKVM:** | [ ] Atera (to be replaced)<br>[ ] TeamViewer<br>[ ] VNC<br>[ ] RDP<br>[ ] None<br>[ ] Other: ______ | |
| **RDP currently enabled on eKVM devices?** [ ] Yes [ ] No [ ] Unknown | | |
| **WinRM currently enabled on eKVM devices?** [ ] Yes [ ] No [ ] Unknown | | |
| **Windows Firewall enabled on eKVM devices?** [ ] Yes [ ] No [ ] Unknown | | |
| **Local administrator account on eKVM devices:** | | (Account name, if not default "Administrator") |

### 12.4 eKVM Maintenance Windows

| Question | Answer | Notes/Comments |
|----------|--------|----------------|
| **Typical eKVM update frequency:** | [ ] Monthly<br>[ ] Quarterly<br>[ ] Annually<br>[ ] As needed<br>[ ] Other: ______ | |
| **Average eKVM update duration:** | _____ minutes/hours | |
| **Can eKVM devices be rebooted during maintenance?** [ ] Yes [ ] No [ ] With approval | | |
| **Clinical downtime acceptable during updates?** [ ] Yes [ ] No [ ] Limited (specify): ______ | | |
| **Preferred eKVM maintenance window:** | | (Day/time) |

---

## 13. Additional Information

### 13.1 Special Requirements or Constraints

**Please describe any additional requirements, constraints, or considerations:**

```
[Free text area for LVHN to provide additional context, special requirements,
compliance needs, architectural constraints, or other relevant information]
```

### 13.2 Known Issues or Concerns

**Are there any known issues or concerns with the current environment that might impact this project?**

```
[Examples: Planned infrastructure upgrades, known network issues,
upcoming security assessments, budget constraints, etc.]
```

### 13.3 Questions for Ionic

**Do you have any questions or need clarification from Ionic regarding this project?**

```
[LVHN questions for Ionic team]
```

---

## 14. Contact Information

### 14.1 LVHN Project Contacts

| Role | Name | Title | Email | Phone |
|------|------|-------|-------|-------|
| **Project Sponsor** | | | | |
| **IT Infrastructure Lead** | | | | |
| **Network Engineer** | | | | |
| **Security Lead** | | | | |
| **Compliance Officer** | | | | |
| **Operations Manager** | | | | |
| **Other:** | | | | |

---

## 15. Document Completion

**Completed by:**
- Name: _______________________________
- Title: _______________________________
- Date: _______________________________
- Signature: _______________________________

**Reviewed by (if applicable):**
- Name: _______________________________
- Title: _______________________________
- Date: _______________________________
- Signature: _______________________________

**Return completed questionnaire to:**
- Ionic Project Manager: [Name]
- Email: [Email]
- Target date: [Date]

---

## Appendix: Acronyms and Definitions

| Acronym | Definition |
|---------|------------|
| ACL | Access Control List |
| AD | Active Directory |
| AD CS | Active Directory Certificate Services |
| AV | Antivirus |
| CAB | Change Advisory Board |
| CMDB | Configuration Management Database |
| DHCP | Dynamic Host Configuration Protocol |
| DNS | Domain Name System |
| EDR | Endpoint Detection and Response |
| GPO | Group Policy Object |
| HIPAA | Health Insurance Portability and Accountability Act |
| JIT | Just-In-Time |
| MFA | Multi-Factor Authentication |
| PAM | Privileged Access Management |
| RDP | Remote Desktop Protocol |
| SIEM | Security Information and Event Management |
| SLA | Service Level Agreement |
| SMB | Server Message Block |
| SOC | Security Operations Center |
| SSL | Secure Sockets Layer |
| VPN | Virtual Private Network |
| WinRM | Windows Remote Management |
| WSUS | Windows Server Update Services |

---

**End of Questionnaire**

*Thank you for taking the time to complete this questionnaire. Your detailed responses will help ensure a successful implementation of the eKVM Remote Update project.*
