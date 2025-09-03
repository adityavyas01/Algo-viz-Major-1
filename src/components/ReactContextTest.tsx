import React, { createContext, useContext } from 'react';

// Test React Context to verify it's working
const TestContext = createContext<string>('test');

export const ReactContextTest: React.FC = () => {
  const value = useContext(TestContext);
  
  return (
    <TestContext.Provider value="React Context is working!">
      <div className="hidden">
        {/* This component tests if React Context is properly loaded */}
        <span>{value}</span>
      </div>
    </TestContext.Provider>
  );
};

export default ReactContextTest;
