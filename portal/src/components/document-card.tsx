import { DocumentLink } from '../lib/documents';
import { ArrowUpRight, FileText } from 'lucide-react';

export function DocumentCard({ doc }: { doc: DocumentLink }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-925/60 p-6 transition hover:border-primary-500/80 hover:bg-slate-900/60">
      <div className="flex items-start gap-4">
        <div className="rounded-xl border border-primary-500/40 bg-primary-500/10 p-3 text-primary-400">
          <FileText className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-50">
            {doc.title}
            <ArrowUpRight className="h-4 w-4 text-primary-400 opacity-0 transition group-hover:opacity-100" />
          </h2>
          <p className="mt-2 text-sm text-slate-400">{doc.description}</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">Audience: {doc.audience}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <a
          className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-slate-200 transition hover:border-primary-500 hover:text-primary-400"
          href={doc.markdownUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          View Markdown
        </a>
        <a
          className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-slate-200 transition hover:border-primary-500 hover:text-primary-400"
          href={doc.pdfUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          Download PDF
        </a>
      </div>
    </article>
  );
}
