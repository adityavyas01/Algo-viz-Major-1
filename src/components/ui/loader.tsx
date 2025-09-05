import React from 'react';
import { cn } from '@/lib/utils';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'overlay';
}

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-20 h-20', 
  lg: 'w-32 h-32'
};

export const Loader: React.FC<LoaderProps> = ({ 
  size = 'md', 
  variant = 'default',
  className,
  ...props 
}) => {
  const baseClasses = 'loader';
  const sizeClasses = sizeMap[size];
  
  if (variant === 'overlay') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" {...props}>
        <div className={cn(baseClasses, sizeClasses, className)} />
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center p-4" {...props}>
      <div className={cn(baseClasses, sizeClasses, className)} />
    </div>
  );
};

// Full page loader component
export const PageLoader: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn(
    "min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center",
    className
  )}>
    <Loader size="lg" />
  </div>
);

export default Loader;
