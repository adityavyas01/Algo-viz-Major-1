import React, { useState, useMemo } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

// Union-Find (Disjoint Set Union) Logic
class DSU {
    parent: number[];
    rank: number[];

    constructor(n: number) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = new Array(n).fill(0);
    }

    find(i: number): number {
        if (this.parent[i] === i) {
            return i;
        }
        // Path compression
        this.parent[i] = this.find(this.parent[i]);
        return this.parent[i];
    }

    union(i: number, j: number): boolean {
        const rootI = this.find(i);
        const rootJ = this.find(j);

        if (rootI !== rootJ) {
            // Union by rank
            if (this.rank[rootI] > this.rank[rootJ]) {
                this.parent[rootJ] = rootI;
            } else if (this.rank[rootI] < this.rank[rootJ]) {
                this.parent[rootI] = rootJ;
            } else {
                this.parent[rootJ] = rootI;
                this.rank[rootI]++;
            }
            return true;
        }
        return false;
    }
    
    getSets(): number[][] {
        const sets = new Map<number, number[]>();
        for (let i = 0; i < this.parent.length; i++) {
            const root = this.find(i);
            if (!sets.has(root)) {
                sets.set(root, []);
            }
            sets.get(root)!.push(i);
        }
        return Array.from(sets.values());
    }
}

const Node = ({ id, x, y, isRoot }: { id: number, x: number, y: number, isRoot: boolean }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        layout
        className="absolute"
        style={{ left: x, top: y }}
    >
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${isRoot ? 'bg-green-500' : 'bg-indigo-500'} border-2 ${isRoot ? 'border-green-300' : 'border-indigo-300'}`}>
            {id}
        </div>
    </motion.div>
);

const Edge = ({ from, to }: { from: {x: number, y: number}, to: {x: number, y: number} }) => (
     <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute w-full h-full"
        style={{ top: 0, left: 0 }}
    >
        <line x1={from.x + 24} y1={from.y + 24} x2={to.x + 24} y2={to.y + 24} stroke="#94a3b8" strokeWidth="2" />
    </motion.svg>
);


const UnionFindVisualizer = ({ dsu }: { dsu: DSU | null }) => {
    const nodePositions = useMemo(() => {
        if (!dsu) return [];
        const n = dsu.parent.length;
        return Array.from({ length: n }, (_, i) => ({
            id: i,
            x: (i % 8) * 80 + 50,
            y: Math.floor(i / 8) * 100 + 50,
        }));
    }, [dsu]);

    if (!dsu) return <div className="text-center p-8">Initialize the structure to begin.</div>;

    const edges = [];
    for (let i = 0; i < dsu.parent.length; i++) {
        if (dsu.parent[i] !== i) {
            const fromPos = nodePositions[i];
            const toPos = nodePositions[dsu.parent[i]];
            edges.push(<Edge key={`${i}-${dsu.parent[i]}`} from={fromPos} to={toPos} />);
        }
    }

    return (
        <div className="relative h-[400px] w-full">
            <AnimatePresence>{edges}</AnimatePresence>
            <AnimatePresence>
                {nodePositions.map(pos => (
                    <Node key={pos.id} {...pos} isRoot={dsu.parent[pos.id] === pos.id} />
                ))}
            </AnimatePresence>
        </div>
    );
};


export const ModernUnionFindVisualization = () => {
    const [size, setSize] = useState('12');
    const [dsu, setDsu] = useState<DSU | null>(null);
    const [unionA, setUnionA] = useState('0');
    const [unionB, setUnionB] = useState('1');
    const [findX, setFindX] = useState('3');

    const handleInitialize = () => {
        const n = parseInt(size, 10);
        if (isNaN(n) || n <= 0 || n > 50) {
            toast.error("Please enter a valid size (1-50).");
            return;
        }
        setDsu(new DSU(n));
        toast.success(`Initialized Disjoint Set Union with ${n} elements.`);
    };

    const handleUnion = () => {
        if (!dsu) {
            toast.error("Initialize the structure first.");
            return;
        }
        const a = parseInt(unionA, 10);
        const b = parseInt(unionB, 10);
        if (isNaN(a) || isNaN(b) || a < 0 || b < 0 || a >= dsu.parent.length || b >= dsu.parent.length) {
            toast.error("Invalid elements for union.");
            return;
        }
        const newDsu = new DSU(0);
        Object.assign(newDsu, JSON.parse(JSON.stringify(dsu)));
        
        const success = newDsu.union(a, b);
        setDsu(newDsu);
        if (success) {
            toast.success(`United sets containing ${a} and ${b}.`);
        } else {
            toast.info(`${a} and ${b} are already in the same set.`);
        }
    };

    const handleFind = () => {
        if (!dsu) {
            toast.error("Initialize the structure first.");
            return;
        }
        const x = parseInt(findX, 10);
        if (isNaN(x) || x < 0 || x >= dsu.parent.length) {
            toast.error("Invalid element for find.");
            return;
        }
        const root = dsu.find(x);
        toast.info(`The root of the set containing ${x} is ${root}.`);
    };

    return (
        <ModernVisualizationBase
            title="Disjoint Set Union (Union-Find)"
            description="An interactive visualization of the Union-Find data structure with path compression and union by rank optimizations."
            difficulty="Intermediate"
            category="Data Structures"
            complexity={{
                time: "Almost constant O(α(n)) on average for Find and Union",
                space: "O(n)",
            }}
        >
            <div className="flex flex-col lg:flex-row gap-4 p-4">
                <div className="lg:w-1/4 flex flex-col gap-4">
                    <div>
                        <Label htmlFor="init-size">Number of Elements</Label>
                        <div className="flex gap-2">
                            <Input id="init-size" value={size} onChange={e => setSize(e.target.value)} placeholder="e.g., 12" />
                            <Button onClick={handleInitialize}>Initialize</Button>
                        </div>
                    </div>
                    <div>
                        <Label>Union Operation</Label>
                        <div className="flex gap-2">
                            <Input value={unionA} onChange={e => setUnionA(e.target.value)} placeholder="Element A" />
                            <Input value={unionB} onChange={e => setUnionB(e.target.value)} placeholder="Element B" />
                            <Button onClick={handleUnion} variant="outline">Union</Button>
                        </div>
                    </div>
                    <div>
                        <Label>Find Operation</Label>
                        <div className="flex gap-2">
                            <Input value={findX} onChange={e => setFindX(e.target.value)} placeholder="Element" />
                            <Button onClick={handleFind} variant="outline">Find</Button>
                        </div>
                    </div>
                </div>
                <div className="flex-grow bg-gray-800/50 rounded-lg p-4 border border-gray-700 min-h-[400px]">
                    <UnionFindVisualizer dsu={dsu} />
                </div>
            </div>
        </ModernVisualizationBase>
    );
};

export default ModernUnionFindVisualization;
