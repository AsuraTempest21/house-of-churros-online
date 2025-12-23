import { X, User, Calendar, Users, ShoppingBag, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/contexts/StoreContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';

interface ProfileOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileOverlay = ({ isOpen, onClose }: ProfileOverlayProps) => {
  const { user, setUser, bookings, orderHistory } = useStore();

  const handleLogout = () => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
    onClose();
  };

  const tableBookings = bookings.filter(b => b.type === 'table');
  const socialBookings = bookings.filter(b => b.type === 'social');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 z-50 h-full w-full max-w-md bg-background border-r border-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
              <h2 className="text-xl font-bold text-foreground">My Profile</h2>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <X className="h-6 w-6 text-foreground" />
              </motion.button>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-6 space-y-6">
                {/* User Info */}
                <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{user?.name}</h3>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>

                {/* Table Reservations */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">Table Reservations</h3>
                  </div>
                  {tableBookings.length === 0 ? (
                    <p className="text-sm text-muted-foreground p-4 bg-secondary rounded-lg">
                      No table reservations yet.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {tableBookings.map((booking) => (
                        <div key={booking.id} className="p-4 bg-card rounded-xl border border-border">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-foreground">{booking.location}</span>
                            <span className="text-sm text-muted-foreground">{booking.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {booking.time} • {booking.guests} guests
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Social Gatherings */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">Social Gatherings</h3>
                  </div>
                  {socialBookings.length === 0 ? (
                    <p className="text-sm text-muted-foreground p-4 bg-secondary rounded-lg">
                      No social gatherings booked yet.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {socialBookings.map((booking) => (
                        <div key={booking.id} className="p-4 bg-card rounded-xl border border-border">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-foreground">{booking.eventType}</span>
                            <span className="text-sm text-muted-foreground">{booking.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {booking.location} • {booking.guests} guests
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Order History */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">Order History</h3>
                  </div>
                  {orderHistory.length === 0 ? (
                    <p className="text-sm text-muted-foreground p-4 bg-secondary rounded-lg">
                      No orders yet. Start ordering delicious churros!
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {orderHistory.map((order) => (
                        <div key={order.id} className="p-4 bg-card rounded-xl border border-border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-foreground">₹{order.total}</span>
                            <span className="text-sm text-muted-foreground">{order.date}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{order.location}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>

            {/* Logout Button */}
            <div className="p-6 border-t border-border shrink-0">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full h-12 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Log Out
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileOverlay;
