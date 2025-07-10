import React from 'react';
import { Clipboard, Moon, Sun, Sparkles, Github, ExternalLink } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  totalClips: number;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, onToggleDarkMode, totalClips }) => {
  return (
    <header className="mb-8 animate-fade-in">
      <div className={`backdrop-blur-md rounded-2xl p-6 shadow-xl border transition-all duration-500 hover:shadow-2xl ${
        darkMode 
          ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/60' 
          : 'bg-white/70 border-white/50 hover:bg-white/80'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-3 ${
              darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'
            }`}>
              <Clipboard className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Clipboard Manager
              </h1>
              <p className={`text-sm flex items-center gap-2 transition-colors duration-300 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <Sparkles className="w-4 h-4 animate-pulse" />
                {totalClips} clips stored • Never lose your copies again
               
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <a
              href="https://github.com/imankii01/clipboard"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-xl transition-all duration-200 hover:scale-105 flex items-center gap-2 ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              title="View on GitHub"
            >
              <Github className="w-5 h-5" />
              <ExternalLink className="w-3 h-3" />
            </a>
            
            <button
              onClick={onToggleDarkMode}
              className={`p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};