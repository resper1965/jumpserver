import './globals.css';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['500', '600'], display: 'swap', variable: '--font-mont' });

export const metadata: Metadata = {
  title: 'Ionic Health – LVHN Documentation Portal',
  description:
    'Centralized documentation for the LVHN jumper server engagement, built using the Pinexio template.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} bg-slate-950 text-slate-200`}>
      <body className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-925 to-slate-900 font-sans">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-12 sm:px-10">
          <header className="flex flex-col gap-2 border-b border-slate-800 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">Ionic Health</p>
              <h1 className="font-display text-3xl font-semibold text-slate-50 sm:text-4xl">
                LVHN eKVM Remote Update Portal
              </h1>
            </div>
            <span className="rounded-full border border-primary-500 px-4 py-1 text-xs uppercase tracking-wide text-primary-400">
              Powered by Pinexio Template
            </span>
          </header>
          <main className="flex-1 py-10">{children}</main>
          <footer className="border-t border-slate-800 pt-6 text-sm text-slate-500">
            <p>
              Ionic Health &mdash; Documentation portal generated from markdown sources. Contact the project team for
              access support.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
