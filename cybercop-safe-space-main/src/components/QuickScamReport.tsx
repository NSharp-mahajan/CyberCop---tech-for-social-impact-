import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Send, Shield, AlertTriangle, ExternalLink, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
// Firebase integration - scam reporting functionality
import { Link } from 'react-router-dom';

const QuickScamReport = () => {
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url || !description) {
      toast({
        title: "Missing Information",
        description: "Please provide both URL and description.",
        variant: "destructive",
      });
      return;
    }

    try {
      new URL(url);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Firebase scam-report - placeholder implementation
      console.log('Firebase scam-report - placeholder implementation:', {
        url: url,
        title: `Quick Report: ${url}`,
        description: description,
        category: 'other',
        reporter_user_id: user?.uid,
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response
      const mockData = {
        success: true,
        report_id: 'report-' + Date.now(),
        message: 'Report submitted successfully'
      };
      
      const mockError = null;

      if (mockError) throw mockError;

      if (mockData.success) {
        toast({
          title: "Report Submitted",
          description: "Thank you for helping keep the internet safe!",
        });
        
        // Reset form
        setUrl('');
        setDescription('');
      } else {
        toast({
          title: "Error",
          description: mockData.message || "Failed to submit report. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error submitting quick report:', error);
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          Quick Scam Report
        </CardTitle>
        <CardDescription>
          Spotted something suspicious? Report it quickly to help protect others.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleQuickSubmit} className="space-y-4">
          <Input
            placeholder="Enter suspicious URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <Textarea
            placeholder="Briefly describe what makes this suspicious..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            required
          />
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Quick Report
                </>
              )}
            </Button>
            <Button variant="outline" asChild>
              <Link to="/report-scam">Full Report</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuickScamReport;