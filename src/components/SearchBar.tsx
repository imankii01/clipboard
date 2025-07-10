import React from 'react';
import { Search, Filter, SortAsc } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  sortBy: 'date' | 'pinned';
  onSortChange: (sort: 'date' | 'pinned') => void;
  darkMode: boolean;
  availableTags: string[];
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedTags,
  onTagsChange,
  sortBy,
  onSortChange,
  darkMode,
  availableTags
}) => {
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div className={`backdrop-blur-sm rounded-xl p-4 shadow-lg border ${
      darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/70 border-white/50'
    }`}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <input
            type="text"
            placeholder="Search clips..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'date' | 'pinned')}
            className={`px-3 py-2 rounded-lg border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="date">Sort by Date</option>
            <option value="pinned">Sort by Pinned</option>
          </select>
        </div>
      </div>

      {availableTags.length > 0 && (
        <div className="mt-4">
          <div className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Filter by tags:
          </div>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-500 text-white'
                    : (darkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};