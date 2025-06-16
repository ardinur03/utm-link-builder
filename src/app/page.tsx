
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();
  // No explicit loading state needed, redirection should be quick.
  // A simple fallback UI can be added if redirection takes noticeable time.

  useEffect(() => {
    // localStorage is only available on the client-side.
    const token = localStorage.getItem('access_token');
    if (token) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <p className="text-lg text-foreground">Redirecting...</p>
      {/* This content will be briefly visible while redirecting. */}
    </main>
  );
}
