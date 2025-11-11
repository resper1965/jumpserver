"use client";

import { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';

type SubmitState = 'idle' | 'success' | 'error';

type FieldConfig = {
  name: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'textarea' | 'select';
  options?: { value: string; label: string }[];
  required?: boolean;
  help?: string;
};

type SectionConfig = {
  id: string;
  title: string;
  description?: string;
  fields: FieldConfig[];
};

const sections: SectionConfig[] = [
  {
    id: 'jumper',
    title: '1. Jumper Server Deployment',
    description: 'Required details for the LVHN-operated Windows jumper server.',
    fields: [
      { name: 'jumperHostname', label: 'Hostname / FQDN *', required: true, placeholder: 'jumper-server-01.lvhn.local' },
      { name: 'jumperLocation', label: 'Physical or Virtual Location *', required: true, placeholder: 'Data Center A' },
      { name: 'windowsVersion', label: 'Windows Server Version *', required: true, placeholder: 'Windows Server 2022 Standard' },
      { name: 'patchStatus', label: 'Current Patch Level', placeholder: 'Latest cumulative update applied: 2025-10' },
      { name: 'hardeningBaseline', label: 'Hardening Baseline Applied', placeholder: 'CIS Level 1 + Microsoft SCT' },
      { name: 'localAdminContact', label: 'Local Admin Contact (Name / Email) *', required: true, placeholder: 'Jane Smith – jane.smith@lvhn.org' },
      { name: 'backupCapability', label: 'Backup or Snapshot Capability', placeholder: 'E.g., nightly snapshots via VMware SRM' }
    ]
  },
  {
    id: 'access',
    title: '2. Connectivity Path',
    description: 'How Ionic operators reach the jumper server and the eKVM devices.',
    fields: [
      {
        name: 'accessMethod',
        label: 'Access Method *',
        type: 'select',
        required: true,
        options: [
          { value: 'ssl-vpn', label: 'SSL VPN' },
          { value: 'dedicated', label: 'Dedicated network access' },
          { value: 'other', label: 'Other' }
        ]
      },
      { name: 'vpnGateway', label: 'VPN / Access Gateway (Hostname or URL) *', required: true, placeholder: 'vpn.lvhn.org' },
      { name: 'authenticationMethod', label: 'Authentication Method *', required: true, placeholder: 'Active Directory with SAML federation' },
      { name: 'mfaProvider', label: 'MFA Provider *', required: true, placeholder: 'Microsoft Authenticator' },
      {
        name: 'ekvmConnectivity',
        label: 'Can jumper reach Ionic eKVM public IPs during the window? *',
        type: 'select',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'pending', label: 'Pending validation' }
        ]
      },
      { name: 'firewallContact', label: 'Firewall/ACL Change Contact (Name / Email / Phone) *', required: true, placeholder: 'Network Operations – netops@lvhn.org – +1 555-0100' },
      { name: 'proxyDetails', label: 'Proxy Required for Outbound HTTPS?', placeholder: 'If yes, provide host, port, and auth method.' }
    ]
  },
  {
    id: 'identity',
    title: '3. Identity & Access',
    description: 'Controls for named, time-boxed accounts.',
    fields: [
      { name: 'directoryService', label: 'Directory Service *', required: true, placeholder: 'LVHN Active Directory (lvhn.local)' },
      { name: 'jitProcess', label: 'Process to Provision JIT Accounts *', required: true, placeholder: 'ServiceNow request: template CHG-JIT-ACCESS' },
      { name: 'leadTime', label: 'Minimum Lead Time to Enable Accounts *', required: true, placeholder: '48 hours' },
      { name: 'expiryPolicy', label: 'Account Expiry Policy *', required: true, placeholder: 'Auto-disable 1 hour after maintenance window' },
      {
        name: 'pamInUse',
        label: 'Privileged Access Management Tool',
        placeholder: 'If applicable (e.g., CyberArk, BeyondTrust). Indicate if not used.'
      },
      { name: 'siemContact', label: 'SIEM Contact (Email)', placeholder: 'siem@lvhn.org' }
    ]
  },
  {
    id: 'maintenance',
    title: '4. Maintenance Windows',
    description: 'Change control information for scheduling.',
    fields: [
      { name: 'changeSystem', label: 'Change Management System *', required: true, placeholder: 'ServiceNow' },
      { name: 'standardWindow', label: 'Standard Maintenance Window (Days / Times) *', required: true, placeholder: 'Sundays 01:00–04:00 ET' },
      { name: 'noticePeriod', label: 'Required Notice for Window Approval *', required: true, placeholder: '5 business days' },
      { name: 'approver', label: 'Primary Change Approver (Name / Role / Email) *', required: true, placeholder: 'John Doe – Change Manager – john.doe@lvhn.org' },
      { name: 'oncallContact', label: 'On-call Contact During Window (Name / Phone) *', required: true, placeholder: 'Operations Bridge – +1 555-0111' },
      { name: 'evidenceMethod', label: 'Preferred Evidence Submission Method', placeholder: 'Attach to change ticket within 24 hours' }
    ]
  },
  {
    id: 'notes',
    title: '5. Additional Notes',
    description: 'Optional space for constraints, blackout periods, or clarifications.',
    fields: [
      { name: 'additionalNotes', label: 'Notes', type: 'textarea', placeholder: 'Add any information that helps coordination or highlights constraints.' }
    ]
  },
  {
    id: 'approvals',
    title: '6. Approvals',
    description: 'Capture the stakeholders who reviewed the information.',
    fields: [
      { name: 'lvhnOperationsApproval', label: 'LVHN IT Operations (Name / Date)', placeholder: 'Jane Smith – 2025-11-11' },
      { name: 'lvhnComplianceApproval', label: 'LVHN Security / Compliance (Name / Date)', placeholder: 'Mark Lee – 2025-11-12' },
      { name: 'ionicPmApproval', label: 'Ionic Health Project Manager (Name / Date)', placeholder: 'Alex Brown – 2025-11-13' }
    ]
  }
];

