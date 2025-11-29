import React, { useMemo } from 'react';
import { ModernCanvas, CanvasUtils } from './ModernCanvas';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';

export interface StringChar {
  char: string;
  state: 'normal' | 'matching' | 'mismatch' | 'found' | 'pattern-match' | 'pattern-mismatch';
}

interface ModernStringVisualizationProps {
  text: StringChar[];
  pattern: StringChar[];
  patternStartIndex: number;
  width?: number;
  height?: number;
  className?: string;
}

export const ModernStringVisualization: React.FC<ModernStringVisualizationProps> = ({
  text,
  pattern,
  patternStartIndex,
  width = 900,
  height = 250,
  className = "",
}) => {
  const { currentTheme } = useVisualizationTheme();

  const getStateStyle = (state: StringChar['state']): { bg: string; text: string; border: string } => {
    switch (state) {
      case 'matching':
        return { bg: currentTheme.colors.success + '80', text: 'white', border: currentTheme.colors.success };
      case 'mismatch':
        return { bg: currentTheme.colors.error + '80', text: 'white', border: currentTheme.colors.error };
      case 'found':
        return { bg: currentTheme.colors.primary, text: 'white', border: currentTheme.colors.primary };
      case 'pattern-match':
        return { bg: currentTheme.colors.success, text: 'white', border: currentTheme.colors.success };
      case 'pattern-mismatch':
        return { bg: currentTheme.colors.error, text: 'white', border: currentTheme.colors.error };
      default:
        return { bg: currentTheme.colors.surface + '80', text: currentTheme.colors.text, border: currentTheme.colors.border };
    }
  };

  const onDraw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, theme: any, utils: CanvasUtils) => {
    const charWidth = 35;
    const charHeight = 45;
    const spacing = 5;
    const textY = 80;
    const patternY = 160;
    const startX = (width - (text.length * (charWidth + spacing))) / 2;

    // Draw Text
    ctx.font = 'bold 18px "Courier New", monospace';
    text.forEach((stringChar, index) => {
      const x = startX + index * (charWidth + spacing);
      const style = getStateStyle(stringChar.state);

      ctx.fillStyle = style.bg;
      utils.roundRect(ctx, x, textY, charWidth, charHeight, 8);
      ctx.fill();
      
      ctx.strokeStyle = style.border;
      ctx.lineWidth = 2;
      utils.roundRect(ctx, x, textY, charWidth, charHeight, 8);
      ctx.stroke();

      ctx.fillStyle = style.text;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(stringChar.char, x + charWidth / 2, textY + charHeight / 2);
      
      ctx.fillStyle = theme.colors.textSecondary;
      ctx.font = '12px Arial';
      ctx.fillText(index.toString(), x + charWidth / 2, textY - 15);
    });

    // Draw Pattern
    ctx.font = 'bold 18px "Courier New", monospace';
    if (patternStartIndex >= 0 && patternStartIndex <= text.length - pattern.length) {
        const patternStartX = startX + patternStartIndex * (charWidth + spacing);
        pattern.forEach((patternChar, index) => {
            const x = patternStartX + index * (charWidth + spacing);
            const textIndex = patternStartIndex + index;
            const state = text[textIndex].char === patternChar.char ? 'pattern-match' : 'pattern-mismatch';
            const style = getStateStyle(state);

            ctx.fillStyle = style.bg;
            utils.roundRect(ctx, x, patternY, charWidth, charHeight, 8);
            ctx.fill();

            ctx.strokeStyle = style.border;
            ctx.lineWidth = 2;
            utils.roundRect(ctx, x, patternY, charWidth, charHeight, 8);
            ctx.stroke();

            ctx.fillStyle = style.text;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(patternChar.char, x + charWidth / 2, patternY + charHeight / 2);

            ctx.fillStyle = theme.colors.textSecondary;
            ctx.font = '12px Arial';
            ctx.fillText(index.toString(), x + charWidth / 2, patternY + charHeight + 15);
        });
    }
    
    // Draw labels
    ctx.fillStyle = theme.colors.text;
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Text', startX - 50, textY + charHeight / 2);
    ctx.fillText('Pattern', startX - 70, patternY + charHeight / 2);
  };

  return (
    <ModernCanvas
      width={width}
      height={height}
      onDraw={onDraw}
      className={className}
    />
  );
};

export default ModernStringVisualization;
