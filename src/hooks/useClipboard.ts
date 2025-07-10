import { useState, useEffect } from 'react';
import { Clip } from '../types/clip';

export const useClipboard = () => {
  const [clips, setClips] = useState<Clip[]>(() => {
    const saved = localStorage.getItem('clipboardHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('clipboardHistory', JSON.stringify(clips));
  }, [clips]);

  const addClip = (content: string, tags: string[] = [], isPinned: boolean = false) => {
    const newClip: Clip = {
      id: Date.now().toString(),
      content,
      timestamp: Date.now(),
      tags,
      isPinned
    };

    setClips(prev => {
      // Check for duplicates
      const existingIndex = prev.findIndex(clip => clip.content === content);
      if (existingIndex !== -1) {
        // Update existing clip's timestamp
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], timestamp: Date.now() };
        return updated;
      }
      // Add new clip at the beginning
      return [newClip, ...prev];
    });
  };

  const deleteClip = (id: string) => {
    setClips(prev => prev.filter(clip => clip.id !== id));
  };

  const clearAllClips = () => {
    setClips([]);
  };

  const pinClip = (id: string) => {
    setClips(prev => prev.map(clip => 
      clip.id === id ? { ...clip, isPinned: !clip.isPinned } : clip
    ));
  };

  const updateClip = (id: string, updates: Partial<Clip>) => {
    setClips(prev => prev.map(clip => 
      clip.id === id ? { ...clip, ...updates } : clip
    ));
  };

  return {
    clips,
    addClip,
    deleteClip,
    clearAllClips,
    pinClip,
    updateClip
  };
};