import React from 'react';
import ModernVisualizationBase from './ModernVisualizationBase';
import ModernStringVisualization from './ModernStringVisualization';
import { useAnimation } from '@/hooks/useAnimation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// KMP algorithm logic
const kmpSearch = (text: string, pattern: string) => {
  const frames = [];
  const lps = computeLPS(pattern);
  let i = 0; // index for text
  let j = 0; // index for pattern

  frames.push({
    text: text.split(''),
    pattern: pattern.split(''),
    textHighlights: [],
    patternHighlights: [],
    textPointers: [{ index: i, label: 'i' }],
    patternPointers: [{ index: j, label: 'j' }],
    matchIndices: [],
    explanation: `Starting KMP search. LPS table: [${lps.join(', ')}]`,
    lpsTable: lps,
  });

  while (i < text.length) {
    const textHighlights = [];
    const patternHighlights = [];

    if (pattern[j] === text[i]) {
      textHighlights.push({ index: i, color: 'bg-green-500' });
      patternHighlights.push({ index: j, color: 'bg-green-500' });
      frames.push({
        text: text.split(''),
        pattern: pattern.split(''),
        textHighlights,
        patternHighlights,
        textPointers: [{ index: i, label: 'i' }],
        patternPointers: [{ index: j, label: 'j' }],
        matchIndices: frames[frames.length - 1].matchIndices,
        explanation: `Match! text[${i}] == pattern[${j}]. Advancing both pointers.`,
        lpsTable: lps,
      });
      i++;
      j++;
    }

    if (j === pattern.length) {
      const matchIndex = i - j;
      const newMatchIndices = [...frames[frames.length - 1].matchIndices, matchIndex];
      const foundHighlights = Array.from({ length: pattern.length }, (_, k) => ({
        index: matchIndex + k,
        color: 'bg-blue-500',
      }));

      frames.push({
        text: text.split(''),
        pattern: pattern.split(''),
        textHighlights: foundHighlights,
        patternHighlights: [],
        textPointers: [{ index: i, label: 'i' }],
        patternPointers: [{ index: j, label: 'j' }],
        matchIndices: newMatchIndices,
        explanation: `Pattern found at index ${matchIndex}! Shifting pattern using LPS table. j = lps[${j - 1}] = ${lps[j - 1]}.`,
        lpsTable: lps,
      });
      j = lps[j - 1];
    } else if (i < text.length && pattern[j] !== text[i]) {
      textHighlights.push({ index: i, color: 'bg-red-500' });
      patternHighlights.push({ index: j, color: 'bg-red-500' });
      const explanation = j !== 0
        ? `Mismatch. Shifting pattern using LPS table. j = lps[${j - 1}] = ${lps[j - 1]}.`
        : `Mismatch. Advancing text pointer i.`;
      
      frames.push({
        text: text.split(''),
        pattern: pattern.split(''),
        textHighlights,
        patternHighlights,
        textPointers: [{ index: i, label: 'i' }],
        patternPointers: [{ index: j, label: 'j' }],
        matchIndices: frames[frames.length - 1].matchIndices,
        explanation: explanation,
        lpsTable: lps,
      });

      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }

  frames.push({
    text: text.split(''),
    pattern: pattern.split(''),
    textHighlights: [],
    patternHighlights: [],
    textPointers: [],
    patternPointers: [],
    matchIndices: frames[frames.length - 1].matchIndices,
    explanation: `Search complete. Found ${frames[frames.length - 1].matchIndices.length} matches.`,
    lpsTable: lps,
  });

  return frames;
};

const computeLPS = (pattern: string) => {
  const lps = new Array(pattern.length).fill(0);
  let length = 0;
  let i = 1;

  while (i < pattern.length) {
    if (pattern[i] === pattern[length]) {
      length++;
      lps[i] = length;
      i++;
    } else {
      if (length !== 0) {
        length = lps[length - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
  return lps;
};

const rabinKarpSearch = (text: string, pattern: string) => {
  const frames = [];
  const d = 256; // number of characters in the input alphabet
  const q = 101; // a prime number
  const m = pattern.length;
  const n = text.length;
  let p = 0; // hash value for pattern
  let t = 0; // hash value for text
  let h = 1;
  const matchIndices = [];

  // The value of h would be "pow(d, m-1)%q"
  for (let i = 0; i < m - 1; i++) {
    h = (h * d) % q;
  }

  // Calculate the hash value of pattern and first window of text
  for (let i = 0; i < m; i++) {
    p = (d * p + pattern.charCodeAt(i)) % q;
    t = (d * t + text.charCodeAt(i)) % q;
  }

  frames.push({
    text: text.split(''),
    pattern: pattern.split(''),
    textHighlights: Array.from({ length: m }, (_, k) => ({ index: k, color: 'bg-yellow-500' })),
    patternHighlights: [],
    textPointers: [],
    patternPointers: [],
    matchIndices: [],
    explanation: `Starting Rabin-Karp. Pattern hash: ${p}. Initial window hash: ${t}.`,
    hashes: { pattern: p, window: t },
  });

  // Slide the pattern over text one by one
  for (let i = 0; i <= n - m; i++) {
    const textHighlights = Array.from({ length: m }, (_, k) => ({ index: i + k, color: 'bg-yellow-500' }));

    // Check the hash values of current window of text and pattern
    if (p === t) {
      let j = 0;
      for (j = 0; j < m; j++) {
        if (text[i + j] !== pattern[j]) {
          break;
        }
      }

      if (j === m) {
        matchIndices.push(i);
        const foundHighlights = Array.from({ length: m }, (_, k) => ({ index: i + k, color: 'bg-blue-500' }));
        frames.push({
          text: text.split(''),
          pattern: pattern.split(''),
          textHighlights: foundHighlights,
          patternHighlights: [],
          textPointers: [],
          patternPointers: [],
          matchIndices: [...matchIndices],
          explanation: `Hash match and string match! Pattern found at index ${i}.`,
          hashes: { pattern: p, window: t },
        });
      } else {
        frames.push({
          text: text.split(''),
          pattern: pattern.split(''),
          textHighlights: textHighlights.map(h => ({...h, color: 'bg-red-500'})),
          patternHighlights: [],
          textPointers: [],
          patternPointers: [],
          matchIndices: [...matchIndices],
          explanation: `Hash match, but it's a spurious hit. Strings do not match.`,
          hashes: { pattern: p, window: t },
        });
      }
    } else {
       frames.push({
        text: text.split(''),
        pattern: pattern.split(''),
        textHighlights,
        patternHighlights: [],
        textPointers: [],
        patternPointers: [],
        matchIndices: [...matchIndices],
        explanation: `Sliding window. Window hash: ${t}. Pattern hash: ${p}. No match.`,
        hashes: { pattern: p, window: t },
      });
    }

    // Calculate hash value for next window of text
    if (i < n - m) {
      t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
      if (t < 0) {
        t = t + q;
      }
    }
  }
  
  frames.push({
    text: text.split(''),
    pattern: pattern.split(''),
    textHighlights: [],
    patternHighlights: [],
    textPointers: [],
    patternPointers: [],
    matchIndices: [...matchIndices],
    explanation: `Search complete. Found ${matchIndices.length} matches.`,
    hashes: null,
  });

  return frames;
};

const ModernStringMatchingVisualization: React.FC = () => {
  const [text, setText] = React.useState('ababcabcabababd');
  const [pattern, setPattern] = React.useState('ababd');
  const [algorithm, setAlgorithm] = React.useState('kmp');

  const {
    animation,
    setAnimation,
    currentFrame,
    setCurrentFrame,
    isPlaying,
    setIsPlaying,
    progress,
    setProgress,
  } = useAnimation([]);

  const performAlgorithm = () => {
    let frames;
    if (algorithm === 'kmp') {
      frames = kmpSearch(text, pattern);
    } else {
      frames = rabinKarpSearch(text, pattern);
    }
    setAnimation(frames);
    setCurrentFrame(0);
    setProgress(0);
  };

  const controls = (
    <div className="flex flex-wrap items-center gap-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="text-input">Text</Label>
        <Input id="text-input" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="grid w-full max-w-xs items-center gap-1.5">
        <Label htmlFor="pattern-input">Pattern</Label>
        <Input id="pattern-input" value={pattern} onChange={(e) => setPattern(e.target.value)} />
      </div>
      <div className="grid w-full max-w-xs items-center gap-1.5">
        <Label>Algorithm</Label>
        <Select value={algorithm} onValueChange={setAlgorithm}>
          <SelectTrigger>
            <SelectValue placeholder="Select algorithm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kmp">Knuth-Morris-Pratt (KMP)</SelectItem>
            <SelectItem value="rabin-karp">Rabin-Karp</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={performAlgorithm} className="self-end">Visualize</Button>
    </div>
  );

  const frame = animation[currentFrame];

  const renderLpsTable = () => {
    if (algorithm !== 'kmp' || !frame?.lpsTable) return null;
    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2 text-center text-white">LPS Table</h3>
        <div className="flex justify-center gap-1">
          {frame.lpsTable.map((val: number, idx: number) => (
            <div key={idx} className="p-2 rounded text-center bg-gray-700">
              <div className="font-mono text-sm text-gray-300">{pattern[idx]}</div>
              <div className="font-bold text-lg text-blue-400">{val}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderHashes = () => {
    if (algorithm !== 'rabin-karp' || !frame?.hashes) return null;
    return (
      <div className="mt-4 text-center text-white">
        <p>Pattern Hash: <span className="font-mono text-blue-400">{frame.hashes.pattern}</span></p>
        <p>Window Hash: <span className="font-mono text-yellow-400">{frame.hashes.window}</span></p>
      </div>
    );
  }

  return (
    <ModernVisualizationBase
      title="String Matching"
      controls={controls}
      visualization={
        frame ? (
          <div className="space-y-4">
            <ModernStringVisualization
              title="Text"
              s={frame.text}
              highlights={frame.textHighlights}
              pointers={frame.textPointers}
              matchIndices={frame.matchIndices}
              patternLength={pattern.length}
            />
            <ModernStringVisualization
              title="Pattern"
              s={frame.pattern}
              highlights={frame.patternHighlights}
              pointers={frame.patternPointers}
              offset={frame.textPointers.find(p => p.label === 'i')?.index - frame.patternPointers.find(p => p.label === 'j')?.index}
            />
            {renderLpsTable()}
            {renderHashes()}
          </div>
        ) : <p className="text-center text-gray-400">Click "Visualize" to start.</p>
      }
      explanation={frame?.explanation}
      progress={progress}
      isPlaying={isPlaying}
      onPlayPause={() => setIsPlaying(!isPlaying)}
      onStepBack={() => setCurrentFrame(Math.max(0, currentFrame - 1))}
      onStepForward={() => setCurrentFrame(Math.min(animation.length - 1, currentFrame + 1))}
      onProgressChange={setProgress}
      animationLength={animation.length}
    />
  );
};

export default ModernStringMatchingVisualization;
