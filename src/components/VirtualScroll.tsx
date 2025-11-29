import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';

interface VirtualScrollProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number, style: React.CSSProperties) => React.ReactNode;
  overscan?: number;
  className?: string;
  onScroll?: (scrollTop: number, scrollDirection: 'up' | 'down') => void;
  estimatedItemHeight?: number;
  variableHeight?: boolean;
}

interface VirtualScrollState {
  scrollTop: number;
  containerHeight: number;
  isScrolling: boolean;
  scrollDirection: 'up' | 'down';
}

export function VirtualScroll<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5,
  className = '',
  onScroll,
  estimatedItemHeight,
  variableHeight = false
}: VirtualScrollProps<T>) {
  const [state, setState] = useState<VirtualScrollState>({
    scrollTop: 0,
    containerHeight,
    isScrolling: false,
    scrollDirection: 'down'
  });

  const scrollElementRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const lastScrollTop = useRef(0);
  const itemHeights = useRef<Map<number, number>>(new Map());
  const itemOffsets = useRef<number[]>([]);

  // Calculate item positions for variable height items
  const calculateItemOffsets = useCallback(() => {
    if (!variableHeight) return;
    
    const offsets: number[] = [0];
    let totalHeight = 0;
    
    for (let i = 0; i < items.length; i++) {
      const height = itemHeights.current.get(i) || estimatedItemHeight || itemHeight;
      totalHeight += height;
      offsets.push(totalHeight);
    }
    
    itemOffsets.current = offsets;
  }, [items.length, itemHeight, estimatedItemHeight, variableHeight]);

  // Get total height of all items
  const getTotalHeight = useCallback(() => {
    if (variableHeight) {
      return itemOffsets.current[itemOffsets.current.length - 1] || items.length * (estimatedItemHeight || itemHeight);
    }
    return items.length * itemHeight;
  }, [items.length, itemHeight, estimatedItemHeight, variableHeight]);

  // Get item offset (top position)
  const getItemOffset = useCallback((index: number) => {
    if (variableHeight) {
      return itemOffsets.current[index] || index * (estimatedItemHeight || itemHeight);
    }
    return index * itemHeight;
  }, [itemHeight, estimatedItemHeight, variableHeight]);

  // Find item index at given offset
  const getItemAtOffset = useCallback((offset: number) => {
    if (variableHeight) {
      let index = 0;
      while (index < itemOffsets.current.length - 1 && itemOffsets.current[index + 1] <= offset) {
        index++;
      }
      return index;
    }
    return Math.floor(offset / itemHeight);
  }, [itemHeight, variableHeight]);

  // Calculate visible range
  const visibleRange = useMemo(() => {
    const startIndex = Math.max(0, getItemAtOffset(state.scrollTop) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      getItemAtOffset(state.scrollTop + state.containerHeight) + overscan
    );
    
    return { startIndex, endIndex };
  }, [state.scrollTop, state.containerHeight, items.length, getItemAtOffset, overscan]);

  // Handle scroll events
  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    const direction = scrollTop > lastScrollTop.current ? 'down' : 'up';
    
    setState(prev => ({
      ...prev,
      scrollTop,
      isScrolling: true,
      scrollDirection: direction
    }));
    
    lastScrollTop.current = scrollTop;
    
    // Call external scroll handler
    if (onScroll) {
      onScroll(scrollTop, direction);
    }
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Set scrolling to false after scroll stops
    scrollTimeoutRef.current = setTimeout(() => {
      setState(prev => ({ ...prev, isScrolling: false }));
    }, 150);
  }, [onScroll]);

  // Update item height for variable height items
  const updateItemHeight = useCallback((index: number, height: number) => {
    if (variableHeight && itemHeights.current.get(index) !== height) {
      itemHeights.current.set(index, height);
      calculateItemOffsets();
    }
  }, [variableHeight, calculateItemOffsets]);

  // Item wrapper component for measuring heights
  const ItemWrapper: React.FC<{
    index: number;
    style: React.CSSProperties;
    children: React.ReactNode;
  }> = ({ index, style, children }) => {
    const itemRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      if (variableHeight && itemRef.current) {
        const height = itemRef.current.offsetHeight;
        updateItemHeight(index, height);
      }
    }, [index]);
    
    return (
      <div ref={itemRef} style={style}>
        {children}
      </div>
    );
  };

  // Initialize and update offsets
  useEffect(() => {
    calculateItemOffsets();
  }, [calculateItemOffsets]);

  // Update container height
  useEffect(() => {
    setState(prev => ({ ...prev, containerHeight }));
  }, [containerHeight]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const totalHeight = getTotalHeight();
  const { startIndex, endIndex } = visibleRange;

  return (
    <div
      ref={scrollElementRef}
      className={`virtual-scroll-container ${className}`}
      style={{
        height: containerHeight,
        overflow: 'auto',
        position: 'relative'
      }}
      onScroll={handleScroll}
    >
      {/* Total height spacer */}
      <div style={{ height: totalHeight, position: 'relative' }}>
        {/* Rendered items */}
        {items.slice(startIndex, endIndex + 1).map((item, index) => {
          const itemIndex = startIndex + index;
          const top = getItemOffset(itemIndex);
          const height = variableHeight 
            ? (itemHeights.current.get(itemIndex) || estimatedItemHeight || itemHeight)
            : itemHeight;
          
          const style: React.CSSProperties = {
            position: 'absolute',
            top,
            left: 0,
            right: 0,
            height: variableHeight ? undefined : height,
            minHeight: variableHeight ? height : undefined
          };

          const renderedItem = renderItem(item, itemIndex, style);

          // Wrap with height measurement for variable heights
          if (variableHeight) {
            return (
              <ItemWrapper key={itemIndex} index={itemIndex} style={style}>
                {renderedItem}
              </ItemWrapper>
            );
          }

          return (
            <div key={itemIndex} style={style}>
              {renderedItem}
            </div>
          );
        })}
      </div>
      
      {/* Scroll indicators */}
      {state.isScrolling && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium z-10"
        >
          {Math.round((state.scrollTop / (totalHeight - state.containerHeight)) * 100)}%
        </motion.div>
      )}
    </div>
  );
}

