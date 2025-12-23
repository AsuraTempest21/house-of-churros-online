import { motion } from 'framer-motion';
import { ArrowLeft, Users, PartyPopper, Cake, Gift, Calendar, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const eventTypes = [
  {
    icon: Cake,
    title: 'Birthday Parties',
    description: 'Celebrate your special day with unlimited churros and customized decorations.',
    features: ['Dedicated party area', 'Custom churro platters', 'Party decorations', 'Group discounts'],
    price: 'From ₹2,999',
  },
  {
    icon: Users,
    title: 'Corporate Events',
    description: 'Host your team meetings, celebrations, or client events in our cozy space.',
    features: ['Private seating', 'Catering packages', 'AV equipment', 'Flexible timing'],
    price: 'From ₹4,999',
  },
  {
    icon: PartyPopper,
    title: 'Get-Togethers',
    description: 'Perfect for friend reunions, family gatherings, or casual meetups.',
    features: ['Group reservations', 'Combo deals', 'Outdoor seating', 'Music selection'],
    price: 'From ₹1,499',
  },
  {
    icon: Gift,
    title: 'Special Occasions',
    description: 'Anniversaries, promotions, graduations - we make every moment sweeter.',
    features: ['Personalized setup', 'Special desserts', 'Photo area', 'Custom menu'],
    price: 'From ₹3,499',
  },
];

const Social = () => {
  const navigate = useNavigate();

  const handleInquiry = (eventType: string) => {
    toast({
      title: "Inquiry Sent!",
      description: `We'll contact you soon about your ${eventType} event.`,
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
          <h1 className="text-foreground text-xl font-bold">Social Gatherings</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-56 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to top, hsl(var(--background)) 0%, transparent 50%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuD7qo7Squ5V1ZehiIvmbtKn6bBoztZWgnl317r63BMeoJ3vj04bhxWAL1GXA09-nXiJPoVMCRRF1sbnYJz580wZfQX3SjhPTDgdBkTMO1TgDkCy6e16Amesg3lw5z5l-A6lTKJKzJqPReFCxMq8l4NV2gv2x2a8KdHoUdjmv8uHsxPWMk25XKbFJZxG4Qhhd8bjHH8COyij4TXeVeLKMeaUBnhRMLyNxEu_6S9NQJdhmIVUueUBIdh-CWD2X8KHh4J6Y0MqfcfQ6YOA")`,
          }}
        />

        <div className="px-4 -mt-12 relative z-10">
          {/* Title Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl p-6 shadow-xl border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <PartyPopper className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">
                  Celebrate with Us
                </h2>
                <p className="text-muted-foreground text-sm">Make memories sweeter</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Whether it's a birthday bash, corporate event, or a casual get-together with friends, 
              House of Churros is the perfect venue to make your celebrations extra special.
            </p>
          </motion.div>

          {/* Event Types */}
          <div className="mt-6 space-y-4">
            {eventTypes.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-5 border border-border"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <event.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-bold text-foreground">{event.title}</h3>
                      <span className="text-sm font-semibold text-primary">{event.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                    <ul className="mt-3 grid grid-cols-2 gap-1">
                      {event.features.map((feature) => (
                        <li key={feature} className="text-xs text-muted-foreground flex items-center gap-1">
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => handleInquiry(event.title)}
                      variant="outline"
                      className="mt-4 w-full border-foreground text-foreground hover:bg-foreground hover:text-background"
                    >
                      Inquire Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 bg-card rounded-xl p-5 border border-border"
          >
            <h3 className="text-lg font-bold text-foreground mb-4">Get in Touch</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Have a custom requirement? We'd love to help you plan the perfect event.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <Phone className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">+91 98765 43210</span>
              </a>
              <a
                href="mailto:events@houseofchurros.in"
                className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <Mail className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">events@houseofchurros.in</span>
              </a>
            </div>
          </motion.div>

          {/* Book Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 mb-8"
          >
            <Button
              onClick={() => navigate('/booking')}
              className="w-full py-6 bg-foreground text-background hover:bg-foreground/90 text-lg font-bold rounded-xl flex items-center justify-center gap-2"
            >
              <Calendar className="h-5 w-5" />
              Book Your Event
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Social;
