import { X, MapPin, Clock, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, locations, Location } from '@/contexts/StoreContext';

interface LocationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const LocationOverlay = ({ isOpen, onClose }: LocationOverlayProps) => {
  const { selectedLocation, setSelectedLocation } = useStore();

  const handleSelectLocation = (location: Location) => {
    setSelectedLocation(location);
    onClose();
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
          
          {/* Location Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl shadow-2xl max-h-[80vh] overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 rounded-full bg-border" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    Select Location
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Choose your nearest branch in Pune
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                >
                  <X className="h-6 w-6 text-foreground" />
                </motion.button>
              </div>

              {/* Locations List */}
              <div className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-3">
                  {locations.map((location, index) => {
                    const isSelected = selectedLocation.id === location.id;
                    return (
                      <motion.li
                        key={location.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <button
                          onClick={() => handleSelectLocation(location)}
                          className={`flex items-start gap-4 w-full p-4 rounded-xl transition-all ${
                            isSelected
                              ? 'bg-primary/10 border-2 border-primary'
                              : 'bg-card border border-border hover:border-primary/50'
                          }`}
                        >
                          <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                            isSelected ? 'bg-primary' : 'bg-secondary'
                          }`}>
                            <MapPin className={`h-6 w-6 ${
                              isSelected ? 'text-primary-foreground' : 'text-foreground'
                            }`} />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-semibold text-foreground">
                                {location.name}
                              </span>
                              {isSelected && (
                                <Check className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {location.address}
                            </p>
                            <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{location.timings}</span>
                            </div>
                          </div>
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LocationOverlay;
