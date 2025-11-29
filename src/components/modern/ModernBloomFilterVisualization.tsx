import React, { useState, useMemo } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { hashFunctions } from '@/lib/hashing';

// Bloom Filter Logic
class BloomFilter {
    size: number;
    hashFunctions: number;
    bitArray: boolean[];

    constructor(size: number, hashFunctions: number) {
        this.size = size;
        this.hashFunctions = hashFunctions;
        this.bitArray = new Array(size).fill(false);
    }

    add(item: string) {
        for (let i = 0; i < this.hashFunctions; i++) {
            const hash = hashFunctions[i](item, this.size);
            this.bitArray[hash] = true;
        }
    }

    contains(item: string): { result: boolean; hashes: number[] } {
        const hashes: number[] = [];
        for (let i = 0; i < this.hashFunctions; i++) {
            const hash = hashFunctions[i](item, this.size);
            hashes.push(hash);
            if (!this.bitArray[hash]) {
                return { result: false, hashes };
            }
        }
        return { result: true, hashes };
    }
}

const Bit = ({ index, isSet, isHighlighted, isNewlySet }: { index: number, isSet: boolean, isHighlighted: boolean, isNewlySet: boolean }) => {
    const baseClasses = "w-8 h-8 rounded-md flex items-center justify-center text-white font-mono text-sm border-2";
    const highlightClass = isHighlighted ? 'bg-yellow-500 border-yellow-300' : '';
    const setClass = isSet ? 'bg-green-600 border-green-400' : 'bg-gray-600 border-gray-500';
    const newlySetClass = isNewlySet ? 'animate-pulse bg-blue-500' : '';

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`${baseClasses} ${highlightClass || newlySetClass || setClass}`}
            title={`Bit ${index}`}
        >
            {isSet ? 1 : 0}
        </motion.div>
    );
};

export const ModernBloomFilterVisualization = () => {
    const [filterSize, setFilterSize] = useState('32');
    const [hashCount, setHashCount] = useState('3');
    const [bloomFilter, setBloomFilter] = useState<BloomFilter | null>(null);
    const [itemToAdd, setItemToAdd] = useState('hello');
    const [itemToCheck, setItemToCheck] = useState('world');
    const [highlightedBits, setHighlightedBits] = useState<number[]>([]);
    const [newlySetBits, setNewlySetBits] = useState<number[]>([]);

    const handleInitialize = () => {
        const size = parseInt(filterSize, 10);
        const hashes = parseInt(hashCount, 10);
        if (isNaN(size) || isNaN(hashes) || size <= 0 || hashes <= 0 || size > 128 || hashes > 5) {
            toast.error("Invalid size or hash function count. Size (1-128), Hashes (1-5).");
            return;
        }
        setBloomFilter(new BloomFilter(size, hashes));
        setHighlightedBits([]);
        setNewlySetBits([]);
        toast.success(`Bloom Filter of size ${size} with ${hashes} hash functions created.`);
    };

    const handleAdd = () => {
        if (!bloomFilter || !itemToAdd) {
            toast.error("Initialize filter and provide an item to add.");
            return;
        }
        const newFilter = new BloomFilter(0, 0);
        Object.assign(newFilter, JSON.parse(JSON.stringify(bloomFilter)));
        
        const originalBits = [...newFilter.bitArray];
        newFilter.add(itemToAdd);
        const newBits = newFilter.bitArray.map((bit, i) => bit && !originalBits[i]);
        
        setBloomFilter(newFilter);
        setNewlySetBits(newBits.map((b, i) => b ? i : -1).filter(i => i !== -1));
        setHighlightedBits([]);
        toast.success(`Item "${itemToAdd}" added to the filter.`);
    };

    const handleCheck = () => {
        if (!bloomFilter || !itemToCheck) {
            toast.error("Initialize filter and provide an item to check.");
            return;
        }
        const { result, hashes } = bloomFilter.contains(itemToCheck);
        setHighlightedBits(hashes);
        setNewlySetBits([]);
        if (result) {
            toast.warning(`"${itemToCheck}" may be in the set (probabilistic).`);
        } else {
            toast.info(`"${itemToCheck}" is definitely not in the set.`);
        }
    };

    return (
        <ModernVisualizationBase
            title="Bloom Filter"
            description="A probabilistic data structure for set membership testing. Visualizes how items are added and checked."
            difficulty="Intermediate"
            category="Data Structures"
            complexity={{
                time: "Add: O(k), Check: O(k) (k = number of hash functions)",
                space: "O(m) (m = size of bit array)",
            }}
        >
            <div className="flex flex-col gap-4 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <Label>Filter Configuration</Label>
                        <div className="flex gap-2">
                            <Input value={filterSize} onChange={e => setFilterSize(e.target.value)} placeholder="Size (e.g., 32)" />
                            <Input value={hashCount} onChange={e => setHashCount(e.target.value)} placeholder="Hashes (e.g., 3)" />
                            <Button onClick={handleInitialize}>Initialize</Button>
                        </div>
                    </div>
                    <div>
                        <Label>Add Item</Label>
                        <div className="flex gap-2">
                            <Input value={itemToAdd} onChange={e => setItemToAdd(e.target.value)} placeholder="e.g., hello" />
                            <Button onClick={handleAdd} variant="outline">Add</Button>
                        </div>
                    </div>
                    <div>
                        <Label>Check Membership</Label>
                        <div className="flex gap-2">
                            <Input value={itemToCheck} onChange={e => setItemToCheck(e.target.value)} placeholder="e.g., world" />
                            <Button onClick={handleCheck} variant="outline">Check</Button>
                        </div>
                    </div>
                </div>

                <div className="flex-grow bg-gray-800/50 rounded-lg p-4 border border-gray-700 min-h-[300px]">
                    {bloomFilter ? (
                        <div className="flex flex-wrap gap-2">
                            {bloomFilter.bitArray.map((isSet, i) => (
                                <Bit 
                                    key={i} 
                                    index={i} 
                                    isSet={isSet} 
                                    isHighlighted={highlightedBits.includes(i)}
                                    isNewlySet={newlySetBits.includes(i)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                            Initialize the Bloom Filter to begin visualization.
                        </div>
                    )}
                </div>
            </div>
        </ModernVisualizationBase>
    );
};

export default ModernBloomFilterVisualization;
