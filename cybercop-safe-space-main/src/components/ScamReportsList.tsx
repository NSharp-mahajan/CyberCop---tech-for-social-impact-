import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronUp, ChevronDown, Search, ExternalLink, Calendar, User, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
// Firebase integration - scam reports functionality
import { formatDistanceToNow } from 'date-fns';

interface ScamReport {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
  reporter_name: string | null;
  location: string | null;
  status: string;
  upvotes: number | null;
  downvotes: number | null;
  created_at: string;
  user_vote?: 'upvote' | 'downvote' | null;
}

const ScamReportsList = () => {
  const [reports, setReports] = useState<ScamReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    loadReports();
  }, []);

  useEffect(() => {
    // User is now managed by AuthContext
  }, [user]);

  const loadReports = async () => {
    try {
      // Firebase database query - placeholder implementation
      console.log('Firebase scam_reports query - placeholder implementation');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock reports data
      const mockReports: ScamReport[] = [
        {
          id: '1',
          url: 'https://example-scam1.com',
          title: 'Phishing Attempt - Bank Login',
          description: 'Fake banking website attempting to collect login credentials',
          category: 'phishing',
          reporter_name: 'Anonymous User',
          location: 'Mumbai, India',
          status: 'verified',
          upvotes: 15,
          downvotes: 2,
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '2',
          url: 'https://fake-investment.com',
          title: 'Investment Scam',
          description: 'Promises unrealistic returns on investment',
          category: 'investment',
          reporter_name: 'Concerned Citizen',
          location: 'Delhi, India',
          status: 'pending',
          upvotes: 8,
          downvotes: 1,
          created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        }
      ];
      
      if (user) {
        // Get user votes for these reports
        const mockVotesData = [
          {
            scam_report_id: '1',
            vote_type: 'upvote'
          },
          {
            scam_report_id: '2',
            vote_type: 'downvote'
          }
        ];

        const reportsWithVotes: ScamReport[] = mockReports.map(report => {
          const userVote = mockVotesData.find(vote => vote.scam_report_id === report.id)?.vote_type;
          return {
            ...report,
            user_vote: (userVote === 'upvote' || userVote === 'downvote') ? userVote : null
          };
        });

        setReports(reportsWithVotes);
      } else {
        setReports(mockReports);
      }
    } catch (error: any) {
      console.error('Error loading reports:', error);
      toast({
        title: "Error",
        description: "Failed to load reports. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (reportId: string, voteType: 'upvote' | 'downvote') => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to vote on reports.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Firebase vote handling - placeholder implementation
      console.log('Firebase vote handling - placeholder implementation:', {
        reportId,
        voteType,
        userId: user.uid
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update local state immediately for better UX
      setReports(prev => prev.map(report => {
        if (report.id === reportId) {
          const currentVote = report.user_vote;
          
          // If clicking the same vote, remove it
          if (currentVote === voteType) {
            return {
              ...report,
              user_vote: null,
              upvotes: currentVote === 'upvote' ? report.upvotes - 1 : report.upvotes,
              downvotes: currentVote === 'downvote' ? report.downvotes - 1 : report.downvotes
            };
          }
          
          // If changing vote, adjust both counts
          if (currentVote) {
            return {
              ...report,
              user_vote: voteType,
              upvotes: voteType === 'upvote' ? report.upvotes + 1 : report.upvotes - 1,
              downvotes: voteType === 'downvote' ? report.downvotes + 1 : report.downvotes - 1
            };
          }
          
          // New vote
          return {
            ...report,
            user_vote: voteType,
            upvotes: voteType === 'upvote' ? report.upvotes + 1 : report.upvotes,
            downvotes: voteType === 'downvote' ? report.downvotes + 1 : report.downvotes
          };
        }
        return report;
      }));

      toast({
        title: "Vote Recorded",
        description: `Your ${voteType} has been recorded.`,
      });
    } catch (error: any) {
      console.error('Error voting:', error);
      toast({
        title: "Error",
        description: "Failed to record vote. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'phishing': 'bg-red-100 text-red-800',
      'fake-shopping': 'bg-purple-100 text-purple-800',
      'investment': 'bg-orange-100 text-orange-800',
      'romance': 'bg-pink-100 text-pink-800',
      'tech-support': 'bg-blue-100 text-blue-800',
      'identity-theft': 'bg-gray-100 text-gray-800',
      'other': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.other;
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="phishing">Phishing</SelectItem>
            <SelectItem value="fake-shopping">Fake Shopping</SelectItem>
            <SelectItem value="investment">Investment</SelectItem>
            <SelectItem value="romance">Romance</SelectItem>
            <SelectItem value="tech-support">Tech Support</SelectItem>
            <SelectItem value="identity-theft">Identity Theft</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center p-8">
              <p className="text-muted-foreground">No scam reports found.</p>
            </CardContent>
          </Card>
        ) : (
          filteredReports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <CardDescription className="mt-1">
                      <a 
                        href={report.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        {report.url}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                    <Badge variant="outline" className={getCategoryColor(report.category)}>
                      {report.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{report.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDistanceToNow(new Date(report.created_at), { addSuffix: true })}
                    </div>
                    {report.reporter_name && (
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {report.reporter_name}
                      </div>
                    )}
                    {report.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {report.location}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant={report.user_vote === 'upvote' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleVote(report.id, 'upvote')}
                      className="flex items-center gap-1"
                    >
                      <ChevronUp className="h-4 w-4" />
                      {report.upvotes || 0}
                    </Button>
                    <Button
                      variant={report.user_vote === 'downvote' ? 'destructive' : 'outline'}
                      size="sm"
                      onClick={() => handleVote(report.id, 'downvote')}
                      className="flex items-center gap-1"
                    >
                      <ChevronDown className="h-4 w-4" />
                      {report.downvotes || 0}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ScamReportsList;