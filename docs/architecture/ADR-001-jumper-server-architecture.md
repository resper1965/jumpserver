# ADR-001: Windows Jumper Server Architecture

**Status:** Accepted

**Date:** 2025-11-11

**Deciders:** LVHN IT Leadership, Ionic Engineering Team

**Technical Story:** Core architectural pattern for remote eKVM access

---

## Context and Problem Statement

LVHN requires a secure, auditable method to perform remote updates on eKVM devices without installing additional agents (specifically removing Atera dependency). The solution must work within existing LVHN infrastructure and comply with healthcare security requirements (HIPAA, Joint Commission).

## Decision Drivers

- **Security**: Minimize attack surface; no new agents on clinical endpoints
- **Auditability**: Complete audit trail for all remote access
- **Existing Infrastructure**: Leverage LVHN's SSL VPN and Windows expertise
- **Network Segmentation**: Maintain separation between clinical and maintenance networks
- **MFA Requirement**: Multi-factor authentication for all remote access
- **Compliance**: Meet healthcare regulatory requirements

## Considered Options

1. **Option 1: Direct VPN to eKVM devices**
2. **Option 2: Bastion/Jumper Server Architecture**
3. **Option 3: Cloud-Based Jump Host (Azure/AWS)**

## Decision Outcome

**Chosen option:** "Option 2: Bastion/Jumper Server Architecture"

**Rationale:** A dedicated Windows jumper server provides:
- Single point of access control and logging
- LVHN maintains full operational control
- Works with existing SSL VPN infrastructure
- No data leaves LVHN network perimeter
- Familiar technology stack (Windows Server, RDP, WinRM)
- Clear separation of responsibilities (LVHN owns jumpser security)

### Positive Consequences

- Centralized audit logging at jumper server
- Network scoping simplified (only jumper IP → eKVM)
- MFA enforcement at two layers (VPN + jumper)
- SIEM integration straightforward (single log source)
- Time-boxed access easily enforced (enable/disable network rules)
- No PHI/PII leaves controlled environment

### Negative Consequences

- LVHN must harden and maintain jumper server
- Additional infrastructure to manage
- Potential single point of failure (mitigated by HA configuration)
- Requires LVHN IT resources for ongoing operations

## Pros and Cons of the Options

### Option 1: Direct VPN to eKVM Devices

**Description:** Operators connect via SSL VPN directly to eKVM management network.

**Pros:**
- Simpler architecture (no jumper server)
- Lower infrastructure overhead
- Direct connection (fewer hops)

**Cons:**
- No centralized audit point
- Network scoping complex (multiple operator IPs)
- Difficult to enforce time-boxed access
- MFA only at VPN layer
- Harder to monitor and detect anomalies
- Violates principle of least privilege

### Option 2: Bastion/Jumper Server Architecture ✅

**Description:** Dedicated Windows Server acts as intermediary between SSL VPN and eKVM devices.

**Pros:**
- Single audit/logging point
- Network scoping simplified (one source IP)
- Additional MFA layer possible
- SIEM integration easier
- Time-boxed access enforcement straightforward
- Clear ownership model (LVHN owns jumper)
- Familiar Windows technology

**Cons:**
- Additional server to harden and maintain
- LVHN IT resource commitment
- Potential single point of failure
- Introduces additional network hop

### Option 3: Cloud-Based Jump Host (Azure/AWS)

**Description:** Use managed cloud service (Azure Bastion, AWS Systems Manager Session Manager).

**Pros:**
- Managed service (less operational overhead)
- Built-in logging and MFA
- High availability built-in
- Regular security updates from cloud provider

**Cons:**
- PHI/PII may traverse cloud (HIPAA BAA required)
- Egress costs for large file transfers
- Requires cloud infrastructure (LVHN may not have)
- Less control over security configuration
- Dependency on external provider
- May violate LVHN data residency policies

## Links

- [Related Proposal](../proposal/LVHN-eKVM-Remote-Update-Proposal.md) - Section 4: Architecture
- [NIST SP 800-53 AC-17](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final) - Remote Access Controls

## Notes

- Jumper server should be on isolated VLAN with minimal connectivity
- Consider high availability configuration for production (active/passive Windows cluster)
- Implement host-based firewall rules on jumper server (allow only required outbound ports)
- Regular vulnerability scanning required (weekly during pilot, monthly post-rollout)
- Disaster recovery: Document jumper server rebuild procedure (target: 4-hour RTO)
