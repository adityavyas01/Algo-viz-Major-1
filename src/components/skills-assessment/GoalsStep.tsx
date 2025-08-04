import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface LearningGoal {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

interface GoalsStepProps {
  selectedGoal: string;
  onGoalSelect: (goalId: string) => void;
}

const LEARNING_GOALS: LearningGoal[] = [
  {
    id: "interview_prep",
    title: "Interview Preparation",
    description: "Get ready for technical interviews at top tech companies",
    icon: "🎯",
    features: [
      "FAANG interview patterns",
      "Mock interviews",
      "Behavioral prep",
    ],
  },
  {
    id: "competitive_programming",
    title: "Competitive Programming",
    description: "Excel in programming contests and competitive platforms",
    icon: "🏆",
    features: [
      "Contest strategies",
      "Advanced algorithms",
      "Time optimization",
    ],
  },
  {
    id: "career_change",
    title: "Career Transition",
    description: "Build a strong foundation for a software engineering career",
    icon: "🚀",
    features: [
      "Comprehensive basics",
      "Real-world projects",
      "Portfolio building",
    ],
  },
  {
    id: "skill_improvement",
    title: "Skill Enhancement",
    description: "Improve existing programming and problem-solving skills",
    icon: "📈",
    features: ["Advanced concepts", "Best practices", "Code optimization"],
  },
  {
    id: "academic",
    title: "Academic Success",
    description: "Excel in computer science coursework and exams",
    icon: "🎓",
    features: ["Theory focus", "Exam preparation", "Assignment help"],
  },
];

export const GoalsStep: React.FC<GoalsStepProps> = ({
  selectedGoal,
  onGoalSelect,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-3">
          What's your primary learning goal?
        </h2>
        <p className="text-white/70">
          This helps us tailor your learning experience to your specific
          objectives
        </p>
      </div>

      <div className="grid gap-4">
        {LEARNING_GOALS.map((goal) => (
          <Card
            key={goal.id}
            className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
              selectedGoal === goal.id
                ? "ring-2 ring-cyan-500 bg-cyan-500/10"
                : "bg-white/5 hover:bg-white/10"
            }`}
            onClick={() => onGoalSelect(goal.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="text-2xl">{goal.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">
                    {goal.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-3">
                    {goal.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {goal.features.map((feature, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                {selectedGoal === goal.id && (
                  <CheckCircle className="w-5 h-5 text-cyan-500" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
