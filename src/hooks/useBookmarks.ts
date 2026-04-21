import { useState, useEffect } from 'react';
import { algorithmDatabase } from '@/data/algorithmDatabase';
import { useAuth } from '@/contexts/AuthContext';
import { addUserBookmark, removeUserBookmark } from '@/hooks/useDatabase';
import { useToast } from '@/hooks/use-toast';

export interface BookmarkItem {
  id: string;
  algorithmId: string;
  type: 'bookmark' | 'favorite';
  dateAdded: string;
  notes?: string;
}

export function useBookmarks() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadBookmarks();
    } else {
      loadLocalBookmarks();
    }
  }, [user]);

  const loadBookmarks = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const savedBookmarks = localStorage.getItem(`algorithmBookmarks_${user.id}`);
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      } else {
        setBookmarks([]);
      }
    } catch (err) {
      console.error('Error loading bookmarks:', err);
      setError('Failed to load bookmarks');
      setBookmarks([]);
    } finally {
      setLoading(false);
    }
  };

  const loadLocalBookmarks = () => {
    setLoading(true);
    const savedBookmarks = localStorage.getItem('algorithmBookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    } else {
      setBookmarks([]);
    }
    setLoading(false);
  };

  const saveBookmarks = (newBookmarks: BookmarkItem[]) => {
    setBookmarks(newBookmarks);
    if (user) {
      localStorage.setItem(`algorithmBookmarks_${user.id}`, JSON.stringify(newBookmarks));
    } else {
      localStorage.setItem('algorithmBookmarks', JSON.stringify(newBookmarks));
    }
  };

  const addBookmark = async (algorithmId: string, type: 'bookmark' | 'favorite') => {
    const newBookmark: BookmarkItem = {
      id: `${algorithmId}-${type}-${Date.now()}`,
      algorithmId,
      type,
      dateAdded: new Date().toISOString()
    };
    
    const updated = [...bookmarks.filter(b => !(b.algorithmId === algorithmId && b.type === type)), newBookmark];
    saveBookmarks(updated);

    if (user) {
      try {
        await addUserBookmark(algorithmId, type);
        toast({
          title: `${type === 'bookmark' ? 'Bookmarked' : 'Added to Favorites'}! 🔖`,
          description: `${algorithmDatabase.find(a => a.id === algorithmId)?.name || 'Algorithm'} has been saved.`,
        });
      } catch (error) {
        console.error('Error saving bookmark to database:', error);
        toast({
          title: "Bookmark Saved Locally",
          description: "Your bookmark was saved locally, but couldn't sync to the cloud.",
        });
      }
    } else {
      toast({
        title: `${type === 'bookmark' ? 'Bookmarked' : 'Added to Favorites'}! 🔖`,
        description: "Sign in to sync your bookmarks across devices.",
      });
    }
  };

  const removeBookmark = async (bookmarkId: string) => {
    const bookmark = bookmarks.find(b => b.id === bookmarkId);
    if (!bookmark) return;
    
    const updated = bookmarks.filter(b => b.id !== bookmarkId);
    saveBookmarks(updated);

    if (user && bookmark) {
      try {
        await removeUserBookmark(bookmarkId);
        toast({
          title: "Bookmark Removed",
          description: "Your bookmark has been removed.",
        });
      } catch (error) {
        console.error('Error removing bookmark from database:', error);
        toast({
          title: "Bookmark Removed Locally",
          description: "The bookmark was removed locally, but couldn't sync to the cloud.",
        });
      }
    } else {
      toast({
        title: "Bookmark Removed",
        description: "Your bookmark has been removed.",
      });
    }
  };

  const isBookmarked = (algorithmId: string, type: 'bookmark' | 'favorite') => {
    return bookmarks.some(b => b.algorithmId === algorithmId && b.type === type);
  };

  return {
    bookmarks,
    loading,
    error,
    addBookmark,
    removeBookmark,
    isBookmarked,
    loadBookmarks
  };
}
