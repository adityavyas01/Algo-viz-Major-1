import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Target, Clock, Brain, BookOpen, Code2, Lightbulb, ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface DSATopic {
  id: string;
  name: string;
  category: string;
  description: string;
  difficulty_level: number;
}

interface AssessmentData {
  learning_style: 'visual' | 'hands_on' | 'theoretical' | 'mixed';
  primary_goal: 'interview_prep' | 'academic' | 'career_change' | 'skill_improvement' | 'competitive_programming';
  available_hours_per_week: number;
  prior_programming_experience: number;
  math_comfort_level: number;
  target_timeline_months: number;
  preferred_difficulty_progression: 'gradual' | 'moderate' | 'aggressive';
  topicAssessments: Record<string, {
    confidence_level: 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert';
    experience_level: number;
    interest_level: number;
  }>;
}

const STEPS = [
  { id: 'goals', title: 'Learning Goals', icon: Target },
  { id: 'experience', title: 'Experience Level', icon: Code2 },
  { id: 'preferences', title: 'Learning Style', icon: Brain },
  { id: 'topics', title: 'Topic Assessment', icon: BookOpen },
  { id: 'timeline', title: 'Timeline & Commitment', icon: Clock },
];

const LEARNING_GOALS = [
  {
    id: 'interview_prep',
    title: 'Interview Preparation',
    description: 'Get ready for technical interviews at top tech companies',
    icon: '🎯',
    features: ['FAANG interview patterns', 'Mock interviews', 'Behavioral prep']
  },
  {
    id: 'competitive_programming',
    title: 'Competitive Programming',
    description: 'Excel in programming contests and competitive platforms',
    icon: '🏆',
    features: ['Contest strategies', 'Advanced algorithms', 'Time optimization']
  },
  {
    id: 'career_change',
    title: 'Career Transition',
    description: 'Build a strong foundation for a software engineering career',
    icon: '🚀',
    features: ['Comprehensive basics', 'Real-world projects', 'Portfolio building']
  },
  {
    id: 'skill_improvement',
    title: 'Skill Enhancement',
    description: 'Improve existing programming and problem-solving skills',
    icon: '📈',
    features: ['Advanced concepts', 'Best practices', 'Code optimization']
  },
  {
    id: 'academic',
    title: 'Academic Success',
    description: 'Excel in computer science coursework and exams',
    icon: '🎓',
    features: ['Theory focus', 'Exam preparation', 'Assignment help']
  }
];

const LEARNING_STYLES = [
  {
    id: 'visual',
    title: 'Visual Learner',
    description: 'Learn best through animations, diagrams, and interactive visualizations',
    icon: '👁️'
  },
  {
    id: 'hands_on',
    title: 'Hands-on Learner',
    description: 'Prefer coding exercises, practical projects, and building things',
    icon: '⚡'
  },
  {
    id: 'theoretical',
    title: 'Theoretical Learner',
    description: 'Enjoy understanding concepts deeply through theory and proofs',
    icon: '📚'
  },
  {
    id: 'mixed',
    title: 'Mixed Approach',
    description: 'Combine visual, practical, and theoretical learning methods',
    icon: '🎨'
  }
];

