
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, RotateCcw, Search, Info } from 'lucide-react';

type Algorithm = 'kmp' | 'rabin-karp';

interface MatchInfo {
  index: number;
  matched: boolean;
  step: number;
}

export const StringMatchingVisualization: React.FC = () => {
  const [text, setText] = useState('ABABDABACDABABCABCABCABCABC');
  const [pattern, setPattern] = useState('ABABCABCABCABC');
  const [algorithm, setAlgorithm] = useState<Algorithm>('kmp');
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [matches, setMatches] = useState<MatchInfo[]>([]);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [kmpTable, setKmpTable] = useState<number[]>([]);
  const [rabinKarpHash, setRabinKarpHash] = useState<{ pattern: number; window: number }>({ pattern: 0, window: 0 });

  const buildKMPTable = (pattern: string): number[] => {
    const table = new Array(pattern.length).fill(0);
    let j = 0;
    
    for (let i = 1; i < pattern.length; i++) {
      if (pattern[i] === pattern[j]) {
        j++;
        table[i] = j;
      } else if (j > 0) {
        j = table[j - 1];
        i--;
      } else {
        table[i] = 0;
      }
    }
    return table;
  };

  const computeHash = (str: string, length: number, start: number = 0): number => {
    let hash = 0;
    const prime = 31;
    for (let i = start; i < start + length && i < str.length; i++) {
      hash = (hash * prime + str.charCodeAt(i)) % 1000000007;
    }
    return hash;
  };

  const runKMP = () => {
    const table = buildKMPTable(pattern);
    setKmpTable(table);
    const newMatches: MatchInfo[] = [];
    let i = 0, j = 0;
    let step = 0;

    while (i < text.length) {
      if (text[i] === pattern[j]) {
        i++;
        j++;
        if (j === pattern.length) {
          newMatches.push({ index: i - j, matched: true, step: step++ });
          j = table[j - 1];
        }
      } else if (j > 0) {
        j = table[j - 1];
      } else {
        i++;
      }
      step++;
    }
    setMatches(newMatches);
  };

  const runRabinKarp = () => {
    const newMatches: MatchInfo[] = [];
    const patternHash = computeHash(pattern, pattern.length);
    setRabinKarpHash(prev => ({ ...prev, pattern: patternHash }));
    let step = 0;

    for (let i = 0; i <= text.length - pattern.length; i++) {
      const windowHash = computeHash(text, pattern.length, i);
      setRabinKarpHash(prev => ({ ...prev, window: windowHash }));
      
      if (windowHash === patternHash) {
        let match = true;
        for (let j = 0; j < pattern.length; j++) {
          if (text[i + j] !== pattern[j]) {
            match = false;
            break;
          }
        }
        if (match) {
          newMatches.push({ index: i, matched: true, step: step++ });
        }
      }
    }
    setMatches(newMatches);
  };

  const startVisualization = () => {
    setIsRunning(true);
    setCurrentStep(0);
    setCurrentPosition(0);
    setMatches([]);
    
    if (algorithm === 'kmp') {
      runKMP();
    } else {
      runRabinKarp();
    }
  };

  const resetVisualization = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setCurrentPosition(0);
    setMatches([]);
    setKmpTable([]);
    setRabinKarpHash({ pattern: 0, window: 0 });
  };

  useEffect(() => {
    if (isRunning && currentStep < matches.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (currentStep >= matches.length) {
      setIsRunning(false);
    }
  }, [isRunning, currentStep, matches.length]);

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Search className="w-5 h-5" />
            String Matching Algorithms
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Text</label>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
                placeholder="Enter text to search in"
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Pattern</label>
              <Input
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
                placeholder="Enter pattern to find"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Select value={algorithm} onValueChange={(value: Algorithm) => setAlgorithm(value)}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kmp">KMP Algorithm</SelectItem>
                <SelectItem value="rabin-karp">Rabin-Karp Algorithm</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                onClick={startVisualization}
                disabled={isRunning}
                className="bg-green-600 hover:bg-green-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Start
              </Button>
              <Button
                onClick={resetVisualization}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-2">Text:</h4>
                <div className="font-mono text-sm bg-black/30 p-3 rounded">
                  {text.split('').map((char, index) => {
                    const isHighlighted = matches.slice(0, currentStep).some(match => 
                      index >= match.index && index < match.index + pattern.length
                    );
                    return (
                      <span
                        key={index}
                        className={`${
                          isHighlighted ? 'bg-green-500 text-black' : 'text-white'
                        }`}
                      >
                        {char}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-2">Pattern: {pattern}</h4>
                <div className="font-mono text-sm bg-black/30 p-3 rounded text-yellow-400">
                  {pattern}
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-2">Matches Found:</h4>
                <div className="space-y-1">
                  {matches.slice(0, currentStep).map((match, index) => (
                    <div key={index} className="text-green-400 text-sm">
                      Match at position {match.index}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Algorithm Details</CardTitle>
          </CardHeader>
          <CardContent>
            {algorithm === 'kmp' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">KMP Prefix Table:</h4>
                  <div className="grid grid-cols-8 gap-1 text-xs">
                    {kmpTable.map((value, index) => (
                      <div key={index} className="bg-blue-500/30 p-2 rounded text-center text-white">
                        <div>{pattern[index]}</div>
                        <div className="text-yellow-400">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-white/80 text-sm">
                  <p><strong>Time Complexity:</strong> O(n + m)</p>
                  <p><strong>Space Complexity:</strong> O(m)</p>
                  <p>KMP uses a prefix table to avoid redundant comparisons.</p>
                </div>
              </div>
            )}

            {algorithm === 'rabin-karp' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Hash Values:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="text-white">
                      Pattern Hash: <span className="text-yellow-400">{rabinKarpHash.pattern}</span>
                    </div>
                    <div className="text-white">
                      Current Window Hash: <span className="text-blue-400">{rabinKarpHash.window}</span>
                    </div>
                  </div>
                </div>
                <div className="text-white/80 text-sm">
                  <p><strong>Time Complexity:</strong> O(nm) worst case, O(n+m) average</p>
                  <p><strong>Space Complexity:</strong> O(1)</p>
                  <p>Rabin-Karp uses hashing to find potential matches quickly.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
