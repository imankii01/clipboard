import React from 'react';
import { Heart, Github, Coffee, ExternalLink } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer className={`mt-12 py-8 border-t transition-all duration-300 ${
      darkMode 
        ? 'border-gray-700/50 bg-gray-800/30' 
        : 'border-gray-200/50 bg-white/30'
    }`}>
      <div className="text-center space-y-4">
        {/* Main Credits */}
        <div className={`flex items-center justify-center gap-2 text-lg ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          <span>Made with</span>
          <Heart className="w-5 h-5 text-red-500 animate-pulse" />
          <span>by</span>
          <a
            href="https://www.linkedin.com/in/imankii01/"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-semibold transition-colors duration-200 hover:text-blue-500 ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}
          >
            Ankit Singh (@imankii01)
          </a>
          <span>|</span>
          <span className={`font-semibold ${
            darkMode ? 'text-purple-400' : 'text-purple-600'
          }`}>
            Powered by Snapstay
          </span>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/imankii01"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
              darkMode 
                ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300' 
                : 'bg-gray-100/50 hover:bg-gray-100 text-gray-700'
            }`}
          >
            <Github className="w-4 h-4" />
            <span className="text-sm">@imankii01</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          
          <a
            href="https://buymeacoffee.com/imankii01"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
              darkMode 
                ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300' 
                : 'bg-gray-100/50 hover:bg-gray-100 text-gray-700'
            }`}
          >
            <Coffee className="w-4 h-4" />
            <span className="text-sm">@bymecofee</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Repository Link */}
        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <a
            href="https://github.com/imankii01/clipboard"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 hover:underline transition-colors duration-200 ${
              darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'
            }`}
          >
            <Github className="w-4 h-4" />
            View source on GitHub
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Additional Info */}
        <div className={`text-xs space-y-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          <p>Open source clipboard manager • No data leaves your browser</p>
          <p>Contributions welcome • Built with React + TypeScript + Tailwind CSS</p>
          <p className="opacity-75">© 2025 clipboard.snapstay.in • All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};