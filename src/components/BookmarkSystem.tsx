
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bookmark, BookmarkCheck, Heart, HeartOff, Star, Trash2, Filter, AlertCircle } from 'lucide-react';
import { algorithmDatabase, type AlgorithmExplanation } from '@/data/algorithmDatabase';
import { useAuth } from '@/contexts/AuthContext';
import { addUserBookmark, removeUserBookmark } from '@/hooks/useDatabase';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

interface BookmarkItem {
  id: string;
  algorithmId: string;
  type: 'bookmark' | 'favorite';
  dateAdded: string;
  notes?: string;
}

export const BookmarkSystem: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'bookmarks' | 'favorites'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadBookmarks();
    } else {
      // For non-authenticated users, fall back to localStorage
      loadLocalBookmarks();
    }
  }, [user]);

  const loadBookmarks = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // In a real implementation, you would fetch from the database
      // For now, we'll simulate with localStorage but add database structure
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

  const getFilteredBookmarks = () => {
    switch (filter) {
      case 'bookmarks':
        return bookmarks.filter(b => b.type === 'bookmark');
      case 'favorites':
        return bookmarks.filter(b => b.type === 'favorite');
      default:
        return bookmarks;
    }
  };

  const filteredBookmarks = getFilteredBookmarks();

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-64 bg-white/20 mb-2" />
          <Skeleton className="h-4 w-48 bg-white/10" />
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 bg-white/10" />
          ))}
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 bg-white/10" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-500/10 backdrop-blur-sm border-red-500/20">
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-red-400 text-lg font-semibold mb-2">
            Unable to Load Bookmarks
          </h3>
          <p className="text-red-300/70">{error}</p>
          <Button
            onClick={loadBookmarks}
            className="mt-4 bg-red-600 hover:bg-red-700"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Bookmarks & Favorites</h2>
          <p className="text-white/70">Save algorithms for quick access</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            className={filter === 'all' 
              ? 'bg-white text-black' 
              : 'border-white/30 text-white hover:bg-white/10'
            }
          >
            All ({bookmarks.length})
          </Button>
          <Button
            onClick={() => setFilter('bookmarks')}
            variant={filter === 'bookmarks' ? 'default' : 'outline'}
            size="sm"
            className={filter === 'bookmarks' 
              ? 'bg-white text-black' 
              : 'border-white/30 text-white hover:bg-white/10'
            }
          >
            <Bookmark className="w-4 h-4 mr-1" />
            Bookmarks ({bookmarks.filter(b => b.type === 'bookmark').length})
          </Button>
          <Button
            onClick={() => setFilter('favorites')}
            variant={filter === 'favorites' ? 'default' : 'outline'}
            size="sm"
            className={filter === 'favorites' 
              ? 'bg-white text-black' 
              : 'border-white/30 text-white hover:bg-white/10'
            }
          >
            <Heart className="w-4 h-4 mr-1" />
            Favorites ({bookmarks.filter(b => b.type === 'favorite').length})
          </Button>
        </div>
      </div>

      {/* Quick Actions for All Algorithms */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {algorithmDatabase.slice(0, 6).map((algorithm) => (
              <div
                key={algorithm.id}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
              >
                <div>
                  <h4 className="text-white font-medium text-sm">{algorithm.name}</h4>
                  <p className="text-white/60 text-xs">{algorithm.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => addBookmark(algorithm.id, 'bookmark')}
                    variant="ghost"
                    size="sm"
                    className={`p-1 ${
                      isBookmarked(algorithm.id, 'bookmark')
                        ? 'text-blue-500'
                        : 'text-white/60 hover:text-blue-500'
                    }`}
                  >
                    {isBookmarked(algorithm.id, 'bookmark') ? (
                      <BookmarkCheck className="w-4 h-4" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    onClick={() => addBookmark(algorithm.id, 'favorite')}
                    variant="ghost"
                    size="sm"
                    className={`p-1 ${
                      isBookmarked(algorithm.id, 'favorite')
                        ? 'text-red-500'
                        : 'text-white/60 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isBookmarked(algorithm.id, 'favorite') ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Saved Items */}
      {filteredBookmarks.length === 0 ? (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-8 text-center">
            <div className="mb-4">
              {filter === 'bookmarks' && <Bookmark className="w-12 h-12 text-white/30 mx-auto" />}
              {filter === 'favorites' && <Heart className="w-12 h-12 text-white/30 mx-auto" />}
              {filter === 'all' && <Star className="w-12 h-12 text-white/30 mx-auto" />}
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">
              No {filter === 'all' ? 'saved items' : filter} yet
            </h3>
            <p className="text-white/70">
              Start bookmarking algorithms to access them quickly later
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredBookmarks.map((bookmark) => {
            const algorithm = algorithmDatabase.find(alg => alg.id === bookmark.algorithmId);
            if (!algorithm) return null;

            return (
              <Card
                key={bookmark.id}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        bookmark.type === 'favorite' ? 'bg-red-500' : 'bg-blue-500'
                      }`}>
                        {bookmark.type === 'favorite' ? (
                          <Heart className="w-4 h-4 text-white fill-current" />
                        ) : (
                          <Bookmark className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{algorithm.name}</h3>
                        <p className="text-white/70 text-sm">{algorithm.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {algorithm.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {algorithm.difficulty}
                          </Badge>
                          <span className="text-white/50 text-xs">
                            Saved {new Date(bookmark.dateAdded).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        View Algorithm
                      </Button>
                      <Button
                        onClick={() => removeBookmark(bookmark.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-500 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
