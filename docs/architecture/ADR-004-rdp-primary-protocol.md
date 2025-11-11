# ADR-004: RDP as Primary Remote Access Protocol

**Status:** Accepted

**Date:** 2025-11-11

**Deciders:** Ionic Engineering Team, LVHN IT Security

**Technical Story:** Select primary protocol for operator remote access to jumper server and eKVM devices

---

> **Configuration Custody Notice**
> Ionic Health engineering exclusively manages all eKVM configuration, firmware, and software changes. LVHN operations is solely responsible for provisioning, hardening, and maintaining the Windows jumper server environment. Any activity outside these custody boundaries requires written approval from both teams.

> **Network Visibility Scope**
> Remote access decisions are scoped to Ionic operator connectivity via LVHN infrastructure to managed jumper and eKVM endpoints. LVHN internal topology beyond the jumper boundary is out of scope.

## Context and Problem Statement

Ionic operators require secure remote access to perform maintenance activities on eKVM devices via an LVHN-managed jumper server. Without Atera RMM agents (per ADR-002), operators need a native Windows remote access protocol that provides:
- Interactive desktop sessions for troubleshooting and installation
- Strong authentication and encryption
- Comprehensive audit logging
- LVHN IT familiarity and existing security controls

## Decision Drivers

- **Native Windows Support**: Must work without installing third-party agents on eKVM devices
- **Security**: Encryption, Network Level Authentication (NLA), MFA integration
- **Audit & Compliance**: LVHN SIEM can ingest and correlate events (HIPAA, NIST SP 800-53)
- **Operational Familiarity**: LVHN IT already manages RDP infrastructure
- **Interactive Capability**: Support GUI-based installation and troubleshooting
- **Session Recording**: Enable session recording for evidence collection
- **Network Scoping**: Single port (3389) simplifies firewall rule management

## Considered Options

1. **Option 1: Remote Desktop Protocol (RDP)**
2. **Option 2: SSH with X11 Forwarding**
3. **Option 3: VNC (Virtual Network Computing)**
4. **Option 4: TeamViewer / Third-Party RMM**

## Decision Outcome

**Chosen option:** "Option 1: Remote Desktop Protocol (RDP) with hardening"

**Rationale:**
- RDP is the native Windows remote access protocol, requiring no additional agents
- Strong encryption (TLS 1.2+) and Network Level Authentication (NLA) supported out-of-box
- Windows Event IDs (1149, 21, 22, 25) provide rich audit trail for SIEM ingestion
- LVHN IT already has RDP security baselines and monitoring in place
- Supports both interactive troubleshooting and scripted automation (via PowerShell Remoting)
- CIS Benchmark and NIST guidance available for RDP hardening
- Integrates with existing Active Directory and MFA infrastructure

### Positive Consequences

- **Zero New Agents**: RDP is built into Windows OS; no installation required on eKVM devices
- **Audit Completeness**: Event logs capture connection time, user, source IP, session duration
- **Security Hardening**: Well-documented CIS and NIST hardening guidance available
- **Operational Familiarity**: LVHN IT already manages RDP for other infrastructure
- **MFA Support**: Integrates with LVHN's existing MFA provider via NLA
- **Session Recording**: Third-party tools (Netwrix, Ekran) can record RDP sessions for evidence
- **Encryption**: TLS 1.2+ for all traffic; 128-bit AES minimum

### Negative Consequences

- **Port Exposure**: RDP port 3389 is a known attack vector (mitigated via network scoping)
- **Configuration Complexity**: Requires registry/GPO hardening for security baseline
- **Account Lockout Risk**: Password-based auth failures can trigger account lockouts (mitigated via PAM)
- **Clipboard/Drive Redirection**: Must be disabled except during controlled file transfers
- **Performance**: RDP uses more bandwidth than SSH (250-500 kbps typical)

## Pros and Cons of the Options

### Option 1: Remote Desktop Protocol (RDP) ✅

**Description:** Native Windows remote desktop protocol (TCP 3389) with TLS encryption and NLA.

**Pros:**
- Native to Windows OS (no agent installation)
- TLS 1.2+ encryption with certificate-based authentication
- Network Level Authentication (NLA) pre-authenticates before session start
- Comprehensive Windows Event Log audit trail (Event IDs 1149, 21, 22, 25, 4624, 4634)
- Integrates with Active Directory and MFA
- GUI access for interactive troubleshooting
- Clipboard and drive redirection for file transfers
- CIS Benchmark compliance guidance available
- Session recording via third-party tools (Netwrix, Ekran, ObserveIT)
- LVHN IT operational familiarity

**Cons:**
- Port 3389 is a known attack target (requires network scoping)
- Requires GPO/registry hardening for security baseline
- Higher bandwidth usage than SSH (250-500 kbps)
- Clipboard/drive redirection must be disabled by default
- Vulnerable to RDP brute-force attacks (mitigated via account lockout + MFA)

**Implementation:**
```powershell
# RDP hardening baseline (see Runbook: RDP-Hardening-Guide.md)
Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp" `
                 -Name "UserAuthentication" -Value 1  # Enable NLA
Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp" `
                 -Name "SecurityLayer" -Value 2  # Enforce TLS
