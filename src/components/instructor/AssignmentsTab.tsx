
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Assignment } from '@/types/collaboration';
import { 
  BookOpen,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  Edit
} from 'lucide-react';

interface AssignmentsTabProps {
  assignments: Assignment[];
  onEditAssignment?: (assignmentId: string) => void;
  onViewSubmissions?: (assignmentId: string) => void;
}

export const AssignmentsTab: React.FC<AssignmentsTabProps> = ({
  assignments,
  onEditAssignment,
  onViewSubmissions
}) => {
  return (
    <div className="grid gap-4">
      {assignments.map((assignment) => (
        <Card key={assignment.id} className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  {assignment.title}
                </CardTitle>
                <p className="text-white/70 mt-1">{assignment.description}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-white/60">
                  <span>Due: {assignment.dueDate.toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{assignment.submissions.length} submissions</span>
                  <span>•</span>
                  <Badge 
                    variant="outline"
                    className={`${
                      assignment.difficulty === 'beginner' ? 'border-green-400 text-green-300' :
                      assignment.difficulty === 'intermediate' ? 'border-yellow-400 text-yellow-300' :
                      'border-red-400 text-red-300'
                    }`}
                  >
                    {assignment.difficulty}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => onViewSubmissions?.(assignment.id)}
                  size="sm"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Submissions
                </Button>
                <Button
                  onClick={() => onEditAssignment?.(assignment.id)}
                  size="sm"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/80 text-sm">Submission Progress</span>
                <span className="text-white/60 text-sm">
                  {assignment.submissions.filter(s => s.status === 'submitted').length} submitted
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-green-500/20 rounded-lg p-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-1" />
                  <p className="text-green-300 text-sm">Completed</p>
                  <p className="text-white font-semibold">
                    {assignment.submissions.filter(s => s.status === 'graded').length}
                  </p>
                </div>
                <div className="bg-yellow-500/20 rounded-lg p-3">
                  <Clock className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                  <p className="text-yellow-300 text-sm">Pending</p>
                  <p className="text-white font-semibold">
                    {assignment.submissions.filter(s => s.status === 'submitted').length}
                  </p>
                </div>
                <div className="bg-red-500/20 rounded-lg p-3">
                  <AlertCircle className="w-6 h-6 text-red-400 mx-auto mb-1" />
                  <p className="text-red-300 text-sm">Late</p>
                  <p className="text-white font-semibold">
                    {assignment.submissions.filter(s => s.isLate).length}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
