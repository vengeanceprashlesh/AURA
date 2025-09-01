"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import Image from 'next/image'
import type { Id } from '../../../../convex/_generated/dataModel'
import { 
  Plus, 
  Minus, 
  X, 
  Heart, 
  Sparkles, 
  TestTube, 
  Sun,
  Eye,
  Droplets,
  Stars,
  Edit,
  Trash2,
  Save
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import type { 
  SkincareProduct, 
  SkinType, 
  SkinConcern, 
  AgeGroup, 
  SkincareCategory, 
  ApplicationTime,
  SkincareProductFormData 
} from '@/types/skincare'
import { formatPrice } from '@/utils/currency'

const SKINCARE_CATEGORIES: SkincareCategory[] = ['cleansers', 'serums', 'moisturizers', 'sunscreen', 'masks', 'eyes', 'toners', 'exfoliants', 'oils']
const SKIN_TYPES: SkinType[] = ['oily', 'dry', 'combination', 'sensitive', 'normal', 'mature']
const SKIN_CONCERNS: SkinConcern[] = ['acne', 'aging', 'dark_spots', 'hydration', 'sensitivity', 'pores', 'dullness', 'redness']
const AGE_GROUPS: AgeGroup[] = ['teens', 'twenties', 'thirties', 'forties', 'fifties_plus']
const APPLICATION_TIMES: ApplicationTime[] = ['morning', 'evening', 'both', 'weekly', 'as_needed']

interface IngredientInput {
  name: string
  concentration?: string
  purpose: string
}

export default function SkincareAdminClient() {
  const [selectedCategory, setSelectedCategory] = useState<SkincareCategory>('serums')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<SkincareProduct | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState<SkincareProductFormData>({
    name: '',
    brand: '',
    description: '',
    fullDescription: '',
    price: '',
    originalPrice: '',
    images: [],
    category: 'serums',
    subCategory: '',
    skinTypes: [],
    concerns: [],
    ageGroups: [],
    keyIngredients: [],
    applicationTime: [],
    productType: 'treatment',
    howToUse: [],
    routineStep: 1,
    frequency: '',
    volume: '',
    isVegan: false,
    isCrueltyFree: false,
    isFragranceFree: false,
    isHypoallergenic: false,
    spfValue: 0,
    stockQuantity: 0,
    featured: false,
    tags: []
  })

  const router = useRouter()

  // Use Convex hooks for skincare products
  const products = useQuery(api.products.getProducts, { 
    category: 'skincare' // We'll filter by skincare category
  })
  
  const addProductMutation = useMutation(api.products.addProduct)
  const updateProductMutation = useMutation(api.products.updateProduct)
  const deleteProductMutation = useMutation(api.products.deleteProduct)

  // Filter products based on selected category
  const filteredProducts = products?.filter(product => {
    return selectedCategory === 'all' || product.subcategory === selectedCategory
  })

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      description: '',
      fullDescription: '',
      price: '',
      originalPrice: '',
      images: [],
      category: selectedCategory,
      subCategory: '',
      skinTypes: [],
      concerns: [],
      ageGroups: [],
      keyIngredients: [],
      applicationTime: [],
      productType: 'treatment',
      howToUse: [],
      routineStep: 1,
      frequency: '',
      volume: '',
      isVegan: false,
      isCrueltyFree: false,
      isFragranceFree: false,
      isHypoallergenic: false,
      spfValue: 0,
      stockQuantity: 0,
      featured: false,
      tags: []
    })
    setEditingProduct(null)
    setShowAddForm(false)
  }

  const validateForm = () => {
    const errors: string[] = []
    
    if (!formData.name.trim()) {
      errors.push('Product name is required')
    }
    if (!formData.brand.trim()) {
      errors.push('Brand is required')
    }
    if (!formData.description.trim()) {
      errors.push('Description is required')
    }
    if (!formData.volume.trim()) {
      errors.push('Volume is required')
    }
    if (!formData.price || Number(formData.price) <= 0) {
      errors.push('Price must be greater than 0')
    }
    if (formData.stockQuantity < 0) {
      errors.push('Stock quantity cannot be negative')
    }
    if (formData.routineStep < 1 || formData.routineStep > 10) {
      errors.push('Routine step must be between 1 and 10')
    }
    if (formData.skinTypes.length === 0) {
      errors.push('At least one skin type must be selected')
    }
    if (formData.concerns.length === 0) {
      errors.push('At least one skin concern must be selected')
    }
    if (formData.applicationTime.length === 0) {
      errors.push('At least one application time must be selected')
    }
    
    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setSubmitting(true)

    // Validate form
    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '))
      setSubmitting(false)
      return
    }

    try {
      // Prepare product data for Convex
      const productData = {
        name: formData.name.trim(),
        brand: formData.brand.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        images: formData.images.filter(img => typeof img === 'string' && img.trim()) as string[],
        category: 'skincare', // Main category
        subcategory: formData.category, // Skincare subcategory
        tags: [
          ...formData.tags,
          ...formData.skinTypes,
          ...formData.concerns,
          formData.productType,
          ...(formData.isVegan ? ['vegan'] : []),
          ...(formData.isCrueltyFree ? ['cruelty-free'] : []),
          ...(formData.isFragranceFree ? ['fragrance-free'] : []),
          ...(formData.isHypoallergenic ? ['hypoallergenic'] : [])
        ],
        inStock: formData.stockQuantity > 0,
        stockQuantity: formData.stockQuantity,
        rating: 4.5, // Default rating
        reviewCount: 0,
        featured: formData.featured,
        // Extended skincare data stored in a custom field
        skincareData: {
          brand: formData.brand.trim(),
          skinTypes: formData.skinTypes,
          concerns: formData.concerns,
          ageGroups: formData.ageGroups,
          keyIngredients: formData.keyIngredients,
          applicationTime: formData.applicationTime,
          productType: formData.productType,
          howToUse: formData.howToUse,
          routineStep: formData.routineStep,
          frequency: formData.frequency.trim(),
          volume: formData.volume.trim(),
          isVegan: formData.isVegan,
          isCrueltyFree: formData.isCrueltyFree,
          isFragranceFree: formData.isFragranceFree,
          isHypoallergenic: formData.isHypoallergenic,
          spfValue: formData.spfValue || undefined,
          fullDescription: formData.fullDescription.trim()
        }
      }

      if (editingProduct) {
        await updateProductMutation({ 
          id: editingProduct._id as Id<"products">, 
          ...productData 
        })
        setSuccess('Skincare product updated successfully!')
      } else {
        await addProductMutation(productData)
        setSuccess('Skincare product added successfully!')
      }

      resetForm()
    } catch (err: any) {
      console.error('Form submission error:', err)
      setError(err?.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (product: any) => {
    const skincareData = product.skincareData || {}
    setFormData({
      name: product.name,
      brand: product.brand || '',
      description: product.description,
      fullDescription: skincareData.fullDescription || '',
      price: product.price,
      originalPrice: product.originalPrice || 0,
      images: product.images || [],
      category: product.subcategory || 'serums',
      subCategory: '',
      skinTypes: skincareData.skinTypes || [],
      concerns: skincareData.concerns || [],
      ageGroups: skincareData.ageGroups || [],
      keyIngredients: skincareData.keyIngredients || [],
      applicationTime: skincareData.applicationTime || [],
      productType: skincareData.productType || 'treatment',
      howToUse: skincareData.howToUse || [],
      routineStep: skincareData.routineStep || 1,
      frequency: skincareData.frequency || '',
      volume: skincareData.volume || '',
      isVegan: skincareData.isVegan || false,
      isCrueltyFree: skincareData.isCrueltyFree || false,
      isFragranceFree: skincareData.isFragranceFree || false,
      isHypoallergenic: skincareData.isHypoallergenic || false,
      spfValue: skincareData.spfValue || 0,
      stockQuantity: product.stockQuantity,
      featured: product.featured,
      tags: product.tags?.filter((tag: string) => 
        !SKIN_TYPES.includes(tag as SkinType) && 
        !SKIN_CONCERNS.includes(tag as SkinConcern)
      ) || []
    })
    setEditingProduct(product)
    setShowAddForm(true)
  }

  const handleDelete = async (id: Id<"products">, name: string) => {
    if (!confirm(`Delete "${name}"? This action cannot be undone.`)) return
    
    try {
      await deleteProductMutation({ id })
      setSuccess('Product deleted successfully!')
    } catch (err: any) {
      setError(err?.message || 'Failed to delete product')
    }
  }

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      keyIngredients: [...prev.keyIngredients, { name: '', concentration: '', purpose: '' }]
    }))
  }

  const removeIngredient = (index: number) => {
    setFormData(prev => ({
      ...prev,
      keyIngredients: prev.keyIngredients.filter((_, i) => i !== index)
    }))
  }

  const updateIngredient = (index: number, field: keyof IngredientInput, value: string) => {
    setFormData(prev => ({
      ...prev,
      keyIngredients: prev.keyIngredients.map((ingredient, i) => 
        i === index ? { ...ingredient, [field]: value } : ingredient
      )
    }))
  }

  const addImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }))
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const updateImage = (index: number, url: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? url : img)
    }))
  }

  const addUsageStep = () => {
    setFormData(prev => ({
      ...prev,
      howToUse: [...prev.howToUse, '']
    }))
  }

  const removeUsageStep = (index: number) => {
    setFormData(prev => ({
      ...prev,
      howToUse: prev.howToUse.filter((_, i) => i !== index)
    }))
  }

  const updateUsageStep = (index: number, step: string) => {
    setFormData(prev => ({
      ...prev,
      howToUse: prev.howToUse.map((s, i) => i === index ? step : s)
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-rose-100 p-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="h-8 w-8 text-rose-500" />
                <h1 className="text-3xl font-light text-gray-900">Skincare Admin</h1>
              </div>
              <p className="text-gray-600">
                Manage your women-focused skincare collection with care and precision
              </p>
            </div>
            <button
              onClick={() => {
                resetForm()
                setShowAddForm(true)
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
            >
              <Plus className="h-5 w-5" />
              Add New Product
            </button>
          </div>
        </div>

        {/* Status Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-50 border border-red-200 rounded-xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <p className="text-red-800 font-medium">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="ml-auto text-red-600 hover:text-red-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-green-50 border border-green-200 rounded-xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <p className="text-green-800 font-medium">{success}</p>
                <button
                  onClick={() => setSuccess(null)}
                  className="ml-auto text-green-600 hover:text-green-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-rose-100 p-6">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-lg font-medium text-gray-900">Skincare Categories</h2>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
            <button
              onClick={() => setSelectedCategory('all' as any)}
              className={`p-4 rounded-xl text-center transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-lg'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Stars className="h-5 w-5 mx-auto mb-2" />
              <span className="text-xs font-medium">All</span>
            </button>
            
            {SKINCARE_CATEGORIES.map((category) => {
              const icons = {
                cleansers: Droplets,
                serums: TestTube,
                moisturizers: Heart,
                sunscreen: Sun,
                masks: Sparkles,
                eyes: Eye,
                toners: Droplets,
                exfoliants: Stars,
                oils: Droplets
              }
              
              const Icon = icons[category] || TestTube
              
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`p-4 rounded-xl text-center transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-lg'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5 mx-auto mb-2" />
                  <span className="text-xs font-medium capitalize">{category}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Add/Edit Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-rose-200 p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-light text-gray-900">
                  {editingProduct ? 'Edit Skincare Product' : 'Add New Skincare Product'}
                </h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900 bg-white"
                      placeholder="e.g., Radiant Glow Serum"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand *
                    </label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900 bg-white"
                      placeholder="e.g., Aura Beauty"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900 bg-white"
                      placeholder="2500"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Price (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900 bg-white"
                      placeholder="3000"
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Volume *
                    </label>
                    <input
                      type="text"
                      value={formData.volume}
                      onChange={(e) => setFormData(prev => ({ ...prev, volume: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900 bg-white"
                      placeholder="e.g., 30ml, 50g"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      value={formData.stockQuantity}
                      onChange={(e) => setFormData(prev => ({ ...prev, stockQuantity: Number(e.target.value) }))}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900 bg-white"
                      placeholder="25"
                      required
                    />
                  </div>
                </div>

                {/* Category and Type */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as SkincareCategory }))}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900 bg-white"
                      required
                    >
                      {SKINCARE_CATEGORIES.map(category => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Type *
                    </label>
                    <select
                      value={formData.productType}
                      onChange={(e) => setFormData(prev => ({ ...prev, productType: e.target.value as any }))}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900 bg-white"
                      required
                    >
                      <option value="treatment">Treatment</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="protection">Protection</option>
                      <option value="cleansing">Cleansing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Routine Step (1-10) *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={formData.routineStep}
                      onChange={(e) => setFormData(prev => ({ ...prev, routineStep: Number(e.target.value) }))}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900 bg-white"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 resize-none text-gray-900 bg-white"
                    rows={3}
                    placeholder="Brief product description"
                    required
                  />
                </div>

                {/* Skin Types */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Suitable Skin Types * (Select at least one)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {SKIN_TYPES.map(type => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.skinTypes.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData(prev => ({
                                ...prev,
                                skinTypes: [...prev.skinTypes, type]
                              }))
                            } else {
                              setFormData(prev => ({
                                ...prev,
                                skinTypes: prev.skinTypes.filter(t => t !== type)
                              }))
                            }
                          }}
                          className="rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                        />
                        <span className="text-sm text-gray-700 capitalize">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Skin Concerns */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Addresses Concerns * (Select at least one)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {SKIN_CONCERNS.map(concern => (
                      <label key={concern} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.concerns.includes(concern)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData(prev => ({
                                ...prev,
                                concerns: [...prev.concerns, concern]
                              }))
                            } else {
                              setFormData(prev => ({
                                ...prev,
                                concerns: prev.concerns.filter(c => c !== concern)
                              }))
                            }
                          }}
                          className="rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                        />
                        <span className="text-sm text-gray-700 capitalize">{concern.replace('_', ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Application Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Application Time * (Select at least one)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {APPLICATION_TIMES.map(time => (
                      <label key={time} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.applicationTime.includes(time)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData(prev => ({
                                ...prev,
                                applicationTime: [...prev.applicationTime, time]
                              }))
                            } else {
                              setFormData(prev => ({
                                ...prev,
                                applicationTime: prev.applicationTime.filter(t => t !== time)
                              }))
                            }
                          }}
                          className="rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                        />
                        <span className="text-sm text-gray-700 capitalize">{time.replace('_', ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Age Groups */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Suitable Age Groups (Optional)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {AGE_GROUPS.map(age => (
                      <label key={age} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.ageGroups.includes(age)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData(prev => ({
                                ...prev,
                                ageGroups: [...prev.ageGroups, age]
                              }))
                            } else {
                              setFormData(prev => ({
                                ...prev,
                                ageGroups: prev.ageGroups.filter(a => a !== age)
                              }))
                            }
                          }}
                          className="rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                        />
                        <span className="text-sm text-gray-700 capitalize">{age.replace('_', ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Product Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Product Features
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isVegan}
                        onChange={(e) => setFormData(prev => ({ ...prev, isVegan: e.target.checked }))}
                        className="rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                      />
                      <span className="text-sm text-gray-700">Vegan</span>
                    </label>
                    
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isCrueltyFree}
                        onChange={(e) => setFormData(prev => ({ ...prev, isCrueltyFree: e.target.checked }))}
                        className="rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                      />
                      <span className="text-sm text-gray-700">Cruelty Free</span>
                    </label>
                    
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isFragranceFree}
                        onChange={(e) => setFormData(prev => ({ ...prev, isFragranceFree: e.target.checked }))}
                        className="rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                      />
                      <span className="text-sm text-gray-700">Fragrance Free</span>
                    </label>
                    
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isHypoallergenic}
                        onChange={(e) => setFormData(prev => ({ ...prev, isHypoallergenic: e.target.checked }))}
                        className="rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                      />
                      <span className="text-sm text-gray-700">Hypoallergenic</span>
                    </label>
                  </div>
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Product Images
                  </label>
                  <div className="space-y-3">
                    {formData.images.map((image, index) => (
                      <div key={index} className="flex gap-3 items-center">
                        <input
                          type="url"
                          value={image}
                          onChange={(e) => updateImage(index, e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900 bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addImage}
                      className="flex items-center gap-2 text-rose-600 hover:text-rose-800 text-sm"
                    >
                      <Plus className="h-4 w-4" />
                      Add Image
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {editingProduct ? 'Updating...' : 'Adding...'}
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        {editingProduct ? 'Update Product' : 'Add Product'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-rose-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              {selectedCategory === 'all' ? 'All Products' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`}
            </h3>
            <span className="text-sm text-gray-500">
              {filteredProducts?.length || 0} products
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts?.map((product) => (
              <div key={product._id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200">
                <div className="aspect-square relative bg-gradient-to-br from-rose-50 to-purple-50">
                  {product.images && product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <TestTube className="h-12 w-12 text-rose-300" />
                    </div>
                  )}
                  
                  {product.featured && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Featured
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      {(product as any).brand || 'Unknown Brand'}
                    </span>
                    <div className="flex items-center gap-1">
                      <Stars className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">{product.rating}</span>
                    </div>
                  </div>

                  <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h4>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="font-semibold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      Stock: {product.stockQuantity}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 flex items-center justify-center gap-2 bg-rose-50 text-rose-600 px-3 py-2 rounded-lg hover:bg-rose-100 transition-colors text-sm"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id, product.name)}
                      className="flex items-center justify-center gap-2 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {(!filteredProducts || filteredProducts.length === 0) && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-12 w-12 text-rose-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">
                Start by adding your first skincare product to this category
              </p>
              <button
                onClick={() => {
                  resetForm()
                  setShowAddForm(true)
                }}
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200"
              >
                Add First Product
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
