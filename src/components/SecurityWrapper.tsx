'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function SecurityWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // If we are in the admin panel, we don't apply these restrictions to allow the admin to work comfortably.
    if (pathname && pathname.startsWith('/admin')) {
      return;
    }

    const preventDefault = (e: Event) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent F12
      if (e.key === 'F12') {
        e.preventDefault();
      }
      
      // Prevent Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Element selector)
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.key === 'i' || e.key === 'j' || e.key === 'c')) {
        e.preventDefault();
      }
      
      // Prevent Ctrl+U (View Source)
      if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
      }
      
      // Prevent Ctrl+S (Save page)
      if (e.ctrlKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
      }
      
      // Prevent Ctrl+P (Print)
      if (e.ctrlKey && (e.key === 'P' || e.key === 'p')) {
        e.preventDefault();
      }
    };

    window.addEventListener('contextmenu', preventDefault);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', preventDefault);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pathname]);

  return <>{children}</>;
}
