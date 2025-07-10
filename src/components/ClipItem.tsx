import React, { useState } from 'react';
import { Copy, Pin, Trash2, Edit3, Check, X, Clock, Tag, QrCode, Share } from 'lucide-react';
import { Clip } from '../types/clip';
import { formatDate } from '../utils/dateUtils';
import { copyToClipboard } from '../utils/clipboardUtils';

interface ClipItemProps {
  clip: Clip;
  onDelete: () => void;
  onPin: () => void;
  onUpdate: (updates: Partial<Clip>) => void;
  onShowQR: () => void;
  darkMode: boolean;
  isSelected: boolean;
  onSelect: () => void;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const ClipItem: React.FC<ClipItemProps> = ({
  clip,
  onDelete,
  onPin,
  onUpdate,
  onShowQR,
  darkMode,
  isSelected,
  onSelect,
  showToast
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(clip.content);
  const [editTags, setEditTags] = useState(clip.tags.join(', '));
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(clip.content);
    if (success) {
      setCopySuccess(true);
      showToast('Copied to clipboard!', 'success');
      setTimeout(() => setCopySuccess(false), 2000);
    } else {
      showToast('Failed to copy', 'error');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Clipboard Content',
          text: clip.content,
        });
        showToast('Shared successfully!', 'success');
      } catch (err) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copying shareable link
      const shareUrl = `${window.location.origin}?shared=${encodeURIComponent(clip.content)}`;
      const success = await copyToClipboard(shareUrl);
      if (success) {
        showToast('Shareable link copied!', 'success');
      }
    }
  };

  const handleSaveEdit = () => {
    const tags = editTags.split(',').map(tag => tag.trim()).filter(tag => tag);
    onUpdate({ content: editContent, tags });
    setIsEditing(false);
    showToast('Clip updated!', 'success');
  };

  const handleCancelEdit = () => {
    setEditContent(clip.content);
    setEditTags(clip.tags.join(', '));
    setIsEditing(false);
  };

  return (
    <div className={`group relative backdrop-blur-sm rounded-xl p-4 shadow-lg border transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
      isSelected 
        ? (darkMode ? 'bg-blue-900/30 border-blue-400 shadow-blue-400/20' : 'bg-blue-50 border-blue-400 shadow-blue-400/20')
        : (darkMode ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/60' : 'bg-white/70 border-white/50 hover:bg-white/80')
    } ${clip.isPinned ? 'ring-2 ring-yellow-400/50' : ''}`}>
      {clip.isPinned && (
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full p-1 animate-bounce">
          <Pin className="w-4 h-4" />
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 transition-all duration-200"
          />
          <div className={`text-xs flex items-center gap-1 transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <Clock className="w-3 h-3" />
            {formatDate(clip.timestamp)}
          </div>
        </div>
        
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleCopy}
            className={`p-1.5 rounded-lg transition-all duration-200 hover:scale-110 ${
              copySuccess 
                ? 'bg-green-500 text-white scale-110' 
                : (darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600')
            }`}
            title="Copy to clipboard"
          >
            {copySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={handleShare}
            className={`p-1.5 rounded-lg transition-all duration-200 hover:scale-110 ${
              darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
            }`}
            title="Share clip"
          >
            <Share className="w-4 h-4" />
          </button>

          <button
            onClick={onShowQR}
            className={`p-1.5 rounded-lg transition-all duration-200 hover:scale-110 ${
              darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
            }`}
            title="Show QR code"
          >
            <QrCode className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setIsEditing(true)}
            className={`p-1.5 rounded-lg transition-all duration-200 hover:scale-110 ${
              darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
            }`}
            title="Edit clip"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          
          <button
            onClick={onPin}
            className={`p-1.5 rounded-lg transition-all duration-200 hover:scale-110 ${
              clip.isPinned 
                ? 'bg-yellow-400 text-yellow-900' 
                : (darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600')
            }`}
            title={clip.isPinned ? 'Unpin' : 'Pin'}
          >
            <Pin className="w-4 h-4" />
          </button>
          
          <button
            onClick={onDelete}
            className={`p-1.5 rounded-lg transition-all duration-200 hover:scale-110 ${
              darkMode ? 'hover:bg-red-900 text-red-400' : 'hover:bg-red-100 text-red-600'
            }`}
            title="Delete clip"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-3 animate-fade-in">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className={`w-full p-2 rounded-lg border resize-none transition-all duration-200 focus:ring-2 focus:ring-blue-500 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            rows={3}
          />
          <input
            type="text"
            value={editTags}
            onChange={(e) => setEditTags(e.target.value)}
            placeholder="Tags (comma-separated)"
            className={`w-full p-2 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-blue-500 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancelEdit}
              className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 hover:scale-105 ${
                darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
            <button
              onClick={handleSaveEdit}
              className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-all duration-200 hover:scale-105"
            >
              <Check className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={`text-sm mb-3 break-words transition-colors duration-300 ${
            darkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            {clip.content.length > 150 
              ? `${clip.content.substring(0, 150)}...` 
              : clip.content
            }
          </div>

          {clip.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {clip.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 transition-all duration-200 hover:scale-105 ${
                    darkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};