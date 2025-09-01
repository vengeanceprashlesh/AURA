import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import SkincareAdminClient from './SkincareAdminClient'

export default async function SkincareAdminPage() {
  // Server-side authentication check
  if (!(await isAuthenticated())) {
    redirect('/admin/login')
  }

  return <SkincareAdminClient />
}

export const metadata = {
  title: 'Skincare Admin - Aura',
  description: 'Manage your women-focused skincare product collection',
}
