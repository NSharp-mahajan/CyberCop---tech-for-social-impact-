import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// Supabase integration removed - Firebase will be added later
// TODO: Implement Firebase database functions for debugging
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const DebugPanel = () => {
  const [tests, setTests] = useState<Record<string, 'idle' | 'loading' | 'success' | 'error'>>({
    chat: 'idle',
    urlCheck: 'idle',
    ocrFraud: 'idle',
    scamReport: 'idle'
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateTest = (test: string, status: 'loading' | 'success' | 'error', error?: string) => {
    setTests(prev => ({ ...prev, [test]: status }));
    if (error) {
      setErrors(prev => ({ ...prev, [test]: error }));
    }
  };

  const testChatFunction = async () => {
    updateTest('chat', 'loading');
    try {
      console.log('Firebase testChatFunction - placeholder implementation');
      
      // Simulate chat function test
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const data = {
        success: true,
        message: 'Test successful'
      };
      
      console.log('Chat test result:', data);
      updateTest('chat', 'success');
    } catch (error: any) {
      console.error('Chat test error:', error);
      updateTest('chat', 'error', error.message || 'Unknown error');
    }
  };

  const testUrlCheckFunction = async () => {
    updateTest('urlCheck', 'loading');
    try {
      console.log('Firebase testUrlCheckFunction - placeholder implementation');
      
      // Simulate URL check function test
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const data = {
        success: true,
        status: 'safe',
        score: 95
      };
      
      console.log('URL check test result:', data);
      updateTest('urlCheck', 'success');
    } catch (error: any) {
      console.error('URL check test error:', error);
      updateTest('urlCheck', 'error', error.message || 'Unknown error');
    }
  };

  const testScamReportFunction = async () => {
    updateTest('scamReport', 'loading');
    try {
      console.log('Firebase testScamReportFunction - placeholder implementation');
      
      // Simulate scam report function test
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const data = {
        success: true,
        reportId: 'mock-report-id',
        message: 'Test report submitted successfully'
      };
      
      console.log('Scam report test result:', data);
      updateTest('scamReport', 'success');
    } catch (error: any) {
      console.error('Scam report test error:', error);
      updateTest('scamReport', 'error', error.message || 'Unknown error');
    }
  };

  const testOcrFunction = async () => {
    updateTest('ocrFraud', 'loading');
    try {
      console.log('Firebase testOcrFunction - placeholder implementation');
      
      // Create a small test image as base64
      const testImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      
      // Simulate OCR function test
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const data = {
        success: true,
        fraudDetected: false,
        confidence: 0.95
      };
      
      console.log('OCR test result:', data);
      updateTest('ocrFraud', 'success');
    } catch (error: any) {
      console.error('OCR test error:', error);
      updateTest('ocrFraud', 'error', error.message || 'Unknown error');
    }
  };
          fileSize: 100,
          fileType: 'image/png'
        }
      });
      
      if (error) throw error;
      console.log('OCR test result:', data);
      updateTest('ocrFraud', 'success');
    } catch (error: any) {
      console.error('OCR test error:', error);
      updateTest('ocrFraud', 'error', error.message || 'Unknown error');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'loading':
        return <Badge variant="secondary">Testing...</Badge>;
      case 'success':
        return <Badge className="bg-green-500">Success</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">Ready</Badge>;
    }
  };

  return (
    <Card className="fixed bottom-20 right-6 w-80 shadow-xl z-40">
      <CardHeader>
        <CardTitle className="text-sm">Backend Function Tests</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={testChatFunction}
            disabled={tests.chat === 'loading'}
            className="justify-between"
          >
            <span>Chat</span>
            {getStatusIcon(tests.chat)}
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={testUrlCheckFunction}
            disabled={tests.urlCheck === 'loading'}
            className="justify-between"
          >
            <span>URL Check</span>
            {getStatusIcon(tests.urlCheck)}
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={testScamReportFunction}
            disabled={tests.scamReport === 'loading'}
            className="justify-between"
          >
            <span>Scam Report</span>
            {getStatusIcon(tests.scamReport)}
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={testOcrFunction}
            disabled={tests.ocrFraud === 'loading'}
            className="justify-between"
          >
            <span>OCR Fraud</span>
            {getStatusIcon(tests.ocrFraud)}
          </Button>
        </div>

        <div className="space-y-2">
          {Object.entries(tests).map(([test, status]) => (
            <div key={test} className="flex justify-between items-center text-xs">
              <span className="capitalize">{test}:</span>
              {getStatusBadge(status)}
            </div>
          ))}
        </div>

        {Object.entries(errors).map(([test, error]) => error && (
          <div key={test} className="text-xs text-red-500 bg-red-50 p-2 rounded">
            <strong>{test}:</strong> {error}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DebugPanel;