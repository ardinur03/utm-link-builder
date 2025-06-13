
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link as LinkIcon, Tag, Tags, Target, Sparkles, Copy } from 'lucide-react';

const utmSourceOptions = [
  "google", "blog", "gmail", "email", "youtube", "tiktok", "instagram", 
  "facebook", "linkedin", "whatsapp", "twitter", "zoom", "direct", 
  "meta_ads", "google_ads", "tiktok_ads"
];

export default function Home() {
  const [baseUrl, setBaseUrl] = useState('');
  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const { toast } = useToast();

  const handleGenerateLink = () => {
    if (!baseUrl.trim()) {
      toast({
        title: "Error",
        description: "Base URL is required.",
        variant: "destructive",
      });
      setGeneratedUrl("");
      return;
    }

    if (!utmSource) {
      toast({
        title: "Error",
        description: "UTM Source is required.",
        variant: "destructive",
      });
      setGeneratedUrl("");
      return;
    }

    try {
      // Check if baseUrl is a valid URL structure before attempting to parse
      // A simple check for protocol, can be enhanced
      if (!baseUrl.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/i) && !baseUrl.match(/^www\.[^\s/$.?#].[^\s]*$/i) && !baseUrl.match(/^[^\s/$.?#].[^\s]*\.[^\s/$.?#]{2,}/i)  ) {
         // if it doesn't have http/https, try adding it
         if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
            const tempUrl = `https://${baseUrl}`;
             if (!tempUrl.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/i)) {
                throw new Error("Invalid URL structure");
             }
         } else {
            throw new Error("Invalid URL structure");
         }
      }
      
      const url = new URL(baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`);

      if (utmSource.trim()) url.searchParams.set("utm_source", utmSource.trim());
      else url.searchParams.delete("utm_source"); // Should not happen if required
      
      if (utmMedium.trim()) url.searchParams.set("utm_medium", utmMedium.trim());
      else url.searchParams.delete("utm_medium");

      if (utmCampaign.trim()) url.searchParams.set("utm_campaign", utmCampaign.trim());
      else url.searchParams.delete("utm_campaign");

      setGeneratedUrl(url.toString());
      toast({
        title: "Success!",
        description: "UTM link generated successfully.",
      });
    } catch (error) {
      console.error("Error generating UTM link:", error);
      toast({
        title: "Error",
        description: "Invalid Base URL. Please enter a valid URL (e.g., https://example.com).",
        variant: "destructive",
      });
      setGeneratedUrl("");
    }
  };

  const handleCopyToClipboard = () => {
    if (!generatedUrl) return;
    navigator.clipboard.writeText(generatedUrl)
      .then(() => {
        toast({
          title: "Copied!",
          description: "Generated link copied to clipboard.",
        });
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
        toast({
          title: "Error",
          description: "Failed to copy link to clipboard.",
          variant: "destructive",
        });
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8 font-body">
      <Card className="w-full max-w-2xl shadow-xl rounded-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-headline text-center text-primary">
            Ebizmark UTM Link Generator
          </CardTitle>
          <CardDescription className="text-center pt-1 text-muted-foreground">
            Easily create tracked campaign links with UTM parameters.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="baseUrl" className="text-foreground">Base URL*</Label>
            <div className="flex items-center space-x-2">
              <LinkIcon className="h-5 w-5 text-accent flex-shrink-0" />
              <Input 
                id="baseUrl" 
                placeholder="https://example.com" 
                value={baseUrl} 
                onChange={(e) => setBaseUrl(e.target.value)}
                className="focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="utmSource" className="text-foreground">UTM Source*</Label>
            <div className="flex items-center space-x-2">
              <Tag className="h-5 w-5 text-accent flex-shrink-0" />
              <Select value={utmSource} onValueChange={setUtmSource}>
                <SelectTrigger id="utmSource" className="focus:ring-primary focus:border-primary">
                  <SelectValue placeholder="Select a source" />
                </SelectTrigger>
                <SelectContent>
                  {utmSourceOptions.map(option => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="utmMedium" className="text-foreground">UTM Medium</Label>
            <div className="flex items-center space-x-2">
              <Tags className="h-5 w-5 text-accent flex-shrink-0" />
              <Input 
                id="utmMedium" 
                placeholder="e.g., cpc, email" 
                value={utmMedium} 
                onChange={(e) => setUtmMedium(e.target.value)}
                className="focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="utmCampaign" className="text-foreground">UTM Campaign</Label>
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-accent flex-shrink-0" />
              <Input 
                id="utmCampaign" 
                placeholder="e.g., summer_sale, product_launch" 
                value={utmCampaign} 
                onChange={(e) => setUtmCampaign(e.target.value)}
                className="focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          
          <Button onClick={handleGenerateLink} className="w-full text-base py-3 active:scale-[0.98] transition-transform duration-100 ease-in-out">
            <Sparkles className="mr-2 h-5 w-5" /> Generate Link
          </Button>

          {generatedUrl && (
            <div className="space-y-2 pt-4 border-t border-border">
              <Label htmlFor="generatedUrl" className="text-foreground">Generated UTM Link</Label>
              <div className="flex items-center space-x-2">
                <Input 
                  id="generatedUrl" 
                  value={generatedUrl} 
                  readOnly 
                  className="bg-muted border-muted-foreground/30 text-foreground"
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleCopyToClipboard} 
                  aria-label="Copy to clipboard"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground active:scale-[0.98] transition-transform duration-100 ease-in-out"
                >
                  <Copy className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

