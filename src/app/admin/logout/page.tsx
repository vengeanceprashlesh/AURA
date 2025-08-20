"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogoutPage() {
  const router = useRouter()
  const [status, setStatus] = useState('Logging out...')

  useEffect(() => {
    async function doLogout() {
      try {
        setStatus('Logging out...')
        // Call GET so it redirects even if opened directly
        await fetch('/api/admin/logout', { method: 'GET', credentials: 'include' })
        setStatus('Logged out successfully')
        
        // Brief delay before redirect
        setTimeout(() => {
          router.replace('/admin/login')
        }, 1000)
      } catch (error) {
        setStatus('Logout completed')
        setTimeout(() => {
          router.replace('/admin/login')
        }, 1000)
      }
    }
    doLogout()
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
        </div>
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
          {status}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Redirecting to login page...
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <div className="flex items-center justify-center">
            <svg className="animate-spin h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
