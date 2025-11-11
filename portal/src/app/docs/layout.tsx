'use client';

import React from 'react';
import Link from 'next/link';
import { sidebarNav } from '../../../config/sidebar';
import {
  SidebarProvider,
  SidebarLayout,
  MainContent,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarHeaderLogo,
  SidebarHeaderTitle,
  UserAvatar,
  NestedLink,
} from '@/components/sidebar';
import { Github } from 'lucide-react';
import Header from '@/components/header';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/button';
import { useIsMobile } from '@/hooks/use-mobile';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();

  return (
    <SidebarLayout>
      <SidebarProvider
        defaultOpen={!isMobile}
        defaultSide="left"
        defaultMaxWidth={280}
        showIconsOnCollapse={true}
      >
        <Sidebar>
          <SidebarHeader>
            <SidebarHeaderLogo
              logo={
                <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  IH
                </div>
              }
            />
            <Link href={'/'} className="flex flex-1 gap-3">
              <SidebarHeaderTitle>
                LVHN Portal
              </SidebarHeaderTitle>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            {sidebarNav.map((section) => (
              <SidebarMenuItem
                isCollapsable={section.pages && section.pages.length > 0}
                key={section.title}
                label={section.title}
                href={section.href}
                icon={section.icon}
                defaultOpen={section.defaultOpen}
              >
                {section.pages?.map((page) => (
                  <NestedLink key={page.href} href={page.href}>
                    {page.title}
                  </NestedLink>
                ))}
              </SidebarMenuItem>
            ))}
          </SidebarContent>

          <SidebarFooter>
            <UserAvatar className="bg-primary text-primary-foreground">
              <span className="text-xs font-bold">IH</span>
            </UserAvatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                Ionic Health
              </span>
              <span className="text-xs text-muted-foreground">
                raraujo@ionic.health
              </span>
            </div>
          </SidebarFooter>
        </Sidebar>

        <MainContent>
          <Header className="justify-between py-2">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-bold">LVHN eKVM Documentation</h1>
            </div>
            <div className="flex gap-2 items-center pr-0 lg:pr-8">
              <ModeToggle />
              <Button onClick={() => window.open('https://github.com/resper1965/jumpserver', '_blank')}>
                <Github className="h-[1.2rem] w-[1.2rem] transition-all" />
              </Button>
            </div>
          </Header>
          <main className="overflow-auto p-6">{children}</main>
        </MainContent>
      </SidebarProvider>
    </SidebarLayout>
  );
}
