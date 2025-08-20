import { NextResponse } from 'next/server'
import { removeProduct } from '@/lib/productRepo'

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const ok = await removeProduct(id)
  if (!ok) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
