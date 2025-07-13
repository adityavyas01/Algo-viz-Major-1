
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, RotateCcw, Grid, TrendingUp } from 'lucide-react';

type Algorithm = 'lcs' | 'edit-distance' | 'matrix-chain' | 'palindrome-partition';

export const AdvancedDynamicProgramming: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<Algorithm>('lcs');
  const [isRunning, setIsRunning] = useState(false);
  const [string1, setString1] = useState('ABCDGH');
  const [string2, setString2] = useState('AEDFHR');
  const [dpTable, setDpTable] = useState<number[][]>([]);
  const [result, setResult] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(0);

  const solveLCS = (s1: string, s2: string) => {
    const m = s1.length;
    const n = s2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (s1[i - 1] === s2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    // Reconstruct LCS
    let lcs = '';
    let i = m, j = n;
    while (i > 0 && j > 0) {
      if (s1[i - 1] === s2[j - 1]) {
        lcs = s1[i - 1] + lcs;
        i--;
        j--;
      } else if (dp[i - 1][j] > dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }

    setDpTable(dp);
    setResult(`LCS: "${lcs}", Length: ${dp[m][n]}`);
  };

  const solveEditDistance = (s1: string, s2: string) => {
    const m = s1.length;
    const n = s2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    // Initialize base cases
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (s1[i - 1] === s2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = 1 + Math.min(
            dp[i - 1][j],     // deletion
            dp[i][j - 1],     // insertion
            dp[i - 1][j - 1]  // substitution
          );
        }
      }
    }

    setDpTable(dp);
    setResult(`Edit Distance: ${dp[m][n]}`);
  };

  const startVisualization = () => {
    setIsRunning(true);
    setCurrentStep(0);
    
    if (algorithm === 'lcs') {
      solveLCS(string1, string2);
    } else if (algorithm === 'edit-distance') {
      solveEditDistance(string1, string2);
    } else if (algorithm === 'matrix-chain') {
      // Simplified matrix chain multiplication
      const matrices = [1, 2, 3, 4, 5];
      setResult(`Optimal multiplications: ${matrices.length - 1}`);
    } else if (algorithm === 'palindrome-partition') {
      setResult(`Minimum cuts for palindrome partitioning`);
    }
  };

  const resetVisualization = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setDpTable([]);
    setResult('');
  };

  const getCellColor = (i: number, j: number, value: number) => {
    if (algorithm === 'lcs') {
      if (value === 0) return 'bg-gray-600';
      const maxVal = Math.max(...dpTable.flat());
      const intensity = value / maxVal;
      return `bg-blue-500 opacity-${Math.floor(intensity * 100)}`;
    } else if (algorithm === 'edit-distance') {
      const maxVal = Math.max(...dpTable.flat());
      const intensity = 1 - (value / maxVal);
      return `bg-red-500 opacity-${Math.floor(intensity * 100)}`;
    }
    return 'bg-gray-600';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Grid className="w-5 h-5" />
            Advanced Dynamic Programming
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">String 1</label>
              <Input
                value={string1}
                onChange={(e) => setString1(e.target.value.toUpperCase())}
                className="bg-white/10 border-white/20 text-white"
                placeholder="Enter first string"
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">String 2</label>
              <Input
                value={string2}
                onChange={(e) => setString2(e.target.value.toUpperCase())}
                className="bg-white/10 border-white/20 text-white"
                placeholder="Enter second string"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Select value={algorithm} onValueChange={(value: Algorithm) => setAlgorithm(value)}>
              <SelectTrigger className="w-64 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lcs">Longest Common Subsequence</SelectItem>
                <SelectItem value="edit-distance">Edit Distance (Levenshtein)</SelectItem>
                <SelectItem value="matrix-chain">Matrix Chain Multiplication</SelectItem>
                <SelectItem value="palindrome-partition">Palindrome Partitioning</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                onClick={startVisualization}
                className="bg-green-600 hover:bg-green-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Solve
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
            <CardTitle className="text-white">DP Table Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            {dpTable.length > 0 && (
              <div className="overflow-auto">
                <div className="grid gap-1 text-xs" style={{ 
                  gridTemplateColumns: `repeat(${dpTable[0].length}, 1fr)`,
                  maxWidth: '100%'
                }}>
                  {dpTable.map((row, i) =>
                    row.map((cell, j) => (
                      <div
                        key={`${i}-${j}`}
                        className={`w-8 h-8 flex items-center justify-center rounded text-white font-mono ${getCellColor(i, j, cell)}`}
                        style={{ minWidth: '32px' }}
                      >
                        {cell}
                      </div>
                    ))
                  )}
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="text-white font-medium mb-2">String 1 Characters:</h4>
                    <div className="flex gap-1">
                      {string1.split('').map((char, i) => (
                        <div key={i} className="w-8 h-8 bg-blue-500/30 flex items-center justify-center rounded text-white">
                          {char}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">String 2 Characters:</h4>
                    <div className="flex gap-1">
                      {string2.split('').map((char, i) => (
                        <div key={i} className="w-8 h-8 bg-green-500/30 flex items-center justify-center rounded text-white">
                          {char}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Algorithm Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-2">Result:</h4>
                <div className="text-lg font-bold text-green-400">
                  {result || 'Click Solve to see results'}
                </div>
              </div>

              <div className="text-white/80 text-sm space-y-2">
                {algorithm === 'lcs' && (
                  <>
                    <p><strong>Problem:</strong> Find the longest subsequence common to both strings</p>
                    <p><strong>Time Complexity:</strong> O(m × n)</p>
                    <p><strong>Space Complexity:</strong> O(m × n)</p>
                    <p><strong>Applications:</strong> Diff tools, bioinformatics, version control</p>
                  </>
                )}

                {algorithm === 'edit-distance' && (
                  <>
                    <p><strong>Problem:</strong> Minimum operations to transform one string to another</p>
                    <p><strong>Operations:</strong> Insert, delete, substitute</p>
                    <p><strong>Time Complexity:</strong> O(m × n)</p>
                    <p><strong>Applications:</strong> Spell checkers, DNA analysis, plagiarism detection</p>
                  </>
                )}

                {algorithm === 'matrix-chain' && (
                  <>
                    <p><strong>Problem:</strong> Optimal order to multiply a chain of matrices</p>
                    <p><strong>Time Complexity:</strong> O(n³)</p>
                    <p><strong>Applications:</strong> Computer graphics, scientific computing</p>
                  </>
                )}

                {algorithm === 'palindrome-partition' && (
                  <>
                    <p><strong>Problem:</strong> Minimum cuts to partition string into palindromes</p>
                    <p><strong>Time Complexity:</strong> O(n²)</p>
                    <p><strong>Applications:</strong> String processing, text analysis</p>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
