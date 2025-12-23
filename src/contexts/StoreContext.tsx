import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  isExclusive?: boolean;
  rating?: number;
  availability: string[];
  remainingStock?: number;
  ingredients?: string[];
  macros?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  images?: string[];
  variants?: { name: string; price: number }[];
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedVariant?: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  timings: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Booking {
  id: string;
  type: 'table' | 'social';
  date: string;
  time: string;
  guests: number;
  location: string;
  eventType?: string;
}

export interface OrderHistory {
  id: string;
  date: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  location: string;
}

export const locations: Location[] = [
  { id: 'balewadi', name: 'Balewadi', address: 'High Street, Balewadi', timings: '10:00 AM - 11:00 PM' },
  { id: 'koregaon-park', name: 'Koregaon Park', address: 'Lane 5, Koregaon Park', timings: '10:00 AM - 12:00 AM' },
  { id: 'nibm', name: 'Tribeca Highstreet NIBM', address: 'NIBM Road', timings: '11:00 AM - 11:00 PM' },
  { id: 'kopa-mall', name: 'Kopa Mall', address: 'Phoenix Mall, Viman Nagar', timings: '10:00 AM - 10:00 PM' },
  { id: 'hinjewadi', name: 'Hinjewadi', address: 'Phase 1, Hinjewadi', timings: '9:00 AM - 11:00 PM' },
  { id: 'kothrud', name: 'Kothrud', address: 'Karve Road, Kothrud', timings: '10:00 AM - 10:30 PM' },
];

