import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, MapPin, ChevronDown, Flame, Star } from 'lucide-react';
import MenuItemCard from '@/components/MenuItemCard';
import LocationOverlay from '@/components/LocationOverlay';
import CartOverlay from '@/components/CartOverlay';
import { useStore } from '@/contexts/StoreContext';

const categories = [
  { id: 'bestsellers', label: 'Bestsellers', icon: Flame },
  { id: 'classics', label: 'The Classics', icon: null },
  { id: 'filled', label: 'Filled Churros', icon: null },
  { id: 'dips', label: 'Signature Dips', icon: null },
  { id: 'beverages', label: 'Beverages', icon: null },
  { id: 'combos', label: 'Combos', icon: null },
];

const Menu = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('bestsellers');
  const [locationOpen, setLocationOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { selectedLocation, getAvailableItems, getCartCount } = useStore();
  const cartCount = getCartCount();
  
  const availableItems = getAvailableItems();
  
  // Handle item highlight from URL
  const highlightedItemId = searchParams.get('item');
  
  useEffect(() => {
    if (highlightedItemId) {
      const item = availableItems.find(i => i.id === highlightedItemId);
      if (item) {
        setActiveCategory(item.category);
      }
    }
  }, [highlightedItemId, availableItems]);

  const filteredItems = availableItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'bestsellers' 
      ? item.isBestseller 
      : item.category === activeCategory;
    return matchesSearch && (activeCategory === 'all' || matchesCategory);
  });

  const groupedItems = {
    featured: filteredItems.filter(item => item.isBestseller || item.isNew).slice(0, 2),
    regular: filteredItems.filter(item => !item.isBestseller && !item.isNew),
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center p-4 gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="flex items-center justify-center p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-foreground" />
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setLocationOpen(true)}
            className="flex-1 flex flex-col items-center"
          >
            <div className="flex items-center gap-1 text-primary">
              <MapPin className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wide text-foreground/90">
                {selectedLocation.name}
              </span>
              <ChevronDown className="h-4 w-4 text-foreground/90" />
            </div>
            <h2 className="text-foreground text-base font-bold leading-tight text-center">
              Pune, MH
            </h2>
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setCartOpen(true)}
            className="relative flex items-center justify-center p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <Search className="h-6 w-6 text-foreground" />
          </motion.button>
        </div>
        
        {/* Location Notice */}
        <div className="bg-card px-4 py-2 flex items-center justify-between border-t border-border">
          <p className="text-xs text-foreground/90 font-medium">
            Viewing menu for {selectedLocation.name} branch.
          </p>
          <button
            onClick={() => setLocationOpen(true)}
            className="text-xs text-primary font-bold underline"
          >
            Change
          </button>
        </div>
      </header>

      {/* Restaurant Info */}
      <div className="p-4">
        <div className="flex gap-4 items-center">
          <div
            className="h-24 w-24 shrink-0 rounded-xl bg-cover bg-center shadow-lg border-2 border-border"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsRpIUREkEniioyGFJ1qVwACZp4pi6QL_cQIQULgf3gvzBIbw5H32kC1XiHOf18AYQmpSwzJCuR6IDPLwdhYInB2hIMPgQYcZCmuQ2WacL77xKipIfFt7MJ0eYvFs2MBN_UUhH2j0gnGt9KLO0x8H0_iZ1s8RqC0SlN38cJRj06o14mdYE-W9ERXGfjIEjI1uNvw5oiM89ofLXHn1rlyI1n8E171eSyJzYZxFI6aCjHuu9Ekaex8flCzGo8Cyr9RsOhqQ3ucxAZcnL")`,
            }}
          />
          <div className="flex flex-col flex-1">
            <h1 className="text-foreground text-2xl font-extrabold uppercase tracking-tight">
              House of Churros
            </h1>
            <p className="text-muted-foreground text-sm font-medium tracking-wide mt-1">
              Taste of Spain
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="px-2 py-0.5 rounded-md bg-green-400/20 border border-green-400/30 flex items-center gap-1">
                <div className="bg-green-400 rounded-full w-2 h-2" />
                <span className="text-[10px] font-bold text-foreground uppercase tracking-wide">
                  Pure Veg
                </span>
              </div>
              <div className="flex text-xs text-foreground">
                <span className="font-bold">4.8</span>
                <Star className="h-3.5 w-3.5 ml-0.5 text-yellow-400 fill-current" />
                <span className="ml-1 text-muted-foreground">(500+)</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Open until {selectedLocation.timings.split(' - ')[1]}
            </p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-[120px] z-20 bg-background py-2 shadow-md border-t border-border">
        <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <motion.button
                key={category.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-xl px-4 transition-all ${
                  isActive
                    ? 'bg-foreground text-background shadow-lg'
                    : 'bg-secondary border border-border text-foreground'
                }`}
              >
                {category.icon && <category.icon className="h-4 w-4" />}
                <span className="text-sm font-medium whitespace-nowrap">{category.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-6">
        {/* Featured Section */}
        {groupedItems.featured.length > 0 && (
          <div>
            <h2 className="text-foreground text-xl font-bold mb-4 flex items-center gap-2">
              <Flame className="h-5 w-5 text-primary" />
              {selectedLocation.name} Favorites
            </h2>
            <div className="flex flex-col gap-4">
              {groupedItems.featured.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MenuItemCard item={item} variant="featured" />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Items */}
        {filteredItems.length > 0 && (
          <div>
            <h2 className="text-foreground text-xl font-bold mb-4">
              {categories.find(c => c.id === activeCategory)?.label || 'All Items'}
            </h2>
            <div className="flex flex-col gap-4">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={highlightedItemId === item.id ? 'ring-2 ring-primary rounded-xl' : ''}
                >
                  <MenuItemCard item={item} variant="list" />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items available in this category at {selectedLocation.name}.</p>
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 w-full z-40 p-4 bg-gradient-to-t from-background via-background/90 to-transparent"
        >
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setCartOpen(true)}
            className="w-full flex items-center justify-between px-6 py-4 bg-foreground text-background rounded-xl shadow-xl"
          >
            <span className="font-bold">{cartCount} items in cart</span>
            <span className="font-bold">View Cart →</span>
          </motion.button>
        </motion.div>
      )}

      {/* Overlays */}
      <LocationOverlay isOpen={locationOpen} onClose={() => setLocationOpen(false)} />
      <CartOverlay isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default Menu;
