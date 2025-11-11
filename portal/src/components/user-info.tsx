'use client';

import * as React from 'react';
import { User } from 'lucide-react';

interface UserInfo {
  id: string;
  username: string;
  email: string;
  name: string;
  role: string;
}

export function UserInfo() {
  const [user, setUser] = React.useState<UserInfo | null>(null);

  React.useEffect(() => {
    // Fetch current user info
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch((error) => {
        console.error('Error fetching user info:', error);
      });
  }, []);

  if (!user) {
    return (
      <div className="flex items-center gap-2 animate-pulse">
        <div className="h-8 w-8 rounded-full bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-20 bg-muted rounded" />
          <div className="h-2 w-32 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
        {user.name ? (
          <span className="text-xs font-bold">
            {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
          </span>
        ) : (
          <User className="h-4 w-4" />
        )}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-medium truncate">
          {user.name}
        </span>
        <span className="text-xs text-muted-foreground truncate">
          {user.email}
        </span>
      </div>
    </>
  );
}
