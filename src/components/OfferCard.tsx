import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface OfferCardProps {
  offer: {
    id: string;
    title: string;
    description: string;
    image: string;
    badge: string;
    linkedItem: string;
  };
}

const OfferCard = ({ offer }: OfferCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/menu?item=${offer.linkedItem}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="relative flex min-h-[320px] flex-col gap-4 overflow-hidden rounded-2xl bg-cover bg-center p-6 shadow-xl border border-border justify-end cursor-pointer"
      style={{
        backgroundImage: `linear-gradient(to top, hsl(var(--background) / 0.95) 0%, hsl(var(--background) / 0.4) 50%, hsl(0 0% 0% / 0.3) 100%), url("${offer.image}")`,
      }}
    >
      <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm shadow-md">
        {offer.badge}
      </div>
      <div className="flex flex-col gap-2 text-left z-10">
        <h3 className="text-foreground text-2xl font-black leading-tight drop-shadow-sm">
          {offer.title}
        </h3>
        <p className="text-foreground/90 text-sm font-medium leading-normal max-w-[90%]">
          {offer.description}
        </p>
        <div className="pt-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 rounded-xl h-10 px-6 bg-foreground text-background text-sm font-bold shadow-lg hover:bg-foreground/90 transition-colors"
          >
            View Offer
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default OfferCard;
