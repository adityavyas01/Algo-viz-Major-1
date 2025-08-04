import React from "react";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";

interface Step {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ProgressHeaderProps {
  steps: Step[];
  currentStep: number;
}

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  steps,
  currentStep,
}) => {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-white">Skills Assessment</h1>
        <span className="text-white/70">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>
      <Progress value={progress} className="h-2" />

      {/* Step indicators */}
      <div className="flex justify-between mt-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  isActive
                    ? "bg-cyan-500 text-white"
                    : isCompleted
                    ? "bg-green-500 text-white"
                    : "bg-white/20 text-white/60"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              <span
                className={`text-xs text-center ${
                  isActive
                    ? "text-cyan-400"
                    : isCompleted
                    ? "text-green-400"
                    : "text-white/60"
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
