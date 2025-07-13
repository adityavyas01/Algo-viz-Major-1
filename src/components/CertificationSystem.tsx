
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, CheckCircle, Clock, Target, Star } from 'lucide-react';
import { Certification } from '@/types/learning';

interface CertificationSystemProps {
  certifications: Certification[];
  onStartCertification?: (certificationId: string) => void;
}

export const CertificationSystem: React.FC<CertificationSystemProps> = ({ 
  certifications, 
  onStartCertification 
}) => {
  const completedCerts = certifications.filter(cert => cert.isCompleted);
  const inProgressCerts = certifications.filter(cert => !cert.isCompleted && cert.progress > 0);
  const availableCerts = certifications.filter(cert => cert.progress === 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Certifications & Badges</h2>
        <p className="text-white/70">Earn official certifications to showcase your expertise</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 text-center">
            <Award className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{completedCerts.length}</div>
            <div className="text-white/60 text-sm">Completed</div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 text-center">
            <Target className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{inProgressCerts.length}</div>
            <div className="text-white/60 text-sm">In Progress</div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 text-center">
            <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{availableCerts.length}</div>
            <div className="text-white/60 text-sm">Available</div>
          </CardContent>
        </Card>
      </div>

      {/* Completed Certifications */}
      {completedCerts.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Your Certifications</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {completedCerts.map((cert) => (
              <Card key={cert.id} className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border-green-500/30">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{cert.badge}</div>
                  <h4 className="text-white font-semibold text-lg mb-2">{cert.name}</h4>
                  <p className="text-white/80 text-sm mb-3">{cert.description}</p>
                  <Badge className="bg-green-500/30 text-green-300">
                    Certified
                  </Badge>
                  {cert.issueDate && (
                    <div className="text-xs text-white/60 mt-2">
                      Issued: {cert.issueDate.toLocaleDateString()}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* In Progress Certifications */}
      {inProgressCerts.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">In Progress</h3>
          <div className="space-y-4">
            {inProgressCerts.map((cert) => (
              <Card key={cert.id} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{cert.badge}</div>
                      <div>
                        <CardTitle className="text-white">{cert.name}</CardTitle>
                        <p className="text-white/70 text-sm">{cert.description}</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-300">
                      {cert.progress}% Complete
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-white/70">
                        <span>Overall Progress</span>
                        <span>{cert.progress}%</span>
                      </div>
                      <Progress value={cert.progress} className="h-2" />
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-3">Requirements:</h4>
                      <div className="space-y-2">
                        {cert.requirements.map((req) => (
                          <div key={req.id} className="flex items-center justify-between p-2 bg-white/5 rounded">
                            <div className="flex items-center gap-2">
                              {req.isCompleted ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <div className="w-4 h-4 border border-white/30 rounded-full" />
                              )}
                              <span className={`text-sm ${req.isCompleted ? 'text-white' : 'text-white/70'}`}>
                                {req.description}
                              </span>
                            </div>
                            <Badge variant="outline" className="text-white/60 border-white/30 text-xs">
                              {req.current}/{req.target}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1 text-white/60 text-sm">
                        <Clock className="w-4 h-4" />
                        Est. {cert.estimatedCompletionTime}
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Available Certifications */}
      {availableCerts.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Available Certifications</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {availableCerts.map((cert) => (
              <Card key={cert.id} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl opacity-60">{cert.badge}</div>
                    <div>
                      <CardTitle className="text-white">{cert.name}</CardTitle>
                      <p className="text-white/70 text-sm">{cert.description}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Requirements:</h4>
                      <div className="space-y-1">
                        {cert.requirements.slice(0, 3).map((req) => (
                          <div key={req.id} className="text-white/70 text-sm flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-white/40 rounded-full mt-2 flex-shrink-0" />
                            {req.description}
                          </div>
                        ))}
                        {cert.requirements.length > 3 && (
                          <div className="text-white/50 text-xs">
                            +{cert.requirements.length - 3} more requirements
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-white/60 text-sm">
                        <Clock className="w-4 h-4" />
                        Est. {cert.estimatedCompletionTime}
                      </div>
                      <Button
                        onClick={() => onStartCertification?.(cert.id)}
                        variant="outline"
                        size="sm"
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        Start Journey
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
