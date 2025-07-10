import React, { useState, useEffect } from 'react';
import { ClipItem } from './ClipItem';
import { SearchBar } from './SearchBar';
import { AddClipForm } from './AddClipForm';
import { BulkActions } from './BulkActions';
import { EmptyState } from './EmptyState';
import { QRCodeModal } from './QRCodeModal';
import { Clip } from '../types/clip';
import { filterClips } from '../utils/clipUtils';

interface ClipboardManagerProps {
  clips: Clip[];
  onAddClip: (content: string, tags: string[], isPinned?: boolean) => void;
  onDeleteClip: (id: string) => void;
  onClearAll: () => void;
  onPinClip: (id: string) => void;
  onUpdateClip: (id: string, updates: Partial<Clip>) => void;
  darkMode: boolean;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const ClipboardManager: React.FC<ClipboardManagerProps> = ({
  clips,
  onAddClip,
  onDeleteClip,
  onClearAll,
  onPinClip,
  onUpdateClip,
  darkMode,
  showToast
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'pinned'>('date');
  const [selectedClips, setSelectedClips] = useState<string[]>([]);
  const [qrModalClip, setQrModalClip] = useState<Clip | null>(null);

  // Auto-monitor clipboard
  useEffect(() => {
    const monitorClipboard = async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.readText) {
          const text = await navigator.clipboard.readText();
          if (text && text.trim() && text.length > 0) {
            // Check if this content already exists
            const exists = clips.some(clip => clip.content === text);
            if (!exists) {
              onAddClip(text, ['auto-captured']);
            }
          }
        }
      } catch (err) {
        // Clipboard access denied or not supported
      }
    };

    // Monitor every 2 seconds
    const interval = setInterval(monitorClipboard, 2000);
    return () => clearInterval(interval);
  }, [clips, onAddClip]);

  const filteredClips = filterClips(clips, searchTerm, selectedTags, sortBy);

  const handleSelectClip = (id: string) => {
    setSelectedClips(prev => 
      prev.includes(id) 
        ? prev.filter(clipId => clipId !== id)
        : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    selectedClips.forEach(id => onDeleteClip(id));
    setSelectedClips([]);
    showToast(`${selectedClips.length} clips deleted`, 'info');
  };

  const handleBulkPin = () => {
    selectedClips.forEach(id => onPinClip(id));
    setSelectedClips([]);
    showToast(`${selectedClips.length} clips pinned`, 'success');
  };

  if (clips.length === 0) {
    return <EmptyState darkMode={darkMode} />;
  }

  return (
    <div className="space-y-6">
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
        sortBy={sortBy}
        onSortChange={setSortBy}
        darkMode={darkMode}
        availableTags={[...new Set(clips.flatMap(clip => clip.tags))]}
      />

      <AddClipForm onAddClip={onAddClip} darkMode={darkMode} />

      {selectedClips.length > 0 && (
        <BulkActions
          selectedCount={selectedClips.length}
          onBulkDelete={handleBulkDelete}
          onBulkPin={handleBulkPin}
          onClearSelection={() => setSelectedClips([])}
          onClearAll={onClearAll}
          darkMode={darkMode}
        />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
        {filteredClips.map((clip, index) => (
          <div
            key={clip.id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <ClipItem
              clip={clip}
              onDelete={() => onDeleteClip(clip.id)}
              onPin={() => onPinClip(clip.id)}
              onUpdate={(updates) => onUpdateClip(clip.id, updates)}
              onShowQR={() => setQrModalClip(clip)}
              darkMode={darkMode}
              isSelected={selectedClips.includes(clip.id)}
              onSelect={() => handleSelectClip(clip.id)}
              showToast={showToast}
            />
          </div>
        ))}
      </div>

      {filteredClips.length === 0 && clips.length > 0 && (
        <div className={`text-center py-12 animate-fade-in ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <p className="text-lg">No clips match your search criteria</p>
          <p className="text-sm mt-2">Try adjusting your search or tags</p>
        </div>
      )}

      {qrModalClip && (
        <QRCodeModal
          clip={qrModalClip}
          onClose={() => setQrModalClip(null)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};