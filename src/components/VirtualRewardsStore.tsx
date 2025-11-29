import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gift, 
  Gem, 
  Zap, 
  Star, 
  Crown, 
  Palette, 
  Shield, 
  Sparkles, 
  BookOpen, 
  Trophy,
  Heart,
  Flame,
  Lock,
  Unlock,
  ShoppingCart,
  Check,
  X,
  Coins,
  Award,
  Eye,
  Download,
  Refresh,
  Settings,
  Filter,
  Search
} from 'lucide-react';

interface RewardItem {
  id: string;
  name: string;
  description: string;
  category: 'themes' | 'powerups' | 'cosmetics' | 'boosts' | 'premium' | 'exclusive';
  price: {
    coins: number;
    gems?: number;
  };
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  icon: React.ComponentType<{ className?: string }>;
  preview?: string;
  isOwned: boolean;
  isPremium: boolean;
  isLimited?: boolean;
  timeRemaining?: number; // hours
  effects?: string[];
  requirements?: {
    level?: number;
    achievements?: string[];
  };
  discount?: number; // percentage
}

interface UserCurrency {
  coins: number;
  gems: number;
  premiumPoints: number;
}

interface CartItem {
  itemId: string;
  quantity: number;
}

const mockUserCurrency: UserCurrency = {
  coins: 2340,
  gems: 45,
  premiumPoints: 12
};

const mockRewardItems: RewardItem[] = [
  {
    id: '1',
    name: 'Neon Matrix Theme',
    description: 'Transform your interface with a sleek cyberpunk-inspired neon theme featuring animated matrices and glowing effects',
    category: 'themes',
    price: { coins: 500 },
    rarity: 'rare',
    icon: Palette,
    preview: '/api/placeholder/300/200',
    isOwned: false,
    isPremium: false,
    effects: ['Animated background', 'Glowing UI elements', 'Matrix rain effect'],
    requirements: { level: 5 }
  },
  {
    id: '2',
    name: 'Golden Crown Avatar Frame',
    description: 'Show your achievements with this luxurious golden crown frame that surrounds your profile picture',
    category: 'cosmetics',
    price: { coins: 800, gems: 2 },
    rarity: 'epic',
    icon: Crown,
    preview: '/api/placeholder/150/150',
    isOwned: false,
    isPremium: true,
    effects: ['Golden glow effect', 'Particle animations', 'Status symbol']
  },
  {
    id: '3',
    name: 'XP Multiplier Boost',
    description: 'Double your XP gain for the next 24 hours. Perfect for leveling up quickly!',
    category: 'boosts',
    price: { coins: 200 },
    rarity: 'common',
    icon: Zap,
    isOwned: false,
    isPremium: false,
    effects: ['2x XP for 24 hours', 'Stacks with other bonuses']
  },
  {
    id: '4',
    name: 'Legendary Phoenix Badge',
    description: 'An exclusive badge that only the most dedicated learners can obtain. Represents resilience and mastery.',
    category: 'exclusive',
    price: { gems: 15 },
    rarity: 'legendary',
    icon: Flame,
    isOwned: false,
    isPremium: true,
    requirements: { level: 15, achievements: ['Sorting Master', 'Graph Virtuoso'] },
    effects: ['Exclusive status', 'Special profile highlight', 'Rare achievement']
  },
  {
    id: '5',
    name: 'Algorithm Insight Powerup',
    description: 'Get detailed step-by-step explanations and optimization tips for any algorithm visualization',
    category: 'powerups',
    price: { coins: 300 },
    rarity: 'rare',
    icon: BookOpen,
    isOwned: true,
    isPremium: false,
    effects: ['Enhanced tooltips', 'Code optimization hints', 'Performance insights']
  },
  {
    id: '6',
    name: 'Mystical Forest Theme',
    description: 'Immerse yourself in nature with this enchanting forest theme featuring magical particles and serene animations',
    category: 'themes',
    price: { coins: 600, gems: 1 },
    rarity: 'epic',
    icon: Sparkles,
    preview: '/api/placeholder/300/200',
    isOwned: false,
    isPremium: false,
    isLimited: true,
    timeRemaining: 72,
    effects: ['Animated forest background', 'Floating particles', 'Nature sounds']
  },
  {
    id: '7',
    name: 'Premium Streak Protector',
    description: 'Protect your learning streak from being broken. Automatically maintains your streak if you miss a day.',
    category: 'premium',
    price: { coins: 1000, gems: 5 },
    rarity: 'epic',
    icon: Shield,
    isOwned: false,
    isPremium: true,
    effects: ['Streak protection for 7 days', 'Peace of mind', 'Automatic activation']
  },
  {
    id: '8',
    name: 'Diamond Tier Membership',
    description: 'Unlock exclusive features, priority support, and access to premium algorithm collections',
    category: 'premium',
    price: { gems: 25 },
    rarity: 'mythic',
    icon: Gem,
    isOwned: false,
    isPremium: true,
    effects: ['30 days premium access', 'Exclusive algorithms', 'Priority support', 'Advanced analytics']
  }
];

