
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PeerReview } from '@/types/collaboration';
import { 
  FileText, 
  Star, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Eye,
  Edit3,
  Send
} from 'lucide-react';

interface PeerReviewSystemProps {
  reviews: PeerReview[];
  onStartReview?: (submissionId: string) => void;
  onSubmitReview?: (reviewId: string, feedback: any) => void;
  onRequestReview?: (submissionId: string) => void;
}

export const PeerReviewSystem: React.FC<PeerReviewSystemProps> = ({
  reviews,
  onStartReview,
  onSubmitReview,
  onRequestReview
}) => {
  const [selectedReview, setSelectedReview] = useState<string | null>(null);
  const [reviewFeedback, setReviewFeedback] = useState<{ [criteriaId: string]: { score: number; comment: string } }>({});

  const getStatusColor = (status: PeerReview['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'overdue': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  const getStatusIcon = (status: PeerReview['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Edit3 className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleScoreChange = (criteriaId: string, score: number[]) => {
    setReviewFeedback(prev => ({
      ...prev,
      [criteriaId]: {
        ...prev[criteriaId],
        score: score[0]
      }
    }));
  };

  const handleCommentChange = (criteriaId: string, comment: string) => {
    setReviewFeedback(prev => ({
      ...prev,
      [criteriaId]: {
        ...prev[criteriaId],
        comment
      }
    }));
  };

  const handleSubmitReview = (reviewId: string) => {
    onSubmitReview?.(reviewId, reviewFeedback);
    setReviewFeedback({});
    setSelectedReview(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Peer Review System</h2>
        <Button 
          onClick={() => onRequestReview?.('new-submission')}
          className="bg-gradient-to-r from-cyan-500 to-blue-600"
        >
          Request Review
        </Button>
      </div>

      <div className="grid gap-4">
        {reviews.map((review) => (
          <Card key={review.id} className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-white">Peer Review</CardTitle>
                    <Badge 
                      variant="outline" 
                      className={`${getStatusColor(review.status)} text-white border-0`}
                    >
                      {getStatusIcon(review.status)}
                      <span className="ml-1 capitalize">{review.status.replace('_', ' ')}</span>
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-white/70 space-y-1">
                    <p>Algorithm: <span className="text-cyan-300">{review.algorithmId.replace('-', ' ')}</span></p>
                    <p>Reviewer: <span className="text-white">{review.reviewerName}</span></p>
                    <p>Reviewee: <span className="text-white">{review.revieweeName}</span></p>
                    <p>Due: <span className="text-white">{review.dueDate.toLocaleDateString()}</span></p>
                  </div>

                  {review.status === 'completed' && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-semibold">{review.overallScore.toFixed(1)}/10</span>
                      </div>
                      <span className="text-white/60">•</span>
                      <span className="text-green-400 text-sm">Completed {review.submittedAt?.toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {review.status === 'pending' && (
                    <Button
                      onClick={() => onStartReview?.(review.submissionId)}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Start Review
                    </Button>
                  )}
                  
                  <Button
                    onClick={() => setSelectedReview(selectedReview === review.id ? null : review.id)}
                    size="sm"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {selectedReview === review.id ? 'Hide' : 'View'} Details
                  </Button>
                </div>
              </div>
            </CardHeader>

            {selectedReview === review.id && (
              <CardContent>
                <div className="space-y-6">
                  {/* Review Criteria */}
                  <div>
                    <h4 className="font-semibold text-white mb-4">Review Criteria</h4>
                    <div className="space-y-4">
                      {review.criteria.map((criterion) => {
                        const feedback = review.feedback.find(f => f.criteriaId === criterion.id);
                        const isInProgress = review.status === 'in_progress';
                        
                        return (
                          <div key={criterion.id} className="bg-black/20 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h5 className="font-medium text-white">{criterion.name}</h5>
                                <p className="text-sm text-white/70">{criterion.description}</p>
                                <p className="text-xs text-white/60 mt-1">
                                  Max Score: {criterion.maxScore} • Weight: {(criterion.weight * 100)}%
                                </p>
                              </div>
                              
                              {feedback && (
                                <div className="text-right">
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="text-white font-semibold">
                                      {feedback.score}/{criterion.maxScore}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>

                            {isInProgress ? (
                              <div className="space-y-3">
                                <div>
                                  <label className="text-sm text-white/80 mb-2 block">Score</label>
                                  <div className="flex items-center gap-4">
                                    <Slider
                                      value={[reviewFeedback[criterion.id]?.score || 0]}
                                      onValueChange={(value) => handleScoreChange(criterion.id, value)}
                                      max={criterion.maxScore}
                                      step={0.5}
                                      className="flex-1"
                                    />
                                    <span className="text-white font-semibold w-12">
                                      {reviewFeedback[criterion.id]?.score || 0}/{criterion.maxScore}
                                    </span>
                                  </div>
                                </div>
                                
                                <div>
                                  <label className="text-sm text-white/80 mb-2 block">Comments</label>
                                  <Textarea
                                    placeholder="Provide detailed feedback..."
                                    value={reviewFeedback[criterion.id]?.comment || ''}
                                    onChange={(e) => handleCommentChange(criterion.id, e.target.value)}
                                    className="bg-white/5 border-white/20"
                                  />
                                </div>
                              </div>
                            ) : feedback ? (
                              <div className="space-y-2">
                                <div className="bg-white/5 rounded p-3">
                                  <p className="text-white/90">{feedback.comment}</p>
                                </div>
                                
                                {feedback.suggestions.length > 0 && (
                                  <div>
                                    <p className="text-sm text-white/70 mb-1">Suggestions:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                      {feedback.suggestions.map((suggestion, index) => (
                                        <li key={index} className="text-sm text-white/80">{suggestion}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                
                                {feedback.highlights.length > 0 && (
                                  <div>
                                    <p className="text-sm text-white/70 mb-1">Code Highlights:</p>
                                    <div className="space-y-1">
                                      {feedback.highlights.map((highlight, index) => (
                                        <div key={index} className={`text-xs p-2 rounded ${
                                          highlight.type === 'positive' ? 'bg-green-500/20 text-green-300' :
                                          highlight.type === 'negative' ? 'bg-red-500/20 text-red-300' :
                                          'bg-blue-500/20 text-blue-300'
                                        }`}>
                                          Lines {highlight.lineStart}-{highlight.lineEnd}: {highlight.comment}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {review.status === 'in_progress' && (
                    <div className="flex justify-end gap-2">
                      <Button
                        onClick={() => setSelectedReview(null)}
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => handleSubmitReview(review.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Submit Review
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-white/50 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Reviews Available</h3>
          <p className="text-white/70 mb-4">Request a peer review or wait for assignments</p>
          <Button 
            onClick={() => onRequestReview?.('new-submission')}
            className="bg-gradient-to-r from-cyan-500 to-blue-600"
          >
            Request Your First Review
          </Button>
        </div>
      )}
    </div>
  );
};
