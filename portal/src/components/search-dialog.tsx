'use client';

import * as React from 'react';
import { Search, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/dialog';
import { Button } from '@/components/button';
import { sidebarNav } from '../../config/sidebar';

interface SearchResult {
  title: string;
  href: string;
  category: string;
}

export function SearchDialog() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const router = useRouter();

  // Extract all pages from sidebar config
  const allPages: SearchResult[] = React.useMemo(() => {
    return sidebarNav.flatMap((section) =>
      (section.pages || []).map((page) => ({
        title: page.title,
        href: page.href,
        category: section.title,
      }))
    );
  }, []);

  // Filter pages based on search query
  const filteredPages = React.useMemo(() => {
    if (!query.trim()) return allPages;

    const lowerQuery = query.toLowerCase();
    return allPages.filter(
      (page) =>
        page.title.toLowerCase().includes(lowerQuery) ||
        page.category.toLowerCase().includes(lowerQuery)
    );
  }, [query, allPages]);

  // Handle keyboard shortcut (Ctrl+K)
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (href: string) => {
    setOpen(false);
    setQuery('');
    router.push(href);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span>Search documentation...</span>
        <kbd className="pointer-events-none absolute right-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Search Documentation</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Type to search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-md border bg-background pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                autoFocus
              />
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {filteredPages.length === 0 ? (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  No results found for &quot;{query}&quot;
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredPages.map((page) => (
                    <button
                      key={page.href}
                      onClick={() => handleSelect(page.href)}
                      className="w-full flex items-start gap-3 rounded-md p-3 text-left hover:bg-accent transition-colors"
                    >
                      <FileText className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 space-y-1">
                        <div className="font-medium text-sm">{page.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {page.category}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t pt-3">
              <p className="text-xs text-muted-foreground text-center">
                Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">ESC</kbd> to close •{' '}
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">↑↓</kbd> to navigate
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
