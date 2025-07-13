
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  FileText, 
  Settings, 
  CheckCircle,
  AlertCircle,
  Download,
  Upload,
  Calendar,
  BarChart,
  Award,
  Link
} from 'lucide-react';

interface LMSPlatform {
  id: string;
  name: string;
  logo: string;
  status: 'connected' | 'disconnected' | 'error';
  students: number;
  courses: number;
}

interface SCORMPackage {
  id: string;
  title: string;
  version: string;
  size: string;
  lastUpdated: string;
  downloads: number;
}

interface GradebookEntry {
  studentName: string;
  studentId: string;
  assignment: string;
  score: number;
  maxScore: number;
  submittedAt: string;
}

export const LMSIntegration: React.FC = () => {
  const [lmsPlatforms, setLMSPlatforms] = useState<LMSPlatform[]>([
    { id: '1', name: 'Canvas', logo: '🎨', status: 'connected', students: 1250, courses: 15 },
    { id: '2', name: 'Blackboard', logo: '⚫', status: 'connected', students: 890, courses: 12 },
    { id: '3', name: 'Moodle', logo: '🎓', status: 'disconnected', students: 0, courses: 0 },
    { id: '4', name: 'D2L Brightspace', logo: '💡', status: 'error', students: 0, courses: 0 }
  ]);

  const scormPackages: SCORMPackage[] = [
    { 
      id: '1', 
      title: 'Data Structures Fundamentals', 
      version: '1.2', 
      size: '45.2 MB', 
      lastUpdated: '2024-01-15',
      downloads: 234
    },
    { 
      id: '2', 
      title: 'Algorithm Analysis', 
      version: '2.1', 
      size: '38.7 MB', 
      lastUpdated: '2024-01-10',
      downloads: 189
    },
    { 
      id: '3', 
      title: 'Graph Algorithms', 
      version: '1.0', 
      size: '52.1 MB', 
      lastUpdated: '2024-01-08',
      downloads: 156
    }
  ];

  const gradebookEntries: GradebookEntry[] = [
    { studentName: 'Alice Johnson', studentId: 'AJ001', assignment: 'Binary Search Quiz', score: 95, maxScore: 100, submittedAt: '2024-01-15 14:30' },
    { studentName: 'Bob Smith', studentId: 'BS002', assignment: 'Sorting Algorithms Lab', score: 87, maxScore: 100, submittedAt: '2024-01-15 16:45' },
    { studentName: 'Carol Davis', studentId: 'CD003', assignment: 'Graph Traversal Project', score: 92, maxScore: 100, submittedAt: '2024-01-14 10:15' },
  ];

  const [scormSettings, setSCORMSettings] = useState({
    autoGrading: true,
    progressTracking: true,
    timeTracking: false,
    certificateGeneration: true
  });

  const getStatusColor = (status: LMSPlatform['status']) => {
    switch (status) {
      case 'connected': return 'bg-green-500';
      case 'disconnected': return 'bg-gray-500';
      case 'error': return 'bg-red-500';
    }
  };

  const getStatusIcon = (status: LMSPlatform['status']) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'disconnected': return <AlertCircle className="w-4 h-4 text-gray-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const handleConnect = (platformId: string) => {
    setLMSPlatforms(prev => prev.map(platform => 
      platform.id === platformId 
        ? { ...platform, status: 'connected' as const }
        : platform
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">LMS Integration & SCORM Compliance</h2>
        <p className="text-white/70">Seamless integration with learning management systems</p>
      </div>

      <Tabs defaultValue="platforms" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="platforms" className="flex items-center gap-2">
            <Link className="w-4 h-4" />
            Platforms
          </TabsTrigger>
          <TabsTrigger value="scorm" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            SCORM
          </TabsTrigger>
          <TabsTrigger value="gradebook" className="flex items-center gap-2">
            <BarChart className="w-4 h-4" />
            Gradebook
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Assignments
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="platforms">
          <div className="grid gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Connected LMS Platforms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {lmsPlatforms.map((platform) => (
                    <div key={platform.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{platform.logo}</div>
                        <div>
                          <h4 className="text-white font-medium flex items-center gap-2">
                            {platform.name}
                            {getStatusIcon(platform.status)}
                          </h4>
                          {platform.status === 'connected' ? (
                            <p className="text-white/60 text-sm">
                              {platform.students} students • {platform.courses} courses
                            </p>
                          ) : (
                            <p className="text-white/60 text-sm">
                              {platform.status === 'error' ? 'Connection error' : 'Not connected'}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getStatusColor(platform.status)} text-white`}>
                          {platform.status}
                        </Badge>
                        {platform.status !== 'connected' && (
                          <Button 
                            onClick={() => handleConnect(platform.id)}
                            variant="outline" 
                            size="sm"
                            className="border-white/30 text-white hover:bg-white/10"
                          >
                            Connect
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-white/30 text-white hover:bg-white/10"
                        >
                          Configure
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Integration Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-3">API Configuration</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-white text-sm">API Endpoint</label>
                        <Input 
                          placeholder="https://your-lms.edu/api/v1"
                          className="mt-1 bg-white/10 border-white/20 text-white placeholder-white/60"
                        />
                      </div>
                      <div>
                        <label className="text-white text-sm">API Key</label>
                        <Input 
                          type="password"
                          placeholder="Enter API key"
                          className="mt-1 bg-white/10 border-white/20 text-white placeholder-white/60"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-3">Sync Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm">Auto-sync grades</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm">Real-time progress</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm">Assignment creation</span>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scorm">
          <div className="grid gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  SCORM Packages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-medium">Available Packages</h4>
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                      <Upload className="w-4 h-4 mr-2" />
                      Generate Package
                    </Button>
                  </div>
                  
                  <div className="grid gap-3">
                    {scormPackages.map((pkg) => (
                      <div key={pkg.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <h5 className="text-white font-medium">{pkg.title}</h5>
                          <p className="text-white/60 text-sm">
                            Version {pkg.version} • {pkg.size} • Updated {pkg.lastUpdated}
                          </p>
                          <p className="text-white/60 text-xs">
                            {pkg.downloads} downloads
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-white/30 text-white hover:bg-white/10"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-white/30 text-white hover:bg-white/10"
                          >
                            Preview
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  SCORM Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-3">Package Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-white text-sm">Auto Grading</span>
                          <p className="text-white/60 text-xs">Automatically grade completed activities</p>
                        </div>
                        <Switch 
                          checked={scormSettings.autoGrading}
                          onCheckedChange={(checked) => setSCORMSettings(prev => ({ ...prev, autoGrading: checked }))}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-white text-sm">Progress Tracking</span>
                          <p className="text-white/60 text-xs">Track student progress through modules</p>
                        </div>
                        <Switch 
                          checked={scormSettings.progressTracking}
                          onCheckedChange={(checked) => setSCORMSettings(prev => ({ ...prev, progressTracking: checked }))}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-white text-sm">Time Tracking</span>
                          <p className="text-white/60 text-xs">Record time spent on activities</p>
                        </div>
                        <Switch 
                          checked={scormSettings.timeTracking}
                          onCheckedChange={(checked) => setSCORMSettings(prev => ({ ...prev, timeTracking: checked }))}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-white text-sm">Certificate Generation</span>
                          <p className="text-white/60 text-xs">Generate completion certificates</p>
                        </div>
                        <Switch 
                          checked={scormSettings.certificateGeneration}
                          onCheckedChange={(checked) => setSCORMSettings(prev => ({ ...prev, certificateGeneration: checked }))}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-3">Compliance Standards</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-white text-sm">SCORM 1.2</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-white text-sm">SCORM 2004</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-white text-sm">xAPI (Tin Can API)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-white text-sm">cmi5</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-white text-sm">QTI 2.1</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="gradebook">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart className="w-5 h-5" />
                Gradebook Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-medium">Recent Submissions</h4>
                  <Button 
                    variant="outline" 
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    Sync Grades
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left text-white text-sm font-medium p-2">Student</th>
                        <th className="text-left text-white text-sm font-medium p-2">Assignment</th>
                        <th className="text-left text-white text-sm font-medium p-2">Score</th>
                        <th className="text-left text-white text-sm font-medium p-2">Submitted</th>
                        <th className="text-left text-white text-sm font-medium p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gradebookEntries.map((entry, index) => (
                        <tr key={index} className="border-b border-white/10">
                          <td className="p-2">
                            <div>
                              <div className="text-white text-sm">{entry.studentName}</div>
                              <div className="text-white/60 text-xs">{entry.studentId}</div>
                            </div>
                          </td>
                          <td className="p-2 text-white text-sm">{entry.assignment}</td>
                          <td className="p-2">
                            <div className="flex items-center gap-2">
                              <Progress 
                                value={(entry.score / entry.maxScore) * 100} 
                                className="w-16 h-2"
                              />
                              <span className="text-white text-sm">
                                {entry.score}/{entry.maxScore}
                              </span>
                            </div>
                          </td>
                          <td className="p-2 text-white/70 text-sm">{entry.submittedAt}</td>
                          <td className="p-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-white/30 text-white hover:bg-white/10"
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Assignment Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-medium">Active Assignments</h4>
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                    Create Assignment
                  </Button>
                </div>

                <div className="grid gap-4">
                  {[
                    { title: 'Binary Search Implementation', dueDate: '2024-01-20', submissions: 45, total: 67 },
                    { title: 'Graph Algorithms Quiz', dueDate: '2024-01-25', submissions: 32, total: 67 },
                    { title: 'Dynamic Programming Project', dueDate: '2024-02-01', submissions: 12, total: 67 }
                  ].map((assignment, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-white font-medium">{assignment.title}</h5>
                        <Badge variant="outline" className="border-white/30 text-white/70">
                          <Calendar className="w-3 h-3 mr-1" />
                          Due {assignment.dueDate}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={(assignment.submissions / assignment.total) * 100} 
                            className="w-32 h-2"
                          />
                          <span className="text-white/70 text-sm">
                            {assignment.submissions}/{assignment.total} submitted
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-white/30 text-white hover:bg-white/10"
                          >
                            View Submissions
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-white/30 text-white hover:bg-white/10"
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Award className="w-5 h-5" />
                Learning Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">2,145</div>
                  <div className="text-white/70 text-sm">Total Students</div>
                  <div className="text-green-400 text-xs">+12% this month</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">89.3%</div>
                  <div className="text-white/70 text-sm">Completion Rate</div>
                  <div className="text-green-400 text-xs">+3% improvement</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">4.7</div>
                  <div className="text-white/70 text-sm">Average Rating</div>
                  <div className="text-white/70 text-xs">out of 5.0</div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-white font-medium mb-4">Course Performance</h4>
                <div className="space-y-3">
                  {[
                    { course: 'Data Structures', completion: 92, avgScore: 87 },
                    { course: 'Algorithms', completion: 85, avgScore: 82 },
                    { course: 'Graph Theory', completion: 78, avgScore: 79 }
                  ].map((course, index) => (
                    <div key={index} className="p-3 bg-white/5 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-sm">{course.course}</span>
                        <span className="text-white/70 text-sm">Avg: {course.avgScore}%</span>
                      </div>
                      <Progress value={course.completion} className="h-2" />
                      <div className="text-white/60 text-xs mt-1">{course.completion}% completion</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
