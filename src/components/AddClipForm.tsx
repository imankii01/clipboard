import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface AddClipFormProps {
  onAddClip: (content: string, tags: string[], isPinned?: boolean) => void;
  darkMode: boolean;
}

export const AddClipForm: React.FC<AddClipFormProps> = ({ onAddClip, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isPinned, setIsPinned] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      onAddClip(content.trim(), tagArray, isPinned);
      setContent('');
      setTags('');
      setIsPinned(false);
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setContent('');
    setTags('');
    setIsPinned(false);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`w-full p-4 rounded-xl border-2 border-dashed transition-all duration-200 hover:scale-[1.02] ${
          darkMode 
            ? 'border-gray-600 text-gray-400 hover:border-gray-500 hover:bg-gray-800/30' 
            : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center justify-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Add clip manually</span>
        </div>
      </button>
    );
  }

  return (
    <div className={`backdrop-blur-sm rounded-xl p-4 shadow-lg border ${
      darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/70 border-white/50'
    }`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className={`text-lg font-semibold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Add New Clip
          </h3>
          <button
            type="button"
            onClick={handleCancel}
            className={`p-1 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your clip content..."
          className={`w-full p-3 rounded-lg border resize-none ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
          rows={4}
          required
        />

        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma-separated)"
          className={`w-full p-3 rounded-lg border ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
        />

        <div className="flex items-center justify-between">
          <label className={`flex items-center space-x-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <input
              type="checkbox"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>Pin this clip</span>
          </label>

          <div className="flex space-x-2">
            <button
              type="button"
              onClick={handleCancel}
              className={`px-4 py-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Clip
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};