export const VirtualRewardsStore: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<RewardItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showPreview, setShowPreview] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Items', icon: Gift },
    { id: 'themes', label: 'Themes', icon: Palette },
    { id: 'powerups', label: 'Power-ups', icon: Zap },
    { id: 'cosmetics', label: 'Cosmetics', icon: Star },
    { id: 'boosts', label: 'Boosts', icon: Trophy },
    { id: 'premium', label: 'Premium', icon: Crown },
    { id: 'exclusive', label: 'Exclusive', icon: Flame }
  ];

  const rarityColors = {
    common: 'from-gray-400 to-gray-500',
    rare: 'from-blue-400 to-blue-500',
    epic: 'from-purple-400 to-purple-500',
    legendary: 'from-yellow-400 to-orange-500',
    mythic: 'from-pink-400 to-red-500'
  };

  const filteredItems = mockRewardItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (itemId: string) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.itemId === itemId);
      if (existingItem) {
        return prev.map(item =>
          item.itemId === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { itemId, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.itemId !== itemId));
  };

  const getTotalCost = () => {
    return cart.reduce((total, cartItem) => {
      const item = mockRewardItems.find(i => i.id === cartItem.itemId);
      if (item) {
        total.coins += item.price.coins * cartItem.quantity;
        total.gems += (item.price.gems || 0) * cartItem.quantity;
      }
      return total;
    }, { coins: 0, gems: 0 });
  };

  const canAfford = (item: RewardItem) => {
    const totalCost = getTotalCost();
    return mockUserCurrency.coins >= (totalCost.coins + item.price.coins) &&
           mockUserCurrency.gems >= (totalCost.gems + (item.price.gems || 0));
  };

  const meetsRequirements = (item: RewardItem) => {
    if (!item.requirements) return true;
    // Mock user level check
    const userLevel = 12;
    const levelOk = !item.requirements.level || userLevel >= item.requirements.level;
    // Mock achievements check - simplified
    const achievementsOk = !item.requirements.achievements || item.requirements.achievements.length <= 2;
    return levelOk && achievementsOk;
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const RewardItemCard: React.FC<{ item: RewardItem }> = ({ item }) => {
    const Icon = item.icon;
    const isAffordable = canAfford(item);
    const meetsReqs = meetsRequirements(item);
    const canPurchase = isAffordable && meetsReqs && !item.isOwned;
    
    return (
      <motion.div
        variants={itemVariants}
        className={`bg-white rounded-xl p-6 shadow-lg border transition-all duration-300 hover:shadow-xl relative overflow-hidden ${
          item.isOwned ? 'border-green-300 bg-green-50' :
          item.isPremium ? 'border-purple-300' :
          'border-gray-100'
        }`}
      >
        {/* Rarity gradient border */}
        <div className={`absolute inset-0 p-0.5 bg-gradient-to-r ${rarityColors[item.rarity]} rounded-xl`}>
          <div className="bg-white rounded-lg h-full w-full"></div>
        </div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${rarityColors[item.rarity]} flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col items-end space-y-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                item.rarity === 'common' ? 'bg-gray-100 text-gray-700' :
                item.rarity === 'rare' ? 'bg-blue-100 text-blue-700' :
                item.rarity === 'epic' ? 'bg-purple-100 text-purple-700' :
                item.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {item.rarity}
              </span>
              {item.isOwned && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  Owned
                </span>
              )}
              {item.isPremium && (
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  Premium
                </span>
              )}
              {item.isLimited && item.timeRemaining && (
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                  {item.timeRemaining}h left
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

          {/* Preview */}
          {item.preview && (
            <div className="mb-4">
              <img
                src={item.preview}
                alt={`${item.name} preview`}
                className="w-full h-32 object-cover rounded-lg border border-gray-200 cursor-pointer"
                onClick={() => setShowPreview(item.id)}
              />
            </div>
          )}

          {/* Effects */}
          {item.effects && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Effects:</h4>
              <ul className="space-y-1">
                {item.effects.slice(0, 2).map((effect, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <Sparkles className="w-3 h-3 text-purple-500 mr-2 flex-shrink-0" />
                    {effect}
                  </li>
                ))}
                {item.effects.length > 2 && (
                  <li className="text-sm text-gray-500">
                    +{item.effects.length - 2} more effects
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {item.requirements && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-1">Requirements:</h4>
              <div className="space-y-1 text-sm">
                {item.requirements.level && (
                  <div className="flex items-center">
                    <Trophy className="w-3 h-3 text-yellow-500 mr-2" />
                    <span className={`${12 >= item.requirements.level ? 'text-green-600' : 'text-red-600'}`}>
                      Level {item.requirements.level}
                    </span>
                  </div>
                )}
                {item.requirements.achievements && (
                  <div className="flex items-center">
                    <Award className="w-3 h-3 text-purple-500 mr-2" />
                    <span className="text-gray-600">
                      {item.requirements.achievements.length} achievements
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Price and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-yellow-600">
                <Coins className="w-4 h-4 mr-1" />
                <span className="font-bold">{item.price.coins.toLocaleString()}</span>
              </div>
              {item.price.gems && (
                <div className="flex items-center text-purple-600">
                  <Gem className="w-4 h-4 mr-1" />
                  <span className="font-bold">{item.price.gems}</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {item.isOwned ? (
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium flex items-center cursor-not-allowed opacity-50">
                  <Check className="w-4 h-4 mr-1" />
                  Owned
                </button>
              ) : canPurchase ? (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="px-3 py-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => addToCart(item.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center"
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Add
                  </button>
                </div>
              ) : (
                <button className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg font-medium flex items-center cursor-not-allowed">
                  <Lock className="w-4 h-4 mr-1" />
                  {!isAffordable ? 'Cannot Afford' : 'Locked'}
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const CartSidebar = () => {
    const totalCost = getTotalCost();
    const canAffordTotal = mockUserCurrency.coins >= totalCost.coins && mockUserCurrency.gems >= totalCost.gems;

    return (
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
            onClick={() => setShowCart(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="bg-white w-96 h-full shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
                  <button
                    onClick={() => setShowCart(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((cartItem) => {
                      const item = mockRewardItems.find(i => i.id === cartItem.itemId);
                      if (!item) return null;

                      return (
                        <div key={cartItem.itemId} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${rarityColors[item.rarity]} flex items-center justify-center`}>
                            <item.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                            <div className="flex items-center space-x-2 text-sm">
                              <span className="flex items-center text-yellow-600">
                                <Coins className="w-3 h-3 mr-1" />
                                {item.price.coins}
                              </span>
                              {item.price.gems && (
                                <span className="flex items-center text-purple-600">
                                  <Gem className="w-3 h-3 mr-1" />
                                  {item.price.gems}
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(cartItem.itemId)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}

                    <div className="border-t border-gray-200 pt-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">Total:</span>
                          <div className="flex items-center space-x-3">
                            <span className="flex items-center text-yellow-600 font-bold">
                              <Coins className="w-4 h-4 mr-1" />
                              {totalCost.coins.toLocaleString()}
                            </span>
                            {totalCost.gems > 0 && (
                              <span className="flex items-center text-purple-600 font-bold">
                                <Gem className="w-4 h-4 mr-1" />
                                {totalCost.gems}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          disabled={!canAffordTotal}
                          className={`w-full py-3 rounded-lg font-medium transition-colors ${
                            canAffordTotal
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {canAffordTotal ? 'Purchase All' : 'Insufficient Funds'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Virtual Rewards Store
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Spend your earned coins and gems on themes, power-ups, cosmetics, and exclusive rewards
            </p>
          </motion.div>

          {/* Currency Display */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                    <Coins className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{mockUserCurrency.coins.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Coins</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                    <Gem className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{mockUserCurrency.gems}</p>
                    <p className="text-sm text-gray-600">Gems</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCart(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart</span>
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rarity">Rarity</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </motion.div>

          {/* Category Navigation */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
              <div className="flex space-x-1 overflow-x-auto">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-4 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 whitespace-nowrap ${
                        activeCategory === category.id
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{category.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Items Grid */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <RewardItemCard key={item.id} item={item} />
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <motion.div variants={itemVariants} className="text-center py-12">
              <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600">Try adjusting your search or category filters</p>
            </motion.div>
          )}

          {/* Cart Sidebar */}
          <CartSidebar />

          {/* Item Detail Modal */}
          <AnimatePresence>
            {selectedItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                onClick={() => setSelectedItem(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[80vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${rarityColors[selectedItem.rarity]} flex items-center justify-center`}>
                        <selectedItem.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{selectedItem.name}</h2>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize mt-1 ${
                          selectedItem.rarity === 'common' ? 'bg-gray-100 text-gray-700' :
                          selectedItem.rarity === 'rare' ? 'bg-blue-100 text-blue-700' :
                          selectedItem.rarity === 'epic' ? 'bg-purple-100 text-purple-700' :
                          selectedItem.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {selectedItem.rarity}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <p className="text-gray-600 leading-relaxed">{selectedItem.description}</p>

                    {selectedItem.preview && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Preview</h3>
                        <img
                          src={selectedItem.preview}
                          alt={`${selectedItem.name} preview`}
                          className="w-full rounded-lg border border-gray-200"
                        />
                      </div>
                    )}

                    {selectedItem.effects && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Effects & Features</h3>
                        <ul className="space-y-2">
                          {selectedItem.effects.map((effect, index) => (
                            <li key={index} className="flex items-center">
                              <Sparkles className="w-4 h-4 text-purple-500 mr-3 flex-shrink-0" />
                              <span className="text-gray-700">{effect}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-yellow-600">
                          <Coins className="w-5 h-5 mr-2" />
                          <span className="text-xl font-bold">{selectedItem.price.coins.toLocaleString()}</span>
                        </div>
                        {selectedItem.price.gems && (
                          <div className="flex items-center text-purple-600">
                            <Gem className="w-5 h-5 mr-2" />
                            <span className="text-xl font-bold">{selectedItem.price.gems}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={() => setSelectedItem(null)}
                          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                        {selectedItem.isOwned ? (
                          <button className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium flex items-center cursor-not-allowed opacity-50">
                            <Check className="w-4 h-4 mr-2" />
                            Owned
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              addToCart(selectedItem.id);
                              setSelectedItem(null);
                            }}
                            disabled={!canAfford(selectedItem) || !meetsRequirements(selectedItem)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center disabled:bg-gray-300 disabled:cursor-not-allowed"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default VirtualRewardsStore;