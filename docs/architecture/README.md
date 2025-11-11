# Architecture Decision Records (ADRs)

This directory contains Architecture Decision Records for the LVHN eKVM Remote Update project.

## What is an ADR?

An Architecture Decision Record (ADR) captures an important architectural decision made along with its context and consequences.

## ADR Index

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [ADR-001](./ADR-001-jumper-server-architecture.md) | Windows Jumper Server Architecture | Accepted | 2025-11-11 |
| [ADR-002](./ADR-002-no-atera-agent.md) | Remove Atera Agent Dependency | Accepted | 2025-11-11 |
| [ADR-003](./ADR-003-file-transfer-methods.md) | File Transfer Methods Selection | Accepted | 2025-11-11 |
| [ADR-004](./ADR-004-rdp-primary-protocol.md) | RDP as Primary Management Protocol | Accepted | 2025-11-11 |
| [ADR-005](./ADR-005-integrity-verification.md) | SHA-256 Integrity Verification | Accepted | 2025-11-11 |
| [ADR-006](./ADR-006-time-boxed-access.md) | Time-Boxed JIT Access Model | Accepted | 2025-11-11 |
| [ADR-007](./ADR-007-logging-audit-strategy.md) | Comprehensive Logging and Audit Strategy | Accepted | 2025-11-11 |

## ADR Statuses

- **Proposed**: ADR is under discussion
- **Accepted**: ADR has been approved and is being implemented
- **Deprecated**: ADR is no longer valid (replaced by another ADR)
- **Superseded**: ADR has been replaced by a newer ADR
- **Rejected**: ADR was proposed but rejected

## Creating a New ADR

Use the template: `ADR-TEMPLATE.md`

```bash
cp docs/architecture/ADR-TEMPLATE.md docs/architecture/ADR-XXX-your-title.md
```

## Further Reading

- [ADR GitHub Organization](https://adr.github.io/)
- [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
