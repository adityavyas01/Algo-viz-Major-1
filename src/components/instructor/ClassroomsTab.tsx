
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Classroom } from '@/types/collaboration';
import { 
  GraduationCap,
  Edit
} from 'lucide-react';

interface ClassroomsTabProps {
  classrooms: Classroom[];
  onManageClassroom?: (classroomId: string) => void;
}

export const ClassroomsTab: React.FC<ClassroomsTabProps> = ({
  classrooms,
  onManageClassroom
}) => {
  const [selectedClassroom, setSelectedClassroom] = useState<string | null>(null);

  return (
    <div className="grid gap-4">
      {classrooms.map((classroom) => (
        <Card key={classroom.id} className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  {classroom.name}
                </CardTitle>
                <p className="text-white/70 mt-1">{classroom.description}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-white/60">
                  <span>{classroom.students.length}/{classroom.maxStudents} students</span>
                  <span>•</span>
                  <span>{classroom.schedule.length} scheduled classes</span>
                  {classroom.isActive && (
                    <>
                      <span>•</span>
                      <Badge variant="outline" className="bg-green-500 text-white border-0">
                        Active
                      </Badge>
                    </>
                  )}
                </div>
              </div>
              <Button
                onClick={() => onManageClassroom?.(classroom.id)}
                size="sm"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Edit className="w-4 h-4 mr-2" />
                Manage
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/80 text-sm">Class Progress</span>
                  <span className="text-white/60 text-sm">
                    {Math.round(classroom.students.reduce((acc, student) => acc + student.progress.averageScore, 0) / classroom.students.length)}% avg
                  </span>
                </div>
                <Progress 
                  value={classroom.students.reduce((acc, student) => acc + student.progress.averageScore, 0) / classroom.students.length} 
                  className="h-2"
                />
              </div>

              {selectedClassroom === classroom.id && (
                <div className="bg-black/20 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-white">Recent Students</h4>
                  <div className="space-y-2">
                    {classroom.students.slice(0, 5).map((student) => (
                      <div key={student.userId} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs">
                              {student.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-white text-sm">{student.username}</p>
                            <p className="text-white/60 text-xs">Level {student.progress.currentLevel}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white text-sm">{student.progress.averageScore.toFixed(1)}%</p>
                          <p className="text-white/60 text-xs">{student.progress.totalPoints} pts</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedClassroom(
                  selectedClassroom === classroom.id ? null : classroom.id
                )}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                {selectedClassroom === classroom.id ? 'Hide Students' : 'Show Students'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
