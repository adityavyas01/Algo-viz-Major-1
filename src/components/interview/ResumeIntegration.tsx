
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Upload, Download, LinkedinIcon, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

export const ResumeIntegration: React.FC = () => {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [linkedinConnected, setLinkedinConnected] = useState(false);

  const [resumeData, setResumeData] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    summary: 'Software Engineer with 3+ years of experience in full-stack development...',
    experience: [
      {
        company: 'Tech Corp',
        position: 'Software Engineer',
        duration: '2022 - Present',
        description: 'Developed and maintained web applications using React and Node.js...'
      },
      {
        company: 'StartupXYZ',
        position: 'Junior Developer',
        duration: '2020 - 2022',
        description: 'Built responsive web interfaces and RESTful APIs...'
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS'],
    education: [
      {
        degree: 'BS Computer Science',
        school: 'University of Technology',
        year: '2020'
      }
    ]
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeUploaded(true);
      // Here you would typically process the uploaded file
    }
  };

  const generateQuestions = () => {
    // This would generate personalized questions based on resume
    return [
      "Tell me about your experience with React at Tech Corp",
      "How did you handle the transition from StartupXYZ to Tech Corp?",
      "Can you explain a challenging project you worked on with Node.js?",
      "What AWS services have you worked with in your current role?"
    ];
  };

  const personalizedQuestions = generateQuestions();

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Resume & LinkedIn Integration</CardTitle>
          <p className="text-white/70 text-sm">
            Upload your resume and connect LinkedIn to get personalized interview questions based on your experience.
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upload">Upload Resume</TabsTrigger>
              <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
              <TabsTrigger value="questions">Personalized Questions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-4 mt-6">
              <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
                {resumeUploaded ? (
                  <div className="space-y-4">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                    <div>
                      <h3 className="text-white font-semibold">Resume Uploaded Successfully!</h3>
                      <p className="text-white/70 text-sm">Your resume has been analyzed and processed.</p>
                    </div>
                    <div className="flex justify-center gap-2">
                      <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        <FileText className="w-4 h-4 mr-2" />
                        View Analysis
                      </Button>
                      <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload New
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 text-white/50 mx-auto" />
                    <div>
                      <h3 className="text-white font-semibold">Upload Your Resume</h3>
                      <p className="text-white/70 text-sm">Supports PDF, DOC, DOCX formats</p>
                    </div>
                    <div>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label htmlFor="resume-upload">
                        <Button 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                          asChild
                        >
                          <span>
                            <Upload className="w-4 h-4 mr-2" />
                            Choose File
                          </span>
                        </Button>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {resumeUploaded && (
                <Card className="bg-black/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Resume Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-white font-medium mb-2">Contact Information</h4>
                        <div className="space-y-1 text-white/80 text-sm">
                          <p>{resumeData.name}</p>
                          <p>{resumeData.email}</p>
                          <p>{resumeData.phone}</p>
                          <p>{resumeData.location}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Key Skills Identified</h4>
                        <div className="flex flex-wrap gap-1">
                          {resumeData.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="border-blue-400 text-blue-400 text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-2">Experience Summary</h4>
                      <div className="space-y-2">
                        {resumeData.experience.map((exp, index) => (
                          <div key={index} className="bg-white/10 p-3 rounded-lg">
                            <div className="flex justify-between items-start mb-1">
                              <h5 className="text-white font-medium">{exp.position}</h5>
                              <span className="text-white/60 text-xs">{exp.duration}</span>
                            </div>
                            <p className="text-blue-400 text-sm mb-1">{exp.company}</p>
                            <p className="text-white/70 text-xs">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="linkedin" className="space-y-4 mt-6">
              <div className="space-y-4">
                {linkedinConnected ? (
                  <div className="bg-blue-500/20 p-4 rounded-lg text-center">
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                    <h3 className="text-white font-semibold mb-2">LinkedIn Connected Successfully!</h3>
                    <p className="text-white/70 text-sm mb-4">
                      Your LinkedIn profile has been synced and analyzed for interview preparation.
                    </p>
                    <div className="flex justify-center gap-2">
                      <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Profile
                      </Button>
                      <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        Sync Again
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center">
                      <LinkedinIcon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                      <h3 className="text-white font-semibold mb-2">Connect Your LinkedIn Profile</h3>
                      <p className="text-white/70 text-sm">
                        Automatically import your professional experience and get targeted interview questions.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-white/80 text-sm mb-2 block">LinkedIn Profile URL</label>
                        <Input
                          value={linkedinUrl}
                          onChange={(e) => setLinkedinUrl(e.target.value)}
                          placeholder="https://linkedin.com/in/your-profile"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                      
                      <Button 
                        onClick={() => setLinkedinConnected(true)}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={!linkedinUrl}
                      >
                        <LinkedinIcon className="w-4 h-4 mr-2" />
                        Connect LinkedIn
                      </Button>
                    </div>

                    <div className="bg-yellow-500/20 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-yellow-400 font-medium text-sm">Privacy Notice</h4>
                          <p className="text-white/80 text-xs mt-1">
                            We only read your public profile information to generate personalized questions. Your data is never stored or shared.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="questions" className="space-y-4 mt-6">
              {resumeUploaded || linkedinConnected ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-white font-semibold mb-2">Your Personalized Interview Questions</h3>
                    <p className="text-white/70 text-sm">
                      Based on your resume and experience, here are tailored questions you might encounter.
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {personalizedQuestions.map((question, index) => (
                      <Card key={index} className="bg-black/20">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-white font-medium mb-2">{question}</p>
                              <div className="flex gap-2">
                                <Badge variant="outline" className="border-green-400 text-green-400 text-xs">
                                  Experience-based
                                </Badge>
                                <Badge variant="outline" className="border-blue-400 text-blue-400 text-xs">
                                  Behavioral
                                </Badge>
                              </div>
                            </div>
                            <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                              Practice
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card className="bg-blue-500/20">
                    <CardContent className="p-4">
                      <h4 className="text-white font-semibold mb-2">💡 Interview Tips for Your Profile</h4>
                      <div className="space-y-2 text-white/80 text-sm">
                        <p>• Prepare specific examples from your Tech Corp experience with metrics</p>
                        <p>• Be ready to discuss your transition from startup to larger company</p>
                        <p>• Highlight your full-stack development skills with concrete projects</p>
                        <p>• Prepare to explain technical decisions you made in previous roles</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-white/50 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">No Profile Data Available</h3>
                  <p className="text-white/70 text-sm mb-4">
                    Upload your resume or connect LinkedIn to see personalized interview questions.
                  </p>
                  <div className="flex justify-center gap-2">
                    <Button 
                      onClick={() => document.getElementById('resume-upload')?.click()}
                      variant="outline" 
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      Upload Resume
                    </Button>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      Connect LinkedIn
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
