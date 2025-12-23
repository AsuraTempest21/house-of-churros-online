import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Map, Flame, Star } from 'lucide-react';
import Header from '@/components/Header';
import MenuOverlay from '@/components/MenuOverlay';
import LocationOverlay from '@/components/LocationOverlay';
import CartOverlay from '@/components/CartOverlay';
import OfferCard from '@/components/OfferCard';
import MenuItemCard from '@/components/MenuItemCard';
import { useStore, offers, menuItems } from '@/contexts/StoreContext';

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  
  const { selectedLocation, getAvailableItems } = useStore();
  const navigate = useNavigate();
  
  const availableItems = getAvailableItems();
  const bestsellers = availableItems.filter(item => item.isBestseller).slice(0, 4);
  const categories = ['All', 'Classic', 'Stuffed', 'Dips', 'Coffee'];

  return (
    <div className="min-h-screen bg-background pb-8">
      <Header
        onMenuClick={() => setMenuOpen(true)}
        onLocationClick={() => setLocationOpen(true)}
        onCartClick={() => setCartOpen(true)}
      />
      
      <main className="mt-16 w-full max-w-md mx-auto flex flex-col gap-6">
        {/* Hero Section */}
        <div className="px-4 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex min-h-[420px] flex-col gap-6 overflow-hidden rounded-2xl bg-cover bg-center p-6 shadow-xl border border-border justify-end"
            style={{
              backgroundImage: `linear-gradient(to top, hsl(var(--background) / 0.95) 0%, hsl(var(--background) / 0.4) 50%, hsl(0 0% 0% / 0.3) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuA2Y9EHpbcYXj8GQ3NQtyJEEd_eqZSg41JrFTD9GbSbjyIm59I0gqXUEApwj3tpryIO21O1-U-VZw4ei0D0cuOKR1LKcl6HK6kyRxncPE-J38TgleyZiL03poyNOaaqQpbw0CgwROcOeOhIp2I_veZ9i-aIWV-EGTkxiBgNZTtBb8PsVgVOYLFpZBS-VfokNAAO7d4AAWhCk6ns_B1fdXJqKp_yBqLveh9AEn3aHfz38QKQwq7f6BabkXitApseQOJLGRf4EcsdrST3")`,
            }}
          >
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm shadow-md">
              First in India
            </div>
            <div className="flex flex-col gap-2 text-left z-10">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-foreground text-4xl font-black leading-tight tracking-tight drop-shadow-sm"
              >
                Taste Spanish Tradition in Pune
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-foreground/90 text-base font-medium leading-normal max-w-[90%]"
              >
                Authentic recipes, golden fried daily. Experience the crunch.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-2"
              >
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/menu')}
                  className="flex items-center justify-center gap-2 rounded-xl h-12 px-8 bg-foreground text-background text-base font-bold shadow-lg hover:bg-foreground/90 transition-colors"
                >
                  Order Now
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Menu Categories */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-foreground text-xl font-bold">Menu Categories</h2>
          </div>
          <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-2">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/menu')}
                className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl px-4 shadow-sm transition-all ${
                  index === 0
                    ? 'bg-foreground text-background'
                    : 'bg-card border border-border text-foreground hover:bg-secondary'
                }`}
              >
                {index === 0 && <Star className="h-4 w-4" />}
                <span className="text-sm font-bold">{category}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Bestsellers */}
        <div className="flex flex-col gap-4 px-4">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground text-xl font-bold flex items-center gap-2">
              <Flame className="h-5 w-5 text-primary" />
              Bestsellers
            </h3>
            <button
              onClick={() => navigate('/menu')}
              className="text-muted-foreground text-sm font-bold flex items-center gap-0.5 hover:text-foreground transition-colors"
            >
              See all
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {bestsellers.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MenuItemCard item={item} variant="grid" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Latest Offers */}
        <div className="flex flex-col gap-4 px-4">
          <h3 className="text-foreground text-xl font-bold">Latest Offers</h3>
          <div className="flex flex-col gap-4">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <OfferCard offer={offer} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl bg-card/50 p-6 border border-border flex flex-col items-center text-center gap-3"
          >
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Map className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-foreground text-lg font-bold">Pune's Spanish Secret</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We brought the authentic recipe straight from the streets of Madrid to the heart of Pune. 
              First ever authentic churrería in India.
            </p>
            <button
              onClick={() => navigate('/about')}
              className="text-primary text-sm font-bold hover:underline"
            >
              Learn more about us
            </button>
          </motion.div>
        </div>
      </main>

      {/* Overlays */}
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <LocationOverlay isOpen={locationOpen} onClose={() => setLocationOpen(false)} />
      <CartOverlay isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default Index;
