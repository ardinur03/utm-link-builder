
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogIn, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!username || !password) {
      setError("Username and password are required.");
      setIsLoading(false);
      toast({
        title: "Login Failed",
        description: "Username and password are required.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const response = await fetch('https://ebizmark.info/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || data.error || `Server responded with ${response.status}`;
        throw new Error(errorMessage);
      }

      toast({
        title: "Login Successful",
        description: "Redirecting to dashboard...",
      });
      router.push('/dashboard');

    } catch (err: any) {
      const errorMessage = err.message || "An unexpected error occurred. Please try again.";
      setError(errorMessage);
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8 font-body">
      <Card className="w-full max-w-md shadow-xl rounded-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-headline text-center text-primary">
            Login
          </CardTitle>
          <CardDescription className="text-center pt-1 text-muted-foreground">
            Access your Ebizmark UTM Dashboard.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground">Username</Label>
              <Input 
                id="username" 
                placeholder="Enter your username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                className="focus:ring-primary focus:border-primary"
                disabled={isLoading}
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <Input 
                id="password" 
                type="password"
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="focus:ring-primary focus:border-primary"
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>
            {error && (
              <div className="flex items-center text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full text-base py-3 active:scale-[0.98] transition-transform duration-100 ease-in-out" disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" /> Login
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
