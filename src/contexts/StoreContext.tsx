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
  rating?: number;
  availability: string[]; // Location IDs where available
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  timings: string;
  priceModifier: number; // 1 = normal, 1.1 = 10% higher, etc.
}

export const locations: Location[] = [
  { id: 'balewadi', name: 'Balewadi', address: 'High Street, Balewadi', timings: '10:00 AM - 11:00 PM', priceModifier: 1 },
  { id: 'koregaon-park', name: 'Koregaon Park', address: 'Lane 5, Koregaon Park', timings: '10:00 AM - 12:00 AM', priceModifier: 1.1 },
  { id: 'nibm', name: 'Tribeca Highstreet NIBM', address: 'NIBM Road', timings: '11:00 AM - 11:00 PM', priceModifier: 1 },
  { id: 'kopa-mall', name: 'Kopa Mall', address: 'Phoenix Mall, Viman Nagar', timings: '10:00 AM - 10:00 PM', priceModifier: 1.05 },
  { id: 'hinjewadi', name: 'Hinjewadi', address: 'Phase 1, Hinjewadi', timings: '9:00 AM - 11:00 PM', priceModifier: 0.95 },
  { id: 'kothrud', name: 'Kothrud', address: 'Karve Road, Kothrud', timings: '10:00 AM - 10:30 PM', priceModifier: 1 },
];