export const menuItems: MenuItem[] = [
  // Churros
  {
    id: 'churros-3',
    name: 'Churros (3 Pieces)',
    description: 'Golden, ridged Spanish churros: crispy choux pastries rolled in cinnamon sugar and served with rich hot chocolate for dipping. A beloved street food.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1624371414361-e670edf4898d?w=400',
    category: 'churros',
    isVeg: true,
    isBestseller: true,
    rating: 4.8,
    availability: ['balewadi', 'koregaon-park', 'nibm', 'kopa-mall', 'hinjewadi', 'kothrud'],
    ingredients: ['Flour', 'Sugar', 'Cinnamon', 'Butter', 'Eggs', 'Salt'],
    macros: { calories: 280, protein: 4, carbs: 38, fat: 12 },
    images: ['https://images.unsplash.com/photo-1624371414361-e670edf4898d?w=800', 'https://images.unsplash.com/photo-1626198226928-95884e0ab5b1?w=800'],
  },
  {
    id: 'churros-5',
    name: 'Churros (5 Pieces)',
    description: 'Golden, ridged Spanish churros: crispy choux pastries rolled in cinnamon sugar and served with rich hot chocolate for dipping. A beloved street food.',
    price: 190,
    image: 'https://images.unsplash.com/photo-1624371414361-e670edf4898d?w=400',
    category: 'churros',
    isVeg: true,
    rating: 4.8,
    availability: ['balewadi', 'koregaon-park', 'nibm', 'kopa-mall', 'hinjewadi', 'kothrud'],
    ingredients: ['Flour', 'Sugar', 'Cinnamon', 'Butter', 'Eggs', 'Salt'],
    macros: { calories: 460, protein: 7, carbs: 63, fat: 20 },
    images: ['https://images.unsplash.com/photo-1624371414361-e670edf4898d?w=800'],
  },
  {
    id: 'churros-12',
    name: 'Churros (12 Pieces)',
    description: 'Golden, ridged Spanish churros: crispy choux pastries rolled in cinnamon sugar and served with rich hot chocolate for dipping. A beloved street food.',
    price: 380,
    image: 'https://images.unsplash.com/photo-1624371414361-e670edf4898d?w=400',
    category: 'churros',
    isVeg: true,
    rating: 4.8,
    availability: ['koregaon-park', 'nibm', 'kopa-mall', 'kothrud'],
    ingredients: ['Flour', 'Sugar', 'Cinnamon', 'Butter', 'Eggs', 'Salt'],
    macros: { calories: 1120, protein: 16, carbs: 152, fat: 48 },
    images: ['https://images.unsplash.com/photo-1624371414361-e670edf4898d?w=800'],
  },
  // Porras
  {
    id: 'porras-3',
    name: 'Porras (3 Pieces)',
    description: 'Traditional porras are thicker, fluffier Spanish fritters, golden and crispy outside, and pillowy soft inside. They\'re often dusted with sugar and served with hot chocolate.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1626198226928-95884e0ab5b1?w=400',
    category: 'porras',
    isVeg: true,
    isBestseller: true,
    rating: 4.7,
    availability: ['balewadi', 'koregaon-park', 'nibm', 'hinjewadi', 'kothrud'],
    ingredients: ['Flour', 'Sugar', 'Yeast', 'Salt', 'Water'],
    macros: { calories: 320, protein: 5, carbs: 45, fat: 14 },
    images: ['https://images.unsplash.com/photo-1626198226928-95884e0ab5b1?w=800'],
  },
  {
    id: 'porras-5',
    name: 'Porras (5 Pieces)',
    description: 'Traditional porras are thicker, fluffier Spanish fritters, golden and crispy outside, and pillowy soft inside. They\'re often dusted with sugar and served with hot chocolate.',
    price: 190,
    image: 'https://images.unsplash.com/photo-1626198226928-95884e0ab5b1?w=400',
    category: 'porras',
    isVeg: true,
    rating: 4.7,
    availability: ['balewadi', 'koregaon-park', 'nibm', 'kopa-mall', 'hinjewadi', 'kothrud'],
    ingredients: ['Flour', 'Sugar', 'Yeast', 'Salt', 'Water'],
    macros: { calories: 530, protein: 8, carbs: 75, fat: 23 },
    images: ['https://images.unsplash.com/photo-1626198226928-95884e0ab5b1?w=800'],
  },
  {
    id: 'porras-12',
    name: 'Porras (12 Pieces)',
    description: 'Traditional porras are thicker, fluffier Spanish fritters, golden and crispy outside, and pillowy soft inside. They\'re often dusted with sugar and served with hot chocolate.',
    price: 380,
    image: 'https://images.unsplash.com/photo-1626198226928-95884e0ab5b1?w=400',
    category: 'porras',
    isVeg: true,
    rating: 4.7,
    availability: ['koregaon-park', 'nibm', 'kothrud'],
    ingredients: ['Flour', 'Sugar', 'Yeast', 'Salt', 'Water'],
    macros: { calories: 1280, protein: 20, carbs: 180, fat: 56 },
    images: ['https://images.unsplash.com/photo-1626198226928-95884e0ab5b1?w=800'],
  },
  // Churro Dog
  {
    id: 'churro-dog',
    name: 'Churro Dog',
    description: 'Crispy hollow churro filled with a plant-based, protein-rich savoury veg roll. Served with ketchup and mustard.',
    price: 225,
    image: 'https://images.unsplash.com/photo-1619740455993-9d701c5e8b9e?w=400',
    category: 'specials',
    isVeg: true,
    isNew: true,
    isBestseller: true,
    rating: 4.9,
    availability: ['koregaon-park', 'nibm', 'kopa-mall', 'kothrud'],
    ingredients: ['Churro dough', 'Plant-based filling', 'Spices', 'Ketchup', 'Mustard'],
    macros: { calories: 380, protein: 12, carbs: 42, fat: 18 },
    images: ['https://images.unsplash.com/photo-1619740455993-9d701c5e8b9e?w=800'],
  },
  // Papas Locas
  {
    id: 'papas-locas',
    name: 'Papas Locas',
    description: 'Spanish fries served with ketchup and mayo. The perfect savory companion to your churros.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
    category: 'sides',
    isVeg: true,
    rating: 4.5,
    availability: ['balewadi', 'koregaon-park', 'nibm', 'kopa-mall', 'hinjewadi', 'kothrud'],
    ingredients: ['Potatoes', 'Salt', 'Oil', 'Ketchup', 'Mayonnaise'],
    macros: { calories: 320, protein: 4, carbs: 42, fat: 16 },
    images: ['https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800'],
    variants: [
      { name: 'Salted', price: 100 },
      { name: 'Paprika', price: 120 },
    ],
  },
  // Extra Dips
  {
    id: 'dip-dark-chocolate',
    name: 'Dark Chocolate Dip',
    description: 'Rich 60% dark chocolate dipping sauce.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400',
    category: 'dips',
    isVeg: true,
    rating: 4.8,
    availability: ['balewadi', 'koregaon-park', 'nibm', 'kopa-mall', 'hinjewadi', 'kothrud'],
    ingredients: ['Dark chocolate 60%', 'Cream', 'Butter'],
    macros: { calories: 120, protein: 2, carbs: 14, fat: 7 },
    images: ['https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800'],
  },
  {
    id: 'dip-hazelnut',
    name: 'Chocolate Hazelnut Dip',
    description: 'Creamy chocolate hazelnut sauce for dipping.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400',
    category: 'dips',
    isVeg: true,
    rating: 4.9,
    availability: ['balewadi', 'koregaon-park', 'nibm', 'kopa-mall', 'hinjewadi', 'kothrud'],
    ingredients: ['Hazelnuts', 'Chocolate', 'Cream', 'Sugar'],
    macros: { calories: 140, protein: 3, carbs: 12, fat: 9 },
    images: ['https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800'],
  },
  // Chocolates
  {
    id: 'suizo-chocolate',
    name: 'Suizo Chocolate',
    description: 'Premium Swiss-style hot chocolate, thick and creamy.',
    price: 230,
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400',
    category: 'hot-beverages',
    isVeg: true,
    isBestseller: true,
    rating: 4.9,
    availability: ['koregaon-park', 'nibm', 'kopa-mall', 'kothrud'],
    isExclusive: true,
    remainingStock: 15,
    ingredients: ['Swiss chocolate', 'Milk', 'Cream', 'Sugar'],
    macros: { calories: 280, protein: 6, carbs: 32, fat: 14 },
    images: ['https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=800'],
  },
  {
    id: 'hot-chocolate',
    name: 'Hot Chocolate',
    description: 'Classic Spanish hot chocolate, perfect for dipping churros.',
    price: 190,
    image: 'https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=400',
    category: 'hot-beverages',
    isVeg: true,
    rating: 4.7,
    availability: ['balewadi', 'koregaon-park', 'nibm', 'kopa-mall', 'hinjewadi', 'kothrud'],
    ingredients: ['Chocolate', 'Milk', 'Sugar', 'Cornstarch'],
    macros: { calories: 220, protein: 5, carbs: 28, fat: 10 },
    images: ['https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=800'],
  },
  // Hot Beverages
  {
    id: 'cortado',
    name: 'Cortado',
    description: 'Espresso cut with a small amount of warm milk.',
    price: 200,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
    category: 'hot-beverages',
    isVeg: true,
    rating: 4.6,
    availability: ['koregaon-park', 'nibm', 'kopa-mall', 'kothrud'],
    ingredients: ['Espresso', 'Steamed milk'],
    macros: { calories: 60, protein: 3, carbs: 5, fat: 3 },
    images: ['https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800'],
  },
  {
    id: 'matcha-tea',
    name: 'Matcha Tea',
    description: 'Premium Japanese matcha, whisked to perfection.',
    price: 250,
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400',
    category: 'hot-beverages',
    isVeg: true,
    rating: 4.5,
    availability: ['koregaon-park', 'nibm', 'kothrud'],
    ingredients: ['Japanese matcha powder', 'Hot water', 'Milk'],
    macros: { calories: 80, protein: 2, carbs: 8, fat: 4 },
    images: ['https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800'],
  },
  {
    id: 'latte',
    name: 'Latte',
    description: 'Smooth espresso with steamed milk and a light foam.',
    price: 220,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
    category: 'hot-beverages',
    isVeg: true,
    rating: 4.6,
    availability: ['balewadi', 'koregaon-park', 'nibm', 'kopa-mall', 'hinjewadi', 'kothrud'],
    ingredients: ['Espresso', 'Steamed milk', 'Foam'],
    macros: { calories: 120, protein: 6, carbs: 10, fat: 6 },
    images: ['https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800'],
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Equal parts espresso, steamed milk, and foam.',
    price: 220,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
    category: 'hot-beverages',
    isVeg: true,
    rating: 4.7,
    availability: ['balewadi', 'koregaon-park', 'nibm', 'kopa-mall', 'hinjewadi', 'kothrud'],
    ingredients: ['Espresso', 'Steamed milk', 'Milk foam'],
    macros: { calories: 100, protein: 5, carbs: 8, fat: 5 },
    images: ['https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800'],
  },
  {
    id: 'americano',
    name: 'Americano',
    description: 'Espresso diluted with hot water for a smooth, rich taste.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400',
    category: 'hot-beverages',
    isVeg: true,
    rating: 4.4,
    availability: ['balewadi', 'koregaon-park', 'nibm', 'kopa-mall', 'hinjewadi', 'kothrud'],
    ingredients: ['Espresso', 'Hot water'],
    macros: { calories: 15, protein: 1, carbs: 2, fat: 0 },
    images: ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800'],
  },
  {
    id: 'espresso',
    name: 'Espresso',
    description: 'Strong, concentrated coffee shot.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400',
    category: 'hot-beverages',
    isVeg: true,
    rating: 4.5,
    availability: ['balewadi', 'koregaon-park', 'nibm', 'kopa-mall', 'hinjewadi', 'kothrud'],
    ingredients: ['Espresso beans'],
    macros: { calories: 5, protein: 0, carbs: 1, fat: 0 },
    images: ['https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800'],
  },
  // Cold Beverages
  {
    id: 'affogato',
    name: 'Affogato',
    description: 'Vanilla ice cream drowned in a shot of hot espresso.',
    price: 230,
    image: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=400',
    category: 'cold-beverages',
    isVeg: true,
    isBestseller: true,
    rating: 4.9,
    availability: ['koregaon-park', 'nibm', 'kopa-mall', 'kothrud'],
    ingredients: ['Vanilla ice cream', 'Espresso'],
    macros: { calories: 180, protein: 3, carbs: 22, fat: 9 },
    images: ['https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=800'],
  },
  {
    id: 'iced-matcha',
    name: 'Iced Matcha',
    description: 'Chilled matcha latte with oat or regular milk.',
    price: 250,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400',
    category: 'cold-beverages',
    isVeg: true,
    rating: 4.6,
    availability: ['koregaon-park', 'nibm', 'kothrud'],
    ingredients: ['Matcha powder', 'Milk', 'Ice'],
    macros: { calories: 100, protein: 3, carbs: 12, fat: 4 },
    images: ['https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800'],
  },
  {
    id: 'classic-cold-coffee',
    name: 'Classic Cold Coffee',
    description: 'Chilled blended coffee with milk and ice.',
    price: 220,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400',
    category: 'cold-beverages',
    isVeg: true,
    rating: 4.5,
    availability: ['balewadi', 'koregaon-park', 'nibm', 'kopa-mall', 'hinjewadi', 'kothrud'],
    ingredients: ['Coffee', 'Milk', 'Sugar', 'Ice'],
    macros: { calories: 160, protein: 4, carbs: 24, fat: 6 },
    images: ['https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800'],
  },
  {
    id: 'iced-americano',
    name: 'Iced Americano',
    description: 'Chilled espresso with cold water and ice.',
    price: 200,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400',
    category: 'cold-beverages',
    isVeg: true,
    rating: 4.4,
    availability: ['balewadi', 'koregaon-park', 'nibm', 'kopa-mall', 'hinjewadi', 'kothrud'],
    ingredients: ['Espresso', 'Cold water', 'Ice'],
    macros: { calories: 15, protein: 1, carbs: 2, fat: 0 },
    images: ['https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800'],
  },
  {
    id: 'frappuccino',
    name: 'Frappuccino',
    description: 'Blended iced coffee available in caramel, vanilla, hazelnut, or Irish flavors.',
    price: 240,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
    category: 'cold-beverages',
    isVeg: true,
    rating: 4.7,
    availability: ['koregaon-park', 'nibm', 'kopa-mall', 'kothrud'],
    ingredients: ['Coffee', 'Milk', 'Ice', 'Flavor syrup', 'Whipped cream'],
    macros: { calories: 280, protein: 4, carbs: 42, fat: 10 },
    images: ['https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800'],
    variants: [
      { name: 'Caramel', price: 240 },
      { name: 'Vanilla', price: 240 },
      { name: 'Hazelnut', price: 240 },
      { name: 'Irish', price: 240 },
    ],
  },
  {
    id: 'iced-latte',
    name: 'Iced Latte',
    description: 'Chilled espresso with cold milk over ice.',
    price: 220,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
    category: 'cold-beverages',
    isVeg: true,
    rating: 4.6,
    availability: ['balewadi', 'koregaon-park', 'nibm', 'kopa-mall', 'hinjewadi', 'kothrud'],
    ingredients: ['Espresso', 'Cold milk', 'Ice'],
    macros: { calories: 100, protein: 5, carbs: 8, fat: 5 },
    images: ['https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800'],
  },
  {
    id: 'iced-cafe-mocha',
    name: 'Iced Cafe Mocha',
    description: 'Chilled espresso with chocolate and milk.',
    price: 240,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400',
    category: 'cold-beverages',
    isVeg: true,
    rating: 4.7,
    availability: ['koregaon-park', 'nibm', 'kopa-mall', 'kothrud'],
    ingredients: ['Espresso', 'Chocolate syrup', 'Milk', 'Ice'],
    macros: { calories: 200, protein: 5, carbs: 28, fat: 8 },
    images: ['https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800'],
  },
  {
    id: 'cold-chocolate',
    name: 'Cold Chocolate',
    description: 'Chilled chocolate milk, rich and creamy.',
    price: 240,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400',
    category: 'cold-beverages',
    isVeg: true,
    rating: 4.8,
    availability: ['balewadi', 'koregaon-park', 'nibm', 'kopa-mall', 'hinjewadi', 'kothrud'],
    ingredients: ['Chocolate', 'Milk', 'Ice', 'Cream'],
    macros: { calories: 260, protein: 6, carbs: 34, fat: 12 },
    images: ['https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800'],
  },
];

