'use client';

import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

function ProfileContent() {
  const { user, logout } = useAuth();

  // Generate initials for avatar
  const getInitials = (name: string | undefined) => {
    if (!name) return 'AA';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8ff] via-[#f7f9f7] to-[#fcf8f1] p-4 sm:p-6 lg:p-8">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#9c85ff]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-[#729672]/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with Logout */}
        <div className="flex justify-end mb-6">
          <button
            onClick={logout}
            className="group px-6 py-2.5 bg-gradient-to-r from-[#e07a5f] to-[#ca6f72] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </span>
          </button>
        </div>

        {/* Profile Overview Card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 mb-6 hover:shadow-3xl transition-shadow duration-300">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#9c85ff] via-[#729672] to-[#e8ce8c] rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-32 h-32 bg-gradient-to-br from-[#9c85ff] to-[#729672] rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {getInitials(user?.name)}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#6142bf] to-[#5a7a5a] bg-clip-text text-transparent font-playfair">
                  {user?.name || 'Aura Member'}
                </h1>
                <span className="px-3 py-1 bg-gradient-to-r from-[#e8ce8c] to-[#d4b87e] text-[#3d3d3d] text-xs font-semibold rounded-full shadow">
                  {user?.role?.toUpperCase() || 'MEMBER'}
                </span>
              </div>
              <p className="text-[#6d6d6d] text-lg mb-4">{user?.email || 'email@example.com'}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="px-4 py-2 bg-gradient-to-br from-[#d5ccff]/30 to-[#b8a9ff]/30 rounded-xl border border-[#9c85ff]/20">
                  <p className="text-xs text-[#6d6d6d] font-medium">Orders</p>
                  <p className="text-2xl font-bold text-[#7551e3]">12</p>
                </div>
                <div className="px-4 py-2 bg-gradient-to-br from-[#b9d0b9]/30 to-[#94b394]/30 rounded-xl border border-[#729672]/20">
                  <p className="text-xs text-[#6d6d6d] font-medium">Wishlist</p>
                  <p className="text-2xl font-bold text-[#5a7a5a]">8</p>
                </div>
                <div className="px-4 py-2 bg-gradient-to-br from-[#f2e6cf]/30 to-[#eddaad]/30 rounded-xl border border-[#e8ce8c]/20">
                  <p className="text-xs text-[#6d6d6d] font-medium">Member Since</p>
                  <p className="text-2xl font-bold text-[#b19968]">2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-6 font-playfair flex items-center gap-2">
              <svg className="w-6 h-6 text-[#9c85ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Personal Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email Card */}
              <div className="group p-4 bg-gradient-to-br from-[#fdf8f8] to-[#faf0f0] rounded-2xl border border-[#eac4c6]/30 hover:border-[#ca6f72]/50 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#ca6f72] to-[#da999c] rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-[#6d6d6d]">Email Address</span>
                </div>
                <p className="text-base font-medium text-[#3d3d3d] ml-13">{user?.email || 'N/A'}</p>
              </div>

              {/* Phone Card */}
              <div className="group p-4 bg-gradient-to-br from-[#fef8f6] to-[#fcefeb] rounded-2xl border border-[#f4c1b3]/30 hover:border-[#e07a5f]/50 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#e07a5f] to-[#ec9b87] rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-[#6d6d6d]">Phone Number</span>
                </div>
                <p className="text-base font-medium text-[#3d3d3d] ml-13">{user?.phone || 'Not provided'}</p>
              </div>

              {/* Name Card */}
              <div className="group p-4 bg-gradient-to-br from-[#faf8ff] to-[#f3f0ff] rounded-2xl border border-[#d5ccff]/30 hover:border-[#9c85ff]/50 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#9c85ff] to-[#b8a9ff] rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-[#6d6d6d]">Full Name</span>
                </div>
                <p className="text-base font-medium text-[#3d3d3d] ml-13">{user?.name || 'N/A'}</p>
              </div>

              {/* Role Card */}
              <div className="group p-4 bg-gradient-to-br from-[#f7f9f7] to-[#edf2ed] rounded-2xl border border-[#b9d0b9]/30 hover:border-[#729672]/50 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#729672] to-[#94b394] rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-[#6d6d6d]">Account Type</span>
                </div>
                <p className="text-base font-medium text-[#3d3d3d] capitalize ml-13">{user?.role || 'user'}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-6 font-playfair flex items-center gap-2">
              <svg className="w-6 h-6 text-[#729672]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick Actions
            </h2>

            <div className="space-y-3">
              <a
                href="/orders"
                className="group flex items-center gap-4 p-4 bg-gradient-to-r from-[#d5ccff]/20 to-[#e9e5ff]/20 rounded-2xl border border-[#9c85ff]/20 hover:border-[#9c85ff]/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#9c85ff] to-[#8763f7] rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[#3d3d3d] group-hover:text-[#7551e3] transition-colors">My Orders</p>
                  <p className="text-xs text-[#6d6d6d]">Track your purchases</p>
                </div>
                <svg className="w-5 h-5 text-[#9c85ff] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              <a
                href="/wishlist"
                className="group flex items-center gap-4 p-4 bg-gradient-to-r from-[#fccdd1]/20 to-[#feeaea]/20 rounded-2xl border border-[#ca6f72]/20 hover:border-[#ca6f72]/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#ca6f72] to-[#da999c] rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[#3d3d3d] group-hover:text-[#b66467] transition-colors">Wishlist</p>
                  <p className="text-xs text-[#6d6d6d]">Your saved items</p>
                </div>
                <svg className="w-5 h-5 text-[#ca6f72] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              <a
                href="/account"
                className="group flex items-center gap-4 p-4 bg-gradient-to-r from-[#b9d0b9]/20 to-[#d8e5d8]/20 rounded-2xl border border-[#729672]/20 hover:border-[#729672]/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#729672] to-[#94b394] rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[#3d3d3d] group-hover:text-[#5a7a5a] transition-colors">Settings</p>
                  <p className="text-xs text-[#6d6d6d]">Manage your account</p>
                </div>
                <svg className="w-5 h-5 text-[#729672] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
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
