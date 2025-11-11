'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function AdminPage() {
  const router = useRouter();

  React.useEffect(() => {
    router.push('/admin/users');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-pulse text-muted-foreground">Redirecting...</div>
    </div>
  );
}
