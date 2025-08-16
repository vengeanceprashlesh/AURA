'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';

const CartSidePanel = () => {
  const { 
    items, 
    isOpen, 
    totalItems, 
    totalPrice, 
    closeCart, 
    removeItem, 
    updateQuantity,
    clearCart 
  } = useCartStore();

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const panelVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      }
    },
    exit: { 
      x: '100%',
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
      }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: {
        duration: 0.2,
      }
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeCart}
          />

          {/* Cart Panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl overflow-hidden"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-beige-200">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-5 w-5 text-dusty-rose-500" />
                  <h2 className="font-heading text-lg font-semibold text-charcoal-900">
                    Shopping Cart
                  </h2>
                  {totalItems > 0 && (
                    <span className="bg-dusty-rose-500 text-white text-xs px-2 py-1 rounded-full">
                      {totalItems}
                    </span>
                  )}
                </div>
                <motion.button
                  onClick={closeCart}
                  className="p-2 hover:bg-beige-100 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Cart Content */}
              <div className="flex-1 overflow-y-auto">
                {items.length === 0 ? (
                  /* Empty Cart */
                  <motion.div 
                    className="flex flex-col items-center justify-center h-full p-6 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="bg-beige-100 p-4 rounded-full mb-4">
                      <ShoppingBag className="h-8 w-8 text-charcoal-400" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-charcoal-900 mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-charcoal-600 mb-6">
                      Add some items to get started!
                    </p>
                    <motion.button
                      onClick={closeCart}
                      className="bg-dusty-rose-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-dusty-rose-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Continue Shopping
                    </motion.button>
                  </motion.div>
                ) : (
                  /* Cart Items */
                  <div className="p-6 space-y-6">
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          className="flex gap-4 pb-6 border-b border-beige-200 last:border-b-0"
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          layout
                        >
                          {/* Product Image */}
                          <div className="relative w-20 h-20 bg-beige-50 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-charcoal-900 truncate">
                                  {item.product.name}
                                </h3>
                                <p className="text-sm text-charcoal-600">
                                  {item.product.category}
                                </p>
                                
                                {/* Selected Options */}
                                <div className="flex items-center gap-4 mt-1 text-xs text-charcoal-500">
                                  {item.selectedSize && (
                                    <span>Size: {item.selectedSize}</span>
                                  )}
                                  {item.selectedColor && (
                                    <div className="flex items-center gap-1">
                                      <span>Color:</span>
                                      <div 
                                        className="w-3 h-3 rounded-full border border-charcoal-200"
                                        style={{ backgroundColor: item.selectedColor.value }}
                                      />
                                      <span>{item.selectedColor.name}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <motion.button
                                onClick={() => removeItem(item.id)}
                                className="p-1 hover:bg-red-50 hover:text-red-500 rounded transition-colors ml-2"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </motion.button>
                            </div>

                            {/* Quantity & Price */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center border border-charcoal-200 rounded-lg">
                                <motion.button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-1 hover:bg-beige-100 transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Minus className="h-3 w-3" />
                                </motion.button>
                                <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                                  {item.quantity}
                                </span>
                                <motion.button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 hover:bg-beige-100 transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Plus className="h-3 w-3" />
                                </motion.button>
                              </div>
                              
                              <div className="text-right">
                                <p className="font-semibold text-charcoal-900">
                                  {formatPrice(item.product.price * item.quantity)}
                                </p>
                                {item.quantity > 1 && (
                                  <p className="text-xs text-charcoal-500">
                                    {formatPrice(item.product.price)} each
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Clear Cart Button */}
                    {items.length > 0 && (
                      <motion.button
                        onClick={clearCart}
                        className="text-sm text-red-500 hover:text-red-600 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Clear all items
                      </motion.button>
                    )}
                  </div>
                )}
              </div>

              {/* Footer with Checkout */}
              {items.length > 0 && (
                <motion.div 
                  className="border-t border-beige-200 p-6 bg-beige-50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* Subtotal */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-charcoal-900">Subtotal</span>
                    <span className="font-heading text-xl font-bold text-charcoal-900">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  {/* Shipping Notice */}
                  <p className="text-xs text-charcoal-600 mb-4">
                    Shipping and taxes calculated at checkout
                  </p>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <motion.button
                      className="w-full bg-dusty-rose-500 text-white py-3 rounded-lg font-medium hover:bg-dusty-rose-600 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Checkout ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                    </motion.button>
                    
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        href="/cart"
                        className="block w-full text-center border border-dusty-rose-500 text-dusty-rose-500 py-3 rounded-lg font-medium hover:bg-dusty-rose-50 transition-colors"
                        onClick={closeCart}
                      >
                        View Cart
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </Fragment>
      )}
    </AnimatePresence>
  );
};

export default CartSidePanel;
