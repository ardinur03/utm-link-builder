
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>Manage your application preferences and settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="profileName">Profile Name</Label>
            <Input id="profileName" placeholder="Your Name" defaultValue="Ebizmark User" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profileEmail">Email Address</Label>
            <Input id="profileEmail" type="email" placeholder="your@email.com" defaultValue="user@ebizmark.info" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="notifications-switch" />
            <Label htmlFor="notifications-switch">Enable Email Notifications</Label>
          </div>

           <div className="flex items-center space-x-2">
            <Switch id="darkmode-switch" disabled />
            <Label htmlFor="darkmode-switch">Enable Dark Mode (Coming Soon)</Label>
          </div>

          <div>
            <Button>Save Settings</Button>
          </div>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>Account Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
           <div>
            <Button variant="outline">Change Password</Button>
          </div>
           <div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
