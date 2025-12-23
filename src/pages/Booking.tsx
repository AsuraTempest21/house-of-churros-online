import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Clock, Users, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore, locations, Location } from '@/contexts/StoreContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface TimeSlot {
  time: string;
  available: boolean;
}

const getTimeSlotsForLocation = (location: Location): TimeSlot[] => {
  const [openTime] = location.timings.split(' - ');
  const openHour = parseInt(openTime.split(':')[0]);
  const isPM = openTime.includes('PM');
  const startHour = isPM && openHour !== 12 ? openHour + 12 : openHour;
  
  const slots: TimeSlot[] = [];
  for (let hour = startHour; hour < 22; hour++) {
    const time = `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
    const halfTime = `${hour > 12 ? hour - 12 : hour}:30 ${hour >= 12 ? 'PM' : 'AM'}`;
    
    // Simulate some slots being unavailable based on location
    const isAvailable = Math.random() > 0.3;
    const isHalfAvailable = Math.random() > 0.3;
    
    slots.push({ time, available: isAvailable });
    slots.push({ time: halfTime, available: isHalfAvailable });
  }
  return slots;
};

const Booking = () => {
  const navigate = useNavigate();
  const { selectedLocation, setSelectedLocation } = useStore();
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [guests, setGuests] = useState(2);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  
  const timeSlots = getTimeSlotsForLocation(selectedLocation);
  
  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const handleBooking = () => {
    if (!selectedTime) {
      toast({
        title: "Please select a time slot",
        description: "Choose an available time slot to proceed.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Booking Confirmed!",
      description: `Table for ${guests} at ${selectedLocation.name} on ${selectedDate.toLocaleDateString()} at ${selectedTime}`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-8">
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
          <h1 className="text-foreground text-xl font-bold">Book a Table</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {/* Location Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <label className="text-sm font-semibold text-muted-foreground mb-2 block">
            Select Branch
          </label>
          <button
            onClick={() => setShowLocationPicker(!showLocationPicker)}
            className="w-full flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-foreground">{selectedLocation.name}</p>
              <p className="text-xs text-muted-foreground">{selectedLocation.address}</p>
            </div>
          </button>
          
          {showLocationPicker && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-2 bg-card rounded-xl border border-border overflow-hidden"
            >
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => {
                    setSelectedLocation(location);
                    setShowLocationPicker(false);
                    setSelectedTime(null);
                  }}
                  className={`w-full flex items-center gap-3 p-3 hover:bg-secondary transition-colors ${
                    selectedLocation.id === location.id ? 'bg-primary/10' : ''
                  }`}
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{location.name}</span>
                  {selectedLocation.id === location.id && (
                    <Check className="h-4 w-4 text-primary ml-auto" />
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Date Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <label className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Select Date
          </label>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {dates.map((date, index) => {
              const isSelected = selectedDate.toDateString() === date.toDateString();
              const isToday = new Date().toDateString() === date.toDateString();
              return (
                <motion.button
                  key={index}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedTime(null);
                  }}
                  className={`flex flex-col items-center justify-center min-w-[70px] p-3 rounded-xl transition-all ${
                    isSelected
                      ? 'bg-foreground text-background'
                      : 'bg-card border border-border text-foreground hover:border-primary/50'
                  }`}
                >
                  <span className="text-xs font-medium opacity-70">
                    {isToday ? 'Today' : date.toLocaleDateString('en', { weekday: 'short' })}
                  </span>
                  <span className="text-lg font-bold mt-1">
                    {date.getDate()}
                  </span>
                  <span className="text-xs opacity-70">
                    {date.toLocaleDateString('en', { month: 'short' })}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Guest Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <label className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Number of Guests
          </label>
          <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
            <button
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="w-10 h-10 rounded-full bg-secondary text-foreground font-bold text-xl hover:bg-secondary/80 transition-colors"
            >
              -
            </button>
            <span className="flex-1 text-center text-2xl font-bold text-foreground">
              {guests}
            </span>
            <button
              onClick={() => setGuests(Math.min(10, guests + 1))}
              className="w-10 h-10 rounded-full bg-secondary text-foreground font-bold text-xl hover:bg-secondary/80 transition-colors"
            >
              +
            </button>
          </div>
        </motion.div>

        {/* Time Slots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <label className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Available Time Slots at {selectedLocation.name}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.slice(0, 12).map((slot, index) => {
              const isSelected = selectedTime === slot.time;
              return (
                <motion.button
                  key={index}
                  whileTap={{ scale: slot.available ? 0.95 : 1 }}
                  onClick={() => slot.available && setSelectedTime(slot.time)}
                  disabled={!slot.available}
                  className={`py-3 px-2 rounded-lg text-sm font-medium transition-all ${
                    !slot.available
                      ? 'bg-muted text-muted-foreground/50 cursor-not-allowed line-through'
                      : isSelected
                      ? 'bg-foreground text-background'
                      : 'bg-card border border-border text-foreground hover:border-primary/50'
                  }`}
                >
                  {slot.time}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Booking Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-4 bg-card rounded-xl border border-border mb-6"
        >
          <h3 className="font-semibold text-foreground mb-3">Booking Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location</span>
              <span className="font-medium text-foreground">{selectedLocation.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium text-foreground">
                {selectedDate.toLocaleDateString('en', { weekday: 'short', day: 'numeric', month: 'short' })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time</span>
              <span className="font-medium text-foreground">{selectedTime || 'Not selected'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Guests</span>
              <span className="font-medium text-foreground">{guests}</span>
            </div>
          </div>
        </motion.div>

        {/* Book Button */}
        <Button
          onClick={handleBooking}
          className="w-full py-6 bg-foreground text-background hover:bg-foreground/90 text-lg font-bold rounded-xl"
        >
          Confirm Booking
        </Button>
      </main>
    </div>
  );
};

export default Booking;