export const menuItems: MenuItem[] = [
  // Bestsellers
  {
    id: '1',
    name: 'Classic Spanish',
    description: 'Crispy churros rolled in our signature cinnamon sugar blend.',
    price: 199,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3-OOUg6MfCYpYoRTKwLIaxhAjt9kumKCBBYo84m4tdiwrhcMWz8uFn2ka3RvpTvDOSujbQBH-FYXbMU1L4i6xTpazisL1QFZdRji-wkKahPb0lTZsw_oIGf0ywMeJ6C-E0g75u-zrg1bh3OrU_XnEqVg1L_C7q8y1V2uP0MzuPIE8KD8Sjhb1a5yxh_fBdIowi6C3DW7VdVpkwMNLEUp3r_JHHpe93_ALCXspi0MSOmsKDc2n8c-_4MfhwCaYCv9PRMOcnC6f-Hny',
    category: 'classics',
    isVeg: true,
    isBestseller: true,
    rating: 4.8,
    availability: ['balewadi', 'koregaon-park', 'nibm', 'kopa-mall', 'hinjewadi', 'kothrud'],
  },
  {
    id: '2',
    name: 'Nutella Stuffed Churro',
    description: 'Our bestseller! Warm, crispy dough filled with oozing warm Nutella chocolate.',
    price: 249,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCybPqvPSduaMWn3f1oPXYw3KIxPoof4S84-jtcqchiJYHfTnet8D-Hy8YlA08VM0M9jfQAh3N6AWTrnLc1GauxYVWLWS1qURZBNokMUjMigLaHEhoHLTZeRr_v_cam8tRI0AYTi_YAqXk5peO7ep0ed2MboSGQ7kxtQhAd-Osj0SGPtIkJqXR_nTUPmNfxut1luiPWeFbeAOZV1T3mBb4ryIbjHDcuit7ycG8as8Uczi58XOJC4jSCG_AAN8p_jREaGqMUV_FVy591',
    category: 'filled',
    isVeg: true,
    isBestseller: true,
    rating: 4.9,
    availability: ['koregaon-park', 'nibm', 'kopa-mall', 'kothrud'],
  },
  {
    id: '3',
    name: 'Choco Dip Combo',
    description: '6 pcs golden churros with rich dark chocolate dipping sauce.',
    price: 249,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7qo7Squ5V1ZehiIvmbtKn6bBoztZWgnl317r63BMeoJ3vj04bhxWAL1GXA09-nXiJPoVMCRRF1sbnYJz580wZfQX3SjhPTDgdBkTMO1TgDkCy6e16Amesg3lw5z5l-A6lTKJKzJqPReFCxMq8l4NV2gv2x2a8KdHoUdjmv8uHsxPWMk25XKbFJZxG4Qhhd8bjHH8COyij4TXeVeLKMeaUBnhRMLyNxEu_6S9NQJdhmIVUueUBIdh-CWD2X8KHh4J6Y0MqfcfQ6YOA',
    category: 'combos',
    isVeg: true,
    isBestseller: true,
    rating: 4.7,
    availability: ['balewadi', 'koregaon-park', 'nibm', 'kopa-mall', 'hinjewadi', 'kothrud'],
  },
  {
    id: '4',
    name: 'Spanish Latte',
    description: 'Rich espresso with sweetened condensed milk. Hot or Cold.',
    price: 149,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC26K9UHZ3uEQd1raRQxBzi87wKQbGwy6_AtZ-H8HlL1VH23084iDBzV2QL7aAVhCEjQVkYe8T2EaLuiT_ayoFwsLXHMT5x578NQ0YJ0x9nVWMx50J1K3o_wJRNaJkwzETMi99N5A914E_NP67RJCp3mMs5rv7A7m5IdME0xoLHFRooT0fJtMxrK3ciVnA8wyhbaJ_BWjgiMAJtKpKHSP1xDMjeAE00otmWLg27TxqApSw6dH7OUf9ueWBBX5w0Luw3LWFuu1SEJlDv',
    category: 'beverages',
    isVeg: true,
    isBestseller: true,
    rating: 4.6,
    availability: ['balewadi', 'koregaon-park', 'nibm', 'kopa-mall', 'hinjewadi', 'kothrud'],
  },
  {
    id: '5',
    name: 'Caramel Stuffed',
    description: 'Filled with authentic Argentine dulce de leche caramel.',
    price: 229,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDi-CROCPNm9UATfTWIaUS_OuqTPjgFbRStSzUY4GQgictmZch-9bsOOctpPXcRiD094oVkFatUQo7vht_n_cmG5GsETY4hQWNq1LIJaGimCR7B99oIx3jr_X4gx1C1cuVslQeXHDWSDE-qPe2s7pllXRrBvC0pjCNT-ZcPkwIEkSEMRs6_L2xlgK4B_Zj8JaI62jyytqnLYuCdDhDOvdI6dosyKn7009u5w810OcCAnmP_NwIwqw_YEXAJEHrtUxNG_IQ4aZPUDx_t',
    category: 'filled',
    isVeg: true,
    isNew: true,
    rating: 4.8,
    availability: ['koregaon-park', 'nibm', 'hinjewadi'],
  },
  {
    id: '6',
    name: 'Spanish Hot Chocolate',
    description: 'Thick, rich, and velvety. The traditional way to enjoy churros.',
    price: 199,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdaeWodHLOmICo19gBghkiJltDE1Y3wSjETVep1DRDfhX8WqJojEUBB3_JQrT4yaKKFZgfvi6VykU4LE9t9_E3Z5QoTBzJD3AElAiuD32CLXGY8QOnPGellTBIGFvNsiTuWcLNuCWerV4_MY7w50xkNT6GPCw19IGnHy9aYP6YNmncNjFWOaRITuOCD0LM1rIJSQUFWn6-dDnAdnrEZJWlrF_MM3pSDQaaAoRwKGG8DEdnGUSyh4JAojfe6mgNAskJm1nprRHGw9tl',
    category: 'beverages',
    isVeg: true,
    rating: 4.9,
    availability: ['balewadi', 'koregaon-park', 'nibm', 'kopa-mall', 'hinjewadi', 'kothrud'],
  },
  {
    id: '7',
    name: 'Glazed Churros',
    description: 'Golden churros coated in a sweet, sticky sugar glaze.',
    price: 169,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUpUAFJ9Mx8hExAFIrhVZAcGjFCSKW98L9HKBWOkdP8tfgKaHSuN9czvMhBwkEBJI3GlnFCM2uafSLuAQfSCeogEYa-VI7qyA7Qv2M38d6DUfpswKMaY9r5z8Xagu-bxwQ017UKfE60SliptJ9HuA4w92qmSAQF2jjgRJNpn_scDYRUZmTwqsSCbJm4LYq_bkZz6iMCdmSkoSMxCG8zuh5RSvLWSStFRptx5LhkOGOho7amtp2Fy6qznQN1kkb1OR-5wYA8LQQ64oD',
    category: 'classics',
    isVeg: true,
    availability: ['balewadi', 'koregaon-park', 'nibm', 'kopa-mall', 'kothrud'],
  },
  {
    id: '8',
    name: 'Dark Chocolate Bomb',
    description: '70% dark chocolate ganache filling for true chocolate lovers.',
    price: 239,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxAt4HPhOeSt9eX3bn0Cu6dXNvhENDr_dbmK9o9P64-WrPur7UJZBcWybIC3jaz_nz0fQpbz1ech18ao__v9ChPxIKkAVWj0rRY4_movgEz8p6zrP1o3yIJmhHB9ElKco9L4TvIGXutO7wpaTBp0-Q98OCBQF3dUWi1A5T-D4azTtjV-b2krkpW9_UIOCkgh7WGxOONwvm6a3P0YnM9C5lI55H_vg1iGV-gZEYTqLqTTYya6gPcAwck9XXZwaEHf1uqg-jt5bXLgsP',
    category: 'filled',
    isVeg: true,
    availability: ['koregaon-park', 'nibm', 'kopa-mall'],
  },
  // Dips
  {
    id: '9',
    name: 'Dark Chocolate Dip',
    description: 'Rich 60% dark chocolate dipping sauce.',
    price: 49,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCjgtVjgS5xjnKFOYoSzd-7nX_GuotmG-ihMZ4eGfiQaj3VLWxwAJIzO6yCjRNv-ZYZnDpsS4_3dJUgYGD_CCYVWVY1Lc6PeGeHMAuL5moj41yUTTRXuq5hfEmXEcO_JcdJ-7YHgYb9i1XIPY308Yp-JElFTIIo3_J6QAThB1l0BSmUqjR50IH6ZDQU3lGD0wKuGUiUXisFY5PVV9UVlB18YDmukrtMGDLSQ-OOEfwmG_2VGqpgW_uNcnQPc9SnPn7erJbwHOQun4l',
    category: 'dips',
    isVeg: true,
    availability: ['balewadi', 'koregaon-park', 'nibm', 'kopa-mall', 'hinjewadi', 'kothrud'],
  },
  {
    id: '10',
    name: 'Berry Compote Dip',
    description: 'Sweet and tangy mixed berry sauce.',
    price: 59,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDi4Qv-CjOLJhhpgQxNWKCr_e7xAJYsL93C6l1m2LNPGBtJnLSwyB2f6NXm4rg6VHs-igTnBShcwJxN1sxsgtKs1za6Ta8Gw4b_SjjFTp9XGnsg2mLGttp4eY7Iout8kusOlkUseZILmmoGpi4A3d3emn8G4irxaDE9zjImWJeeIZ95rgK0q5TIUfb0oxFfo-ie0GJEyNMnXx-HVmwoDXy1RazpHaxN3j9cKc7ZmTdLru3nqyu-rVm1OL3RUAckj3qKixDxJ6RQrRjK',
    category: 'dips',
    isVeg: true,
    isNew: true,
    availability: ['koregaon-park', 'nibm', 'kothrud'],
  },
];

