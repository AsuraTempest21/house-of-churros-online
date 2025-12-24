import { useState } from 'react';
import { X, Info, UtensilsCrossed, CalendarDays, Users, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/contexts/StoreContext';
import AuthOverlay from './AuthOverlay';
import ProfileOverlay from './ProfileOverlay';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Info, label: 'About Us', path: '/about' },
  { icon: UtensilsCrossed, label: 'Menu', path: '/menu' },
  { icon: CalendarDays, label: 'Book a Table', path: '/booking' },
  { icon: Users, label: 'Social Gatherings', path: '/social' },
];

const MenuOverlay = ({ isOpen, onClose }: MenuOverlayProps) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useStore();
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setProfileOpen(true);
    } else {
      setAuthOpen(true);
    }
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
          
          {/* Menu Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 z-50 h-full w-80 bg-background border-r border-border shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h2 className="text-xl font-bold text-foreground uppercase tracking-tight">
                    House of Churros
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">Taste of Spain</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                >
                  <X className="h-6 w-6 text-foreground" />
                </motion.button>
              </div>

              {/* Profile Button */}
              <div className="p-4 border-b border-border">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleProfileClick}
                  className="flex items-center gap-4 w-full p-4 rounded-xl bg-card border border-border hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    {isAuthenticated ? (
                      <>
                        <p className="text-base font-bold text-foreground">{user?.name}</p>
                        <p className="text-sm text-muted-foreground">View Profile</p>
                      </>
                    ) : (
                      <>
                        <p className="text-base font-bold text-foreground">Sign In</p>
                        <p className="text-sm text-muted-foreground">Login or create account</p>
                      </>
                    )}
                  </div>
                </motion.button>
              </div>

              {/* Menu Items */}
              <nav className="flex-1 p-6">
                <ul className="space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <button
                        onClick={() => handleNavigation(item.path)}
                        className="flex items-center gap-4 w-full p-4 rounded-xl hover:bg-secondary transition-colors group"
                      >
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <item.icon className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-lg font-semibold text-foreground">
                          {item.label}
                        </span>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  First authentic churrería in India
                </p>
              </div>
            </div>
          </motion.div>

          {/* Auth & Profile Overlays */}
          <AuthOverlay isOpen={authOpen} onClose={() => setAuthOpen(false)} />
          <ProfileOverlay isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
        </>
      )}
    </AnimatePresence>
  );
};

export default MenuOverlay;
