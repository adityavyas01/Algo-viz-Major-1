import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Algorithm, AlgorithmCategory } from '@/types/cms';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageLoader } from '@/components/ui/loader';
import { Badge } from '@/components/ui/badge';
import { Search, Code, Clock, Cpu } from 'lucide-react';
import { MotionWrapper } from '@/components/motion/MotionWrapper';

const LearningPage: React.FC = () => {
  const [categories, setCategories] = useState<AlgorithmCategory[]>([]);
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: categoriesData, error: catError } = await supabase.from('algorithm_categories').select('*').order('name');
        if (catError) throw catError;
        setCategories(categoriesData || []);

        const { data: algorithmsData, error: algoError } = await supabase.from('algorithms').select('*, category:algorithm_categories(name)').order('name');
        if (algoError) throw algoError;
        setAlgorithms(algorithmsData as any || []);
      } catch (err: any) {
        setError('Failed to fetch learning materials. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredAlgorithms = searchTerm
    ? algorithms.filter(algo => 
        algo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (algo.category?.name && algo.category.name.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : algorithms;

  const renderContent = () => {
    if (loading) {
      return <PageLoader />;
    }

    if (error) {
      return <div className="text-center text-red-400 py-20">{error}</div>;
    }

    const categorizedAndFiltered = categories.map(category => ({
      ...category,
      algorithms: filteredAlgorithms.filter(algo => algo.category_id === category.id),
    })).filter(category => category.algorithms.length > 0);

    if (categorizedAndFiltered.length === 0) {
      return (
        <div className="text-center text-white/70 py-20">
          <h3 className="text-2xl font-semibold">No Results Found</h3>
          <p>Try adjusting your search term.</p>
        </div>
      );
    }

    return categorizedAndFiltered.map((category, index) => (
      <MotionWrapper key={category.id} variant="fadeInUp" delay={0.2 + index * 0.1}>
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-cyan-300 mb-6 border-l-4 border-cyan-400 pl-4">{category.name}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {category.algorithms.map(algo => (
              <Link to={`/learn/${algo.id}`} key={algo.id} className="group">
                <Card className="h-full bg-white/5 backdrop-blur-sm border-white/10 text-white hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl group-hover:text-cyan-300 transition-colors">
                      <Code className="w-6 h-6" />
                      {algo.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/60 line-clamp-2 mb-4">{algo.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <Badge variant="secondary" className="flex items-center gap-1 bg-cyan-500/20 text-cyan-300 border-none">
                        <Clock className="w-3 h-3" />
                        {algo.complexity_time}
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1 bg-purple-500/20 text-purple-300 border-none">
                        <Cpu className="w-3 h-3" />
                        {algo.complexity_space}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </MotionWrapper>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <MotionWrapper variant="fadeInUp">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Explore Algorithms
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Dive into a comprehensive library of algorithms, complete with detailed articles and interactive visualizations.
            </p>
          </div>
          <div className="relative max-w-2xl mx-auto mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
            <Input 
              placeholder="Search for algorithms or categories (e.g., 'Sorting', 'BFS')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-6 bg-white/5 border-2 border-white/10 rounded-full focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 placeholder:text-white/50"
            />
          </div>
        </MotionWrapper>
        
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default LearningPage;
