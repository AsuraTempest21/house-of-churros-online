import { useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/contexts/StoreContext';
import { Button } from '@/components/ui/button';
import CheckoutOverlay from './CheckoutOverlay';

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartOverlay = ({ isOpen, onClose }: CartOverlayProps) => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useStore();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleBuy = () => {
    setCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background border-l border-border shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-bold text-foreground">Your Cart</h2>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                >
                  <X className="h-6 w-6 text-foreground" />
                </motion.button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
                      <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <p className="text-lg font-semibold text-foreground">Your cart is empty</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Add some delicious churros!
                    </p>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {cart.map((item, index) => (
                      <motion.li
                        key={`${item.id}-${item.selectedVariant || ''}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex gap-4 p-4 bg-card rounded-xl border border-border"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{item.name}</h3>
                          {item.selectedVariant && (
                            <p className="text-xs text-muted-foreground">{item.selectedVariant}</p>
                          )}
                          <p className="text-lg font-bold text-foreground mt-1">
                            ₹{item.price}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2 bg-secondary rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-border rounded-l-lg transition-colors"
                              >
                                <Minus className="h-4 w-4 text-foreground" />
                              </button>
                              <span className="w-8 text-center font-semibold text-foreground">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-border rounded-r-lg transition-colors"
                              >
                                <Plus className="h-4 w-4 text-foreground" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-border space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-foreground">₹{getCartTotal()}</span>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={clearCart}
                      className="flex-1 border-border text-foreground hover:bg-secondary"
                    >
                      Clear Cart
                    </Button>
                    <Button
                      onClick={handleBuy}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Checkout Overlay */}
          <CheckoutOverlay 
            isOpen={checkoutOpen} 
            onClose={() => setCheckoutOpen(false)}
            onComplete={() => {
              setCheckoutOpen(false);
              onClose();
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default CartOverlay;
