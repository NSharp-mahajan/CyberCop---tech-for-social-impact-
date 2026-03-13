import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, FileText, Download } from "lucide-react";

interface FormData {
  name: string;
  phone: string;
  incidentType: string;
  incidentDate: string;
  location: string;
  description: string;
}

interface FIRFormProps {
  onGenerate: (formData: FormData, firPreview: string) => void;
}

const INCIDENT_TYPES = [
  "Cyber Crime", "Theft", "Assault", "Fraud", "Harassment", 
  "Property Dispute", "Traffic Accident", "Missing Person", "Other"
];

function FIRForm({ onGenerate }: FIRFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    incidentType: "",
    incidentDate: "",
    location: "",
    description: ""
  });
  const [firPreview, setFirPreview] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateFIRPreview = (data: FormData): string => {
    const currentDate = new Date().toLocaleDateString('en-IN');
    const currentTime = new Date().toLocaleTimeString('en-IN');
    
    return `POLICE COMPLAINT DRAFT

Complainant Information:
Name: ${data.name}
Contact: ${data.phone}
Date of Filing: ${currentDate}
Time: ${currentTime}

Incident Details:
Type of Incident: ${data.incidentType}
Date of Incident: ${data.incidentDate}
Location of Incident: ${data.location}

Description:
${data.description}

Declaration:
I, ${data.name}, hereby declare that information provided above is true to the best of my knowledge and belief. I understand that providing false information is a punishable offense.

Signature: _________________
Date: _________________`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.incidentType || 
        !formData.incidentDate || !formData.location || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate FIR preview
      const preview = generateFIRPreview(formData);
      setFirPreview(preview);
      
      // Show success toast
      toast({
        title: "FIR Generated",
        description: "Your FIR draft has been created successfully.",
      });
      
      // Call parent component with form data and preview
      onGenerate(formData, preview);
      
    } catch (error) {
      console.error('Error generating FIR:', error);
      toast({
        title: "Error",
        description: "Failed to generate FIR. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = () => {
    if (!firPreview) return;
    
    const blob = new Blob([firPreview], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FIR_${formData.name}_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "Your FIR is being downloaded.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">📝 Fill FIR Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name *
                </label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Contact Number *
                </label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Contact Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="incidentType" className="text-sm font-medium">
                  Incident Type *
                </label>
                <Select value={formData.incidentType} onValueChange={(value) => handleSelectChange('incidentType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select incident type" />
                  </SelectTrigger>
                  <SelectContent>
                    {INCIDENT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="incidentDate" className="text-sm font-medium">
                  Incident Date *
                </label>
                <Input
                  type="date"
                  name="incidentDate"
                  value={formData.incidentDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Incident Location *
                </label>
                <Input
                  type="text"
                  name="location"
                  placeholder="Location of Incident"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Incident Description *
                </label>
                <Textarea
                  name="description"
                  rows={6}
                  placeholder="Describe incident in detail..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button 
                type="submit" 
                size="lg"
                disabled={isSubmitting}
                className="px-8 py-3"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating FIR...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate FIR
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* FIR Preview Section */}
      {firPreview && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">📄 FIR Preview</CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download FIR
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg text-sm whitespace-pre-wrap font-mono">
              {firPreview}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default FIRForm;
