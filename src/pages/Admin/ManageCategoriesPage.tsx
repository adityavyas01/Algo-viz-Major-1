import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { AlgorithmCategory } from '@/types/cms';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Edit, Trash } from 'lucide-react';

const ManageCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<AlgorithmCategory[]>([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editingCategory, setEditingCategory] = useState<AlgorithmCategory | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase.from('algorithm_categories').select('*').order('name');
    if (error) {
      toast({ title: 'Error fetching categories', description: error.message, variant: 'destructive' });
    } else {
      setCategories(data || []);
    }
  };

  const handleCreate = async () => {
    if (!newCategory.name) {
      toast({ title: 'Name is required', variant: 'destructive' });
      return;
    }
    const { error } = await supabase.from('algorithm_categories').insert(newCategory);
    if (error) {
      toast({ title: 'Error creating category', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Category created successfully' });
      setNewCategory({ name: '', description: '' });
      fetchCategories();
    }
  };

  const handleUpdate = async () => {
    if (!editingCategory) return;
    const { error } = await supabase.from('algorithm_categories').update({ name: editingCategory.name, description: editingCategory.description }).eq('id', editingCategory.id);
    if (error) {
      toast({ title: 'Error updating category', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Category updated successfully' });
      setEditingCategory(null);
      fetchCategories();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('algorithm_categories').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error deleting category', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Category deleted successfully' });
      fetchCategories();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Manage Algorithm Categories</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingCategory ? 'Edit Category' : 'Create New Category'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Category Name"
            value={editingCategory ? editingCategory.name : newCategory.name}
            onChange={(e) => editingCategory ? setEditingCategory({ ...editingCategory, name: e.target.value }) : setNewCategory({ ...newCategory, name: e.target.value })}
          />
          <Textarea
            placeholder="Category Description"
            value={editingCategory ? editingCategory.description || '' : newCategory.description}
            onChange={(e) => editingCategory ? setEditingCategory({ ...editingCategory, description: e.target.value }) : setNewCategory({ ...newCategory, description: e.target.value })}
          />
          {editingCategory ? (
            <div className="flex gap-2">
              <Button onClick={handleUpdate}>Update Category</Button>
              <Button variant="outline" onClick={() => setEditingCategory(null)}>Cancel</Button>
            </div>
          ) : (
            <Button onClick={handleCreate}><PlusCircle className="w-4 h-4 mr-2" />Create Category</Button>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Card key={cat.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {cat.name}
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => setEditingCategory(cat)}><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(cat.id)}><Trash className="w-4 h-4 text-red-500" /></Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{cat.description || 'No description'}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageCategoriesPage;
