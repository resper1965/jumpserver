# ADR-005: SHA-256 Integrity Verification

**Status:** Accepted

**Date:** 2025-11-11

**Deciders:** Ionic Engineering Team, LVHN IT Security, LVHN Compliance

**Technical Story:** Mandatory integrity verification for all eKVM update binaries

---

## Context and Problem Statement

Update binaries transferred across multiple hops (Ionic CDN → jumper → eKVM) must be verified for integrity and authenticity. Compromised or corrupted binaries pose critical risks in healthcare environments (patient safety, HIPAA violations, device malfunction). A cryptographic hash verification method is required that is audit-ready, scriptable, and resistant to collision attacks.

## Decision Drivers

- **Security**: Detect tampering, malware injection, or man-in-the-middle attacks
- **Compliance**: Satisfy audit requirements for software provenance (FDA 21 CFR Part 11, HIPAA)
- **Reliability**: Detect file corruption during download/transfer
- **Industry Standard**: Use widely-accepted cryptographic methods
- **Scriptability**: Automate verification in PowerShell/Bash
- **Evidence**: Hash values must be logged and retained for audit

## Considered Options

1. **Option 1: SHA-256 hash verification**
2. **Option 2: MD5 checksum**
3. **Option 3: Code signing (Authenticode) only**
4. **Option 4: No verification (trust network security)**

## Decision Outcome

**Chosen option:** "Option 1: SHA-256 hash verification (with optional Authenticode)"

**Rationale:**
- SHA-256 is industry standard (NIST-approved, FIPS 140-2 compliant)
- Collision-resistant (no practical collision attacks)
- Supported natively in PowerShell (`Get-FileHash`)
- Fast computation (seconds for 500 MB file)
- Small hash size (64 hex characters) for logging/comparison
- Mandatory verification at THREE stages: post-download, post-transfer-to-jumper, post-transfer-to-eKVM
- Optional code signing adds second layer (verify publisher identity)

### Positive Consequences

- High confidence in binary integrity
- Detects tampering at any stage (CDN, jumper, eKVM)
- Audit-ready (hash values logged in evidence package)
- Scriptable verification (PowerShell one-liner)
- Industry-standard method (recognized by auditors)
- No additional tools required (built into Windows)
- FIPS 140-2 compliant (meets federal requirements)

### Negative Consequences

- SHA-256 computation adds 1-2 seconds per verification (negligible)
- Requires Ionic to publish official hashes alongside binaries
- Operator must compare 64-character hex strings (mitigated by scripting)
- Hash mismatch blocks installation (must troubleshoot and re-download)

## Pros and Cons of the Options

### Option 1: SHA-256 Hash Verification ✅

**Description:** Compute SHA-256 hash of binary; compare to official hash published by Ionic.

**Pros:**
- Industry standard (NIST FIPS 180-4)
- No known practical collision attacks
- Fast computation (native CPU support)
- Built into PowerShell/Windows (`Get-FileHash -Algorithm SHA256`)
- 256-bit security (quantum-resistant for foreseeable future)
- Audit-compliant (FDA, HIPAA, SOC 2)

**Cons:**
- Requires Ionic to publish hashes securely (HTTPS with authentication)
- 1-2 second computation overhead per file
- Manual comparison error-prone (mitigated by scripting)

**Implementation:**
```powershell
$expectedHash = "a1b2c3d4e5f6...def123456"  # From Ionic
$actualHash = (Get-FileHash -Path "firmware.exe" -Algorithm SHA256).Hash
if ($actualHash -ne $expectedHash) {
    Write-Error "HASH MISMATCH! File integrity compromised."
    exit 1
}
```

### Option 2: MD5 Checksum ❌

**Description:** Compute MD5 hash for integrity verification.

**Pros:**
- Faster than SHA-256 (but only marginally on modern hardware)
- Smaller hash size (32 hex characters)
- Widely supported

**Cons:**
- **Cryptographically broken** (collision attacks practical since 2004)
- Not acceptable for security-critical applications
- Rejected by compliance auditors (not FIPS-approved)
- **Rejected** due to known vulnerabilities

### Option 3: Code Signing (Authenticode) Only ❌

**Description:** Rely solely on Windows Authenticode digital signatures.

**Pros:**
- Verifies publisher identity (not just integrity)
- Timestamped (signature valid even after cert expiration)
- Native Windows validation (`Get-AuthenticodeSignature`)
- Visible in file properties (right-click → Digital Signatures)

**Cons:**
- Requires Ionic to maintain code signing certificate (cost, operational overhead)
- Does not detect corruption (only tampering with signature)
- File can be modified after signing if signature not checked programmatically
- Signature can be valid even if file is corrupted
- **Not sufficient alone**; should be used **in addition** to hash verification

### Option 4: No Verification ❌

**Description:** Trust network security controls; assume files are not tampered with.

**Pros:**
- No overhead
- Simplest implementation

**Cons:**
- **Unacceptable risk** in healthcare environment
- No detection of man-in-the-middle attacks
- No detection of corruption during transfer
- Audit failure (no evidence of integrity verification)
- **Rejected** due to unacceptable risk

## Verification Stages

| Stage | System | Verification | Log Evidence |
|-------|--------|--------------|--------------|
| 1. Post-Download | Jumper Server | SHA-256 vs. published hash | `01_Hashes_Pre_Transfer.txt` |
| 2. Post-Transfer | Jumper Server | Re-verify (detect corruption) | `02_Transfer_Logs.txt` |
| 3. Pre-Install | eKVM | SHA-256 vs. published hash | `03_Hashes_Post_Transfer.txt` |
| 4. Optional | Jumper + eKVM | Authenticode signature check | `04_Code_Signature.txt` |

## Hash Publication and Distribution

**Ionic Responsibilities:**
1. Compute SHA-256 hash of every release binary
2. Publish hash on secure portal (HTTPS, authentication required)
3. Include hash in release notes and change documentation
4. Example format:
   ```
   Filename: eKVM-Firmware-v3.2.1.exe
   Version: 3.2.1
   Release Date: 2025-11-11
   SHA-256: a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456
   Code Signature: Valid (Ionic Inc. - Valid until 2026-05-15)
   ```

**LVHN Responsibilities:**
1. Retrieve official hash from Ionic portal before maintenance window
2. Store hash in change ticket and MOP
3. Script automated comparison (no manual typing of hash)
4. Log all hash verifications in evidence package

## Links

- [Related ADR-003](./ADR-003-file-transfer-methods.md) - File Transfer Methods
- [NIST FIPS 180-4 (SHA-256)](https://csrc.nist.gov/publications/detail/fips/180/4/final)
- [FDA Guidance on Software Validation](https://www.fda.gov/medical-devices/software-medical-device-samd/general-principles-software-validation)

## Notes

- **Mandatory**: Hash verification must pass at all three stages; failure = abort installation
- Consider publishing hashes via multiple channels (website + PGP-signed email)
- Future enhancement: Implement GPG signature verification for hash file itself
- Document hash mismatch troubleshooting procedure (re-download, check network, contact Ionic)
- Retain evidence of hash verification for 6+ years (audit requirement)
