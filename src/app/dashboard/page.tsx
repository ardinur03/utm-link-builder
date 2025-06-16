
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Your Dashboard</CardTitle>
          <CardDescription>Manage your UTM links and campaigns efficiently.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            This is your central hub for all UTM-related activities. You can generate new links,
            view campaign performance (feature to be added), and manage your settings.
          </p>
          <Link href="/" passHref>
            <Button>Go to UTM Generator</Button>
          </Link>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Overview of your recent activity (placeholder).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <h3 className="text-lg font-medium">Links Generated Today: <span className="text-primary">12</span></h3>
            </div>
            <div>
              <h3 className="text-lg font-medium">Active Campaigns: <span className="text-primary">5</span></h3>
            </div>
            <div>
              <h3 className="text-lg font-medium">Total Clicks Tracked: <span className="text-primary">1,234</span></h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Links</CardTitle>
            <CardDescription>Your most recently created UTM links (placeholder).</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>https://example.com?utm_source=google...</li>
              <li>https://example.com?utm_source=facebook...</li>
              <li>https://example.com?utm_source=email...</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
