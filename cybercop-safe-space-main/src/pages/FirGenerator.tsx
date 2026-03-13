import { useState } from "react";
import { FileText } from "lucide-react";
import FIRForm from "@/components/FIRForm";
import FIRResult from "@/components/FIRResult";
import FIRPreview from "@/components/FIRPreview";
import FIRProcessFlow from "@/components/FIRProcessFlow";

interface FormData {
  name: string;
  phone: string;
  incidentType: string;
  incidentDate: string;
  location: string;
  description: string;
}

const FirGenerator = () => {
  const [currentStep, setCurrentStep] = useState<'form' | 'result'>('form');
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    incidentType: "",
    incidentDate: "",
    location: "",
    description: ""
  });
  const [firPreview, setFirPreview] = useState("");

  const handleFormDataChange = (data: FormData) => {
    setFormData(data);
  };

  const handleRephrasedTextChange = (text: string) => {
    setFirPreview(text);
  };

  const handleGenerate = (data: FormData, preview: string) => {
    setFormData(data);
    setFirPreview(preview);
    setCurrentStep('result');
  };

  const handleBack = () => {
    setCurrentStep('form');
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-primary/10 glow-primary">
              <FileText className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-primary bg-clip-text text-transparent">FIR Generator</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate a comprehensive First Information Report for cybersecurity incidents
          </p>
        </div>

        {/* Render appropriate component based on current step */}
        {currentStep === 'form' ? (
          <>
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <div>
                <FIRForm 
                  formData={formData}
                  onGenerate={handleGenerate}
                />
              </div>
              <div>
                <FIRPreview formData={formData} firPreview={firPreview} />
              </div>
            </div>
            
            {/* Process Flow Component */}
            <div className="w-full mb-12">
              <FIRProcessFlow currentStep={2} />
            </div>
          </>
        ) : (
          <FIRResult detail={formData} onBack={handleBack} />
        )}
      </div>
    </div>
  );
};

export default FirGenerator;