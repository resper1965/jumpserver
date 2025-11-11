# ADR-002: Remove Atera Agent Dependency

**Status:** Accepted

**Date:** 2025-11-11

**Deciders:** LVHN IT Security, Ionic Engineering Team

**Technical Story:** Eliminate third-party remote management agent from eKVM devices

---

## Context and Problem Statement

Current eKVM update process relies on Atera remote management agents. LVHN IT requires removal of Atera to reduce attack surface, eliminate third-party dependencies, and consolidate remote access methods. Alternative remote management approach must support firmware/software updates without installing new agents.

## Decision Drivers

- **Security**: Reduce attack surface by minimizing installed agents
- **Vendor Consolidation**: Eliminate third-party remote access tool licenses
- **Compliance**: Simplify audit scope (fewer third-party connections)
- **Operational Control**: LVHN owns entire access chain
- **No New Agents**: Requirement to avoid installing replacement agent software
- **Use Native Windows**: Leverage built-in Windows remote management

## Considered Options

1. **Option 1: Replace Atera with another RMM tool (e.g., NinjaRMM, ConnectWise)**
2. **Option 2: Use native Windows protocols (RDP, WinRM, SMB)**
3. **Option 3: Custom web-based management portal on eKVM**

## Decision Outcome

**Chosen option:** "Option 2: Use native Windows protocols (RDP, WinRM, SMB)"

**Rationale:**
- Achieves "no new agents" requirement
- RDP/WinRM/SMB are built into Windows; already present on eKVM
- Well-understood security hardening practices exist
- Native integration with Active Directory (authentication, GPO)
- Supported by existing LVHN monitoring (SIEM event IDs)
- No licensing costs
- Industry-standard protocols with extensive audit/logging

### Positive Consequences

- Zero new software installed on eKVM
- Reduced attack surface (no third-party agent code)
- Native Windows audit logs (Event IDs 4624, 4625, etc.)
- GPO-based hardening (TLS, NLA, account lockout)
- Familiar to Windows sysadmins
- No recurring agent licensing costs
- Simplified compliance (no third-party data processor agreements)

### Negative Consequences

- Requires manual RDP session per device (less automation than RMM tools)
- No built-in remote desktop sharing/shadowing (unlike Atera)
- File transfer less seamless than RMM drag-and-drop
- Requires LVHN to manage accounts/credentials (no central RMM console)
- Network ports (3389, 5985/5986, 445) must be opened during windows

## Pros and Cons of the Options

### Option 1: Replace Atera with Another RMM Tool

**Description:** Deploy alternative RMM agent (NinjaRMM, ConnectWise, SolarWinds, etc.)

**Pros:**
- Central management console
- Scripting/automation capabilities
- Built-in file transfer
- Remote desktop shadowing
- Patch management integration

**Cons:**
- Violates "no new agents" requirement ❌
- New third-party vendor/license costs
- Another attack surface (agent vulnerabilities)
- Compliance complexity (vendor BAA required)
- Learning curve for new tool
- Dependency on vendor uptime

### Option 2: Use Native Windows Protocols ✅

**Description:** Leverage RDP (3389), WinRM (5985/5986), SMB (445) built into Windows.

**Pros:**
- No agents to install ✅
- Built-in to Windows (no new software)
- Well-documented security hardening
- Native AD integration
- Standard audit logs
- No licensing costs
- LVHN full operational control

**Cons:**
- Less automation (no scripting console)
- Manual session per device
- File transfer less user-friendly
- Requires network ACL management

### Option 3: Custom Web-Based Management Portal

**Description:** Develop custom HTTPS web interface on eKVM for remote management.

**Pros:**
- No additional ports (443 only)
- Custom UI tailored to eKVM workflows
- Could integrate authentication with LVHN SSO

**Cons:**
- Significant development effort (months)
- Custom code = custom vulnerabilities
- Requires ongoing maintenance/patching
- Complexity of secure web app development
- File upload via HTTPS (size limits)
- Still requires agent/service on eKVM

## Links

- [Related ADR-001](./ADR-001-jumper-server-architecture.md) - Jumper Server Architecture
- [Related ADR-004](./ADR-004-rdp-primary-protocol.md) - RDP as Primary Protocol
- [Microsoft RDP Security Best Practices](https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/rds-security)

## Notes

- RDP/WinRM ports should only be accessible from jumper server IP (scoped ACLs)
- Time-box port access (open only during maintenance windows)
- Consider Windows Defender Advanced Threat Protection (ATP) for enhanced monitoring
- Future enhancement: PowerShell DSC for eKVM configuration management (no agent required)
- Document manual procedures clearly (trade-off for no-agent approach)
