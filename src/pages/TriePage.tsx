import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TreePine, Book, Code, Target, Zap, Activity, BookOpen, Users, Search } from 'lucide-react';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import TrieBuilder from '../components/TrieBuilder';
import DictionaryTrie from '../components/DictionaryTrie';

const TriePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'builder' | 'dictionary'>('builder');
  const { currentTheme } = useVisualizationTheme();

  return (
    <div className="space-y-6 p-6" style={{ 
      backgroundColor: currentTheme.colors.background,
      minHeight: '100vh'
    }}>
      {/* Header Section */}
      <Card className="backdrop-blur-sm" style={{ 
        backgroundColor: currentTheme.colors.surface + '95',
        borderColor: currentTheme.colors.border 
      }}>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <TreePine className="w-10 h-10" style={{ color: currentTheme.colors.primary }} />
            <CardTitle className="text-3xl font-bold" style={{ color: currentTheme.colors.text }}>
              Trie Data Structure
            </CardTitle>
          </div>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: currentTheme.colors.textSecondary }}>
            Explore the powerful Trie (Prefix Tree) data structure with interactive visualizations.
            Perfect for dictionary operations, autocomplete, and prefix-based searches.
          </p>
          
          {/* Complexity Badges */}
          <div className="flex justify-center gap-4 mt-6">
            <Badge className="px-4 py-2" style={{ 
              backgroundColor: currentTheme.colors.success + '20',
              color: currentTheme.colors.success,
              border: `1px solid ${currentTheme.colors.success}30`
            }}>
              <Activity className="w-4 h-4 mr-2" />
              Time: O(k)
            </Badge>
            <Badge className="px-4 py-2" style={{ 
              backgroundColor: currentTheme.colors.info + '20',
              color: currentTheme.colors.info,
              border: `1px solid ${currentTheme.colors.info}30`
            }}>
              <Zap className="w-4 h-4 mr-2" />
              Space: O(alphabet_size × N × M)
            </Badge>
            <Badge className="px-4 py-2" style={{ 
              backgroundColor: currentTheme.colors.warning + '20',
              color: currentTheme.colors.warning,
              border: `1px solid ${currentTheme.colors.warning}30`
            }}>
              <Target className="w-4 h-4 mr-2" />
              Intermediate
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Main Visualization Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'builder' | 'dictionary')} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto" style={{ 
          backgroundColor: currentTheme.colors.surface,
          borderColor: currentTheme.colors.border 
        }}>
          <TabsTrigger 
            value="builder" 
            className="flex items-center space-x-2"
            style={{ 
              color: activeTab === 'builder' ? currentTheme.colors.text : currentTheme.colors.textSecondary 
            }}
          >
            <Code className="w-4 h-4" />
            <span>Builder Mode</span>
          </TabsTrigger>
          <TabsTrigger 
            value="dictionary"
            className="flex items-center space-x-2"
            style={{ 
              color: activeTab === 'dictionary' ? currentTheme.colors.text : currentTheme.colors.textSecondary 
            }}
          >
            <Book className="w-4 h-4" />
            <span>Dictionary Mode</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="mt-6">
          <TrieBuilder />
        </TabsContent>

        <TabsContent value="dictionary" className="mt-6">
          <DictionaryTrie />
        </TabsContent>
      </Tabs>

      {/* Educational Content */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <Card className="backdrop-blur-sm" style={{ 
          backgroundColor: currentTheme.colors.surface + '95',
          borderColor: currentTheme.colors.border 
        }}>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center" style={{ color: currentTheme.colors.text }}>
              <TreePine className="w-6 h-6 mr-2" style={{ color: currentTheme.colors.primary }} />
              How Trie Works
            </h3>
            <div className="space-y-3 text-sm" style={{ color: currentTheme.colors.textSecondary }}>
              <p>• <strong>Prefix Tree:</strong> Each path from root represents a word prefix</p>
              <p>• <strong>Shared Prefixes:</strong> Common prefixes share the same path</p>
              <p>• <strong>End Markers:</strong> Nodes are marked when they complete a word</p>
              <p>• <strong>Efficient Search:</strong> O(k) time where k is key length</p>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm" style={{ 
          backgroundColor: currentTheme.colors.surface + '95',
          borderColor: currentTheme.colors.border 
        }}>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center" style={{ color: currentTheme.colors.text }}>
              <Search className="w-6 h-6 mr-2" style={{ color: currentTheme.colors.success }} />
              Applications
            </h3>
            <div className="space-y-3 text-sm" style={{ color: currentTheme.colors.textSecondary }}>
              <p>• <strong>Autocomplete:</strong> Search suggestions in applications</p>
              <p>• <strong>Spell Checkers:</strong> Fast word validation and correction</p>
              <p>• <strong>IP Routing:</strong> Longest prefix matching in networks</p>
              <p>• <strong>Text Processing:</strong> Pattern matching and indexing</p>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm" style={{ 
          backgroundColor: currentTheme.colors.surface + '95',
          borderColor: currentTheme.colors.border 
        }}>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center" style={{ color: currentTheme.colors.text }}>
              <BookOpen className="w-6 h-6 mr-2" style={{ color: currentTheme.colors.info }} />
              Key Features
            </h3>
            <div className="space-y-3 text-sm" style={{ color: currentTheme.colors.textSecondary }}>
              <p>• <strong>Fast Insertions:</strong> Add words in O(k) time</p>
              <p>• <strong>Prefix Matching:</strong> Find all words with given prefix</p>
              <p>• <strong>Space Efficient:</strong> Shared prefixes save memory</p>
              <p>• <strong>Dictionary Operations:</strong> Insert, search, delete words</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TriePage;