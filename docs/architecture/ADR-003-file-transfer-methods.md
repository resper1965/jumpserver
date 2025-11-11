# ADR-003: File Transfer Methods Selection

**Status:** Accepted

**Date:** 2025-11-11

**Deciders:** Ionic Engineering Team, LVHN IT Security

**Technical Story:** Define approved methods for transferring eKVM update binaries

---

> **Configuration Custody Notice**  
> Ionic Health engineering exclusively manages all eKVM configuration, firmware, and software changes. LVHN operations is solely responsible for provisioning, hardening, and maintaining the Windows jumper server environment. Any activity outside these custody boundaries requires written approval from both teams.

## Context and Problem Statement

Update binaries (firmware, drivers, application packages) must be transferred securely from Ionic to the jumper server, and then from the jumper server to eKVM devices. Methods must support integrity verification, audit logging, and work within LVHN network security policies. File sizes range from 50 MB (drivers) to 500 MB (full firmware images).

## Decision Drivers

- **Integrity**: Ensure binaries are not corrupted or tampered with during transfer
- **Audit Trail**: Log source, destination, timestamp, and operator for every transfer
- **Network Security**: Minimize exposed ports; use encrypted protocols
- **Flexibility**: Support both internet-connected and air-gapped scenarios
- **File Size**: Handle files up to 500 MB efficiently
- **Automation**: Enable scripted transfers for consistency and repeatability

## Considered Options

1. **Option 1: HTTPS direct download (Internet → Jumper)**
2. **Option 2: RDP drive mapping (Operator PC → Jumper)**
3. **Option 3: WinRM Copy-Item (Jumper → eKVM)**
4. **Option 4: SMB file share (Jumper → eKVM)**
5. **Option 5: FTP/SFTP**

## Decision Outcome

**Chosen option:** "Hybrid approach with preference order: 1 → 3 → 2 → 4"

**Rationale:**
- **Path A (Preferred):** HTTPS download to jumper (1) → WinRM transfer to eKVM (3)
  - Most secure, fully scripted, leverages TLS encryption end-to-end
- **Path B (Fallback):** RDP drive map to jumper (2) → WinRM transfer to eKVM (3)
  - For air-gapped or restricted internet environments
- **Path C (Alternate):** HTTPS or RDP (1/2) → SMB to eKVM (4)
  - When WinRM unavailable; SMB 3.1.1 with encryption enforced

### Positive Consequences

- Multiple transfer paths reduce single-point-of-failure risk
- Each method has well-documented security hardening
- All methods support SHA-256 verification
- Native Windows audit logging for all protocols
- No third-party tools required
- Flexibility for different network environments

### Negative Consequences

- Operators must understand decision logic for selecting method
- Network ACLs must permit multiple port combinations (3389, 5985/5986, 445)
- Runbooks more complex (document 3-4 transfer methods)
- Testing burden: validate all paths in each environment

## Pros and Cons of the Options

### Option 1: HTTPS Direct Download ✅

**Description:** Jumper server downloads binary from Ionic CDN via `Invoke-WebRequest` or `curl`.

**Pros:**
- Fully automated/scripted
- TLS 1.2+ encryption in transit
- No operator workstation in transfer chain
- Fastest method (direct CDN connection)
- Audit: Windows PowerShell logs + CDN access logs
- Supports integrity via HTTPS + SHA-256

**Cons:**
- Requires internet egress from jumper server
- Firewall must allowlist Ionic CDN domains
- Not suitable for air-gapped environments

**Implementation:**
```powershell
Invoke-WebRequest -Uri "https://downloads.ionic.com/ekvm/v3.2.1/firmware.exe" `
                  -OutFile "C:\Staging\firmware.exe" -UseBasicParsing
