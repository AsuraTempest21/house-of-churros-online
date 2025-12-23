import { Plus, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { MenuItem, useStore } from '@/contexts/StoreContext';

interface MenuItemCardProps {
  item: MenuItem;
  variant?: 'grid' | 'list' | 'featured';
}

const MenuItemCard = ({ item, variant = 'grid' }: MenuItemCardProps) => {
  const { addToCart, getAdjustedPrice } = useStore();
  const adjustedPrice = getAdjustedPrice(item.price);

  if (variant === 'featured') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex flex-col overflow-hidden rounded-xl bg-card border border-border shadow-xl"
      >
        <div
          className="relative w-full h-48 bg-cover bg-center"
          style={{ backgroundImage: `url("${item.image}")` }}
        >
          {item.isBestseller && (
            <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md border border-border">
              <p className="text-foreground text-xs font-bold uppercase tracking-wider">Must Try</p>
            </div>
          )}
          {item.isNew && (
            <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm px-2 py-1 rounded-md">
              <p className="text-primary-foreground text-xs font-bold uppercase tracking-wider">New</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1 p-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="border border-green-400 rounded p-0.5 w-4 h-4 flex items-center justify-center">
              <div className="bg-green-400 rounded-full w-2 h-2" />
            </div>
            {item.rating && (
              <span className="text-primary text-xs font-bold flex items-center">
                <Star className="h-3.5 w-3.5 mr-0.5 fill-current" />
                {item.rating}
              </span>
            )}
          </div>
          <h3 className="text-foreground text-lg font-bold leading-tight">{item.name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mt-1">{item.description}</p>
          <div className="flex items-center justify-between mt-3">
            <p className="text-foreground text-lg font-bold">₹{adjustedPrice}</p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(item)}
              className="flex items-center gap-1 px-4 py-2 bg-foreground text-background rounded-lg font-bold text-sm hover:bg-foreground/90 transition-colors"
            >
              Add
              <Plus className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="flex items-start gap-3 p-3 bg-card rounded-xl border border-border shadow-md"
      >
        <div
          className="w-24 h-24 shrink-0 bg-cover bg-center rounded-lg"
          style={{ backgroundImage: `url("${item.image}")` }}
        />
        <div className="flex flex-col flex-1 h-full justify-between min-h-24">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="border border-green-400 rounded p-0.5 w-4 h-4 flex items-center justify-center">
                <div className="bg-green-400 rounded-full w-2 h-2" />
              </div>
              {item.isNew && (
                <span className="bg-primary/20 text-primary text-[10px] px-1.5 py-0.5 rounded font-bold uppercase border border-primary/30">
                  New
                </span>
              )}
            </div>
            <h3 className="text-foreground text-base font-bold leading-tight">{item.name}</h3>
            <p className="text-muted-foreground text-xs line-clamp-2 mt-1">{item.description}</p>
          </div>
          <div className="flex items-end justify-between mt-2">
            <p className="text-foreground text-base font-bold">₹{adjustedPrice}</p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(item)}
              className="flex items-center justify-center px-3 py-2 border border-foreground text-foreground rounded-lg text-xs font-bold uppercase hover:bg-foreground hover:text-background transition-colors"
            >
              Add
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid variant (default)
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="flex flex-col gap-3 p-3 bg-card rounded-xl border border-border shadow-lg"
    >
      <div className="aspect-square w-full relative rounded-lg overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => addToCart(item)}
          className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background shadow-md hover:scale-110 transition-transform"
        >
          <Plus className="h-5 w-5" />
        </motion.button>
        {item.isNew && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
            New
          </span>
        )}
      </div>
      <div>
        <p className="text-foreground text-base font-bold leading-tight">{item.name}</p>
        <p className="text-muted-foreground text-xs mt-1 line-clamp-1">{item.description}</p>
        <p className="text-foreground text-sm font-bold mt-2">₹{adjustedPrice}</p>
      </div>
    </motion.div>
  );
};

export default MenuItemCard;
