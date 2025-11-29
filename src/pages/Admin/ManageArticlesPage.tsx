import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Article, Algorithm } from '@/types/cms';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Save, Edit } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Editor from '@monaco-editor/react';

const ManageArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([]);
  const [selectedAlgorithmId, setSelectedAlgorithmId] = useState<string>('');
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAlgorithms();
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const { data, error } = await supabase.from('articles').select('*');
    if (error) {
      toast({ title: 'Error fetching articles', description: error.message, variant: 'destructive' });
    } else {
      setArticles(data || []);
    }
  };

  const fetchAlgorithms = async () => {
    const { data, error } = await supabase.from('algorithms').select('*').order('name');
    if (error) {
      toast({ title: 'Error fetching algorithms', description: error.message, variant: 'destructive' });
    } else {
      setAlgorithms(data || []);
    }
  };

  const handleAlgorithmSelect = (algoId: string) => {
    setSelectedAlgorithmId(algoId);
    const existingArticle = articles.find(a => a.algorithm_id === algoId);
    if (existingArticle) {
      setCurrentArticle(existingArticle);
      setContent(existingArticle.content);
      setIsEditing(false);
    } else {
      setCurrentArticle(null);
      setContent(`# ${algorithms.find(a => a.id === algoId)?.name || ''}\n\nEnter markdown content here.`);
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (!selectedAlgorithmId) return;

    const dataToUpsert = {
      algorithm_id: selectedAlgorithmId,
      content: content,
    };

    const { error } = await supabase.from('articles').upsert(dataToUpsert, { onConflict: 'algorithm_id' });

    if (error) {
      toast({ title: 'Error saving article', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Article saved successfully' });
      setIsEditing(false);
      fetchArticles();
    }
  };

  const availableAlgorithms = useMemo(() => {
    return algorithms.filter(algo => !articles.some(art => art.algorithm_id === algo.id) || (currentArticle && currentArticle.algorithm_id === algo.id));
  }, [algorithms, articles, currentArticle]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Manage Articles</h1>
        {currentArticle && !isEditing && (
          <Button onClick={() => setIsEditing(true)}><Edit className="w-4 h-4 mr-2" />Edit</Button>
        )}
        {isEditing && (
          <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" />Save Article</Button>
        )}
      </div>

      <div className="mb-6">
        <Select onValueChange={handleAlgorithmSelect} value={selectedAlgorithmId}>
          <SelectTrigger><SelectValue placeholder="Select an algorithm to write/edit an article for" /></SelectTrigger>
          <SelectContent>
            {algorithms.map(algo => <SelectItem key={algo.id} value={algo.id}>{algo.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {selectedAlgorithmId && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Markdown Editor</h2>
            <div className="border rounded-lg overflow-hidden">
              <Editor
                height="60vh"
                language="markdown"
                value={content}
                onChange={(value) => setContent(value || '')}
                theme="vs-dark"
                options={{ wordWrap: 'on', minimap: { enabled: false }, readOnly: !isEditing }}
              />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Live Preview</h2>
            <div className="prose prose-invert max-w-none p-4 border rounded-lg bg-background h-[60vh] overflow-y-auto">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageArticlesPage;
