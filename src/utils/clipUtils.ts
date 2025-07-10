import { Clip } from '../types/clip';

export const filterClips = (
  clips: Clip[],
  searchTerm: string,
  selectedTags: string[],
  sortBy: 'date' | 'pinned'
): Clip[] => {
  let filtered = clips;

  // Filter by search term
  if (searchTerm) {
    filtered = filtered.filter(clip =>
      clip.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clip.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }

  // Filter by selected tags
  if (selectedTags.length > 0) {
    filtered = filtered.filter(clip =>
      selectedTags.some(tag => clip.tags.includes(tag))
    );
  }

  // Sort clips
  if (sortBy === 'pinned') {
    filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return b.timestamp - a.timestamp;
    });
  } else {
    filtered.sort((a, b) => b.timestamp - a.timestamp);
  }

  return filtered;
};