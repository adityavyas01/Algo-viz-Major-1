import React, { useState, useMemo } from 'react';
import ModernVisualizationBase from './ModernVisualizationBase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, HelpCircle, Package, Weight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from '@/components/ui/scroll-area';

interface Item {
  weight: number;
  value: number;
}

const ModernAdvancedDynamicProgramming: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { weight: 5, value: 10 },
    { weight: 4, value: 40 },
    { weight: 6, value: 30 },
    { weight: 3, value: 50 },
  ]);
  const [capacity, setCapacity] = useState(10);
  const [dpTable, setDpTable] = useState<number[][]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [highlightedCell, setHighlightedCell] = useState<{ i: number, w: number } | null>(null);

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const runKnapsack = async () => {
    setIsCalculating(true);
    setDpTable([]);
    setSelectedItems([]);

    const n = items.length;
    const table: number[][] = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
      const item = items[i - 1];
      for (let w = 1; w <= capacity; w++) {
        setHighlightedCell({ i, w });
        await delay(50);

        if (item.weight <= w) {
          table[i][w] = Math.max(
            item.value + table[i - 1][w - item.weight],
            table[i - 1][w]
          );
        } else {
          table[i][w] = table[i - 1][w];
        }
        setDpTable([...table.map(row => [...row])]);
      }
    }
    setHighlightedCell(null);

    // Backtrack to find selected items
    let w = capacity;
    const finalSelectedItems: Item[] = [];
    for (let i = n; i > 0 && w > 0; i--) {
      if (table[i][w] !== table[i - 1][w]) {
        finalSelectedItems.push(items[i - 1]);
        w -= items[i - 1].weight;
      }
    }
    setSelectedItems(finalSelectedItems);
    setIsCalculating(false);
  };

  const interactiveControls = (
    <Card className="bg-gray-800/50">
      <CardHeader><CardTitle className="text-base">0/1 Knapsack Problem</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <div>
          <Label>Items (Weight, Value)</Label>
          {items.map((item, index) => (
            <div key={index} className="flex gap-2 mt-1">
              <Input type="number" value={item.weight} className="bg-gray-900" onChange={(e) => {
                const newItems = [...items];
                newItems[index].weight = parseInt(e.target.value);
                setItems(newItems);
              }} />
              <Input type="number" value={item.value} className="bg-gray-900" onChange={(e) => {
                const newItems = [...items];
                newItems[index].value = parseInt(e.target.value);
                setItems(newItems);
              }} />
            </div>
          ))}
        </div>
        <div>
          <Label htmlFor="capacity">Knapsack Capacity</Label>
          <Input id="capacity" type="number" value={capacity} onChange={(e) => setCapacity(parseInt(e.target.value))} className="bg-gray-900" />
        </div>
        <Button onClick={runKnapsack} disabled={isCalculating} className="w-full">
          <Play className="w-4 h-4 mr-2" />
          {isCalculating ? 'Calculating...' : 'Solve Knapsack'}
        </Button>
      </CardContent>
    </Card>
  );

  const visualization = (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">DP Table</h3>
      <ScrollArea className="w-full h-[300px] p-4 bg-gray-900 rounded-lg border border-gray-700">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-gray-800 sticky top-0">
            <tr>
              <th scope="col" className="py-2 px-3">Item</th>
              {Array.from({ length: capacity + 1 }, (_, w) => (
                <th key={w} scope="col" className="py-2 px-3 text-center">{w}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dpTable.map((row, i) => (
              <tr key={i} className="border-b border-gray-700">
                <td className="py-2 px-3 font-medium">{i === 0 ? '0' : `Item ${i}`}</td>
                {row.map((value, w) => (
                  <td key={w} className={`py-2 px-3 text-center transition-colors duration-300 ${highlightedCell?.i === i && highlightedCell?.w === w ? 'bg-yellow-500 text-black' : ''}`}>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
      {selectedItems.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white">Selected Items for Maximum Value</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedItems.map((item, i) => (
              <div key={i} className="bg-green-800 p-2 rounded-lg flex items-center gap-2">
                <Package className="w-4 h-4" />
                <span>V:{item.value}</span>
                <Weight className="w-4 h-4" />
                <span>W:{item.weight}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const explanation = (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex items-center"><HelpCircle className="w-5 h-5 mr-2" /> How it Works</div>
        </AccordionTrigger>
        <AccordionContent className="prose prose-invert max-w-none">
          <p>This visualization solves the 0/1 Knapsack problem using dynamic programming.</p>
          <ol>
            <li><strong>Goal:</strong> To select items to put into a knapsack with a limited weight capacity, in order to maximize the total value of the items.</li>
            <li><strong>DP Table:</strong> We build a table where `dp[i][w]` represents the maximum value we can get using the first `i` items with a knapsack capacity of `w`.</li>
            <li><strong>Decision for each item:</strong> For each item, and for each possible weight capacity, we decide:
              <ul>
                <li><strong>Don't include the item:</strong> The value is the same as the value for the previous item at the same weight (`dp[i-1][w]`).</li>
                <li><strong>Include the item:</strong> The value is the item's value plus the value we could get with the remaining capacity (`item.value + dp[i-1][w - item.weight]`). This is only possible if the item's weight is less than the current capacity.</li>
              </ul>
            </li>
            <li><strong>Optimal Choice:</strong> We take the maximum of these two choices. The cell being calculated is highlighted in yellow.</li>
            <li><strong>Final Answer:</strong> The bottom-right cell of the table gives the maximum possible value for the given items and capacity. We then backtrack from this cell to find which items were included.</li>
          </ol>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );

  return (
    <ModernVisualizationBase
      title="Advanced Dynamic Programming"
      description="An interactive visualization of the 0/1 Knapsack problem, a classic example of dynamic programming."
      difficulty="Advanced"
      category="Algorithmic Paradigms"
      complexity={{
        time: "O(n * W) where n=items, W=capacity",
        space: "O(n * W)",
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

export default ModernAdvancedDynamicProgramming;