export const SkillsAssessment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [dsaTopics, setDsaTopics] = useState<DSATopic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    learning_style: 'mixed',
    primary_goal: 'interview_prep',
    available_hours_per_week: 5,
    prior_programming_experience: 1,
    math_comfort_level: 1,
    target_timeline_months: 6,
    preferred_difficulty_progression: 'gradual',
    topicAssessments: {}
  });

  useEffect(() => {
    loadDSATopics();
  }, []);

  const loadDSATopics = async () => {
    setIsLoading(true);
    try {
      const { data: topics, error } = await supabase
        .from('dsa_topics')
        .select('*')
        .order('difficulty_level', { ascending: true });

      if (error) throw error;
      setDsaTopics(topics || []);

      // Initialize topic assessments
      const initialTopicAssessments: Record<string, any> = {};
      topics?.forEach(topic => {
        initialTopicAssessments[topic.id] = {
          confidence_level: 'beginner',
          experience_level: 1,
          interest_level: 3
        };
      });
      setAssessmentData(prev => ({ ...prev, topicAssessments: initialTopicAssessments }));
    } catch (error) {
      console.error('Error loading DSA topics:', error);
      toast({
        title: "Error loading topics",
        description: "Please refresh the page and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      // Create user assessment
      const { data: assessment, error: assessmentError } = await supabase
        .from('user_assessments')
        .insert({
          user_id: user.id,
          learning_style: assessmentData.learning_style,
          primary_goal: assessmentData.primary_goal,
          available_hours_per_week: assessmentData.available_hours_per_week,
          prior_programming_experience: assessmentData.prior_programming_experience,
          math_comfort_level: assessmentData.math_comfort_level,
          target_timeline_months: assessmentData.target_timeline_months,
          preferred_difficulty_progression: assessmentData.preferred_difficulty_progression
        })
        .select()
        .single();

      if (assessmentError) throw assessmentError;

      // Create topic assessments
      const topicAssessments = Object.entries(assessmentData.topicAssessments).map(([topicId, data]) => ({
        assessment_id: assessment.id,
        topic_id: topicId,
        confidence_level: data.confidence_level,
        experience_level: data.experience_level,
        interest_level: data.interest_level
      }));

      const { error: topicError } = await supabase
        .from('user_topic_assessments')
        .insert(topicAssessments);

      if (topicError) throw topicError;

      // Generate personalized learning path
      const { data: pathId, error: pathError } = await supabase
        .rpc('generate_learning_path', { user_assessment_id: assessment.id });

      if (pathError) throw pathError;

      toast({
        title: "Assessment Complete! 🎉",
        description: "Your personalized learning path has been created.",
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting assessment:', error);
      toast({
        title: "Submission Error",
        description: "Please try again. If the problem persists, contact support.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateTopicAssessment = (topicId: string, field: string, value: any) => {
    setAssessmentData(prev => ({
      ...prev,
      topicAssessments: {
        ...prev.topicAssessments,
        [topicId]: {
          ...prev.topicAssessments[topicId],
          [field]: value
        }
      }
    }));
  };

  const renderStepContent = () => {
    const step = STEPS[currentStep];

    switch (step.id) {
      case 'goals':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-3">What's your primary learning goal?</h2>
              <p className="text-white/70">This helps us tailor your learning experience to your specific objectives</p>
            </div>
            
            <div className="grid gap-4">
              {LEARNING_GOALS.map((goal) => (
                <Card 
                  key={goal.id} 
                  className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                    assessmentData.primary_goal === goal.id 
                      ? 'ring-2 ring-cyan-500 bg-cyan-500/10' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                  onClick={() => setAssessmentData(prev => ({ ...prev, primary_goal: goal.id as any }))}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">{goal.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{goal.title}</h3>
                        <p className="text-white/70 text-sm mb-3">{goal.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {goal.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {assessmentData.primary_goal === goal.id && (
                        <CheckCircle className="w-5 h-5 text-cyan-500" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-3">Tell us about your experience</h2>
              <p className="text-white/70">This helps us set the right starting point for your journey</p>
            </div>

            <div className="space-y-6">
              <Card className="bg-white/5">
                <CardContent className="p-6">
                  <Label className="text-white text-lg mb-4 block">Programming Experience</Label>
                  <p className="text-white/70 text-sm mb-4">How would you rate your overall programming skills?</p>
                  <Slider
                    value={[assessmentData.prior_programming_experience]}
                    onValueChange={(value) => setAssessmentData(prev => ({ ...prev, prior_programming_experience: value[0] }))}
                    max={5}
                    min={1}
                    step={1}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Beginner</span>
                    <span>Intermediate</span>
                    <span>Expert</span>
                  </div>
                  <p className="text-center text-white/80 mt-2">
                    Level: {assessmentData.prior_programming_experience}/5
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5">
                <CardContent className="p-6">
                  <Label className="text-white text-lg mb-4 block">Mathematics Comfort</Label>
                  <p className="text-white/70 text-sm mb-4">How comfortable are you with mathematical concepts?</p>
                  <Slider
                    value={[assessmentData.math_comfort_level]}
                    onValueChange={(value) => setAssessmentData(prev => ({ ...prev, math_comfort_level: value[0] }))}
                    max={5}
                    min={1}
                    step={1}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Uncomfortable</span>
                    <span>Neutral</span>
                    <span>Very Comfortable</span>
                  </div>
                  <p className="text-center text-white/80 mt-2">
                    Level: {assessmentData.math_comfort_level}/5
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-3">How do you learn best?</h2>
              <p className="text-white/70">Choose your preferred learning style to personalize your experience</p>
            </div>

            <div className="grid gap-4">
              {LEARNING_STYLES.map((style) => (
                <Card
                  key={style.id}
                  className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                    assessmentData.learning_style === style.id
                      ? 'ring-2 ring-cyan-500 bg-cyan-500/10'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                  onClick={() => setAssessmentData(prev => ({ ...prev, learning_style: style.id as any }))}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{style.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{style.title}</h3>
                        <p className="text-white/70 text-sm">{style.description}</p>
                      </div>
                      {assessmentData.learning_style === style.id && (
                        <CheckCircle className="w-5 h-5 text-cyan-500" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-white/5">
              <CardContent className="p-6">
                <Label className="text-white text-lg mb-4 block">Learning Pace Preference</Label>
                <p className="text-white/70 text-sm mb-4">How quickly do you prefer to progress through difficult concepts?</p>
                <RadioGroup
                  value={assessmentData.preferred_difficulty_progression}
                  onValueChange={(value) => setAssessmentData(prev => ({ ...prev, preferred_difficulty_progression: value as any }))}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gradual" id="gradual" />
                    <Label htmlFor="gradual" className="text-white">Gradual - Take time to master each concept thoroughly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="moderate" />
                    <Label htmlFor="moderate" className="text-white">Moderate - Balanced approach with reasonable challenges</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="aggressive" id="aggressive" />
                    <Label htmlFor="aggressive" className="text-white">Aggressive - Fast-paced with challenging exercises</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
        );

      case 'topics':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-3">Assess your knowledge</h2>
              <p className="text-white/70">Rate your confidence and interest in these key DSA topics</p>
            </div>

            <div className="grid gap-4 max-h-96 overflow-y-auto">
              {dsaTopics.map((topic) => (
                <Card key={topic.id} className="bg-white/5">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-white mb-1">{topic.name}</h3>
                        <p className="text-white/70 text-sm">{topic.description}</p>
                        <Badge variant="outline" className="mt-2">
                          Level {topic.difficulty_level}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-white text-sm mb-2 block">Confidence</Label>
                          <Select
                            value={assessmentData.topicAssessments[topic.id]?.confidence_level}
                            onValueChange={(value) => updateTopicAssessment(topic.id, 'confidence_level', value)}
                          >
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="novice">Novice</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                              <SelectItem value="expert">Expert</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-white text-sm mb-2 block">Experience (1-5)</Label>
                          <Slider
                            value={[assessmentData.topicAssessments[topic.id]?.experience_level || 1]}
                            onValueChange={(value) => updateTopicAssessment(topic.id, 'experience_level', value[0])}
                            max={5}
                            min={1}
                            step={1}
                          />
                        </div>

                        <div>
                          <Label className="text-white text-sm mb-2 block">Interest (1-5)</Label>
                          <Slider
                            value={[assessmentData.topicAssessments[topic.id]?.interest_level || 3]}
                            onValueChange={(value) => updateTopicAssessment(topic.id, 'interest_level', value[0])}
                            max={5}
                            min={1}
                            step={1}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-3">Plan your learning journey</h2>
              <p className="text-white/70">Set realistic goals for your study schedule</p>
            </div>

            <div className="space-y-6">
              <Card className="bg-white/5">
                <CardContent className="p-6">
                  <Label className="text-white text-lg mb-4 block">Weekly Study Time</Label>
                  <p className="text-white/70 text-sm mb-4">How many hours per week can you dedicate to learning?</p>
                  <Slider
                    value={[assessmentData.available_hours_per_week]}
                    onValueChange={(value) => setAssessmentData(prev => ({ ...prev, available_hours_per_week: value[0] }))}
                    max={40}
                    min={1}
                    step={1}
                    className="mb-4"
                  />
                  <p className="text-center text-white/80">
                    {assessmentData.available_hours_per_week} hours per week
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5">
                <CardContent className="p-6">
                  <Label className="text-white text-lg mb-4 block">Target Timeline</Label>
                  <p className="text-white/70 text-sm mb-4">In how many months do you want to achieve your goal?</p>
                  <Slider
                    value={[assessmentData.target_timeline_months]}
                    onValueChange={(value) => setAssessmentData(prev => ({ ...prev, target_timeline_months: value[0] }))}
                    max={24}
                    min={1}
                    step={1}
                    className="mb-4"
                  />
                  <p className="text-center text-white/80">
                    {assessmentData.target_timeline_months} months
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Lightbulb className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-white font-semibold">Your Estimated Journey</h3>
                  </div>
                  <div className="space-y-2 text-white/80">
                    <p>• Total study time: ~{assessmentData.available_hours_per_week * assessmentData.target_timeline_months * 4} hours</p>
                    <p>• Weekly commitment: {assessmentData.available_hours_per_week} hours</p>
                    <p>• Target completion: {assessmentData.target_timeline_months} months</p>
                    <p>• Learning pace: {assessmentData.preferred_difficulty_progression}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-white">Skills Assessment</h1>
            <span className="text-white/70">Step {currentStep + 1} of {STEPS.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
          
          {/* Step indicators */}
          <div className="flex justify-between mt-6">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    isActive ? 'bg-cyan-500 text-white' : 
                    isCompleted ? 'bg-green-500 text-white' : 
                    'bg-white/20 text-white/60'
                  }`}>
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs text-center ${
                    isActive ? 'text-cyan-400' : 
                    isCompleted ? 'text-green-400' : 
                    'text-white/60'
                  }`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
          <CardContent className="p-8">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                <p className="text-white/70">Loading assessment...</p>
              </div>
            ) : (
              renderStepContent()
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="border-white/30 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep === STEPS.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
            >
              {isSubmitting ? 'Creating your path...' : 'Complete Assessment'}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};