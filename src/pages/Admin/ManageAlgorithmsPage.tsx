import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Algorithm, AlgorithmCategory } from '@/types/cms';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Edit, Trash } from 'lucide-react';

const ManageAlgorithmsPage: React.FC = () => {
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([]);
  const [categories, setCategories] = useState<AlgorithmCategory[]>([]);
  const [newAlgorithm, setNewAlgorithm] = useState({ name: '', description: '', category_id: '', complexity_time: '', complexity_space: '' });
  const [editingAlgorithm, setEditingAlgorithm] = useState<Algorithm | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchAlgorithms();
    fetchCategories();
  }, []);

  const fetchAlgorithms = async () => {
    const { data, error } = await supabase.from('algorithms').select('*, category:algorithm_categories(name)').order('name');
    if (error) {
      toast({ title: 'Error fetching algorithms', description: error.message, variant: 'destructive' });
    } else {
      setAlgorithms(data as any || []);
    }
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase.from('algorithm_categories').select('*').order('name');
    if (error) {
      toast({ title: 'Error fetching categories', description: error.message, variant: 'destructive' });
    } else {
      setCategories(data || []);
    }
  };

  const handleCreate = async () => {
    if (!newAlgorithm.name || !newAlgorithm.category_id) {
      toast({ title: 'Name and category are required', variant: 'destructive' });
      return;
    }
    const { error } = await supabase.from('algorithms').insert(newAlgorithm);
    if (error) {
      toast({ title: 'Error creating algorithm', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Algorithm created successfully' });
      setNewAlgorithm({ name: '', description: '', category_id: '', complexity_time: '', complexity_space: '' });
      fetchAlgorithms();
    }
  };

  const handleUpdate = async () => {
    if (!editingAlgorithm) return;
    const { error } = await supabase.from('algorithms').update({ ...editingAlgorithm, category: undefined }).eq('id', editingAlgorithm.id);
    if (error) {
      toast({ title: 'Error updating algorithm', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Algorithm updated successfully' });
      setEditingAlgorithm(null);
      fetchAlgorithms();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('algorithms').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error deleting algorithm', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Algorithm deleted successfully' });
      fetchAlgorithms();
    }
  };

  const currentData = editingAlgorithm || newAlgorithm;
  const setCurrentData = editingAlgorithm ? (key: string, value: any) => setEditingAlgorithm({ ...editingAlgorithm, [key]: value }) : (key: string, value: any) => setNewAlgorithm({ ...newAlgorithm, [key]: value });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Manage Algorithms</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingAlgorithm ? 'Edit Algorithm' : 'Create New Algorithm'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Algorithm Name" value={currentData.name} onChange={(e) => setCurrentData('name', e.target.value)} />
          <Select value={currentData.category_id} onValueChange={(value) => setCurrentData('category_id', value)}>
            <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
            <SelectContent>
              {categories.map(cat => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Textarea placeholder="Algorithm Description" value={currentData.description || ''} onChange={(e) => setCurrentData('description', e.target.value)} />
          <Input placeholder="Time Complexity (e.g., O(n^2))" value={currentData.complexity_time || ''} onChange={(e) => setCurrentData('complexity_time', e.target.value)} />
          <Input placeholder="Space Complexity (e.g., O(1))" value={currentData.complexity_space || ''} onChange={(e) => setCurrentData('complexity_space', e.target.value)} />
          
          {editingAlgorithm ? (
            <div className="flex gap-2">
              <Button onClick={handleUpdate}>Update Algorithm</Button>
              <Button variant="outline" onClick={() => setEditingAlgorithm(null)}>Cancel</Button>
            </div>
          ) : (
            <Button onClick={handleCreate}><PlusCircle className="w-4 h-4 mr-2" />Create Algorithm</Button>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {algorithms.map((algo) => (
          <Card key={algo.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div>
                  {algo.name}
                  <span className="text-sm font-normal text-muted-foreground ml-2">({algo.category?.name})</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => setEditingAlgorithm(algo)}><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(algo.id)}><Trash className="w-4 h-4 text-red-500" /></Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">{algo.description || 'No description'}</p>
              <div className="flex justify-between text-sm">
                <span>Time: <code className="bg-muted px-1 rounded">{algo.complexity_time || 'N/A'}</code></span>
                <span>Space: <code className="bg-muted px-1 rounded">{algo.complexity_space || 'N/A'}</code></span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageAlgorithmsPage;