// Hook for virtual scrolling with infinite loading
export function useInfiniteVirtualScroll<T>({
  initialItems,
  loadMore,
  hasMore,
  threshold = 0.8
}: {
  initialItems: T[];
  loadMore: () => Promise<T[]>;
  hasMore: boolean;
  threshold?: number;
}) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScroll = useCallback(async (scrollTop: number, scrollDirection: 'up' | 'down') => {
    if (scrollDirection === 'down' && hasMore && !isLoading) {
      const scrollContainer = document.querySelector('.virtual-scroll-container') as HTMLElement;
      if (scrollContainer) {
        const { scrollHeight, clientHeight } = scrollContainer;
        const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
        
        if (scrollPercentage >= threshold) {
          setIsLoading(true);
          setError(null);
          
          try {
            const newItems = await loadMore();
            setItems(prev => [...prev, ...newItems]);
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load more items');
          } finally {
            setIsLoading(false);
          }
        }
      }
    }
  }, [hasMore, isLoading, loadMore, threshold]);

  const reset = useCallback(() => {
    setItems(initialItems);
    setError(null);
  }, [initialItems]);

  return {
    items,
    isLoading,
    error,
    handleScroll,
    reset
  };
}

// Example usage component for algorithm list
interface AlgorithmItem {
  id: number;
  name: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export const VirtualizedAlgorithmList: React.FC<{
  algorithms: AlgorithmItem[];
  onSelect?: (algorithm: AlgorithmItem) => void;
}> = ({ algorithms, onSelect }) => {
  const containerHeight = 400;
  const itemHeight = 120;

  const renderAlgorithm = useCallback((algorithm: AlgorithmItem, index: number, style: React.CSSProperties) => {
    const difficultyColors = {
      Easy: 'text-green-400 bg-green-400/10',
      Medium: 'text-yellow-400 bg-yellow-400/10', 
      Hard: 'text-red-400 bg-red-400/10'
    };

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: (index % 10) * 0.05 }} // Stagger animation for visible items
        className="p-4 mx-2 my-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-white/20 cursor-pointer transition-all duration-200"
        onClick={() => onSelect?.(algorithm)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-2">{algorithm.name}</h3>
            <p className="text-white/70 text-sm mb-3 line-clamp-2">{algorithm.description}</p>
            
            <div className="flex items-center space-x-4 text-xs">
              <span className="text-white/60">
                <span className="text-cyan-400">Time:</span> {algorithm.timeComplexity}
              </span>
              <span className="text-white/60">
                <span className="text-purple-400">Space:</span> {algorithm.spaceComplexity}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[algorithm.difficulty]}`}>
              {algorithm.difficulty}
            </span>
            <span className="text-white/50 text-xs">{algorithm.category}</span>
          </div>
        </div>
      </motion.div>
    );
  }, [onSelect]);

  return (
    <div className="bg-gradient-to-br from-slate-900/50 to-purple-900/30 backdrop-blur-sm rounded-2xl p-4">
      <h2 className="text-white font-bold text-xl mb-4">Algorithm Library</h2>
      <VirtualScroll
        items={algorithms}
        itemHeight={itemHeight}
        containerHeight={containerHeight}
        renderItem={renderAlgorithm}
        overscan={3}
        className="rounded-xl"
      />
    </div>
  );
};

export default VirtualScroll;