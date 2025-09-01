"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import Image from 'next/image'
import Link from 'next/link'
import type { Id } from '../../../convex/_generated/dataModel'
import { getSizesForCategory, COMMON_COLORS, type ColorOption } from '@/utils/sizes'
import { Plus, Minus, X, Sparkles } from 'lucide-react'

const categories = ['new-today','clothing','dresses','shoes','accessories','bags','tops','bottoms','summer','seasonal']

interface ProductColor {
  name: string;
  value: string;
  images: string[];
}

export default function AdminDashboardClient() {
  const [category, setCategory] = useState<string>('dresses')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  // Form state for variants
  const [colors, setColors] = useState<ProductColor[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [mainImages, setMainImages] = useState<string[]>(['']);
  
  const router = useRouter()
  
  // Use Convex hooks
  const products = useQuery(api.products.getProducts, { category })
  const addProductMutation = useMutation(api.products.addProduct)
  const deleteProductMutation = useMutation(api.products.deleteProduct)

  // Helper functions for managing variants
  const addColorVariant = () => {
    setColors([...colors, { name: '', value: '#000000', images: [''] }]);
  };
  
  const removeColorVariant = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };
  
  const updateColor = (index: number, field: keyof ProductColor, value: string | string[]) => {
    const updatedColors = [...colors];
    updatedColors[index] = { ...updatedColors[index], [field]: value };
    setColors(updatedColors);
  };
  
  const addImageToColor = (colorIndex: number) => {
    const updatedColors = [...colors];
    updatedColors[colorIndex].images.push('');
    setColors(updatedColors);
  };
  
  const removeImageFromColor = (colorIndex: number, imageIndex: number) => {
    const updatedColors = [...colors];
    updatedColors[colorIndex].images = updatedColors[colorIndex].images.filter((_, i) => i !== imageIndex);
    setColors(updatedColors);
  };
  
  const updateColorImage = (colorIndex: number, imageIndex: number, url: string) => {
    const updatedColors = [...colors];
    updatedColors[colorIndex].images[imageIndex] = url;
    setColors(updatedColors);
  };
  
  const addMainImage = () => {
    setMainImages([...mainImages, '']);
  };
  
  const removeMainImage = (index: number) => {
    setMainImages(mainImages.filter((_, i) => i !== index));
  };
  
  const updateMainImage = (index: number, url: string) => {
    const updatedImages = [...mainImages];
    updatedImages[index] = url;
    setMainImages(updatedImages);
  };
  
  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };
  
  const resetForm = () => {
    setColors([]);
    setSelectedSizes([]);
    setMainImages(['']);
  };

  async function onAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setSubmitting(true)
    const form = new FormData(e.currentTarget)
    
    // Prepare main images (filter out empty strings)
    const validMainImages = mainImages.filter(img => img.trim());
    
    // Prepare color variants (filter out incomplete ones)
    const validColors = colors.filter(color => 
      color.name.trim() && 
      color.value && 
      color.images.some(img => img.trim())
    ).map(color => ({
      ...color,
      images: color.images.filter(img => img.trim())
    }));
    
    const payload = {
      name: String(form.get('name') || ''),
      price: Number(form.get('price') || 0),
      images: validMainImages.length > 0 ? validMainImages : ['https://placehold.co/400x600?text=No+Image'],
      category,
      description: String(form.get('description') || ''),
      tags: [],
      inStock: true,
      stockQuantity: Number(form.get('stock') || 0),
      featured: Boolean(form.get('featured')),
      availableColors: validColors.length > 0 ? validColors : undefined,
      availableSizes: selectedSizes.length > 0 ? selectedSizes : undefined,
    }
    
    // Basic validation
    if (!payload.name.trim()) {
      setError('Product name is required')
      setSubmitting(false)
      return
    }
    if (payload.price <= 0) {
      setError('Price must be greater than 0')
      setSubmitting(false)
      return
    }

    try {
      await addProductMutation(payload)
      ;(e.target as HTMLFormElement).reset()
      resetForm()
      setSuccess('Product added successfully!')
    } catch (err: any) {
      setError(err?.message || 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  async function onRemove(id: Id<"products">, name: string) {
    if (!confirm(`Remove "${name}"? This action cannot be undone.`)) return
    
    try {
      await deleteProductMutation({ id })
      setSuccess('Product removed successfully!')
    } catch (err: any) {
      setError(err?.message || 'Failed to remove product')
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (err) {
      // Fallback to redirect even if logout fails
      router.push('/admin/login')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your store products</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/admin/skincare" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-md text-sm font-medium hover:shadow-lg transition-all duration-200">
                <Sparkles className="w-4 h-4 mr-2" />
                Skincare Admin
              </Link>
              <button 
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    onClick={() => setError(null)}
                    className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
                  >
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">{success}</p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    onClick={() => setSuccess(null)}
                    className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
                  >
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Selection */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(c => (
              <button
                key={c}
                onClick={()=>setCategory(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all duration-200 ${
                  c === category 
                    ? 'bg-gray-900 text-white border-gray-900 shadow-md' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {c.charAt(0).toUpperCase() + c.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Add Product Form */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Product</h2>
          <form onSubmit={onAdd} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <input 
                  name="name" 
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-20 transition-colors" 
                  placeholder="Enter product name"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  min="0.01"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-20 transition-colors"
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input 
                  name="image" 
                  type="url"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-20 transition-colors" 
                  placeholder="https://example.com/image.jpg" 
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  name="description" 
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-20 transition-colors resize-none" 
                  placeholder="Enter product description..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                <input
                  name="stock"
                  type="number"
                  min="0"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-20 transition-colors"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    name="featured"
                    type="checkbox"
                    className="w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-gray-500 focus:ring-2"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700">Featured Product</span>
                    <p className="text-xs text-gray-500">Show this product in the Featured Products section</p>
                  </div>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                disabled={submitting} 
                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Adding Product...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Products in {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
            </h2>
            <span className="text-sm text-gray-500">
              {products === undefined ? 'Loading...' : `${products.length} products`}
            </span>
          </div>
          
          {products === undefined ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                <span>Loading products...</span>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="mt-4 text-sm font-medium text-gray-900">No products</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding a new product to this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map(p => (
                <div key={p._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-3">
                    <Image 
                      src={(p.images && p.images[0]) || 'https://placehold.co/300x300?text=No+Image'} 
                      alt={p.name} 
                      fill 
                      className="object-cover" 
                      unoptimized={(p.images && p.images[0]) ? false : true}
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900 truncate" title={p.name}>{p.name}</h3>
                    <p className="text-lg font-semibold text-gray-900">${p.price.toFixed(2)}</p>
                    {p.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
                    )}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-gray-500">
                        Stock: {p.stockQuantity || 0}
                      </span>
                      <button 
                        onClick={() => onRemove(p._id, p.name)} 
                        className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
