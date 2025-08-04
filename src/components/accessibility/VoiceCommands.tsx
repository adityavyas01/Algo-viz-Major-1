import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mic,
  Navigation,
  MousePointer,
  FileText,
  Settings,
} from "lucide-react";

interface VoiceCommand {
  command: string;
  action: string;
  category: "navigation" | "interaction" | "content" | "system";
}

interface VoiceCommandsProps {
  commands: VoiceCommand[];
  isListening: boolean;
  onStartListening: () => void;
}

const getCategoryIcon = (category: VoiceCommand["category"]) => {
  switch (category) {
    case "navigation":
      return <Navigation className="w-4 h-4" />;
    case "interaction":
      return <MousePointer className="w-4 h-4" />;
    case "content":
      return <FileText className="w-4 h-4" />;
    case "system":
      return <Settings className="w-4 h-4" />;
    default:
      return <Mic className="w-4 h-4" />;
  }
};

const getCategoryColor = (category: VoiceCommand["category"]) => {
  switch (category) {
    case "navigation":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "interaction":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "content":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "system":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

export const VoiceCommands: React.FC<VoiceCommandsProps> = ({
  commands,
  isListening,
  onStartListening,
}) => {
  const groupedCommands = commands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = [];
    }
    acc[command.category].push(command);
    return acc;
  }, {} as Record<string, VoiceCommand[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Voice Commands</h3>
        <button
          onClick={onStartListening}
          disabled={isListening}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            isListening
              ? "bg-red-500/20 text-red-400 border border-red-500/30"
              : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30"
          }`}
        >
          <Mic className={`w-4 h-4 ${isListening ? "animate-pulse" : ""}`} />
          {isListening ? "Listening..." : "Start Listening"}
        </button>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedCommands).map(([category, categoryCommands]) => (
          <Card key={category} className="bg-white/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                {getCategoryIcon(category as VoiceCommand["category"])}
                <h4 className="font-medium text-white capitalize">
                  {category}
                </h4>
                <Badge
                  variant="outline"
                  className={getCategoryColor(
                    category as VoiceCommand["category"]
                  )}
                >
                  {categoryCommands.length} commands
                </Badge>
              </div>
              <div className="grid gap-2">
                {categoryCommands.map((command, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-white/5 rounded"
                  >
                    <div>
                      <p className="text-white font-medium">
                        "{command.command}"
                      </p>
                      <p className="text-white/70 text-sm">{command.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
