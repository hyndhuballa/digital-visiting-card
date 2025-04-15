import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Save, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Container from "@/components/ui/container";

const AddCardForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    designation: "",
    phone: "",
    email: "",
    linkedin: "",
    instagram: "",
    twitter: "",
    website: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate saving
    setTimeout(() => {
      toast({
        title: "Card created",
        description: "Business card has been saved successfully",
      });
      navigate("/home");
      setIsLoading(false);
    }, 1000);
  };
  
  const handleScanCard = () => {
    toast({
      title: "Camera activated",
      description: "Position the card in the frame",
    });
  };

  return (
    <Container size="md">
      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="scan">Scan Card</TabsTrigger>
        </TabsList>
        
        <TabsContent value="manual" className="mt-4 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Add New Card</CardTitle>
              <CardDescription>
                Enter the business card details manually
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Acme Inc."
                      value={formData.company}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      name="designation"
                      placeholder="Product Manager"
                      value={formData.designation}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn Username</Label>
                    <Input
                      id="linkedin"
                      name="linkedin"
                      placeholder="johndoe"
                      value={formData.linkedin}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram Username</Label>
                    <Input
                      id="instagram"
                      name="instagram"
                      placeholder="johndoe"
                      value={formData.instagram}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter Username</Label>
                    <Input
                      id="twitter"
                      name="twitter"
                      placeholder="johndoe"
                      value={formData.twitter}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      placeholder="https://example.com"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full mt-4" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Card
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scan" className="mt-4 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Scan Business Card</CardTitle>
              <CardDescription>
                Use your camera to scan a physical business card
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg aspect-video flex items-center justify-center bg-muted/20">
                <div className="text-center p-4">
                  <Camera className="h-10 w-10 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Camera preview will appear here</p>
                </div>
              </div>
              
              <Button type="button" className="w-full" onClick={handleScanCard}>
                <Camera className="mr-2 h-4 w-4" />
                Start Scanning
              </Button>
              
              <p className="text-sm text-muted-foreground text-center">
                After scanning, the form below will be auto-filled with the extracted information.
              </p>
              
              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">Extracted Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex justify-between items-center py-1 border-b border-border">
                    <span className="text-sm">Name</span>
                    <span className="text-sm text-muted-foreground">Not detected</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border">
                    <span className="text-sm">Company</span>
                    <span className="text-sm text-muted-foreground">Not detected</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border">
                    <span className="text-sm">Phone</span>
                    <span className="text-sm text-muted-foreground">Not detected</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border">
                    <span className="text-sm">Email</span>
                    <span className="text-sm text-muted-foreground">Not detected</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Upload Image Instead
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default AddCardForm;
