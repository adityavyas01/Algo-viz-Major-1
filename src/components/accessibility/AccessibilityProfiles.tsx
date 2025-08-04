import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Eye, Hand, Brain, Heart } from "lucide-react";

interface AccessibilityProfile {
  name: string;
  description: string;
  settings: {
    textSize: number;
    contrast: boolean;
    motion: boolean;
    audio: boolean;
    voiceControl: boolean;
  };
}

interface AccessibilityProfilesProps {
  profiles: AccessibilityProfile[];
  currentProfile: string;
  onProfileSelect: (profileName: string) => void;
}

const getProfileIcon = (profileName: string) => {
  switch (profileName) {
    case "Visual Impairment":
      return <Eye className="w-5 h-5" />;
    case "Motor Impairment":
      return <Hand className="w-5 h-5" />;
    case "Cognitive Assistance":
      return <Brain className="w-5 h-5" />;
    case "Hearing Impairment":
      return <Heart className="w-5 h-5" />;
    default:
      return <Users className="w-5 h-5" />;
  }
};

export const AccessibilityProfiles: React.FC<AccessibilityProfilesProps> = ({
  profiles,
  currentProfile,
  onProfileSelect,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">
        Accessibility Profiles
      </h3>
      <div className="grid gap-4">
        {profiles.map((profile) => (
          <Card
            key={profile.name}
            className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
              currentProfile === profile.name
                ? "ring-2 ring-cyan-500 bg-cyan-500/10"
                : "bg-white/5 hover:bg-white/10"
            }`}
            onClick={() => onProfileSelect(profile.name)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="text-cyan-400">
                  {getProfileIcon(profile.name)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1">
                    {profile.name}
                  </h4>
                  <p className="text-white/70 text-sm mb-3">
                    {profile.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {profile.settings.textSize > 100 && (
                      <Badge variant="secondary" className="text-xs">
                        Large Text ({profile.settings.textSize}%)
                      </Badge>
                    )}
                    {profile.settings.contrast && (
                      <Badge variant="secondary" className="text-xs">
                        High Contrast
                      </Badge>
                    )}
                    {profile.settings.audio && (
                      <Badge variant="secondary" className="text-xs">
                        Audio Cues
                      </Badge>
                    )}
                    {profile.settings.voiceControl && (
                      <Badge variant="secondary" className="text-xs">
                        Voice Control
                      </Badge>
                    )}
                    {!profile.settings.motion && (
                      <Badge variant="secondary" className="text-xs">
                        Reduced Motion
                      </Badge>
                    )}
                  </div>
                </div>
                {currentProfile === profile.name && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-cyan-500 border-cyan-500"
                  >
                    Active
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
