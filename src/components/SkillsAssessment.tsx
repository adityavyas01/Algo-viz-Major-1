import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Target,
  Clock,
  Brain,
  BookOpen,
  Code2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  GoalsStep,
  ExperienceStep,
  PreferencesStep,
  TopicsStep,
  TimelineStep,
  ProgressHeader,
} from "./skills-assessment";

interface DSATopic {
  id: string;
  name: string;
  category: string;
  description: string;
  difficulty_level: number;
}

interface AssessmentData {
  learning_style: "visual" | "hands_on" | "theoretical" | "mixed";
  primary_goal:
    | "interview_prep"
    | "academic"
    | "career_change"
    | "skill_improvement"
    | "competitive_programming";
  available_hours_per_week: number;
  prior_programming_experience: number;
  math_comfort_level: number;
  target_timeline_months: number;
  preferred_difficulty_progression: "gradual" | "moderate" | "aggressive";
  topicAssessments: Record<
    string,
    {
      confidence_level:
        | "beginner"
        | "novice"
        | "intermediate"
        | "advanced"
        | "expert";
      experience_level: number;
      interest_level: number;
    }
  >;
}

const STEPS = [
  { id: "goals", title: "Learning Goals", icon: Target },
  { id: "experience", title: "Experience Level", icon: Code2 },
  { id: "preferences", title: "Learning Style", icon: Brain },
  { id: "topics", title: "Topic Assessment", icon: BookOpen },
  { id: "timeline", title: "Timeline & Commitment", icon: Clock },
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
    learning_style: "mixed",
    primary_goal: "interview_prep",
    available_hours_per_week: 5,
    prior_programming_experience: 1,
    math_comfort_level: 1,
    target_timeline_months: 6,
    preferred_difficulty_progression: "gradual",
    topicAssessments: {},
  });

  useEffect(() => {
    loadDSATopics();
  }, []);

  const loadDSATopics = async () => {
    setIsLoading(true);
    try {
      const { data: topics, error } = await supabase
        .from("dsa_topics")
        .select("*")
        .order("difficulty_level", { ascending: true });

      if (error) throw error;
      setDsaTopics(topics || []);

      // Initialize topic assessments
      const initialTopicAssessments: Record<string, any> = {};
      topics?.forEach((topic) => {
        initialTopicAssessments[topic.id] = {
          confidence_level: "beginner",
          experience_level: 1,
          interest_level: 3,
        };
      });
      setAssessmentData((prev) => ({
        ...prev,
        topicAssessments: initialTopicAssessments,
      }));
    } catch (error) {
      console.error("Error loading DSA topics:", error);
      toast({
        title: "Error loading topics",
        description: "Please refresh the page and try again.",
        variant: "destructive",
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
        .from("user_assessments")
        .insert({
          user_id: user.id,
          learning_style: assessmentData.learning_style,
          primary_goal: assessmentData.primary_goal,
          available_hours_per_week: assessmentData.available_hours_per_week,
          prior_programming_experience:
            assessmentData.prior_programming_experience,
          math_comfort_level: assessmentData.math_comfort_level,
          target_timeline_months: assessmentData.target_timeline_months,
          preferred_difficulty_progression:
            assessmentData.preferred_difficulty_progression,
        })
        .select()
        .single();

      if (assessmentError) throw assessmentError;

      // Create topic assessments
      const topicAssessments = Object.entries(
        assessmentData.topicAssessments
      ).map(([topicId, data]) => ({
        assessment_id: assessment.id,
        topic_id: topicId,
        confidence_level: data.confidence_level,
        experience_level: data.experience_level,
        interest_level: data.interest_level,
      }));

      const { error: topicError } = await supabase
        .from("user_topic_assessments")
        .insert(topicAssessments);

      if (topicError) throw topicError;

      // Generate personalized learning path
      const { data: pathId, error: pathError } = await supabase.rpc(
        "generate_learning_path",
        { user_assessment_id: assessment.id }
      );

      if (pathError) throw pathError;

      toast({
        title: "Assessment Complete! 🎉",
        description: "Your personalized learning path has been created.",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting assessment:", error);
      toast({
        title: "Submission Error",
        description:
          "Please try again. If the problem persists, contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateTopicAssessment = (
    topicId: string,
    field: string,
    value: any
  ) => {
    setAssessmentData((prev) => ({
      ...prev,
      topicAssessments: {
        ...prev.topicAssessments,
        [topicId]: {
          ...prev.topicAssessments[topicId],
          [field]: value,
        },
      },
    }));
  };

  const renderStepContent = () => {
    const step = STEPS[currentStep];

    switch (step.id) {
      case "goals":
        return (
          <GoalsStep
            selectedGoal={assessmentData.primary_goal}
            onGoalSelect={(goalId) =>
              setAssessmentData((prev) => ({
                ...prev,
                primary_goal: goalId as any,
              }))
            }
          />
        );

      case "experience":
        return (
          <ExperienceStep
            programmingExperience={assessmentData.prior_programming_experience}
            mathComfortLevel={assessmentData.math_comfort_level}
            onProgrammingExperienceChange={(value) =>
              setAssessmentData((prev) => ({
                ...prev,
                prior_programming_experience: value,
              }))
            }
            onMathComfortLevelChange={(value) =>
              setAssessmentData((prev) => ({
                ...prev,
                math_comfort_level: value,
              }))
            }
          />
        );

      case "preferences":
        return (
          <PreferencesStep
            learningStyle={assessmentData.learning_style}
            difficultyProgression={
              assessmentData.preferred_difficulty_progression
            }
            onLearningStyleChange={(styleId) =>
              setAssessmentData((prev) => ({
                ...prev,
                learning_style: styleId as any,
              }))
            }
            onDifficultyProgressionChange={(progression) =>
              setAssessmentData((prev) => ({
                ...prev,
                preferred_difficulty_progression: progression as any,
              }))
            }
          />
        );

      case "topics":
        return (
          <TopicsStep
            topics={dsaTopics}
            topicAssessments={assessmentData.topicAssessments}
            onTopicAssessmentUpdate={updateTopicAssessment}
          />
        );

      case "timeline":
        return (
          <TimelineStep
            availableHoursPerWeek={assessmentData.available_hours_per_week}
            targetTimelineMonths={assessmentData.target_timeline_months}
            preferredDifficultyProgression={
              assessmentData.preferred_difficulty_progression
            }
            onAvailableHoursChange={(hours) =>
              setAssessmentData((prev) => ({
                ...prev,
                available_hours_per_week: hours,
              }))
            }
            onTargetTimelineChange={(months) =>
              setAssessmentData((prev) => ({
                ...prev,
                target_timeline_months: months,
              }))
            }
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Header */}
        <ProgressHeader steps={STEPS} currentStep={currentStep} />

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
              {isSubmitting ? "Creating your path..." : "Complete Assessment"}
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
