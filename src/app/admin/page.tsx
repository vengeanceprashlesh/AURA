import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import AdminDashboardClient from './AdminDashboardClient'

export default async function AdminDashboard() {
  // Server-side authentication check
  if (!(await isAuthenticated())) {
    redirect('/admin/login')
  }

  return <AdminDashboardClient />
}
