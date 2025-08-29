import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Settings, ExternalLink, Copy, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const EmailConfigHelp: React.FC = () => {
  const { toast } = useToast();
  const [copiedConfig, setCopiedConfig] = useState<string>('');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedConfig(label);
    toast({
      title: "Copied to clipboard!",
      description: `${label} configuration copied`,
    });
    setTimeout(() => setCopiedConfig(''), 2000);
  };

  const configs = {
    gmail: {
      host: "smtp.gmail.com",
      port: "587",
      user: "your-gmail@gmail.com",
      pass: "[Your App Password]",
      sender: "your-gmail@gmail.com"
    },
    resend: {
      host: "smtp.resend.com", 
      port: "587",
      user: "resend",
      pass: "[Your Resend API Key]",
      sender: "noreply@yourdomain.com"
    },
    sendgrid: {
      host: "smtp.sendgrid.net",
      port: "587", 
      user: "apikey",
      pass: "[Your SendGrid API Key]",
      sender: "noreply@yourdomain.com"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Mail className="w-6 h-6 text-cyan-400" />
              Email Configuration Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-gray-700">
                <strong>No emails being sent?</strong> Supabase requires SMTP configuration to send verification emails. 
                Choose one of the options below to enable email delivery.
              </AlertDescription>
            </Alert>

            <div className="flex gap-4">
              <Button 
                onClick={() => window.open('https://supabase.com/dashboard/project/lctytebgxakcztdijbxu/settings/auth', '_blank')}
                className="bg-green-600 hover:bg-green-700"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Supabase SMTP Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Gmail Configuration */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Option 1: Gmail SMTP (Easiest)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-black/20 p-4 rounded-lg font-mono text-sm text-green-400">
              <div className="grid grid-cols-1 gap-2">
                <div>SMTP Host: {configs.gmail.host}</div>
                <div>SMTP Port: {configs.gmail.port}</div>
                <div>SMTP User: {configs.gmail.user}</div>
                <div>SMTP Pass: {configs.gmail.pass}</div>
                <div>Sender Email: {configs.gmail.sender}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => copyToClipboard(JSON.stringify(configs.gmail, null, 2), 'Gmail')}
                className="border-white/30 text-white hover:bg-white/10"
              >
                {copiedConfig === 'Gmail' ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy Config
              </Button>
              <Button 
                size="sm"
                onClick={() => window.open('https://myaccount.google.com/apppasswords', '_blank')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Generate App Password
              </Button>
            </div>
            <Alert>
              <AlertDescription className="text-gray-700">
                <strong>Steps:</strong> 1) Enable 2FA on Gmail 2) Generate App Password 3) Use App Password (not your regular password) in SMTP settings
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Resend Configuration */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Option 2: Resend (Recommended for Production)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-black/20 p-4 rounded-lg font-mono text-sm text-green-400">
              <div className="grid grid-cols-1 gap-2">
                <div>SMTP Host: {configs.resend.host}</div>
                <div>SMTP Port: {configs.resend.port}</div>
                <div>SMTP User: {configs.resend.user}</div>
                <div>SMTP Pass: {configs.resend.pass}</div>
                <div>Sender Email: {configs.resend.sender}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => copyToClipboard(JSON.stringify(configs.resend, null, 2), 'Resend')}
                className="border-white/30 text-white hover:bg-white/10"
              >
                {copiedConfig === 'Resend' ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy Config
              </Button>
              <Button 
                size="sm"
                onClick={() => window.open('https://resend.com/signup', '_blank')}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Sign Up for Resend
              </Button>
            </div>
            <Alert>
              <AlertDescription className="text-gray-700">
                <strong>Free Tier:</strong> 3,000 emails/month, perfect for development and small production apps.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* SendGrid Configuration */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Option 3: SendGrid (Enterprise)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-black/20 p-4 rounded-lg font-mono text-sm text-green-400">
              <div className="grid grid-cols-1 gap-2">
                <div>SMTP Host: {configs.sendgrid.host}</div>
                <div>SMTP Port: {configs.sendgrid.port}</div>
                <div>SMTP User: {configs.sendgrid.user}</div>
                <div>SMTP Pass: {configs.sendgrid.pass}</div>
                <div>Sender Email: {configs.sendgrid.sender}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => copyToClipboard(JSON.stringify(configs.sendgrid, null, 2), 'SendGrid')}
                className="border-white/30 text-white hover:bg-white/10"
              >
                {copiedConfig === 'SendGrid' ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy Config
              </Button>
              <Button 
                size="sm"
                onClick={() => window.open('https://sendgrid.com/signup', '_blank')}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Sign Up for SendGrid
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Setup Steps */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Quick Setup Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-white/80">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-cyan-600 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                <div>Choose an email service above (Gmail is fastest for testing)</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-cyan-600 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                <div>Get your credentials (API key or app password)</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-cyan-600 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                <div>Open Supabase SMTP settings and configure</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-cyan-600 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                <div>Test by registering a new account</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