```

### Option 2: RDP Drive Mapping ✅

**Description:** Operator's local drive appears as `\\tsclient\C` in RDP session to jumper.

**Pros:**
- Works in air-gapped environments
- No internet requirement
- Operator retains control of source file
- Native to RDP (no additional software)

**Cons:**
- Operator workstation becomes part of security chain
- Slower for large files (RDP protocol overhead)
- Requires GPO to enable drive redirection
- Introduces operator endpoint as potential compromise vector
- Manual step (less automation)

**Implementation:**
```powershell
# In RDP session to jumper
Copy-Item -Path "\\tsclient\C\Downloads\firmware.exe" `
          -Destination "C:\Staging\firmware.exe"
```

### Option 3: WinRM Copy-Item ✅

**Description:** PowerShell Remoting to transfer file from jumper to eKVM.

**Pros:**
- Native PowerShell (no additional tools)
- Supports TLS (port 5986 HTTPS)
- Full scriptability
- Excellent audit trail (Event ID 4104 - ScriptBlock logging)
- Supports large files efficiently
- Works over WAN/high-latency links

**Cons:**
- WinRM must be enabled on eKVM (port 5985/5986)
- Requires TrustedHosts config or Kerberos delegation
- Initial configuration complexity

**Implementation:**
```powershell
$session = New-PSSession -ComputerName ekvm-01 -Credential $cred
Copy-Item -Path "C:\Staging\firmware.exe" -Destination "C:\Temp\" -ToSession $session
Remove-PSSession $session
```

### Option 4: SMB File Share ✅

**Description:** Temporary SMB share on eKVM; jumper connects as client.

**Pros:**
- Familiar to Windows admins
- High performance for large files (SMB 3.1.1 RDMA)
- Native to Windows (no additional software)
- Supports encryption (SMB 3.1.1+)

**Cons:**
- Requires SMB port 445 (often blocked for security)
- Share must be created/removed per device (manual overhead)
- Risk of misconfigured share permissions
- Not as scriptable as WinRM

**Implementation:**
```powershell
# On eKVM
New-SmbShare -Name "Update$" -Path "C:\Temp" -FullAccess "LVHN\admin" -EncryptData $true

# On jumper
Copy-Item -Path "C:\Staging\firmware.exe" -Destination "\\ekvm-01\Update$\"

# On eKVM (cleanup)
Remove-SmbShare -Name "Update$" -Force
```

### Option 5: FTP/SFTP ❌

**Description:** FTP server on eKVM or jumper for file transfer.

**Pros:**
- Well-known protocol
- Cross-platform support

**Cons:**
- Requires additional server software (IIS FTP, FileZilla, etc.)
- Violates "no new agents" if client installed on eKVM
- FTP is insecure (plaintext); SFTP adds complexity
- Not native to Windows (requires setup)
- **Rejected** due to additional software requirement

## Decision Matrix

| Scenario | Recommended Path | Ports Required |
|----------|------------------|----------------|
| Jumper has internet | 1 (HTTPS) → 3 (WinRM) | 443, 5986 |
| Air-gapped environment | 2 (RDP) → 3 (WinRM) | 3389, 5986 |
| WinRM not available | 1 or 2 → 4 (SMB) | 443/3389, 445 |
| Large files (>500 MB) | 1 (HTTPS) → 4 (SMB) | 443, 445 |

## Links

- [Related ADR-001](./ADR-001-jumper-server-architecture.md) - Jumper Server Architecture
- [Related ADR-005](./ADR-005-integrity-verification.md) - SHA-256 Verification
- [Microsoft WinRM Documentation](https://learn.microsoft.com/en-us/windows/win32/winrm/portal)
- [SMB Security Enhancements](https://learn.microsoft.com/en-us/windows-server/storage/file-server/smb-security)

## Notes

- **Mandatory**: SHA-256 verification after EVERY transfer (regardless of method)
- **Mandatory**: AV/EDR scan on jumper server before transfer to eKVM
- Consider scripted approach: detect internet availability, auto-select method 1 or 2
- Future enhancement: Azure Blob Storage with SAS tokens for large file distribution
- Document fallback decision tree in operator runbook
