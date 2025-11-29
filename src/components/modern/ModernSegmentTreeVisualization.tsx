import React, { useState, useMemo } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

// Segment Tree Logic
const buildSegmentTree = (arr: number[]): (number | null)[] => {
    const n = arr.length;
    const tree: (number | null)[] = new Array(4 * n).fill(null);
    const build = (node: number, start: number, end: number) => {
        if (start === end) {
            tree[node] = arr[start];
            return;
        }
        const mid = Math.floor((start + end) / 2);
        build(2 * node, start, mid);
        build(2 * node + 1, mid + 1, end);
        tree[node] = (tree[2 * node] ?? 0) + (tree[2 * node + 1] ?? 0);
    };
    build(1, 0, n - 1);
    return tree;
};

const updateSegmentTree = (tree: (number | null)[], n: number, index: number, value: number) => {
    const newTree = [...tree];
    const update = (node: number, start: number, end: number) => {
        if (start === end) {
            newTree[node] = value;
            return;
        }
        const mid = Math.floor((start + end) / 2);
        if (start <= index && index <= mid) {
            update(2 * node, start, mid);
        } else {
            update(2 * node + 1, mid + 1, end);
        }
        newTree[node] = (newTree[2 * node] ?? 0) + (newTree[2 * node + 1] ?? 0);
    };
    update(1, 0, n - 1);
    return newTree;
};

const querySegmentTree = (tree: (number | null)[], n: number, l: number, r: number): number => {
    let sum = 0;
    const query = (node: number, start: number, end: number) => {
        if (r < start || end < l) {
            return;
        }
        if (l <= start && end <= r) {
            sum += tree[node] ?? 0;
            return;
        }
        const mid = Math.floor((start + end) / 2);
        query(2 * node, start, mid);
        query(2 * node + 1, mid + 1, end);
    };
    query(1, 0, n - 1);
    return sum;
};


const SegmentTreeNode = ({ value, index, level, x, y }: { value: number | null, index: number, level: number, x: number, y: number }) => {
    if (value === null) return null;
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            className="absolute"
            style={{ left: `${x}%`, top: `${y}px` }}
        >
            <div className="flex flex-col items-center">
                <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center border-2 border-blue-300">
                    {value}
                </div>
                <span className="text-xs mt-1">[{index}]</span>
            </div>
        </motion.div>
    );
};

const SegmentTreeVisualizer = ({ tree, n }: { tree: (number | null)[], n: number }) => {
    const positions = useMemo(() => {
        const pos: { value: number | null, index: number, level: number, x: number, y: number }[] = [];
        const traverse = (node: number, start: number, end: number, level: number, x: number, y: number, width: number) => {
            if (node >= tree.length || tree[node] === null) return;
            
            pos.push({ value: tree[node], index: node, level, x, y });

            if (start !== end) {
                const mid = Math.floor((start + end) / 2);
                const newWidth = width / 2;
                traverse(2 * node, start, mid, level + 1, x - newWidth / 2, y + 80, newWidth);
                traverse(2 * node + 1, mid + 1, end, level + 1, x + newWidth / 2, y + 80, newWidth);
            }
        };
        traverse(1, 0, n - 1, 0, 50, 20, 50);
        return pos;
    }, [tree, n]);

    return (
        <div className="relative h-[500px] w-full">
            <AnimatePresence>
                {positions.map(p => <SegmentTreeNode key={p.index} {...p} />)}
            </AnimatePresence>
        </div>
    );
};


export const ModernSegmentTreeVisualization = () => {
    const [inputArray, setInputArray] = useState('10,5,8,12,6,7,2,9');
    const [array, setArray] = useState<number[]>([]);
    const [tree, setTree] = useState<(number | null)[]>([]);
    
    const [updateIndex, setUpdateIndex] = useState('2');
    const [updateValue, setUpdateValue] = useState('15');
    const [queryL, setQueryL] = useState('1');
    const [queryR, setQueryR] = useState('5');

    const handleBuild = () => {
        const arr = inputArray.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
        if (arr.length === 0) {
            toast.error("Invalid array input. Please provide comma-separated numbers.");
            return;
        }
        setArray(arr);
        const newTree = buildSegmentTree(arr);
        setTree(newTree);
        toast.success("Segment Tree built successfully!");
    };

    const handleUpdate = () => {
        if (array.length === 0) {
            toast.error("Build the tree first.");
            return;
        }
        const index = parseInt(updateIndex, 10);
        const value = parseInt(updateValue, 10);
        if (isNaN(index) || isNaN(value) || index < 0 || index >= array.length) {
            toast.error("Invalid index or value for update.");
            return;
        }
        const newTree = updateSegmentTree(tree, array.length, index, value);
        setTree(newTree);
        const newArray = [...array];
        newArray[index] = value;
        setArray(newArray);
        toast.success(`Updated index ${index} to ${value}.`);
    };

    const handleQuery = () => {
        if (array.length === 0) {
            toast.error("Build the tree first.");
            return;
        }
        const l = parseInt(queryL, 10);
        const r = parseInt(queryR, 10);
        if (isNaN(l) || isNaN(r) || l < 0 || r >= array.length || l > r) {
            toast.error("Invalid query range.");
            return;
        }
        const sum = querySegmentTree(tree, array.length, l, r);
        toast.info(`Query result for range [${l}, ${r}] is ${sum}.`);
    };

    return (
        <ModernVisualizationBase
            title="Segment Trees"
            description="An interactive visualization of a Segment Tree supporting range queries and point updates."
            difficulty="Advanced"
            category="Data Structures"
            complexity={{
                time: "Build: O(n), Query: O(log n), Update: O(log n)",
                space: "O(n)",
            }}
        >
            <div className="flex flex-col lg:flex-row gap-4 p-4">
                <div className="flex-grow flex flex-col">
                    <div className="mb-4">
                        <Label htmlFor="input-array">Initial Array (comma-separated)</Label>
                        <div className="flex gap-2">
                            <Input id="input-array" value={inputArray} onChange={e => setInputArray(e.target.value)} placeholder="e.g., 10,5,8,12" />
                            <Button onClick={handleBuild}>Build Tree</Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <Label>Update Operation</Label>
                            <div className="flex gap-2">
                                <Input value={updateIndex} onChange={e => setUpdateIndex(e.target.value)} placeholder="Index" />
                                <Input value={updateValue} onChange={e => setUpdateValue(e.target.value)} placeholder="Value" />
                                <Button onClick={handleUpdate} variant="outline">Update</Button>
                            </div>
                        </div>
                        <div>
                            <Label>Range Sum Query</Label>
                            <div className="flex gap-2">
                                <Input value={queryL} onChange={e => setQueryL(e.target.value)} placeholder="Left Index" />
                                <Input value={queryR} onChange={e => setQueryR(e.target.value)} placeholder="Right Index" />
                                <Button onClick={handleQuery} variant="outline">Query</Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex-grow bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                        <SegmentTreeVisualizer tree={tree} n={array.length} />
                    </div>
                </div>
            </div>
        </ModernVisualizationBase>
    );
};

export default ModernSegmentTreeVisualization;
