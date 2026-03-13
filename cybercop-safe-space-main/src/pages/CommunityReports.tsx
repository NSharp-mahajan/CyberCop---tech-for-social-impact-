import React, { useState, useEffect } from 'react';
import { Users, AlertTriangle, TrendingUp, Trash2, ChevronUp, Search, ExternalLink, Calendar, User, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

interface ScamReport {
  id: number;
  url: string;
  title: string;
  description: string;
  category: string;
  reporterName: string;
  location: string;
  status: "pending" | "verified" | "rejected";
  votes: number;
  createdAt: string;
}

const CommunityReports = () => {
  const [reports, setReports] = useState<ScamReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  // Load reports from localStorage
  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem("communityReports") || "[]");
    setReports(storedReports);
    setLoading(false);
  }, []);

  // Calculate statistics
  const totalReports = reports.length;
  const verifiedThreats = reports.filter(r => r.status === "verified").length;
  const communityVotes = reports.reduce((sum, r) => sum + (r.votes || 0), 0);
  const verificationRate = totalReports > 0 ? Math.round((verifiedThreats / totalReports) * 100) : 0;

  // Handle delete report
  const handleDeleteReport = (id: number) => {
    if (!confirm("Delete this report?")) return;

    const updatedReports = reports.filter(r => r.id !== id);
    setReports(updatedReports);
    localStorage.setItem("communityReports", JSON.stringify(updatedReports));

    toast({
      title: "Report Deleted",
      description: "The report has been successfully deleted.",
    });
  };

  // Handle voting
  const handleVote = (id: number) => {
    const updatedReports = reports.map(report => {
      if (report.id === id) {
        return { ...report, votes: report.votes + 1 };
      }
      return report;
    });

    setReports(updatedReports);
    localStorage.setItem("communityReports", JSON.stringify(updatedReports));

    toast({
      title: "Vote Recorded",
      description: "Your vote has been recorded.",
    });
  };

  // Filter reports
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get category color
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

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-grid flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-grid">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10 border border-primary/20 glow-primary">
                <Users className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
              Community Scam Reports
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              View and vote on scam reports submitted by the community. Help verify threats and protect others.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="cyber-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{totalReports}</div>
                <p className="text-xs text-muted-foreground">
                  Community submitted reports
                </p>
              </CardContent>
            </Card>
            
            <Card className="cyber-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Verified Threats</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">{verifiedThreats}</div>
                <p className="text-xs text-muted-foreground">
                  {verificationRate}% verification rate
                </p>
              </CardContent>
            </Card>
            
            <Card className="cyber-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Community Votes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">{communityVotes}</div>
                <p className="text-xs text-muted-foreground">
                  Active community participation
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
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
          </div>

          {/* Reports List */}
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle>Recent Scam Reports</CardTitle>
              <CardDescription>
                Help the community by voting on the credibility of these reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredReports.length === 0 ? (
                <div className="text-center py-12">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">
                    {reports.length === 0 
                      ? "No community scam reports yet. Be the first to report one."
                      : "No reports found matching your criteria."
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredReports.map((report) => (
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
                              {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {report.reporterName}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {report.location}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleVote(report.id)}
                              className="flex items-center gap-1"
                            >
                              <ChevronUp className="h-4 w-4" />
                              {report.votes}
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteReport(report.id)}
                              className="flex items-center gap-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CommunityReports;