
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, RotateCcw, Calculator, Hash } from 'lucide-react';

type Algorithm = 'gcd' | 'prime-factorization' | 'modular-exponentiation' | 'sieve-eratosthenes';

export const NumberTheoryVisualization: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<Algorithm>('gcd');
  const [number1, setNumber1] = useState(48);
  const [number2, setNumber2] = useState(18);
  const [limit, setLimit] = useState(30);
  const [steps, setSteps] = useState<string[]>([]);
  const [result, setResult] = useState<string>('');
  const [primes, setPrimes] = useState<number[]>([]);

  const euclideanGCD = (a: number, b: number): { gcd: number; steps: string[] } => {
    const steps: string[] = [];
    let original_a = a, original_b = b;
    
    steps.push(`Finding GCD of ${original_a} and ${original_b}`);
    
    while (b !== 0) {
      const quotient = Math.floor(a / b);
      const remainder = a % b;
      steps.push(`${a} = ${b} × ${quotient} + ${remainder}`);
      a = b;
      b = remainder;
    }
    
    steps.push(`GCD(${original_a}, ${original_b}) = ${a}`);
    return { gcd: a, steps };
  };

  const primeFactorization = (n: number): { factors: number[]; steps: string[] } => {
    const factors: number[] = [];
    const steps: string[] = [];
    let num = n;
    
    steps.push(`Finding prime factors of ${n}`);
    
    for (let i = 2; i * i <= num; i++) {
      while (num % i === 0) {
        factors.push(i);
        steps.push(`${num} ÷ ${i} = ${num / i}`);
        num = num / i;
      }
    }
    
    if (num > 1) {
      factors.push(num);
      steps.push(`Remaining prime factor: ${num}`);
    }
    
    steps.push(`Prime factors: ${factors.join(' × ')}`);
    return { factors, steps };
  };

  const modularExponentiation = (base: number, exp: number, mod: number): { result: number; steps: string[] } => {
    const steps: string[] = [];
    steps.push(`Computing ${base}^${exp} mod ${mod}`);
    
    let result = 1;
    base = base % mod;
    
    while (exp > 0) {
      if (exp % 2 === 1) {
        result = (result * base) % mod;
        steps.push(`Result = (${result / base} × ${base}) mod ${mod} = ${result}`);
      }
      exp = Math.floor(exp / 2);
      base = (base * base) % mod;
      if (exp > 0) {
        steps.push(`Base = ${Math.sqrt(base)}² mod ${mod} = ${base}, Exponent = ${exp}`);
      }
    }
    
    return { result, steps };
  };

  const sieveOfEratosthenes = (n: number): { primes: number[]; steps: string[] } => {
    const steps: string[] = [];
    const isPrime = new Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    
    steps.push(`Finding all primes up to ${n}`);
    steps.push(`Initialize array: [2, 3, 4, 5, 6, 7, 8, 9, 10, ...]`);
    
    for (let i = 2; i * i <= n; i++) {
      if (isPrime[i]) {
        steps.push(`Marking multiples of ${i}`);
        for (let j = i * i; j <= n; j += i) {
          isPrime[j] = false;
        }
      }
    }
    
    const primes = [];
    for (let i = 2; i <= n; i++) {
      if (isPrime[i]) {
        primes.push(i);
      }
    }
    
    steps.push(`Primes found: ${primes.join(', ')}`);
    return { primes, steps };
  };

  const runAlgorithm = () => {
    let newSteps: string[] = [];
    let newResult = '';
    
    switch (algorithm) {
      case 'gcd':
        const gcdResult = euclideanGCD(number1, number2);
        newSteps = gcdResult.steps;
        newResult = `GCD = ${gcdResult.gcd}`;
        break;
        
      case 'prime-factorization':
        const factorResult = primeFactorization(number1);
        newSteps = factorResult.steps;
        newResult = `Factors: ${factorResult.factors.join(' × ')}`;
        break;
        
      case 'modular-exponentiation':
        const modResult = modularExponentiation(number1, number2, 1000);
        newSteps = modResult.steps;
        newResult = `${number1}^${number2} mod 1000 = ${modResult.result}`;
        break;
        
      case 'sieve-eratosthenes':
        const sieveResult = sieveOfEratosthenes(limit);
        newSteps = sieveResult.steps;
        newResult = `Found ${sieveResult.primes.length} primes`;
        setPrimes(sieveResult.primes);
        break;
    }
    
    setSteps(newSteps);
    setResult(newResult);
  };

  const resetVisualization = () => {
    setSteps([]);
    setResult('');
    setPrimes([]);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Number Theory & Mathematical Algorithms
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            {algorithm !== 'sieve-eratosthenes' && (
              <>
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    {algorithm === 'gcd' ? 'First Number' : 
                     algorithm === 'modular-exponentiation' ? 'Base' : 'Number'}
                  </label>
                  <Input
                    type="number"
                    value={number1}
                    onChange={(e) => setNumber1(parseInt(e.target.value) || 0)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                
                {(algorithm === 'gcd' || algorithm === 'modular-exponentiation') && (
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">
                      {algorithm === 'gcd' ? 'Second Number' : 'Exponent'}
                    </label>
                    <Input
                      type="number"
                      value={number2}
                      onChange={(e) => setNumber2(parseInt(e.target.value) || 0)}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                )}
              </>
            )}
            
            {algorithm === 'sieve-eratosthenes' && (
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Upper Limit</label>
                <Input
                  type="number"
                  value={limit}
                  onChange={(e) => setLimit(parseInt(e.target.value) || 0)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Select value={algorithm} onValueChange={(value: Algorithm) => setAlgorithm(value)}>
              <SelectTrigger className="w-64 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gcd">Euclidean GCD</SelectItem>
                <SelectItem value="prime-factorization">Prime Factorization</SelectItem>
                <SelectItem value="modular-exponentiation">Modular Exponentiation</SelectItem>
                <SelectItem value="sieve-eratosthenes">Sieve of Eratosthenes</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                onClick={runAlgorithm}
                className="bg-green-600 hover:bg-green-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Calculate
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
            <CardTitle className="text-white">Step-by-Step Calculation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {steps.map((step, index) => (
                <div key={index} className="bg-black/30 p-2 rounded text-white text-sm font-mono">
                  {index + 1}. {step}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Hash className="w-5 h-5" />
              Results & Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-2">Final Result:</h4>
                <div className="text-xl font-bold text-green-400">
                  {result || 'Click Calculate to see results'}
                </div>
              </div>

              {algorithm === 'sieve-eratosthenes' && primes.length > 0 && (
                <div>
                  <h4 className="text-white font-medium mb-2">Prime Numbers:</h4>
                  <div className="flex flex-wrap gap-1">
                    {primes.map((prime, index) => (
                      <span
                        key={index}
                        className="bg-blue-500/30 px-2 py-1 rounded text-white text-sm"
                      >
                        {prime}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-white/80 text-sm space-y-2">
                {algorithm === 'gcd' && (
                  <>
                    <p><strong>Algorithm:</strong> Euclidean Algorithm</p>
                    <p><strong>Time Complexity:</strong> O(log min(a,b))</p>
                    <p><strong>Applications:</strong> Cryptography, fraction simplification</p>
                  </>
                )}

                {algorithm === 'prime-factorization' && (
                  <>
                    <p><strong>Method:</strong> Trial Division</p>
                    <p><strong>Time Complexity:</strong> O(√n)</p>
                    <p><strong>Applications:</strong> Cryptography (RSA), number theory</p>
                  </>
                )}

                {algorithm === 'modular-exponentiation' && (
                  <>
                    <p><strong>Method:</strong> Binary Exponentiation</p>
                    <p><strong>Time Complexity:</strong> O(log n)</p>
                    <p><strong>Applications:</strong> Cryptography, hashing</p>
                  </>
                )}

                {algorithm === 'sieve-eratosthenes' && (
                  <>
                    <p><strong>Method:</strong> Sieve of Eratosthenes</p>
                    <p><strong>Time Complexity:</strong> O(n log log n)</p>
                    <p><strong>Applications:</strong> Prime generation, number theory</p>
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
