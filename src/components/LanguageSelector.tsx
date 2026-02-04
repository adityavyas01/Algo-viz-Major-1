/**
 * Language Selector Component
 * Dropdown to select programming language for code execution
 */

import React from 'react';
import { Check, ChevronDown, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { getAllLanguages, getLanguage } from '@/services/piston';
import type { LanguageId } from '@/types/execution';

interface LanguageSelectorProps {
  value: LanguageId;
  onChange: (language: LanguageId) => void;
  disabled?: boolean;
  showTemplate?: boolean;
  onTemplateInsert?: () => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  value,
  onChange,
  disabled = false,
  showTemplate = true,
  onTemplateInsert
}) => {
  const languages = getAllLanguages();
  const selectedLanguage = getLanguage(value);

  const popularLanguages: LanguageId[] = ['python', 'javascript', 'java', 'cpp', 'csharp'];
  const popular = languages.filter(lang => popularLanguages.includes(lang.id));
  const others = languages.filter(lang => !popularLanguages.includes(lang.id));

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className="min-w-[150px] justify-between bg-white/5 border-white/10 hover:bg-white/10"
          >
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              <span>{selectedLanguage?.name || 'Select Language'}</span>
            </div>
            <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          align="start" 
          className="w-[250px] max-h-[400px] overflow-y-auto bg-slate-800/95 backdrop-blur-md border-white/10"
        >
          <DropdownMenuLabel className="text-white/70 text-xs">
            Popular Languages
          </DropdownMenuLabel>
          {popular.map((language) => (
            <DropdownMenuItem
              key={language.id}
              onClick={() => onChange(language.id)}
              className="text-white hover:bg-white/10 cursor-pointer"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <span>{language.name}</span>
                  <Badge variant="secondary" className="text-xs bg-white/10">
                    {language.version}
                  </Badge>
                </div>
                {value === language.id && (
                  <Check className="w-4 h-4 text-green-500" />
                )}
              </div>
            </DropdownMenuItem>
          ))}
          
          {others.length > 0 && (
            <>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuLabel className="text-white/70 text-xs">
                Other Languages
              </DropdownMenuLabel>
              {others.map((language) => (
                <DropdownMenuItem
                  key={language.id}
                  onClick={() => onChange(language.id)}
                  className="text-white hover:bg-white/10 cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <span>{language.name}</span>
                      <Badge variant="secondary" className="text-xs bg-white/10">
                        {language.version}
                      </Badge>
                    </div>
                    {value === language.id && (
                      <Check className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {showTemplate && onTemplateInsert && selectedLanguage && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onTemplateInsert}
          disabled={disabled}
          className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
        >
          Insert Template
        </Button>
      )}
    </div>
  );
};