```

### Option 2: SSH with X11 Forwarding ❌

**Description:** OpenSSH Server for Windows with X11 forwarding for GUI applications.

**Pros:**
- Lower bandwidth usage (50-100 kbps typical)
- Strong public key authentication
- Standard Linux/Unix protocol with extensive tooling
- Supports port forwarding and tunneling

**Cons:**
- **Not native to Windows** (requires OpenSSH Server installation)
- X11 forwarding on Windows is limited and complex
- No native Windows GUI support (requires Xming/VcXsrv)
- Limited audit logging compared to Windows Event Logs
- LVHN IT may lack operational familiarity
- **Violates "zero new agents" principle** (requires OpenSSH Server installation)

### Option 3: VNC (Virtual Network Computing) ❌

**Description:** Third-party remote desktop protocol (e.g., RealVNC, TightVNC, UltraVNC).

**Pros:**
- Cross-platform support (Windows, Linux, macOS)
- Lower bandwidth than RDP (100-200 kbps typical)
- Simple configuration

**Cons:**
- **Requires agent installation** (violates ADR-002)
- Weak encryption in standard VNC (passwords transmitted in cleartext)
- Limited audit logging integration with Windows Event Log
- Not HIPAA-compliant without enterprise version (e.g., RealVNC Enterprise)
- Additional licensing costs
- LVHN IT may lack operational experience

### Option 4: TeamViewer / Third-Party RMM ❌

**Description:** Commercial RMM tools (TeamViewer, AnyDesk, ConnectWise, etc.).

**Pros:**
- Easy setup and cross-platform support
- Session recording and audit trail built-in
- MFA support in enterprise versions

**Cons:**
- **Requires agent installation** (violates ADR-002 "No Atera Agent" decision)
- Vendor dependency and licensing costs
- Third-party data routing (connections may route through vendor cloud)
- HIPAA Business Associate Agreement (BAA) required
- Supply chain risk (SolarWinds precedent)
- Adds attack surface

## Decision Matrix

| Criteria | RDP (Option 1) | SSH (Option 2) | VNC (Option 3) | RMM (Option 4) |
|----------|----------------|----------------|----------------|----------------|
| **Zero New Agents** | ✅ Native | ❌ Requires install | ❌ Requires install | ❌ Requires install |
| **Encryption** | ✅ TLS 1.2+ | ✅ SSH v2 | ⚠️ Weak (standard) | ✅ Vendor-dependent |
| **Audit Logging** | ✅ Windows Event Log | ⚠️ Limited | ❌ Poor | ✅ Vendor dashboard |
| **MFA Support** | ✅ Via NLA | ✅ Via PAM | ❌ Limited | ✅ Vendor-dependent |
| **LVHN Familiarity** | ✅ High | ⚠️ Medium | ⚠️ Low | ⚠️ Low |
| **GUI Support** | ✅ Native | ⚠️ X11 (complex) | ✅ Native | ✅ Native |
| **Bandwidth** | ⚠️ 250-500 kbps | ✅ 50-100 kbps | ✅ 100-200 kbps | ⚠️ 200-400 kbps |
| **Compliance** | ✅ NIST/CIS | ✅ NIST | ❌ Poor | ⚠️ Vendor BAA |
| **Cost** | ✅ Included | ✅ Free | ⚠️ Licensing | ❌ High licensing |

## Implementation Requirements

1. **Jumper Server Hardening:** Apply RDP hardening baseline per [Runbook: RDP-Hardening-Guide.md](../../runbooks/RDP-Hardening-Guide.md)
2. **eKVM Device Configuration:** Enable RDP with NLA on all eKVM devices (managed by Ionic)
3. **Network ACLs:** Scope RDP port 3389 to jumper server IP → eKVM subnet only
4. **SIEM Integration:** Forward Windows Security Event Log (Event IDs 1149, 21, 22, 25, 4624, 4634) to LVHN SIEM
5. **Session Recording:** Enable RDP session recording via Netwrix or equivalent (LVHN responsibility)
6. **Legal Banner:** Configure pre-authentication legal notice per CIS Benchmark
7. **Account Lockout:** Enforce account lockout policy (5 failed attempts, 30-minute lockout)
8. **Idle Timeout:** Enforce 15-minute idle session timeout

## Links

- [Related ADR-002: No Atera Agent](./ADR-002-no-atera-agent.md) - Rationale for removing RMM agents
- [Related ADR-003: File Transfer Methods](./ADR-003-file-transfer-methods.md) - RDP drive mapping for file transfer
- [Runbook: RDP Hardening Guide](../../runbooks/RDP-Hardening-Guide.md) - Complete hardening checklist
- [Microsoft: RDP Security Best Practices](https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/rds-security)
- [CIS Benchmark: Windows Server 2019](https://www.cisecurity.org/benchmark/microsoft_windows_server)
- [NIST SP 800-53 AC-17: Remote Access](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)

## Notes

- RDP should be used in conjunction with WinRM (port 5985/5986) for scripted automation (see ADR-003)
- Clipboard and drive redirection must be disabled via GPO except during controlled file transfer windows
- Network ACLs should enforce time-based rules (enable RDP only during approved maintenance windows)
- RDP traffic from operator workstation → jumper server traverses LVHN SSL VPN (per ADR-001)
- All RDP connections require MFA authentication via LVHN's Active Directory + MFA provider
- Session recordings should be retained for 6 years per LVHN data retention policy

---

**Security Controls:**
- AC-17 (Remote Access) - NIST SP 800-53
- IA-2(1) (Multi-Factor Authentication) - NIST SP 800-53
- AU-2 (Audit Events) - NIST SP 800-53
- SC-8 (Transmission Confidentiality) - NIST SP 800-53
- 45 CFR § 164.312(e)(1) (Transmission Security) - HIPAA
