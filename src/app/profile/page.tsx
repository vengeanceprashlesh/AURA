'use client';

import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

function ProfileContent() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl border border-rose-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold text-rose-700">Your Profile</h1>
            <button
              onClick={logout}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-rose-700 mb-2">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Name</label>
                  <p className="text-lg font-medium">{user?.name || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <p className="text-lg font-medium">{user?.email || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Phone</label>
                  <p className="text-lg font-medium">{user?.phone || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Role</label>
                  <p className="text-lg font-medium capitalize">{user?.role || 'user'}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-rose-100">
              <h2 className="text-lg font-semibold text-rose-700 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a
                  href="/orders"
                  className="p-4 border border-rose-200 rounded-lg hover:bg-rose-50 transition-colors text-center"
                >
                  <p className="font-medium text-rose-700">My Orders</p>
                </a>
                <a
                  href="/wishlist"
                  className="p-4 border border-rose-200 rounded-lg hover:bg-rose-50 transition-colors text-center"
                >
                  <p className="font-medium text-rose-700">Wishlist</p>
                </a>
                <a
                  href="/account"
                  className="p-4 border border-rose-200 rounded-lg hover:bg-rose-50 transition-colors text-center"
                >
                  <p className="font-medium text-rose-700">Account Settings</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute requireAuth={true} redirectTo="/login">
      <ProfileContent />
    </ProtectedRoute>
  );
}
