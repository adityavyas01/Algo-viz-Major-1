import React, { useState, useEffect } from 'react';
import ModernVisualizationBase from './ModernVisualizationBase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Search, Plus, Trash2, Play, Pause, RefreshCw, StepForward } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import { useAnimation } from '@/hooks/useAnimation';
import { generateAddSteps, generateRemoveSteps, generateSearchSteps, LinkedListStep } from '@/lib/algorithms/data-structures/linked-list';

export interface Node {
  value: number;
  id: number;
}

const ModernLinkedListVisualization: React.FC = () => {
  const [list, setList] = useState<Node[]>([{ value: 10, id: 1 }, { value: 20, id: 2 }, { value: 30, id: 3 }]);
  const [inputValue, setInputValue] = useState('5');
  const [indexValue, setIndexValue] = useState('1');
  const [searchValue, setSearchValue] = useState('20');

  const {
    currentStep,
    steps,
    setSteps,
    isPlaying,
    play,
    pause,
    reset,
    nextStep,
    currentStepIndex,
  } = useAnimation<LinkedListStep>([]);

  useEffect(() => {
    if (currentStep) {
      setList(currentStep.list);
    }
  }, [currentStep]);

  const handleAdd = (position: 'head' | 'tail' | 'index') => {
    const value = parseInt(inputValue, 10);
    if (isNaN(value)) return;

    let pos: 'head' | 'tail' | number;
    if (position === 'index') {
      const index = parseInt(indexValue, 10);
      if (isNaN(index)) {
        alert('Invalid index');
        return;
      }
      pos = index;
    } else {
      pos = position;
    }
    
    const newSteps = generateAddSteps(list, value, pos);
    setSteps(newSteps);
  };

  const handleRemove = (position: 'head' | 'tail' | 'index') => {
    let pos: 'head' | 'tail' | number;
     if (position === 'index') {
      const index = parseInt(indexValue, 10);
      if (isNaN(index)) {
        alert('Invalid index');
        return;
      }
      pos = index;
    } else {
      pos = position;
    }
    const newSteps = generateRemoveSteps(list, pos);
    setSteps(newSteps);
  };

  const handleSearch = () => {
    const value = parseInt(searchValue, 10);
    if (isNaN(value)) return;
    const newSteps = generateSearchSteps(list, value);
    setSteps(newSteps);
  };
  
  const handleReset = () => {
    reset();
    setList([{ value: 10, id: 1 }, { value: 20, id: 2 }, { value: 30, id: 3 }]);
    setSteps([]);
  }

  const displayedList = currentStep ? currentStep.list : list;
  const highlightedIndices = currentStep ? currentStep.highlightedIndices : [];
  const description = currentStep ? currentStep.description : "Perform an action to start the visualization.";

  const interactiveControls = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <Card className="bg-gray-800/50">
        <CardHeader><CardTitle className="text-base">Add Node</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a number"
            className="bg-gray-900"
            disabled={isPlaying}
          />
          <div className="flex gap-2">
            <Button onClick={() => handleAdd('head')} className="flex-1" disabled={isPlaying}>Add Head</Button>
            <Button onClick={() => handleAdd('tail')} className="flex-1" disabled={isPlaying}>Add Tail</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50">
        <CardHeader><CardTitle className="text-base">Modify by Index</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <Input
            value={indexValue}
            onChange={(e) => setIndexValue(e.target.value)}
            placeholder="Enter index"
            className="bg-gray-900"
            disabled={isPlaying}
          />
          <div className="flex gap-2">
            <Button onClick={() => handleAdd('index')} variant="outline" className="flex-1" disabled={isPlaying}><Plus className="w-4 h-4 mr-2"/>Add</Button>
            <Button onClick={() => handleRemove('index')} variant="destructive" className="flex-1" disabled={isPlaying}><Trash2 className="w-4 h-4 mr-2"/>Remove</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-800/50">
        <CardHeader><CardTitle className="text-base">Search</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Enter value to find"
            className="bg-gray-900"
            disabled={isPlaying}
          />
          <Button onClick={handleSearch} className="w-full" disabled={isPlaying}><Search className="w-4 h-4 mr-2"/>Find</Button>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50">
        <CardHeader><CardTitle className="text-base">Controls</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <div className="flex gap-2">
            <Button onClick={isPlaying ? pause : play} className="w-full" disabled={steps.length === 0 || currentStepIndex === steps.length - 1}>
              {isPlaying ? <Pause className="w-4 h-4 mr-2"/> : <Play className="w-4 h-4 mr-2"/>}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button onClick={nextStep} className="w-full" disabled={isPlaying || steps.length === 0 || currentStepIndex === steps.length - 1}><StepForward className="w-4 h-4 mr-2"/>Next</Button>
          </div>
          <Button onClick={handleReset} className="w-full" variant="secondary"><RefreshCw className="w-4 h-4 mr-2"/>Reset</Button>
        </CardContent>
      </Card>
    </div>
  );

  const visualization = (
    <div className="h-64 p-4 flex flex-col justify-center">
      <div className="flex items-center justify-center min-h-[100px] bg-gray-900/50 rounded-lg p-4 border border-gray-700 overflow-x-auto relative">
        <AnimatePresence>
          {displayedList.map((node, index) => (
            <motion.div
              key={node.id}
              layout
              initial={{ opacity: 0, y: -50, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.5 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="flex items-center"
            >
              <div className={`flex items-center bg-gray-800 p-2 rounded-lg transition-all duration-300 ${highlightedIndices.includes(index) ? 'ring-2 ring-yellow-400 shadow-lg' : ''}`}>
                <div className="w-16 h-16 bg-green-600 rounded-l-md flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {node.value}
                </div>
                <div className="w-8 h-16 bg-gray-700 rounded-r-md flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="text-white" />
                </div>
              </div>
              {index < displayedList.length - 1 && (
                <motion.div
                  layout
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  exit={{ opacity: 0, scaleX: 0 }}
                  className="w-8 h-1 bg-gray-500 mx-2 origin-left"
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {displayedList.length === 0 && <div className="text-gray-500 w-full text-center">List is empty</div>}
      </div>
      <div className="mt-4 text-center text-sm text-gray-400 h-6">{description}</div>
    </div>
  );

  return (
    <ModernVisualizationBase
      title="Linked List"
      description="A linear collection of data elements where each element points to the next. Unlike arrays, linked lists do not have a fixed size."
      difficulty="Beginner"
      category="Data Structures"
      complexity={{
        time: "Access: O(n), Search: O(n)",
        space: "O(n)",
        best: "Insert/Delete at Head: O(1)"
      }}
      interactiveControls={interactiveControls}
    >
      {visualization}
    </ModernVisualizationBase>
  );
};

export default ModernLinkedListVisualization;
