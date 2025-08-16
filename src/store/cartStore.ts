import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: {
    name: string;
    value: string;
    available: boolean;
  };
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
}

interface CartActions {
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

type CartStore = CartState & CartActions;

// Helper function to calculate totals
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  return { totalItems, totalPrice };
};

// Helper function to generate unique cart item ID
const generateCartItemId = (productId: string, size?: string, color?: string) => {
  return `${productId}-${size || 'no-size'}-${color || 'no-color'}`;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      isOpen: false,
      totalItems: 0,
      totalPrice: 0,

      // Actions
      addItem: (newItem) => {
        set((state) => {
          const cartItemId = generateCartItemId(
            newItem.product.id,
            newItem.selectedSize,
            newItem.selectedColor?.name
          );

          // Check if item already exists in cart
          const existingItemIndex = state.items.findIndex(item => item.id === cartItemId);

          let updatedItems: CartItem[];

          if (existingItemIndex >= 0) {
            // Update quantity if item exists
            updatedItems = state.items.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            );
          } else {
            // Add new item
            const cartItem: CartItem = {
              ...newItem,
              id: cartItemId,
            };
            updatedItems = [...state.items, cartItem];
          }

          const { totalItems, totalPrice } = calculateTotals(updatedItems);

          return {
            items: updatedItems,
            totalItems,
            totalPrice,
            isOpen: true, // Open cart when item is added
          };
        });
      },

      removeItem: (id) => {
        set((state) => {
          const updatedItems = state.items.filter(item => item.id !== id);
          const { totalItems, totalPrice } = calculateTotals(updatedItems);

          return {
            items: updatedItems,
            totalItems,
            totalPrice,
          };
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => {
          const updatedItems = state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          );
          const { totalItems, totalPrice } = calculateTotals(updatedItems);

          return {
            items: updatedItems,
            totalItems,
            totalPrice,
          };
        });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
          isOpen: false,
        });
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },
    }),
    {
      name: 'aura-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
      }),
    }
  )
);
