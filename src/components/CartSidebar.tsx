'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function CartSidebar() {
  const { 
    items, 
    totalItems, 
    totalPrice, 
    isOpen, 
    closeCart, 
    removeItem, 
    updateQuantity 
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeCart}
      />
      
      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Shopping Cart ({totalItems})
            </h2>
            <button
              onClick={closeCart}
              className="rounded-full p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some items to get started</p>
                <button
                  onClick={closeCart}
                  className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-gray-50 rounded-lg p-4">
                    {/* Product Image */}
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={(item.product.images && item.product.images[0]) || 'https://placehold.co/80x80?text=No+Image'}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                        unoptimized={(item.product.images && item.product.images[0]) ? false : true}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                        {item.product.name}
                      </h3>
                      
                      {item.selectedSize && (
                        <p className="text-xs text-gray-500 mb-2">Size: {item.selectedSize}</p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-900">
                          ${item.product.price}
                        </span>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded border border-gray-300 hover:bg-gray-100"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stockQuantity}
                            className="p-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-600">
                          Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t px-6 py-4 space-y-4">
              {/* Total */}
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              {/* Checkout Button */}
              <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Proceed to Checkout
              </button>
              
              <button
                onClick={closeCart}
                className="w-full border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
