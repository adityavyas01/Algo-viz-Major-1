import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface DSATopic {
  id: string;
  name: string;
  category: string;
  description: string;
  difficulty_level: number;
}

interface TopicAssessment {
  confidence_level:
    | "beginner"
    | "novice"
    | "intermediate"
    | "advanced"
    | "expert";
  experience_level: number;
  interest_level: number;
}

interface TopicsStepProps {
  topics: DSATopic[];
  topicAssessments: Record<string, TopicAssessment>;
  onTopicAssessmentUpdate: (topicId: string, field: string, value: any) => void;
}

export const TopicsStep: React.FC<TopicsStepProps> = ({
  topics,
  topicAssessments,
  onTopicAssessmentUpdate,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-3">
          Assess your knowledge
        </h2>
        <p className="text-white/70">
          Rate your confidence and interest in these key DSA topics
        </p>
      </div>

      <div className="grid gap-4 max-h-96 overflow-y-auto">
        {topics.map((topic) => (
          <Card key={topic.id} className="bg-white/5">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    {topic.name}
                  </h3>
                  <p className="text-white/70 text-sm">{topic.description}</p>
                  <Badge variant="outline" className="mt-2">
                    Level {topic.difficulty_level}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-white text-sm mb-2 block">
                      Confidence
                    </Label>
                    <Select
                      value={topicAssessments[topic.id]?.confidence_level}
                      onValueChange={(value) =>
                        onTopicAssessmentUpdate(
                          topic.id,
                          "confidence_level",
                          value
                        )
                      }
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="novice">Novice</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-white text-sm mb-2 block">
                      Experience (1-5)
                    </Label>
                    <Slider
                      value={[
                        topicAssessments[topic.id]?.experience_level || 1,
                      ]}
                      onValueChange={(value) =>
                        onTopicAssessmentUpdate(
                          topic.id,
                          "experience_level",
                          value[0]
                        )
                      }
                      max={5}
                      min={1}
                      step={1}
                    />
                  </div>

                  <div>
                    <Label className="text-white text-sm mb-2 block">
                      Interest (1-5)
                    </Label>
                    <Slider
                      value={[topicAssessments[topic.id]?.interest_level || 3]}
                      onValueChange={(value) =>
                        onTopicAssessmentUpdate(
                          topic.id,
                          "interest_level",
                          value[0]
                        )
                      }
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
};
