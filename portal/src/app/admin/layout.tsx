'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
} from '@/components/sidebar';
import { Shield, Users, Settings } from 'lucide-react';
import Header from '@/components/header';
import { ModeToggle } from '@/components/mode-toggle';
import { LogoutButton } from '@/components/logout-button';
import { UserInfo } from '@/components/user-info';
import { useIsMobile } from '@/hooks/use-mobile';

interface UserInfo {
  id: string;
  username: string;
  email: string;
  name: string;
  role: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [user, setUser] = React.useState<UserInfo | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Check if user is admin
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (!data.user || data.user.role !== 'admin') {
          router.push('/docs');
        } else {
          setUser(data.user);
        }
        setLoading(false);
      })
      .catch(() => {
        router.push('/login');
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

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
                  <Shield className="h-6 w-6" />
                </div>
              }
            />
            <Link href={'/admin'} className="flex flex-1 gap-3">
              <SidebarHeaderTitle>
                Admin Panel
              </SidebarHeaderTitle>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenuItem
              isCollapsable={false}
              label="User Management"
              href="/admin/users"
              icon={<Users className="h-5 w-5" />}
            />
            <SidebarMenuItem
              isCollapsable={false}
              label="Back to Docs"
              href="/docs"
              icon={<Settings className="h-5 w-5" />}
            />
          </SidebarContent>

          <SidebarFooter>
            <UserInfo />
          </SidebarFooter>
        </Sidebar>

        <MainContent>
          <Header className="justify-between py-2">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-bold">Admin Panel</h1>
            </div>
            <div className="flex gap-2 items-center pr-0 lg:pr-8">
              <ModeToggle />
              <LogoutButton />
            </div>
          </Header>
          <main className="overflow-auto p-6">{children}</main>
        </MainContent>
      </SidebarProvider>
    </SidebarLayout>
  );
}
