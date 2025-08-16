'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, CreditCard, Truck, Shield, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState<'shipping' | 'payment' | 'review' | 'complete'>('shipping');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  const shipping = totalPrice > 100 ? 0 : 10;
  const tax = totalPrice * 0.08; // 8% tax
  const finalTotal = totalPrice + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'shipping') {
      setStep('payment');
    } else if (step === 'payment') {
      setStep('review');
    } else if (step === 'review') {
      // Process payment here
      setStep('complete');
      clearCart();
    }
  };

  if (step === 'complete') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div 
          className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-2xl font-semibold text-black mb-4">Order Complete!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. You'll receive a confirmation email shortly.
          </p>
          <div className="space-y-3">
            <Link href="/account/orders" className="block w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              View Order Details
            </Link>
            <Link href="/" className="block w-full border border-black text-black py-3 rounded-lg font-medium hover:bg-black hover:text-white transition-colors">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-black mb-4">Your cart is empty</h1>
          <Link href="/" className="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Link href="/cart" className="flex items-center text-gray-600 hover:text-black transition-colors">
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to Cart
            </Link>
            <div className="flex-1 text-center">
              <h1 className="text-2xl font-light text-black">CHECKOUT</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center space-x-8">
            <div className={`flex items-center space-x-2 ${step === 'shipping' ? 'text-black' : step === 'payment' || step === 'review' ? 'text-green-500' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 'shipping' ? 'border-black bg-black text-white' : step === 'payment' || step === 'review' ? 'border-green-500 bg-green-500 text-white' : 'border-gray-400'}`}>
                1
              </div>
              <span className="text-sm font-medium">SHIPPING</span>
            </div>
            
            <div className={`w-16 h-px ${step === 'payment' || step === 'review' ? 'bg-green-500' : 'bg-gray-300'}`} />
            
            <div className={`flex items-center space-x-2 ${step === 'payment' ? 'text-black' : step === 'review' ? 'text-green-500' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 'payment' ? 'border-black bg-black text-white' : step === 'review' ? 'border-green-500 bg-green-500 text-white' : 'border-gray-400'}`}>
                2
              </div>
              <span className="text-sm font-medium">PAYMENT</span>
            </div>
            
            <div className={`w-16 h-px ${step === 'review' ? 'bg-green-500' : 'bg-gray-300'}`} />
            
            <div className={`flex items-center space-x-2 ${step === 'review' ? 'text-black' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 'review' ? 'border-black bg-black text-white' : 'border-gray-400'}`}>
                3
              </div>
              <span className="text-sm font-medium">REVIEW</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              {step === 'shipping' && (
                <>
                  <h2 className="text-xl font-semibold text-black">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      >
                        <option value="">Select State</option>
                        <option value="CA">California</option>
                        <option value="NY">New York</option>
                        <option value="TX">Texas</option>
                        {/* Add more states as needed */}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </>
              )}

              {step === 'payment' && (
                <>
                  <h2 className="text-xl font-semibold text-black">Payment Information</h2>
                  
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`flex-1 p-4 border-2 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                          paymentMethod === 'card' ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <CreditCard className="h-5 w-5" />
                        <span>Credit Card</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('paypal')}
                        className={`flex-1 p-4 border-2 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                          paymentMethod === 'paypal' ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <span>PayPal</span>
                      </button>
                    </div>

                    {paymentMethod === 'card' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required={paymentMethod === 'card'}
                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              required={paymentMethod === 'card'}
                              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                            <input
                              type="text"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              required={paymentMethod === 'card'}
                              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                              placeholder="123"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card</label>
                          <input
                            type="text"
                            name="nameOnCard"
                            value={formData.nameOnCard}
                            onChange={handleInputChange}
                            required={paymentMethod === 'card'}
                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}

              {step === 'review' && (
                <>
                  <h2 className="text-xl font-semibold text-black">Review Your Order</h2>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-black mb-2">Shipping Address</h3>
                      <p className="text-sm text-gray-600">
                        {formData.firstName} {formData.lastName}<br />
                        {formData.address}<br />
                        {formData.city}, {formData.state} {formData.zipCode}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-black mb-2">Payment Method</h3>
                      <p className="text-sm text-gray-600">
                        {paymentMethod === 'card' ? `Card ending in ${formData.cardNumber.slice(-4)}` : 'PayPal'}
                      </p>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        className="mr-3"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        I agree to the <Link href="/terms" className="text-black underline">Terms of Service</Link> and <Link href="/privacy" className="text-black underline">Privacy Policy</Link>
                      </label>
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-between pt-6 border-t">
                {step !== 'shipping' && (
                  <button
                    type="button"
                    onClick={() => {
                      if (step === 'payment') setStep('shipping');
                      if (step === 'review') setStep('payment');
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                )}
                
                <button
                  type="submit"
                  disabled={step === 'review' && !agreeToTerms}
                  className="ml-auto px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {step === 'shipping' ? 'Continue to Payment' : 
                   step === 'payment' ? 'Review Order' : 
                   'Complete Order'}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
            <h2 className="text-xl font-semibold text-black mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-black truncate">{item.product.name}</h3>
                    <p className="text-xs text-gray-500">
                      {item.selectedSize} • {item.selectedColor.name} • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-black">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-black">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-black">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="text-black">{formatPrice(tax)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg font-semibold">
                <span className="text-black">Total</span>
                <span className="text-black">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Truck className="h-4 w-4" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Secure SSL encrypted checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
