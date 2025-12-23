import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, Plus, Minus, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore, menuItems } from '@/contexts/StoreContext';
import { toast } from '@/hooks/use-toast';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, selectedLocation } = useStore();
  
  const item = menuItems.find(i => i.id === id);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(item?.variants?.[0]?.name || '');
  const [showIngredients, setShowIngredients] = useState(false);
  const [showMacros, setShowMacros] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground">Item not found</h2>
          <Button onClick={() => navigate('/menu')} className="mt-4">
            Back to Menu
          </Button>
        </div>
      </div>
    );
  }

  const isAvailable = item.availability.includes(selectedLocation.id);
  const images = item.images || [item.image];
  const currentPrice = selectedVariant && item.variants 
    ? item.variants.find(v => v.name === selectedVariant)?.price || item.price 
    : item.price;

  const handleAddToCart = () => {
    if (!isAvailable) {
      toast({
        title: "Not available",
        description: `This item is not available at ${selectedLocation.name}`,
        variant: "destructive",
      });
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(item, selectedVariant || undefined);
    }
    toast({
      title: "Added to cart!",
      description: `${quantity}x ${item.name} added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center p-4 gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center justify-center p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-foreground" />
          </motion.button>
          <h1 className="text-foreground text-lg font-bold truncate flex-1">{item.name}</h1>
        </div>
      </header>

      {/* Image Gallery */}
      <div className="relative">
        <div className="aspect-square w-full overflow-hidden">
          <motion.img
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={images[currentImageIndex]}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Image Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-foreground w-6' : 'bg-foreground/40'
                }`}
              />
            ))}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {item.isNew && (
            <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-bold uppercase">
              New
            </span>
          )}
          {item.isBestseller && (
            <span className="bg-foreground text-background text-xs px-3 py-1 rounded-full font-bold uppercase">
              Bestseller
            </span>
          )}
          {item.isExclusive && (
            <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold uppercase">
              Exclusive
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Title & Price */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="border border-green-400 rounded p-0.5 w-4 h-4 flex items-center justify-center">
                <div className="bg-green-400 rounded-full w-2 h-2" />
              </div>
              {item.rating && (
                <span className="text-primary text-sm font-bold flex items-center">
                  <Star className="h-4 w-4 mr-0.5 fill-current" />
                  {item.rating}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-foreground">{item.name}</h2>
          </div>
          <p className="text-2xl font-bold text-foreground">₹{currentPrice}</p>
        </div>

        {/* Availability Warning */}
        {!isAvailable && (
          <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
            <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
            <p className="text-sm text-destructive">
              Not available at {selectedLocation.name}
            </p>
          </div>
        )}

        {/* Exclusive Stock Warning */}
        {item.isExclusive && item.remainingStock !== undefined && (
          <div className="flex items-center gap-2 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
            <AlertCircle className="h-5 w-5 text-orange-500 shrink-0" />
            <p className="text-sm text-orange-500 font-medium">
              Only {item.remainingStock} left in stock!
            </p>
          </div>
        )}

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">{item.description}</p>

        {/* Variants */}
        {item.variants && item.variants.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-foreground mb-2">Choose Variant</h3>
            <div className="flex flex-wrap gap-2">
              {item.variants.map((variant) => (
                <button
                  key={variant.name}
                  onClick={() => setSelectedVariant(variant.name)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedVariant === variant.name
                      ? 'bg-foreground text-background'
                      : 'bg-secondary text-foreground border border-border'
                  }`}
                >
                  {variant.name} - ₹{variant.price}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Ingredients - Collapsible */}
        {item.ingredients && (
          <div className="border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => setShowIngredients(!showIngredients)}
              className="flex items-center justify-between w-full p-4 bg-card hover:bg-secondary transition-colors"
            >
              <span className="font-semibold text-foreground">Ingredients</span>
              {showIngredients ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
            <AnimatePresence>
              {showIngredients && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 border-t border-border">
                    <div className="flex flex-wrap gap-2">
                      {item.ingredients.map((ingredient, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-secondary rounded-full text-sm text-foreground"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Macros - Collapsible */}
        {item.macros && (
          <div className="border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => setShowMacros(!showMacros)}
              className="flex items-center justify-between w-full p-4 bg-card hover:bg-secondary transition-colors"
            >
              <span className="font-semibold text-foreground">Nutritional Info</span>
              {showMacros ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
            <AnimatePresence>
              {showMacros && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 border-t border-border">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-secondary rounded-lg">
                        <p className="text-lg font-bold text-foreground">{item.macros.calories}</p>
                        <p className="text-xs text-muted-foreground">Calories</p>
                      </div>
                      <div className="text-center p-3 bg-secondary rounded-lg">
                        <p className="text-lg font-bold text-foreground">{item.macros.protein}g</p>
                        <p className="text-xs text-muted-foreground">Protein</p>
                      </div>
                      <div className="text-center p-3 bg-secondary rounded-lg">
                        <p className="text-lg font-bold text-foreground">{item.macros.carbs}g</p>
                        <p className="text-xs text-muted-foreground">Carbs</p>
                      </div>
                      <div className="text-center p-3 bg-secondary rounded-lg">
                        <p className="text-lg font-bold text-foreground">{item.macros.fat}g</p>
                        <p className="text-xs text-muted-foreground">Fat</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 space-y-3">
        {/* Quantity Selector */}
        <div className="flex items-center justify-center gap-4 bg-secondary rounded-xl p-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 hover:bg-border rounded-lg transition-colors"
          >
            <Minus className="h-5 w-5 text-foreground" />
          </button>
          <span className="text-xl font-bold text-foreground w-12 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-2 hover:bg-border rounded-lg transition-colors"
          >
            <Plus className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={!isAvailable}
          className="w-full h-14 bg-foreground text-background hover:bg-foreground/90 font-bold text-lg disabled:opacity-50"
        >
          Add to Cart • ₹{currentPrice * quantity}
        </Button>
      </div>
    </div>
  );
};

export default ItemDetail;
