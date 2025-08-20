'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { Product } from '@/types';

interface WishlistState {
  items: Product[];
  totalItems: number;
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'LOAD_WISHLIST'; payload: WishlistState };

const initialState: WishlistState = {
  items: [],
  totalItems: 0,
};

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return state; // Item already in wishlist
      }

      const newItems = [...state.items, action.payload];
      
      return {
        ...state,
        items: newItems,
        totalItems: newItems.length,
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload.id);
      
      return {
        ...state,
        items: newItems,
        totalItems: newItems.length,
      };
    }

    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: [],
        totalItems: 0,
      };

    case 'LOAD_WISHLIST':
      return action.payload;

    default:
      return state;
  }
}

interface WishlistContextType extends WishlistState {
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
  toggleItem: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('aura-wishlist');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        dispatch({ type: 'LOAD_WISHLIST', payload: parsedWishlist });
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('aura-wishlist', JSON.stringify(state));
  }, [state]);

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (id: string) => {
    return state.items.some(item => item.id === id);
  };

  const toggleItem = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  const contextValue: WishlistContextType = {
    ...state,
    addItem,
    removeItem,
    clearWishlist,
    isInWishlist,
    toggleItem,
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