const EMAIL_TO = 'ionic.project.manager@ionic.health';

export default function QuestionnaireFormPage() {
  const [status, setStatus] = useState<SubmitState>('idle');
  const [downloadName, setDownloadName] = useState<string | null>(null);

  const mailtoLink = useMemo(() => {
    if (!downloadName) return `mailto:${EMAIL_TO}?subject=LVHN%20Jumper%20Server%20Readiness%20Questionnaire`;
    return `mailto:${EMAIL_TO}?subject=LVHN%20Jumper%20Server%20Readiness%20Questionnaire&body=Attached%20JSON%20file:%20${encodeURIComponent(downloadName)}`;
  }, [downloadName]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      if (typeof value === 'string' && value.trim() !== '') {
        data[key] = value.trim();
      }
    });

    if (Object.keys(data).length === 0) {
      setStatus('error');
      return;
    }

    const filename = `lvhn-jumper-questionnaire-${new Date().toISOString().split('T')[0]}.json`;

    try {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloadName(filename);
      setStatus('success');
      form.reset();
    } catch (error) {
      console.error('Failed to generate download', error);
      setStatus('error');
    }
  };

  return (
    <section className="space-y-10">
      <div className="flex flex-col gap-3 border-b border-slate-800 pb-6">
        <Link href="/" className="text-sm text-primary-400 hover:text-primary-300">
          ← Back to documentation list
        </Link>
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-wide text-primary-400">Interactive Form</p>
          <h2 className="font-display text-3xl font-semibold text-slate-50 sm:text-4xl">
            LVHN Jumper Server Readiness Questionnaire
          </h2>
          <p className="text-sm text-slate-400">
            Complete the required fields below. When you submit, a JSON file containing your answers will be downloaded
            automatically. Email that file back to Ionic Health using the button provided.
          </p>
        </div>
      </div>

      <form className="space-y-10" onSubmit={handleSubmit}>
        {sections.map((section) => (
          <fieldset key={section.id} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/20">
            <legend className="px-2 text-lg font-semibold text-slate-100">{section.title}</legend>
            {section.description ? <p className="mt-2 text-sm text-slate-400">{section.description}</p> : null}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {section.fields.map((field) => (
                <div key={field.name} className="flex flex-col gap-1">
                  <label htmlFor={field.name} className="text-sm font-medium text-slate-200">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="min-h-[120px] rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 shadow-inner focus:border-primary-500 focus:outline-none"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      defaultValue=""
                      className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 focus:border-primary-500 focus:outline-none"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type="text"
                      required={field.required}
                      placeholder={field.placeholder}
                      className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 focus:border-primary-500 focus:outline-none"
                    />
                  )}
                  {field.help ? <p className="text-xs text-slate-500">{field.help}</p> : null}
                </div>
              ))}
            </div>
          </fieldset>
        ))}

        <div className="flex flex-col gap-4 rounded-3xl border border-primary-500/40 bg-primary-500/5 p-6 text-sm text-primary-200">
          <p>
            ✅ After download, attach the JSON file to an email addressed to{' '}
            <a className="underline" href={`mailto:${EMAIL_TO}`}>
              {EMAIL_TO}
            </a>{' '}
            or upload it via the agreed secure channel. The email button below pre-populates the subject line for you.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full border border-primary-500 bg-primary-500/20 px-6 py-2 text-sm font-semibold text-primary-200 transition hover:bg-primary-500/30"
            >
              Download Responses as JSON
            </button>
            <a
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-100 transition hover:border-primary-500 hover:text-primary-300"
              href={mailtoLink}
            >
              Email Ionic Health
            </a>
          </div>
          {status === 'success' && downloadName ? (
            <p className="text-xs text-slate-300">
              File <span className="font-semibold text-primary-300">{downloadName}</span> generated successfully.
            </p>
          ) : null}
          {status === 'error' ? (
            <p className="text-xs text-red-400">Unable to generate the JSON file. Please review the form and try again.</p>
          ) : null}
        </div>
      </form>
    </section>
  );
}
