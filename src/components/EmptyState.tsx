import React from 'react';
import { Clipboard, Sparkles, Copy } from 'lucide-react';

interface EmptyStateProps {
  darkMode: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ darkMode }) => {
  return (
    <div className={`text-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
      <div className={`mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center ${
        darkMode ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <Clipboard className="w-10 h-10" />
      </div>
      
      <h3 className={`text-xl font-semibold mb-2 ${
        darkMode ? 'text-gray-200' : 'text-gray-700'
      }`}>
        No clips yet
      </h3>
      
      <p className="text-lg mb-4">
        Start copying text and it will appear here automatically
      </p>
      
      <div className="flex flex-col items-center space-y-4 max-w-md mx-auto">
        <div className={`flex items-center space-x-2 text-sm ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          <Copy className="w-4 h-4" />
          <span>Copy any text (Ctrl+C)</span>
        </div>
        
        <div className={`flex items-center space-x-2 text-sm ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          <Sparkles className="w-4 h-4" />
          <span>It will be saved automatically</span>
        </div>
        
        <div className={`flex items-center space-x-2 text-sm ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          <Clipboard className="w-4 h-4" />
          <span>Access your clipboard history anytime</span>
        </div>
      </div>
    </div>
  );
};