export const offers = [
  {
    id: '1',
    title: '20% OFF on First Order',
    description: 'Use code CHURRO20 for 20% off your first order!',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2Y9EHpbcYXj8GQ3NQtyJEEd_eqZSg41JrFTD9GbSbjyIm59I0gqXUEApwj3tpryIO21O1-U-VZw4ei0D0cuOKR1LKcl6HK6kyRxncPE-J38TgleyZiL03poyNOaaqQpbw0CgwROcOeOhIp2I_veZ9i-aIWV-EGTkxiBgNZTtBb8PsVgVOYLFpZBS-VfokNAAO7d4AAWhCk6ns_B1fdXJqKp_yBqLveh9AEn3aHfz38QKQwq7f6BabkXitApseQOJLGRf4EcsdrST3',
    badge: 'Limited Time',
    linkedItem: '2',
  },
  {
    id: '2',
    title: 'Combo Deal: Churros + Latte',
    description: 'Get a Spanish Latte FREE with any stuffed churro!',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsRpIUREkEniioyGFJ1qVwACZp4pi6QL_cQIQULgf3gvzBIbw5H32kC1XiHOf18AYQmpSwzJCuR6IDPLwdhYInB2hIMPgQYcZCmuQ2WacL77xKipIfFt7MJ0eYvFs2MBN_UUhH2j0gnGt9KLO0x8H0_iZ1s8RqC0SlN38cJRj06o14mdYE-W9ERXGfjIEjI1uNvw5oiM89ofLXHn1rlyI1n8E171eSyJzYZxFI6aCjHuu9Ekaex8flCzGo8Cyr9RsOhqQ3ucxAZcnL',
    badge: 'New',
    linkedItem: '5',
  },
];

interface StoreContextType {
  selectedLocation: Location;
  setSelectedLocation: (location: Location) => void;
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  getAdjustedPrice: (basePrice: number) => number;
  getAvailableItems: () => MenuItem[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location>(locations[1]); // Default to Koregaon Park
  const [cart, setCart] = useState<CartItem[]>([]);

  const getAdjustedPrice = (basePrice: number): number => {
    return Math.round(basePrice * selectedLocation.priceModifier);
  };

  const getAvailableItems = (): MenuItem[] => {
    return menuItems.filter(item => item.availability.includes(selectedLocation.id));
  };

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
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
    return cart.reduce((total, item) => total + getAdjustedPrice(item.price) * item.quantity, 0);
  };

  const getCartCount = (): number => {
    return cart.reduce((count, item) => count + item.quantity, 0);
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
        getAdjustedPrice,
        getAvailableItems,
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
