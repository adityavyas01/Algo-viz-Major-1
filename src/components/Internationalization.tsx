
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, 
  Languages, 
  Users, 
  CheckCircle, 
  Clock,
  Flag,
  Volume2,
  Type,
  Calendar,
  MapPin
} from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  completion: number;
  status: 'complete' | 'partial' | 'missing';
  rtl: boolean;
}

interface LocalizationStats {
  totalStrings: number;
  translatedStrings: number;
  reviewedStrings: number;
  lastUpdate: string;
}

export const Internationalization: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [numberFormat, setNumberFormat] = useState('1,234.56');
  
  const languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', completion: 100, status: 'complete', rtl: false },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', completion: 95, status: 'complete', rtl: false },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', completion: 88, status: 'partial', rtl: false },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', completion: 92, status: 'complete', rtl: false },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', completion: 78, status: 'partial', rtl: false },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', completion: 65, status: 'partial', rtl: false },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', completion: 45, status: 'partial', rtl: true },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', completion: 35, status: 'partial', rtl: false },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', completion: 82, status: 'partial', rtl: false },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', completion: 71, status: 'partial', rtl: false }
  ];

  const stats: LocalizationStats = {
    totalStrings: 2847,
    translatedStrings: 2456,
    reviewedStrings: 2203,
    lastUpdate: '2 hours ago'
  };

  const sampleTranslations = {
    en: {
      welcome: 'Welcome to AlgoViz',
      algorithms: 'Algorithms',
      dataStructures: 'Data Structures',
      startLearning: 'Start Learning'
    },
    es: {
      welcome: 'Bienvenido a AlgoViz',
      algorithms: 'Algoritmos',
      dataStructures: 'Estructuras de Datos',
      startLearning: 'Comenzar a Aprender'
    },
    fr: {
      welcome: 'Bienvenue sur AlgoViz',
      algorithms: 'Algorithmes',
      dataStructures: 'Structures de Données',
      startLearning: 'Commencer à Apprendre'
    },
    de: {
      welcome: 'Willkommen bei AlgoViz',
      algorithms: 'Algorithmen',
      dataStructures: 'Datenstrukturen',
      startLearning: 'Lernen Beginnen'
    }
  };

  const getStatusColor = (status: Language['status']) => {
    switch (status) {
      case 'complete': return 'bg-green-500';
      case 'partial': return 'bg-yellow-500';
      case 'missing': return 'bg-red-500';
    }
  };

  const formatNumber = (num: number, format: string) => {
    switch (format) {
      case '1,234.56': return num.toLocaleString('en-US');
      case '1.234,56': return num.toLocaleString('de-DE');
      case '1 234,56': return num.toLocaleString('fr-FR');
      default: return num.toString();
    }
  };

  const formatDate = (date: Date, format: string) => {
    switch (format) {
      case 'MM/DD/YYYY': return date.toLocaleDateString('en-US');
      case 'DD/MM/YYYY': return date.toLocaleDateString('en-GB');
      case 'YYYY-MM-DD': return date.toLocaleDateString('sv-SE');
      case 'DD.MM.YYYY': return date.toLocaleDateString('de-DE');
      default: return date.toLocaleDateString();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Multi-Language Internationalization</h2>
        <p className="text-white/70">Global accessibility with comprehensive language support</p>
      </div>

      <Tabs defaultValue="languages" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="languages" className="flex items-center gap-2">
            <Languages className="w-4 h-4" />
            Languages
          </TabsTrigger>
          <TabsTrigger value="localization" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Localization
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="management" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="languages">
          <div className="grid gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Flag className="w-5 h-5" />
                  Supported Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {languages.map((language) => (
                    <div key={language.code} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{language.flag}</span>
                        <div>
                          <h4 className="text-white font-medium">
                            {language.name} ({language.nativeName})
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={language.completion} className="w-32 h-2" />
                            <span className="text-white/60 text-sm">{language.completion}%</span>
                            {language.rtl && (
                              <Badge variant="outline" className="text-xs border-white/30 text-white/70">
                                RTL
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getStatusColor(language.status)} text-white`}>
                          {language.status}
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-white/30 text-white hover:bg-white/10"
                          onClick={() => setCurrentLanguage(language.code)}
                        >
                          {currentLanguage === language.code ? 'Current' : 'Select'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Translation Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{stats.totalStrings}</div>
                    <div className="text-white/70 text-sm">Total Strings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{stats.translatedStrings}</div>
                    <div className="text-white/70 text-sm">Translated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{stats.reviewedStrings}</div>
                    <div className="text-white/70 text-sm">Reviewed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="localization">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Regional Formats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-white text-sm font-medium">Date Format</label>
                  <Select value={dateFormat} onValueChange={setDateFormat}>
                    <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY (US)</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY (UK)</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD (ISO)</SelectItem>
                      <SelectItem value="DD.MM.YYYY">DD.MM.YYYY (German)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-white/60 text-sm mt-1">
                    Preview: {formatDate(new Date(), dateFormat)}
                  </p>
                </div>

                <div>
                  <label className="text-white text-sm font-medium">Number Format</label>
                  <Select value={numberFormat} onValueChange={setNumberFormat}>
                    <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1,234.56">1,234.56 (US/UK)</SelectItem>
                      <SelectItem value="1.234,56">1.234,56 (German)</SelectItem>
                      <SelectItem value="1 234,56">1 234,56 (French)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-white/60 text-sm mt-1">
                    Preview: {formatNumber(1234.56, numberFormat)}
                  </p>
                </div>

                <div>
                  <label className="text-white text-sm font-medium">Currency</label>
                  <Select defaultValue="USD">
                    <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="JPY">JPY (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-white text-sm font-medium">Timezone</label>
                  <Select defaultValue="UTC">
                    <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="PST">PST (Pacific)</SelectItem>
                      <SelectItem value="EST">EST (Eastern)</SelectItem>
                      <SelectItem value="CET">CET (Central Europe)</SelectItem>
                      <SelectItem value="JST">JST (Japan)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Volume2 className="w-5 h-5" />
                  Audio & Accessibility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Text-to-Speech Languages</h4>
                  <div className="space-y-2">
                    {['English', 'Spanish', 'French', 'German', 'Mandarin'].map((lang, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded">
                        <span className="text-white text-sm">{lang}</span>
                        <Badge className="bg-green-500 text-white">Available</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Screen Reader Support</h4>
                  <div className="space-y-2 text-sm text-white/70">
                    <div>✓ ARIA labels translated</div>
                    <div>✓ Alt text localized</div>
                    <div>✓ Navigation hints translated</div>
                    <div>✓ Error messages localized</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Keyboard Shortcuts</h4>
                  <div className="space-y-2 text-sm text-white/70">
                    <div>✓ Layout-aware shortcuts</div>
                    <div>✓ RTL navigation support</div>
                    <div>✓ Language-specific hotkeys</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Type className="w-5 h-5" />
                Language Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="text-white text-sm font-medium">Select Language for Preview</label>
                  <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
                    <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white max-w-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.filter(lang => sampleTranslations[lang.code as keyof typeof sampleTranslations]).map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-6 bg-white/5 rounded-lg border border-white/20">
                  <div className={`${languages.find(l => l.code === currentLanguage)?.rtl ? 'text-right' : 'text-left'}`}>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {sampleTranslations[currentLanguage as keyof typeof sampleTranslations]?.welcome || 'Welcome to AlgoViz'}
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 bg-white/5 rounded">
                        <h4 className="text-white font-medium mb-2">
                          {sampleTranslations[currentLanguage as keyof typeof sampleTranslations]?.algorithms || 'Algorithms'}
                        </h4>
                        <p className="text-white/70 text-sm">Bubble Sort, Quick Sort, Merge Sort...</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded">
                        <h4 className="text-white font-medium mb-2">
                          {sampleTranslations[currentLanguage as keyof typeof sampleTranslations]?.dataStructures || 'Data Structures'}
                        </h4>
                        <p className="text-white/70 text-sm">Arrays, Trees, Graphs, Hash Tables...</p>
                      </div>
                    </div>
                    
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                      {sampleTranslations[currentLanguage as keyof typeof sampleTranslations]?.startLearning || 'Start Learning'}
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="text-white font-medium mb-2">Numbers</h4>
                    <div className="text-white/70">
                      <div>Progress: {formatNumber(87.5, numberFormat)}%</div>
                      <div>Users: {formatNumber(15847, numberFormat)}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Dates</h4>
                    <div className="text-white/70">
                      <div>Today: {formatDate(new Date(), dateFormat)}</div>
                      <div>Due: {formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), dateFormat)}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Layout</h4>
                    <div className="text-white/70">
                      <div>Direction: {languages.find(l => l.code === currentLanguage)?.rtl ? 'RTL' : 'LTR'}</div>
                      <div>Font: System default</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="management">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-5 h-5" />
                Translation Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-medium mb-3">Translation Workflow</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded">
                      <Clock className="w-4 h-4 text-yellow-500" />
                      <div>
                        <div className="text-white text-sm">Pending Review</div>
                        <div className="text-white/60 text-xs">253 strings across 6 languages</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <div>
                        <div className="text-white text-sm">Recently Completed</div>
                        <div className="text-white/60 text-xs">German translation 92% complete</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">Translator Tools</h4>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-white/30 text-white hover:bg-white/10"
                    >
                      Translation Memory
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-white/30 text-white hover:bg-white/10"
                    >
                      Glossary Management
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-white/30 text-white hover:bg-white/10"
                    >
                      Quality Assurance
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-white/30 text-white hover:bg-white/10"
                    >
                      Export/Import
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-3">Recent Activity</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                    <span className="text-white">Spanish translation updated</span>
                    <span className="text-white/60">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                    <span className="text-white">New strings added for mobile features</span>
                    <span className="text-white/60">4 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                    <span className="text-white">Chinese review completed</span>
                    <span className="text-white/60">1 day ago</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
