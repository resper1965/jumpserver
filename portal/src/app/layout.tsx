import './globals.css';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['500', '600'], display: 'swap', variable: '--font-mont' });

export const metadata: Metadata = {
  title: 'Ionic Health – LVHN Documentation Portal',
  description:
    'Centralized documentation for the LVHN jumper server engagement with Next.js 15 and React 19.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
