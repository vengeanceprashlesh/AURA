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
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Emma',
    email: 'emma@example.com',
    phone: '+1 (555) 123-4567',
    birthday: '1995-08-20',
    address: '123 Fashion Ave, Style City, SC 12345'
  });
  
  const { items: wishlistItems, removeItem: removeFromWishlist, totalItems: wishlistCount } = useWishlist();
  const { points, level, achievements, availableRewards, redeemReward, canRedeemReward } = useRewards();
  const { addItem: addToCart } = useCart();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'orders', label: 'My Orders', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'rewards', label: 'Rewards', icon: Crown },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const recentOrders = [
    {
      id: '1',
      date: '2025-08-15',
      status: 'Delivered',
      total: 89.99,
      items: 2,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100&h=100&fit=crop'
    },
    {
      id: '2',
      date: '2025-08-10',
      status: 'In Transit',
      total: 156.50,
      items: 3,
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=100&h=100&fit=crop'
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 rounded-3xl p-8 mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-4 right-4 opacity-20">
            <Sparkles className="h-32 w-32 text-white" />
          </div>
          
          <div className="relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-light mb-4">Welcome back, Emma! ✨</h1>
            <p className="text-white/90 text-xl mb-6">Your style journey continues here</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2">
                <Crown className="h-5 w-5" />
                <span className="font-medium">VIP Member</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2">
                <Star className="h-5 w-5" />
                <span className="font-medium">Style Points: {points.toLocaleString()}</span>
              </div>
            </div>
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
              
              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Orders</span>
                    <span className="font-semibold text-rose-600">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Wishlist Items</span>
                    <span className="font-semibold text-rose-600">{wishlistCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Saved</span>
                    <span className="font-semibold text-green-600">$234</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* Welcome Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <Gift className="h-8 w-8" />
                      <span className="text-purple-200 text-sm">Special Offer</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Birthday Month!</h3>
                    <p className="text-purple-100 text-sm">Get 25% off your next purchase</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <Zap className="h-8 w-8" />
                      <span className="text-orange-200 text-sm">Flash Sale</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">24h Only</h3>
                    <p className="text-orange-100 text-sm">Up to 50% off accessories</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <Award className="h-8 w-8" />
                      <span className="text-emerald-200 text-sm">Achievement</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Style Maven</h3>
                    <p className="text-emerald-100 text-sm">Unlocked new rewards tier</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Orders</h2>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
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
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-gray-900">Order #{order.id}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === 'Delivered' 
                                ? 'bg-green-100 text-green-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{order.items} items • ${order.total}</p>
                          <p className="text-xs text-gray-500">{order.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
                        <p className="text-lg font-semibold text-rose-600 mb-3">${item.price}</p>
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

            {/* Rewards Tab */}
            {activeTab === 'rewards' && (
              <div className="space-y-6">
                {/* Points Overview */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-semibold mb-2">Style Points</h2>
                      <p className="text-purple-100">Level {level} Member</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">{points.toLocaleString()}</div>
                      <div className="text-purple-200 text-sm">points available</div>
                    </div>
                  </div>
                  <div className="bg-white/20 rounded-full h-2 mb-2">
                    <div 
                      className="bg-white rounded-full h-2 transition-all duration-500"
                      style={{ width: `${Math.min((points % 1000) / 10, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-purple-100 text-sm">{1000 - (points % 1000)} points to next level</p>
                </div>

                {/* Available Rewards */}
                <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Available Rewards</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableRewards.map((reward) => (
                      <div key={reward.id} className="border border-gray-200 rounded-xl p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">{reward.title}</h4>
                            <p className="text-sm text-gray-600">{reward.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-rose-600">
                              {reward.type === 'percentage' ? `${reward.discount}%` : `$${reward.discount}`} OFF
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            {reward.pointsCost === 0 ? 'Free' : `${reward.pointsCost} points`}
                          </span>
                          <button
                            onClick={() => redeemReward(reward.id)}
                            disabled={!canRedeemReward(reward.id) && reward.pointsCost > 0}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              canRedeemReward(reward.id) || reward.pointsCost === 0
                                ? 'bg-rose-500 text-white hover:bg-rose-600'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            {reward.pointsCost === 0 ? 'Claim' : 'Redeem'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <div 
                        key={achievement.id} 
                        className={`border rounded-xl p-4 transition-all ${
                          achievement.isUnlocked 
                            ? 'border-green-200 bg-green-50' 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{achievement.icon}</span>
                          <div className="flex-1">
                            <h4 className={`font-semibold ${
                              achievement.isUnlocked ? 'text-green-800' : 'text-gray-700'
                            }`}>
                              {achievement.title}
                            </h4>
                            <p className={`text-sm ${
                              achievement.isUnlocked ? 'text-green-600' : 'text-gray-500'
                            }`}>
                              {achievement.description}
                            </p>
                          </div>
                          {achievement.isUnlocked && (
                            <Check className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`text-sm font-medium ${
                            achievement.isUnlocked ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            +{achievement.points} points
                          </span>
                          {achievement.isUnlocked && achievement.unlockedAt && (
                            <span className="text-xs text-green-500">
                              Unlocked {achievement.unlockedAt.toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-50 rounded-lg">{userProfile.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={userProfile.email}
                            onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-50 rounded-lg">{userProfile.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={userProfile.phone}
                            onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-50 rounded-lg">{userProfile.phone}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Birthday</label>
                        {isEditing ? (
                          <input
                            type="date"
                            value={userProfile.birthday}
                            onChange={(e) => setUserProfile({...userProfile, birthday: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-50 rounded-lg">{new Date(userProfile.birthday).toLocaleDateString()}</p>
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                        />
                      ) : (
                        <p className="px-3 py-2 bg-gray-50 rounded-lg">{userProfile.address}</p>
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
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                          <p className="text-sm text-gray-600">Get order updates via text message</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-4 pt-6 border-t">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex-1 bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors font-medium"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
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
