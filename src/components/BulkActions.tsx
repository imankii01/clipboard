import React, { useState } from 'react';
import { Trash2, Pin, X, AlertTriangle } from 'lucide-react';

interface BulkActionsProps {
  selectedCount: number;
  onBulkDelete: () => void;
  onBulkPin: () => void;
  onClearSelection: () => void;
  onClearAll: () => void;
  darkMode: boolean;
}

export const BulkActions: React.FC<BulkActionsProps> = ({
  selectedCount,
  onBulkDelete,
  onBulkPin,
  onClearSelection,
  onClearAll,
  darkMode
}) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearAll = () => {
    onClearAll();
    setShowClearConfirm(false);
  };

  return (
    <>
      <div className={`backdrop-blur-sm rounded-xl p-4 shadow-lg border ${
        darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/70 border-white/50'
      }`}>
        <div className="flex items-center justify-between">
          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {selectedCount} clip{selectedCount !== 1 ? 's' : ''} selected
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onBulkPin}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 ${
                darkMode 
                  ? 'bg-yellow-600 text-yellow-100 hover:bg-yellow-700' 
                  : 'bg-yellow-500 text-yellow-900 hover:bg-yellow-600'
              }`}
            >
              <Pin className="w-4 h-4" />
              Pin Selected
            </button>
            
            <button
              onClick={onBulkDelete}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 ${
                darkMode 
                  ? 'bg-red-600 text-red-100 hover:bg-red-700' 
                  : 'bg-red-500 text-red-100 hover:bg-red-600'
              }`}
            >
              <Trash2 className="w-4 h-4" />
              Delete Selected
            </button>
            
            <button
              onClick={() => setShowClearConfirm(true)}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 ${
                darkMode 
                  ? 'bg-red-700 text-red-100 hover:bg-red-800' 
                  : 'bg-red-600 text-red-100 hover:bg-red-700'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              Clear All
            </button>
            
            <button
              onClick={onClearSelection}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-xl shadow-xl max-w-md w-full mx-4 ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <h3 className={`text-lg font-semibold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Clear All Clips
              </h3>
            </div>
            
            <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Are you sure you want to delete all clipboard history? This action cannot be undone.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};