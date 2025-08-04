import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Lightbulb } from "lucide-react";

interface TimelineStepProps {
  availableHoursPerWeek: number;
  targetTimelineMonths: number;
  preferredDifficultyProgression: string;
  onAvailableHoursChange: (hours: number) => void;
  onTargetTimelineChange: (months: number) => void;
}

export const TimelineStep: React.FC<TimelineStepProps> = ({
  availableHoursPerWeek,
  targetTimelineMonths,
  preferredDifficultyProgression,
  onAvailableHoursChange,
  onTargetTimelineChange,
}) => {
  const totalStudyTime = availableHoursPerWeek * targetTimelineMonths * 4;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-3">
          Plan your learning journey
        </h2>
        <p className="text-white/70">
          Set realistic goals for your study schedule
        </p>
      </div>

      <div className="space-y-6">
        <Card className="bg-white/5">
          <CardContent className="p-6">
            <Label className="text-white text-lg mb-4 block">
              Weekly Study Time
            </Label>
            <p className="text-white/70 text-sm mb-4">
              How many hours per week can you dedicate to learning?
            </p>
            <Slider
              value={[availableHoursPerWeek]}
              onValueChange={(value) => onAvailableHoursChange(value[0])}
              max={40}
              min={1}
              step={1}
              className="mb-4"
            />
            <p className="text-center text-white/80">
              {availableHoursPerWeek} hours per week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5">
          <CardContent className="p-6">
            <Label className="text-white text-lg mb-4 block">
              Target Timeline
            </Label>
            <p className="text-white/70 text-sm mb-4">
              In how many months do you want to achieve your goal?
            </p>
            <Slider
              value={[targetTimelineMonths]}
              onValueChange={(value) => onTargetTimelineChange(value[0])}
              max={24}
              min={1}
              step={1}
              className="mb-4"
            />
            <p className="text-center text-white/80">
              {targetTimelineMonths} months
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Lightbulb className="w-6 h-6 text-cyan-400" />
              <h3 className="text-white font-semibold">
                Your Estimated Journey
              </h3>
            </div>
            <div className="space-y-2 text-white/80">
              <p>• Total study time: ~{totalStudyTime} hours</p>
              <p>• Weekly commitment: {availableHoursPerWeek} hours</p>
              <p>• Target completion: {targetTimelineMonths} months</p>
              <p>• Learning pace: {preferredDifficultyProgression}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
