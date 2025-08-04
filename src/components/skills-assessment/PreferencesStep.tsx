import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle } from "lucide-react";

interface LearningStyle {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface PreferencesStepProps {
  learningStyle: string;
  difficultyProgression: string;
  onLearningStyleChange: (styleId: string) => void;
  onDifficultyProgressionChange: (progression: string) => void;
}

const LEARNING_STYLES: LearningStyle[] = [
  {
    id: "visual",
    title: "Visual Learner",
    description:
      "Learn best through animations, diagrams, and interactive visualizations",
    icon: "👁️",
  },
  {
    id: "hands_on",
    title: "Hands-on Learner",
    description:
      "Prefer coding exercises, practical projects, and building things",
    icon: "⚡",
  },
  {
    id: "theoretical",
    title: "Theoretical Learner",
    description:
      "Enjoy understanding concepts deeply before practical application",
    icon: "🧠",
  },
  {
    id: "mixed",
    title: "Mixed Approach",
    description: "Prefer a balanced combination of different learning methods",
    icon: "🔄",
  },
];

export const PreferencesStep: React.FC<PreferencesStepProps> = ({
  learningStyle,
  difficultyProgression,
  onLearningStyleChange,
  onDifficultyProgressionChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-3">
          How do you learn best?
        </h2>
        <p className="text-white/70">
          Choose your preferred learning style to personalize your experience
        </p>
      </div>

      <div className="grid gap-4">
        {LEARNING_STYLES.map((style) => (
          <Card
            key={style.id}
            className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
              learningStyle === style.id
                ? "ring-2 ring-cyan-500 bg-cyan-500/10"
                : "bg-white/5 hover:bg-white/10"
            }`}
            onClick={() => onLearningStyleChange(style.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="text-2xl">{style.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">
                    {style.title}
                  </h3>
                  <p className="text-white/70 text-sm">{style.description}</p>
                </div>
                {learningStyle === style.id && (
                  <CheckCircle className="w-5 h-5 text-cyan-500" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white/5">
        <CardContent className="p-6">
          <Label className="text-white text-lg mb-4 block">
            Learning Pace Preference
          </Label>
          <p className="text-white/70 text-sm mb-4">
            How quickly do you prefer to progress through difficult concepts?
          </p>
          <RadioGroup
            value={difficultyProgression}
            onValueChange={onDifficultyProgressionChange}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gradual" id="gradual" />
              <Label htmlFor="gradual" className="text-white">
                Gradual - Take time to master each concept thoroughly
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="moderate" id="moderate" />
              <Label htmlFor="moderate" className="text-white">
                Moderate - Balanced approach with reasonable challenges
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="aggressive" id="aggressive" />
              <Label htmlFor="aggressive" className="text-white">
                Aggressive - Fast-paced with challenging exercises
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
};
