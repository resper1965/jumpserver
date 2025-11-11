---
name: Bug Report
about: Report a technical issue or defect
title: '[BUG] '
labels: bug, needs-triage
assignees: ''
---

## Bug Description

**Summary:**
<!-- A clear and concise description of the bug -->

**Impact:**
<!-- Select one: Critical / High / Medium / Low -->
- [ ] Critical (system outage, data loss, security vulnerability)
- [ ] High (major feature broken, workaround difficult)
- [ ] Medium (feature partially broken, workaround available)
- [ ] Low (cosmetic issue, no functional impact)

**Affected Component:**
<!-- Select all that apply -->
- [ ] Jumper Server
- [ ] eKVM Device
- [ ] Network/Firewall
- [ ] WinRM Configuration
- [ ] RDP Configuration
- [ ] File Transfer Process
- [ ] Documentation
- [ ] Other: ___________

---

## Reproduction Steps

**Steps to reproduce:**
1.
2.
3.

**Expected behavior:**
<!-- What should happen? -->

**Actual behavior:**
<!-- What actually happened? -->

---

## Environment

**Change Ticket:** CHG_______
**Date/Time:** YYYY-MM-DD HH:MM
**Operator:** @username

**System Information:**
- Jumper Server OS: Windows Server _____ (Build _____)
- eKVM Device: Hostname: _____ | IP: _____ | OS Version: _____
- Network Path: [ ] VPN → Jumper → eKVM  [ ] Other: _____

---

## Evidence

**Logs:**
<!-- Attach or paste relevant logs -->
```
[Paste logs here]
```

**Screenshots:**
<!-- Attach screenshots if applicable -->

**Event IDs:**
<!-- List relevant Windows Event IDs -->
- Security Log: Event ID _____
- Application Log: Event ID _____
- TerminalServices Log: Event ID _____

**Error Messages:**
```
[Paste error messages here]
```

---

## Troubleshooting Attempted

**Actions taken:**
- [ ] Reviewed runbook: [Runbook Name]
- [ ] Checked Event Viewer logs
- [ ] Verified network connectivity
- [ ] Restarted services: [Service Name]
- [ ] Other: ___________

**Workaround (if any):**
<!-- Describe temporary workaround -->

---

## Additional Context

**Related Issues:**
<!-- Link to related issues: #123 -->

**Related Change Tickets:**
<!-- CHG0012345 -->

**Notes:**
<!-- Any additional information -->

---

## Checklist

- [ ] Evidence package attached or linked
- [ ] Severity/impact accurately assessed
- [ ] Rollback performed (if applicable)
- [ ] Incident reported to LVHN IT (if High/Critical)
- [ ] Lessons learned documented
