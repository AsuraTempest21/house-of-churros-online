import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Award, Heart, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { locations } from '@/contexts/StoreContext';

const About = () => {
  const navigate = useNavigate();

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
          <h1 className="text-foreground text-xl font-bold">About Us</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-64 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuA2Y9EHpbcYXj8GQ3NQtyJEEd_eqZSg41JrFTD9GbSbjyIm59I0gqXUEApwj3tpryIO21O1-U-VZw4ei0D0cuOKR1LKcl6HK6kyRxncPE-J38TgleyZiL03poyNOaaqQpbw0CgwROcOeOhIp2I_veZ9i-aIWV-EGTkxiBgNZTtBb8PsVgVOYLFpZBS-VfokNAAO7d4AAWhCk6ns_B1fdXJqKp_yBqLveh9AEn3aHfz38QKQwq7f6BabkXitApseQOJLGRf4EcsdrST3")`,
          }}
        />

        <div className="px-4 -mt-16 relative z-10">
          {/* Title Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl p-6 shadow-xl border border-border"
          >
            <h2 className="text-3xl font-black text-foreground uppercase tracking-tight">
              House of Churros
            </h2>
            <p className="text-primary font-semibold mt-1">First Authentic Churrería in India</p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              We brought the authentic recipe straight from the streets of Madrid to the heart of Pune. 
              Every churro is hand-crafted with love, using the same techniques that have been passed 
              down through generations of Spanish churro makers.
            </p>
          </motion.div>

          {/* Values */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            {[
              { icon: Leaf, label: 'Pure Veg', desc: '100% vegetarian menu' },
              { icon: Award, label: 'Authentic', desc: 'Traditional Spanish recipes' },
              { icon: Heart, label: 'Fresh Daily', desc: 'Made fresh every day' },
              { icon: Clock, label: 'Quick Service', desc: 'Ready in minutes' },
            ].map((value, index) => (
              <motion.div
                key={value.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-4 border border-border"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                  <value.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">{value.label}</h3>
                <p className="text-xs text-muted-foreground mt-1">{value.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 bg-card rounded-2xl p-6 border border-border"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">Our Story</h3>
            <p className="text-muted-foreground leading-relaxed">
              It all started with a trip to Spain. Walking through the cobblestone streets of Madrid, 
              we discovered the magic of freshly made churros—crispy on the outside, soft on the inside, 
              and dusted with just the right amount of cinnamon sugar.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We knew we had to bring this experience back home. After months of perfecting our recipe 
              and sourcing the finest ingredients, House of Churros was born. Today, we're proud to be 
              India's first authentic churrería, serving the same quality churros you'd find in the 
              heart of Spain.
            </p>
          </motion.div>

          {/* Locations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">Our Locations in Pune</h3>
            <div className="space-y-3">
              {locations.map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{location.name}</h4>
                    <p className="text-xs text-muted-foreground">{location.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{location.timings}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 mb-8"
          >
            <button
              onClick={() => navigate('/menu')}
              className="w-full py-4 bg-foreground text-background rounded-xl font-bold text-lg shadow-xl hover:bg-foreground/90 transition-colors"
            >
              Explore Our Menu
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default About;
