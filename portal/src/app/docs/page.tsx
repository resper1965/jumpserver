export default function DocsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">LVHN eKVM Remote Update Project</h2>
        <p className="mt-2 text-muted-foreground">
          Complete technical documentation for implementing secure remote updates of Ionic eKVM devices
        </p>
      </div>

      <div className="rounded-lg border p-6 space-y-4">
        <h3 className="text-xl font-semibold">Project Overview</h3>
        <p>
          This repository contains the complete technical documentation, procedures, and architecture decisions
          for implementing secure remote updates of Ionic eKVM devices within the Lehigh Valley Health Network (LVHN) environment.
        </p>
        <p>
          <strong>Objective:</strong> Enable remote eKVM firmware and software updates without Atera agents, using LVHN's SSL VPN
          infrastructure and a dedicated Windows jumper server, while preserving nCommand Lite P2P/WebRTC clinical runtime
          and maintaining full audit compliance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-4">
          <h4 className="font-semibold mb-2">Key Outcomes</h4>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Auditable change process with comprehensive evidence collection</li>
            <li>SHA-256 integrity verification at multiple stages</li>
            <li>Zero impact to clinical operations outside maintenance windows</li>
            <li>HIPAA, NIST SP 800-53, and CIS Controls compliance</li>
          </ul>
        </div>

        <div className="rounded-lg border p-4">
          <h4 className="font-semibold mb-2">Documentation Sections</h4>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Project Documentation & Proposals</li>
            <li>Architecture Decision Records (ADRs)</li>
            <li>Operations & Procedures</li>
            <li>Security & Compliance</li>
            <li>Interactive Tools & Forms</li>
          </ul>
        </div>
      </div>

      <div className="rounded-lg bg-muted p-4">
        <p className="text-sm">
          <strong>Note:</strong> Use the sidebar navigation to explore different sections of the documentation.
          Press <kbd className="px-2 py-1 bg-background rounded border">Ctrl+B</kbd> to toggle the sidebar.
        </p>
      </div>
    </div>
  );
}
