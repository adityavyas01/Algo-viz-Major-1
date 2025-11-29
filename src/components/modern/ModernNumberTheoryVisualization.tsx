import React, { useState } from 'react';
import ModernVisualizationBase from './ModernVisualizationBase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, ArrowRight } from 'lucide-react';

const ModernNumberTheoryVisualization: React.FC = () => {
  // GCD State
  const [gcdA, setGcdA] = useState(48);
  const [gcdB, setGcdB] = useState(18);
  const [gcdSteps, setGcdSteps] = useState<string[]>([]);
  const [gcdResult, setGcdResult] = useState<number | null>(null);

  // Prime Factorization State
  const [primeN, setPrimeN] = useState(360);
  const [primeFactors, setPrimeFactors] = useState<number[]>([]);
  const [primeSteps, setPrimeSteps] = useState<string[]>([]);

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const runEuclidean = async () => {
    setGcdSteps([]);
    setGcdResult(null);
    let a = Math.abs(gcdA);
    let b = Math.abs(gcdB);
    const steps: string[] = [];

    while (b) {
      steps.push(`${a} = ${Math.floor(a / b)} * ${b} + ${a % b}`);
      setGcdSteps([...steps]);
      await delay(500);
      [a, b] = [b, a % b];
    }
    
    steps.push(`GCD is ${a}`);
    setGcdSteps([...steps]);
    setGcdResult(a);
  };

  const runPrimeFactorization = async () => {
    setPrimeFactors([]);
    setPrimeSteps([]);
    let n = primeN;
    const factors: number[] = [];
    const steps: string[] = [];
    let d = 2;

    while (d * d <= n) {
      while (n % d === 0) {
        factors.push(d);
        steps.push(`${n} is divisible by ${d}. New number is ${n / d}.`);
        setPrimeFactors([...factors]);
        setPrimeSteps([...steps]);
        n /= d;
        await delay(500);
      }
      d += 1;
    }
    if (n > 1) {
      factors.push(n);
      steps.push(`${n} is a prime number.`);
      setPrimeFactors([...factors]);
      setPrimeSteps([...steps]);
      await delay(500);
    }
  };

  const gcdControls = (
    <Card className="bg-gray-800/50">
      <CardHeader><CardTitle className="text-base">Euclidean Algorithm for GCD</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Input type="number" value={gcdA} onChange={(e) => setGcdA(parseInt(e.target.value))} placeholder="a" className="bg-gray-900" />
          <Input type="number" value={gcdB} onChange={(e) => setGcdB(parseInt(e.target.value))} placeholder="b" className="bg-gray-900" />
        </div>
        <Button onClick={runEuclidean} className="w-full"><Play className="w-4 h-4 mr-2" />Find GCD</Button>
        <div className="mt-2 p-2 bg-gray-900 rounded-lg min-h-[100px]">
          {gcdSteps.map((step, i) => <p key={i} className="font-mono text-sm">{step}</p>)}
        </div>
        {gcdResult !== null && <p className="text-center text-green-400 pt-2 font-bold">GCD = {gcdResult}</p>}
      </CardContent>
    </Card>
  );

  const primeControls = (
    <Card className="bg-gray-800/50">
      <CardHeader><CardTitle className="text-base">Prime Factorization</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <Input type="number" value={primeN} onChange={(e) => setPrimeN(parseInt(e.target.value))} placeholder="Number" className="bg-gray-900" />
        <Button onClick={runPrimeFactorization} className="w-full"><Play className="w-4 h-4 mr-2" />Factorize</Button>
        <div className="mt-2 p-2 bg-gray-900 rounded-lg min-h-[100px]">
          {primeSteps.map((step, i) => <p key={i} className="font-mono text-sm">{step}</p>)}
        </div>
        {primeFactors.length > 0 && (
          <div className="text-center text-green-400 pt-2 font-bold">
            {primeN} = {primeFactors.join(' × ')}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <ModernVisualizationBase
      title="Number Theory"
      description="Interactive visualizations for fundamental number theory algorithms."
      difficulty="Beginner"
      category="Mathematics"
      complexity={{
        time: "GCD: O(log(min(a,b)))",
        space: "Factorization: O(sqrt(n))",
      }}
    >
      <Tabs defaultValue="gcd" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="gcd">GCD</TabsTrigger>
          <TabsTrigger value="prime">Prime Factorization</TabsTrigger>
        </TabsList>
        <TabsContent value="gcd">{gcdControls}</TabsContent>
        <TabsContent value="prime">{primeControls}</TabsContent>
      </Tabs>
    </ModernVisualizationBase>
  );
};

export default ModernNumberTheoryVisualization;
