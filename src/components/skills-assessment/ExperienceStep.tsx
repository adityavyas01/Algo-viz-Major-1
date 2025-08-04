import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface ExperienceStepProps {
  programmingExperience: number;
  mathComfortLevel: number;
  onProgrammingExperienceChange: (value: number) => void;
  onMathComfortLevelChange: (value: number) => void;
}

export const ExperienceStep: React.FC<ExperienceStepProps> = ({
  programmingExperience,
  mathComfortLevel,
  onProgrammingExperienceChange,
  onMathComfortLevelChange,
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-3">
          Tell us about your experience
        </h2>
        <p className="text-white/70">
          This helps us set the right starting point for your journey
        </p>
      </div>

      <div className="space-y-6">
        <Card className="bg-white/5">
          <CardContent className="p-6">
            <Label className="text-white text-lg mb-4 block">
              Programming Experience
            </Label>
            <p className="text-white/70 text-sm mb-4">
              How would you rate your overall programming skills?
            </p>
            <Slider
              value={[programmingExperience]}
              onValueChange={(value) => onProgrammingExperienceChange(value[0])}
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
              Level: {programmingExperience}/5
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5">
          <CardContent className="p-6">
            <Label className="text-white text-lg mb-4 block">
              Mathematics Comfort
            </Label>
            <p className="text-white/70 text-sm mb-4">
              How comfortable are you with mathematical concepts?
            </p>
            <Slider
              value={[mathComfortLevel]}
              onValueChange={(value) => onMathComfortLevelChange(value[0])}
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
              Level: {mathComfortLevel}/5
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