export const offers = [
  {
    id: '1',
    title: '20% OFF on First Order',
    description: 'Use code CHURRO20 for 20% off your first order!',
    image: 'https://images.unsplash.com/photo-1624371414361-e670edf4898d?w=600',
    badge: 'Limited Time',
    linkedItem: 'churros-3',
  },
  {
    id: '2',
    title: 'Combo Deal: Churros + Hot Chocolate',
    description: 'Get Hot Chocolate at ₹150 with any churros order!',
    image: 'https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=600',
    badge: 'New',
    linkedItem: 'hot-chocolate',
  },
];

interface StoreContextType {
  selectedLocation: Location;
  setSelectedLocation: (location: Location) => void;
  cart: CartItem[];
  addToCart: (item: MenuItem, variant?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  getAvailableItems: () => MenuItem[];
  // Auth
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  // Bookings
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id'>) => void;
  // Order History
  orderHistory: OrderHistory[];
  addOrder: (order: Omit<OrderHistory, 'id'>) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location>(locations[1]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([]);

  const getAvailableItems = (): MenuItem[] => {
    return menuItems.filter(item => item.availability.includes(selectedLocation.id));
  };

  const addToCart = (item: MenuItem, variant?: string) => {
    const cartKey = variant ? `${item.id}-${variant}` : item.id;
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => 
        variant ? `${cartItem.id}-${cartItem.selectedVariant}` === cartKey : cartItem.id === item.id
      );
      if (existingItem) {
        return prevCart.map(cartItem =>
          (variant ? `${cartItem.id}-${cartItem.selectedVariant}` === cartKey : cartItem.id === item.id)
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1, selectedVariant: variant }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = (): number => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = (): number => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const addBooking = (booking: Omit<Booking, 'id'>) => {
    setBookings(prev => [...prev, { ...booking, id: Date.now().toString() }]);
  };

  const addOrder = (order: Omit<OrderHistory, 'id'>) => {
    setOrderHistory(prev => [...prev, { ...order, id: Date.now().toString() }]);
  };

  return (
    <StoreContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        getAvailableItems,
        user,
        setUser,
        isAuthenticated: !!user,
        bookings,
        addBooking,
        orderHistory,
        addOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
