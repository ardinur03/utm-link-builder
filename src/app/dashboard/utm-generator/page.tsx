
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link as LinkIcon, Tag, Tags, Target, Sparkles, Copy, MessageSquareText } from 'lucide-react';

const utmSourceOptions = [
  "google", "blog", "gmail", "email", "youtube", "tiktok", "instagram", 
  "facebook", "linkedin", "whatsapp", "twitter", "zoom", "direct", 
  "meta_ads", "google_ads", "tiktok_ads"
];

const utmCampaignOptions = [
  { value: "channel_whatsApp", label: "Channel WhatsApp" },
  { value: "whatsapp_grup", label: "WhatsApp Grup" },
  { value: "personal_whatsapp", label: "Personal WhatsApp" },
  { value: "lain_lain", label: "Lain Lain" }
];

export default function UtmGeneratorPage() {
  const [baseUrl, setBaseUrl] = useState('');
  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');
  const [selectedCampaignOption, setSelectedCampaignOption] = useState('');
  const [customCampaign, setCustomCampaign] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (selectedCampaignOption === 'lain_lain') {
      setUtmCampaign(customCampaign);
    } else {
      setUtmCampaign(selectedCampaignOption);
    }
  }, [selectedCampaignOption, customCampaign]);

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
    
    if (selectedCampaignOption === 'lain_lain' && !customCampaign.trim()) {
        toast({
            title: "Error",
            description: "UTM Campaign (Lain Lain) is required.",
            variant: "destructive",
        });
        setGeneratedUrl("");
        return;
    }


    try {
      let tempBaseUrl = baseUrl;
      if (!tempBaseUrl.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/i) && !tempBaseUrl.match(/^www\.[^\s/$.?#].[^\s]*$/i) && !tempBaseUrl.match(/^[^\s/$.?#].[^\s]*\.[^\s/$.?#]{2,}/i)  ) {
         if (!tempBaseUrl.startsWith('http://') && !tempBaseUrl.startsWith('https://')) {
            tempBaseUrl = `https://${tempBaseUrl}`;
             if (!tempBaseUrl.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/i)) {
                throw new Error("Invalid URL structure");
             }
         } else {
            throw new Error("Invalid URL structure");
         }
      }
      
      const url = new URL(tempBaseUrl.startsWith('http') ? tempBaseUrl : `https://${tempBaseUrl}`);

      if (utmSource.trim()) url.searchParams.set("utm_source", utmSource.trim());
      else url.searchParams.delete("utm_source");
      
      if (utmMedium.trim()) url.searchParams.set("utm_medium", utmMedium.trim());
      else url.searchParams.delete("utm_medium");

      const finalUtmCampaign = selectedCampaignOption === 'lain_lain' ? customCampaign : utmCampaign;
      if (finalUtmCampaign.trim()) url.searchParams.set("utm_campaign", finalUtmCampaign.trim());
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

  const handleCampaignChange = (value: string) => {
    setSelectedCampaignOption(value);
    if (value !== 'lain_lain') {
      setUtmCampaign(value);
      setCustomCampaign(''); 
    } else {
      setUtmCampaign(''); 
    }
  };

  return (
    <div className="space-y-6"> {/* Changed main to div for nesting within dashboard layout */}
      <Card className="w-full shadow-xl rounded-lg"> {/* Removed max-w-2xl to allow dashboard layout to control width */}
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
              <Select value={utmSource} onValueChange={setUtmSource} required>
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
              <Select value={selectedCampaignOption} onValueChange={handleCampaignChange}>
                <SelectTrigger id="utmCampaignSelect" className="focus:ring-primary focus:border-primary">
                  <SelectValue placeholder="Select a campaign" />
                </SelectTrigger>
                <SelectContent>
                  {utmCampaignOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedCampaignOption === 'lain_lain' && (
              <div className="space-y-2 mt-2 pl-7"> 
                <Label htmlFor="customUtmCampaign" className="text-foreground">Campaign (Lain Lain)</Label>
                <div className="flex items-center space-x-2">
                 <MessageSquareText className="h-5 w-5 text-accent flex-shrink-0 opacity-0" /> 
                  <Input
                    id="customUtmCampaign"
                    placeholder="Enter custom campaign"
                    value={customCampaign}
                    onChange={(e) => setCustomCampaign(e.target.value)}
                    className="focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            )}
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
    </div>
  );
}
