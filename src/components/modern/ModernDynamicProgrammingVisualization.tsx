import React, { useState, useMemo } from 'react';
import ModernVisualizationBase from './ModernVisualizationBase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const ModernDynamicProgrammingVisualization: React.FC = () => {
  const [n, setN] = useState(10);
  const [computing, setComputing] = useState(false);
  const [memo, setMemo] = useState<Record<number, number>>({});
  const [callStack, setCallStack] = useState<string[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [highlightedMemoIndex, setHighlightedMemoIndex] = useState<number | null>(null);

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const fib = async (num: number, stackDepth: string): Promise<number> => {
    setCallStack(prev => [...prev, `fib(${num}) at ${stackDepth}`]);
    await delay(300);

    if (num in memo) {
      setHighlightedMemoIndex(num);
      await delay(300);
      setCallStack(prev => prev.slice(0, -1));
      setHighlightedMemoIndex(null);
      return memo[num];
    }
    if (num <= 1) {
      setMemo(prev => ({ ...prev, [num]: num }));
      setHighlightedMemoIndex(num);
      await delay(300);
      setCallStack(prev => prev.slice(0, -1));
      setHighlightedMemoIndex(null);
      return num;
    }

    const res = await fib(num - 1, `${stackDepth}-L`) + await fib(num - 2, `${stackDepth}-R`);
    
    setMemo(prev => ({ ...prev, [num]: res }));
    setHighlightedMemoIndex(num);
    await delay(300);
    setCallStack(prev => prev.slice(0, -1));
    setHighlightedMemoIndex(null);
    return res;
  };

  const handleRun = async () => {
    if (n < 0 || n > 20) {
      // Add a toast or validation message here
      return;
    }
    setComputing(true);
    setResult(null);
    setMemo({});
    setCallStack([]);
    const finalResult = await fib(n, 'root');
    setResult(finalResult);
    setComputing(false);
  };

  const interactiveControls = (
    <Card className="bg-gray-800/50">
      <CardHeader><CardTitle className="text-base">Fibonacci Sequence</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <Label htmlFor="fib-n">Enter a number (0-20)</Label>
        <Input id="fib-n" type="number" value={n} onChange={(e) => setN(parseInt(e.target.value, 10))} min="0" max="20" className="bg-gray-900" />
        <Button onClick={handleRun} disabled={computing} className="w-full">
          <Play className="w-4 h-4 mr-2" />
          {computing ? 'Computing...' : 'Run Calculation'}
        </Button>
        {result !== null && <p className="text-center text-green-400 pt-2 font-bold text-lg">Result: {result}</p>}
      </CardContent>
    </Card>
  );

  const visualization = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-900 rounded-lg border border-gray-700 h-full">
      <div className="md:col-span-1">
        <h3 className="text-lg font-semibold mb-2 text-white">Call Stack</h3>
        <div className="bg-gray-800 p-2 rounded-lg h-96 overflow-y-auto flex flex-col-reverse">
          {callStack.map((call, i) => (
            <div key={i} className={`p-1.5 my-0.5 rounded text-sm ${i === callStack.length - 1 ? 'bg-blue-600 animate-pulse' : 'bg-gray-700'}`}>
              {call}
            </div>
          ))}
        </div>
      </div>
      <div className="md:col-span-2">
        <h3 className="text-lg font-semibold mb-2 text-white">Memoization Table (Cache)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {Object.entries(memo).sort(([a], [b]) => Number(a) - Number(b)).map(([key, value]) => (
            <div key={key} className={`p-2 rounded-lg transition-all duration-300 ${highlightedMemoIndex === Number(key) ? 'bg-yellow-500 text-black' : 'bg-gray-800'}`}>
              <span className="font-mono font-bold">fib({key})</span>: <span className="font-mono">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  const explanation = (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex items-center">
            <HelpCircle className="w-5 h-5 mr-2" /> How it Works
          </div>
        </AccordionTrigger>
        <AccordionContent className="prose prose-invert max-w-none">
          <p>This visualization demonstrates dynamic programming using the Fibonacci sequence as an example. It employs a technique called <strong>memoization</strong>.</p>
          <ol>
            <li><strong>Base Cases:</strong> The function knows that `fib(0)` is 0 and `fib(1)` is 1.</li>
            <li><strong>Memoization (Caching):</strong> Before computing `fib(n)`, the function checks a "memo" (a cache or table). If the result for `n` has already been computed and stored, it returns the stored value instantly, avoiding redundant calculations. This is highlighted in yellow.</li>
            <li><strong>Recursive Calls:</strong> If the result is not in the memo, the function makes the necessary recursive calls (`fib(n-1)` and `fib(n-2)`). The call stack on the left shows this process.</li>
            <li><strong>Storing Results:</strong> Once a result is computed, it's stored in the memo before being returned. This ensures that the subproblem is only ever solved once.</li>
          </ol>
          <p>Without memoization, calculating `fib(n)` would have a time complexity of O(2^n). With memoization, it's reduced to O(n), a massive improvement!</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );

  return (
    <ModernVisualizationBase
      title="Dynamic Programming"
      description="An introduction to dynamic programming and memoization through the Fibonacci sequence."
      difficulty="Intermediate"
      category="Algorithmic Paradigms"
      complexity={{
        time: "O(n)",
        space: "O(n)",
        worst: "Without DP: O(2^n)"
      }}
      interactiveControls={interactiveControls}
    >
      <div className="space-y-4">
        {visualization}
        {explanation}
      </div>
    </ModernVisualizationBase>
  );
};

export default ModernDynamicProgrammingVisualization;
