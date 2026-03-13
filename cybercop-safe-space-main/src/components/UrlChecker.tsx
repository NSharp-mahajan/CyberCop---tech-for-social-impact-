import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, CheckCircle, ExternalLink, Search, ShieldOff, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
// Firebase integration - URL checking functionality

interface UrlCheckerProps {
  className?: string;
  size?: 'sm' | 'default';
  showInput?: boolean;
}

const UrlChecker: React.FC<UrlCheckerProps> = ({ 
  className = '', 
  size = 'default',
  showInput = true 
}) => {
  const [url, setUrl] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<{
    status: 'safe' | 'suspicious' | 'malicious';
    cached?: boolean;
  } | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const checkUrl = async (urlToCheck: string = url) => {
    if (!urlToCheck.trim()) return;

    // Basic URL validation
    try {
      new URL(urlToCheck);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (e.g., https://example.com)",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);
    setResult(null);

    try {
      // Firebase URL checking - placeholder implementation
      console.log('Firebase url-check - placeholder implementation:', {
        url: urlToCheck,
        user_id: user?.uid,
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response
      const mockData = {
        status: 'safe',
        cached: false,
        message: 'URL appears to be safe',
        details: 'No threats detected'
      };
      
      const mockError = null;

      if (mockError) throw mockError;

      setResult({
        status: mockData.status as 'safe' | 'suspicious' | 'malicious',
        cached: mockData.cached,
      });

      if (mockData.status === 'malicious') {
        toast({
          title: "⚠️ Malicious URL Detected",
          description: mockData.message,
          variant: "destructive",
        });
      } else if (mockData.status === 'suspicious') {
        toast({
          title: "⚠️ Suspicious URL",
          description: mockData.message,
        });
      } else {
        toast({
          title: "✅ URL is Safe",
          description: mockData.message,
        });
      }

    } catch (error: any) {
      console.error('Error checking URL:', error);
      
      if (error.message?.includes('Rate limit exceeded')) {
        toast({
          title: "Rate Limit Exceeded",
          description: "Too many requests. Please wait a minute before checking again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to check URL. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsChecking(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe':
        return <CheckCircle className="h-4 w-4" />;
      case 'suspicious':
        return <AlertTriangle className="h-4 w-4" />;
      case 'malicious':
        return <ShieldOff className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe':
        return 'bg-green-500 hover:bg-green-600';
      case 'suspicious':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'malicious':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'safe':
        return 'Safe';
      case 'suspicious':
        return 'Suspicious';
      case 'malicious':
        return 'Malicious';
      default:
        return 'Unknown';
    }
  };

  if (!showInput) {
    // Just the check button for quick access
    return (
      <Button
        variant="outline"
        size={size}
        onClick={() => {
          const urlToCheck = prompt('Enter URL to check:');
          if (urlToCheck) {
            setUrl(urlToCheck);
            checkUrl(urlToCheck);
          }
        }}
        className={className}
      >
        <Shield className="h-4 w-4 mr-2" />
        Check URL
      </Button>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex gap-2">
        <Input
          placeholder="Enter URL to check (e.g., https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && checkUrl()}
          disabled={isChecking}
          className="flex-1"
        />
        <Button
          onClick={() => checkUrl()}
          disabled={isChecking || !url.trim()}
          size={size}
        >
          {isChecking ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Shield className="h-4 w-4" />
          )}
        </Button>
      </div>

      {result && (
        <div className="flex items-center gap-2">
          <Badge 
            className={`${getStatusColor(result.status)} text-white`}
          >
            {getStatusIcon(result.status)}
            <span className="ml-1">{getStatusText(result.status)}</span>
          </Badge>
          {result.cached && (
            <span className="text-xs text-muted-foreground">
              (cached result)
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default UrlChecker;