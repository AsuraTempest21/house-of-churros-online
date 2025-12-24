import { useState } from 'react';
import { X, CreditCard, MapPin, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/contexts/StoreContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import AuthOverlay from './AuthOverlay';

interface CheckoutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const CheckoutOverlay = ({ isOpen, onClose, onComplete }: CheckoutOverlayProps) => {
  const { cart, getCartTotal, clearCart, selectedLocation, isAuthenticated, addOrder } = useStore();
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [authOpen, setAuthOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      setAuthOpen(true);
      return;
    }

    if (!address || !phone) {
      toast({
        title: "Missing details",
        description: "Please fill in your delivery address and phone number",
        variant: "destructive",
      });
      return;
    }

    setStep('payment');
  };

  const handlePayment = () => {
    // Simulate payment processing
    const order = {
      date: new Date().toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: getCartTotal(),
      location: selectedLocation.name,
    };

    addOrder(order);
    clearCart();
    setStep('success');
  };

  const handleComplete = () => {
    setStep('details');
    setAddress('');
    setPhone('');
    onComplete();
    toast({
      title: "Order placed!",
      description: "Your order has been placed successfully. Check your profile for details.",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-full max-w-md bg-background rounded-2xl shadow-2xl border border-border max-h-[90vh] overflow-hidden"
          >
            {step === 'success' ? (
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle2 className="h-10 w-10 text-green-500" />
                </motion.div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Order Confirmed!</h2>
                <p className="text-muted-foreground mb-6">
                  Your delicious churros are being prepared at {selectedLocation.name}
                </p>
                <Button
                  onClick={handleComplete}
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                >
                  Done
                </Button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h2 className="text-xl font-bold text-foreground">
                    {step === 'details' ? 'Checkout' : 'Payment'}
                  </h2>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-secondary transition-colors"
                  >
                    <X className="h-5 w-5 text-foreground" />
                  </motion.button>
                </div>

                <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
                  {step === 'details' && (
                    <>
                      {/* Order Summary */}
                      <div>
                        <h3 className="text-sm font-bold text-foreground mb-3">Order Summary</h3>
                        <div className="space-y-2 p-4 bg-card rounded-xl border border-border">
                          {cart.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span className="text-foreground">
                                {item.name} x{item.quantity}
                              </span>
                              <span className="font-semibold text-foreground">
                                ₹{item.price * item.quantity}
                              </span>
                            </div>
                          ))}
                          <div className="border-t border-border pt-2 mt-2 flex justify-between">
                            <span className="font-bold text-foreground">Total</span>
                            <span className="font-bold text-foreground">₹{getCartTotal()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Pickup Location */}
                      <div>
                        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          Pickup Location
                        </h3>
                        <div className="p-4 bg-card rounded-xl border border-border">
                          <p className="font-semibold text-foreground">{selectedLocation.name}</p>
                          <p className="text-sm text-muted-foreground">{selectedLocation.address}</p>
                          <p className="text-xs text-muted-foreground mt-1">{selectedLocation.timings}</p>
                        </div>
                      </div>

                      {/* Contact Details */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-bold text-foreground">Contact Details</h3>
                        <Input
                          placeholder="Phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="h-12 bg-secondary border-border"
                        />
                        <Input
                          placeholder="Delivery address (optional for pickup)"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="h-12 bg-secondary border-border"
                        />
                      </div>
                    </>
                  )}

                  {step === 'payment' && (
                    <>
                      <div className="text-center py-4">
                        <CreditCard className="h-16 w-16 mx-auto text-primary mb-4" />
                        <h3 className="text-lg font-bold text-foreground mb-2">Payment</h3>
                        <p className="text-muted-foreground text-sm">
                          Total: <span className="font-bold text-foreground">₹{getCartTotal()}</span>
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <Button
                          onClick={handlePayment}
                          className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                        >
                          Pay ₹{getCartTotal()}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">
                          This is a demo - no actual payment will be processed
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Footer */}
                {step === 'details' && (
                  <div className="p-6 border-t border-border">
                    <Button
                      onClick={handlePlaceOrder}
                      className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-bold"
                    >
                      {isAuthenticated ? 'Continue to Payment' : 'Sign In to Continue'}
                    </Button>
                  </div>
                )}
              </>
            )}
          </motion.div>

          <AuthOverlay isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        </>
      )}
    </AnimatePresence>
  );
};

export default CheckoutOverlay;
