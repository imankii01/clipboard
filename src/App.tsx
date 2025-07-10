import React, { useState, useEffect } from 'react';
import { ClipboardManager } from './components/ClipboardManager';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { useDarkMode } from './hooks/useDarkMode';
import { useClipboard } from './hooks/useClipboard';
import { useToast } from './hooks/useToast';

function App() {
  const [darkMode, setDarkMode] = useDarkMode();
  const { clips, addClip, deleteClip, clearAllClips, pinClip, updateClip } = useClipboard();
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Auto-clear old clips (24 hours)
  useEffect(() => {
    const clearOldClips = () => {
      const twentyFourHoursAgo = Date.now() - (24 * 60 * 60 * 1000);
      clips.forEach(clip => {
        if (!clip.isPinned && clip.timestamp < twentyFourHoursAgo) {
          deleteClip(clip.id);
        }
      });
    };

    // Check every hour
    const interval = setInterval(clearOldClips, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [clips, deleteClip]);

  const handleAddClip = (content: string, tags: string[], isPinned?: boolean) => {
    addClip(content, tags, isPinned);
    showToast('Clip added successfully!', 'success');
  };

  const handleDeleteClip = (id: string) => {
    deleteClip(id);
    showToast('Clip deleted', 'info');
  };

  const handleClearAll = () => {
    clearAllClips();
    showToast('All clips cleared', 'info');
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
    }`}>
      <div className="container mx-auto px-4 py-6 max-w-6xl min-h-screen flex flex-col">
        <Header 
          darkMode={darkMode} 
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          totalClips={clips.length}
        />
        
        <main className="flex-1">
          <ClipboardManager
            clips={clips}
            onAddClip={handleAddClip}
            onDeleteClip={handleDeleteClip}
            onClearAll={handleClearAll}
            onPinClip={pinClip}
            onUpdateClip={updateClip}
            darkMode={darkMode}
            showToast={showToast}
          />
        </main>

        <Footer darkMode={darkMode} />
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </div>
  );
}

export default App;