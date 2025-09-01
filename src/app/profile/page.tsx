'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  Heart, 
  ShoppingBag, 
  Settings, 
  Crown, 
  Sparkles, 
  Gift, 
  Star,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Edit3,
  Camera,
  Award,
  Zap,
  Trash2,
  Plus,
  Check,
  X
} from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useRewards } from '@/contexts/RewardsContext';
import { useCart } from '@/contexts/CartContext';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('orders');
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Emma',
    email: 'emma@example.com',
    phone: '+1 (555) 123-4567',
    birthday: '1995-08-20',
    address: '123 Fashion Ave, Style City, SC 12345'
  });
  const [originalProfile, setOriginalProfile] = useState({
    name: 'Emma',
    email: 'emma@example.com',
    phone: '+1 (555) 123-4567',
    birthday: '1995-08-20',
    address: '123 Fashion Ave, Style City, SC 12345'
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false
  });
  const [isSaving, setIsSaving] = useState(false);
  
  const { items: wishlistItems, removeItem: removeFromWishlist, totalItems: wishlistCount } = useWishlist();
  const { points, level, achievements, availableRewards, redeemReward, canRedeemReward } = useRewards();
  const { addItem: addToCart } = useCart();

  // Save function that simulates API call
  const handleSaveChanges = async () => {
    setIsSaving(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update the original profile to match current changes
    setOriginalProfile({ ...userProfile });
    
    // Exit edit mode
    setIsEditing(false);
    setIsSaving(false);
    
    // You could add a toast notification here
    console.log('Profile saved successfully!');
  };

  // Cancel function to revert changes
  const handleCancelEdit = () => {
    setUserProfile({ ...originalProfile });
    setIsEditing(false);
  };

  // Start editing function
  const handleStartEdit = () => {
    setOriginalProfile({ ...userProfile });
    setIsEditing(true);
  };

  // Toggle preferences
  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const tabs = [
    { id: 'orders', label: 'My Orders', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const allOrders = [
    {
      id: 'ORD001',
      date: '2025-08-15',
      status: 'Delivered',
      total: 89.99,
      items: 2,
      trackingNumber: 'TRK123456789',
      deliveredAt: '2025-08-17',
      products: [
        { name: 'Summer Floral Dress', price: 59.99, quantity: 1 },
        { name: 'Canvas Tote Bag', price: 29.99, quantity: 1 }
      ],
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100&h=100&fit=crop'
    },
    {
      id: 'ORD002',
      date: '2025-08-10',
      status: 'In Transit',
      total: 156.50,
      items: 3,
      trackingNumber: 'TRK987654321',
      estimatedDelivery: '2025-09-03',
      products: [
        { name: 'Bohemian Maxi Skirt', price: 79.99, quantity: 1 },
        { name: 'Vintage Denim Jacket', price: 65.50, quantity: 1 },
        { name: 'Gold Statement Earrings', price: 11.01, quantity: 1 }
      ],
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=100&h=100&fit=crop'
    },
    {
      id: 'ORD003',
      date: '2025-07-28',
      status: 'Delivered',
      total: 234.75,
      items: 4,
      trackingNumber: 'TRK456789123',
      deliveredAt: '2025-08-01',
      products: [
        { name: 'Silk Blouse', price: 89.99, quantity: 1 },
        { name: 'High-waisted Trousers', price: 79.99, quantity: 1 },
        { name: 'Leather Belt', price: 45.99, quantity: 1 },
        { name: 'Pearl Necklace', price: 18.78, quantity: 1 }
      ],
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=100&h=100&fit=crop'
    },
    {
      id: 'ORD004',
      date: '2025-07-15',
      status: 'Cancelled',
      total: 125.00,
      items: 2,
      products: [
        { name: 'Winter Coat', price: 99.99, quantity: 1 },
        { name: 'Wool Scarf', price: 25.01, quantity: 1 }
      ],
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop'
    }
  ];

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderFilter, setOrderFilter] = useState('all'); // 'all', 'delivered', 'in-transit', 'cancelled'

  // Filter orders based on selected filter
  const filteredOrders = allOrders.filter(order => {
    if (orderFilter === 'all') return true;
    if (orderFilter === 'delivered') return order.status === 'Delivered';
    if (orderFilter === 'in-transit') return order.status === 'In Transit';
    if (orderFilter === 'cancelled') return order.status === 'Cancelled';
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'In Transit': return 'bg-blue-100 text-blue-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-white via-rose-50 to-rose-100 rounded-3xl p-8 mb-8 overflow-hidden border border-rose-200 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-100/30 via-transparent to-rose-200/20"></div>
          <div className="absolute top-4 right-4 opacity-10">
            <Sparkles className="h-24 w-24 text-rose-400" />
          </div>
          <div className="absolute bottom-4 left-4 opacity-10">
            <Star className="h-16 w-16 text-rose-300" />
          </div>
          
          <div className="relative z-10 text-center">
            <div className="mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{userProfile.name.charAt(0)}</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-light text-gray-800 mb-2">
              Welcome back, <span className="font-semibold text-rose-600">{userProfile.name}</span>!
            </h1>
            <p className="text-rose-600/80 text-lg font-medium tracking-wide">✨ Your style journey continues here ✨</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                          : 'text-gray-600 hover:bg-rose-50 hover:text-rose-600'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">My Orders</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setOrderFilter('all')}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${
                        orderFilter === 'all' 
                          ? 'bg-rose-500 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      All ({allOrders.length})
                    </button>
                    <button
                      onClick={() => setOrderFilter('delivered')}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${
                        orderFilter === 'delivered' 
                          ? 'bg-rose-500 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Delivered ({allOrders.filter(o => o.status === 'Delivered').length})
                    </button>
                    <button
                      onClick={() => setOrderFilter('in-transit')}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${
                        orderFilter === 'in-transit' 
                          ? 'bg-rose-500 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      In Transit ({allOrders.filter(o => o.status === 'In Transit').length})
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-xl p-4 hover:border-rose-200 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200">
                          <Image
                            src={order.image}
                            alt="Order"
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-gray-900">Order {order.id}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{order.items} items • ₹{order.total.toFixed(2)}</p>
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                            <p className="text-xs text-gray-500">Ordered: {new Date(order.date).toLocaleDateString()}</p>
                            {order.status === 'Delivered' && order.deliveredAt && (
                              <p className="text-xs text-green-600">Delivered: {new Date(order.deliveredAt).toLocaleDateString()}</p>
                            )}
                            {order.status === 'In Transit' && order.estimatedDelivery && (
                              <p className="text-xs text-blue-600">Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                            )}
                            {order.trackingNumber && (
                              <p className="text-xs text-gray-500">Tracking: {order.trackingNumber}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Order Products List */}
                      {order.products && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-sm font-medium text-gray-700 mb-2">Items:</p>
                          <div className="space-y-1">
                            {order.products.map((product, index) => (
                              <div key={index} className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">{product.quantity}x {product.name}</span>
                                <span className="text-gray-700">₹{product.price.toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="text-sm">
                          <span className="text-gray-600">Total: </span>
                          <span className="font-semibold text-gray-900">₹{order.total.toFixed(2)}</span>
                        </div>
                        <div className="flex gap-2">
                          {order.status === 'In Transit' && (
                            <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              Track Order
                            </button>
                          )}
                          {order.status === 'Delivered' && (
                            <button className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                              Write Review
                            </button>
                          )}
                          <button className="px-3 py-1 text-sm text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredOrders.length === 0 && (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-light text-gray-700 mb-2">No orders found</h3>
                    <p className="text-gray-500">No orders match the current filter.</p>
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">My Wishlist</h2>
                  <span className="text-sm text-gray-500">{wishlistItems.length} items</span>
                </div>
                
                {wishlistItems.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="h-16 w-16 text-rose-200 mx-auto mb-4" />
                    <h3 className="text-xl font-light text-gray-700 mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-500 mb-6">Start adding items you love to see them here</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="group">
                        <div className="relative bg-gray-50 rounded-xl overflow-hidden mb-3">
                          <Image
                            src={(item.images && item.images[0]) || 'https://placehold.co/200x200?text=No+Image'}
                            alt={item.name}
                            width={200}
                            height={200}
                            className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
                            unoptimized={(item.images && item.images[0]) ? false : true}
                          />
                          <div className="absolute top-3 right-3 flex gap-2">
                            <button 
                              onClick={() => removeFromWishlist(item.id)}
                              className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </button>
                            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                              <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
                            </button>
                          </div>
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-lg font-semibold text-rose-600 mb-3">₹{item.price}</p>
                        <button 
                          onClick={() => addToCart(item)}
                          className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                        >
                          <ShoppingBag className="h-4 w-4" />
                          Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>
                  <button
                    onClick={isEditing ? handleCancelEdit : handleStartEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                  >
                    {isEditing ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={userProfile.name}
                            onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white text-gray-900 placeholder-gray-500"
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">{userProfile.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={userProfile.email}
                            onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white text-gray-900 placeholder-gray-500"
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">{userProfile.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={userProfile.phone}
                            onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white text-gray-900 placeholder-gray-500"
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">{userProfile.phone}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Birthday</label>
                        {isEditing ? (
                          <input
                            type="date"
                            value={userProfile.birthday}
                            onChange={(e) => setUserProfile({...userProfile, birthday: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white text-gray-900"
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">{new Date(userProfile.birthday).toLocaleDateString()}</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      {isEditing ? (
                        <textarea
                          value={userProfile.address}
                          onChange={(e) => setUserProfile({...userProfile, address: e.target.value})}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white text-gray-900 placeholder-gray-500"
                        />
                      ) : (
                        <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">{userProfile.address}</p>
                      )}
                    </div>
                  </div>

                  {/* Preferences */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Email Notifications</h4>
                          <p className="text-sm text-gray-600">Receive updates about new arrivals and sales</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={preferences.emailNotifications}
                            onChange={() => togglePreference('emailNotifications')}
                          />
                          <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${preferences.emailNotifications ? 'peer-checked:bg-rose-500' : ''}`}></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                          <p className="text-sm text-gray-600">Get order updates via text message</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={preferences.smsNotifications}
                            onChange={() => togglePreference('smsNotifications')}
                          />
                          <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${preferences.smsNotifications ? 'peer-checked:bg-rose-500' : ''}`}></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-4 pt-6 border-t">
                      <button
                        onClick={handleSaveChanges}
                        disabled={isSaving}
                        className="flex-1 bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSaving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        disabled={isSaving}
                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
