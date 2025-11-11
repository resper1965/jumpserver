'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/button';

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });

      // Redirect to login page
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      disabled={loading}
      title="Sign out"
    >
      <LogOut className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
}
