'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import {
  Sun,
  Moon,
  Clock,
  Plus,
  Minus,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Heart,
  TestTube,
  Droplets,
  Eye,
  ShieldCheck,
  ArrowRight,
  Info,
  Star,
  Trash2,
  Edit3
} from 'lucide-react'
import Image from 'next/image'

import type {
  SkincareProduct,
  SkincareRoutine,
  SkinProfile,
  ApplicationTime
} from '@/types/skincare'
import { formatPrice } from '@/utils/currency'
import { buildSkincareRoutine, getRoutineOrder } from '@/utils/skincare'
import { APP_CONFIG } from '@/config/constants'

interface RoutineBuilderProps {
  products: SkincareProduct[]
  skinProfile?: SkinProfile
  onSaveRoutine?: (routine: SkincareRoutine) => void
  initialRoutine?: SkincareRoutine
}

interface RoutineStep {
  id: string
  product: SkincareProduct
  step: number
  notes?: string
  isOptional?: boolean
}

export default function RoutineBuilder({
  products,
  skinProfile,
  onSaveRoutine,
  initialRoutine
}: RoutineBuilderProps) {
  const [activeTime, setActiveTime] = useState<'morning' | 'evening'>('morning')
  const [morningSteps, setMorningSteps] = useState<RoutineStep[]>([])
  const [eveningSteps, setEveningSteps] = useState<RoutineStep[]>([])
  const [showProductSelector, setShowProductSelector] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [routineName, setRoutineName] = useState('My Custom Routine')
  const [isEditing, setIsEditing] = useState(false)

  // Initialize routine from props or build automatically
  useEffect(() => {
    if (initialRoutine) {
      setRoutineName(initialRoutine.name)
      setMorningSteps(
        initialRoutine.morning.map((product, index) => ({
          id: `morning-${product.id}`,
          product,
          step: index + 1
        }))
      )
      setEveningSteps(
        initialRoutine.evening.map((product, index) => ({
          id: `evening-${product.id}`,
          product,
          step: index + 1
        }))
      )
    } else if (skinProfile && products.length > 0) {
      const autoRoutine = buildSkincareRoutine(products, skinProfile)
      setMorningSteps(
        autoRoutine.morning.map((product, index) => ({
          id: `morning-${product.id}`,
          product,
          step: index + 1
        }))
      )
      setEveningSteps(
        autoRoutine.evening.map((product, index) => ({
          id: `evening-${product.id}`,
          product,
          step: index + 1
        }))
      )
    }
  }, [initialRoutine, skinProfile, products])

  const availableProducts = products.filter(product => {
    const timeMatch = activeTime === 'morning' 
      ? product.applicationTime.includes('morning') || product.applicationTime.includes('both')
      : product.applicationTime.includes('evening') || product.applicationTime.includes('both')
    
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory
    
    // Don't show products already in current routine
    const currentSteps = activeTime === 'morning' ? morningSteps : eveningSteps
    const alreadyAdded = currentSteps.some(step => step.product.id === product.id)
    
    return timeMatch && categoryMatch && !alreadyAdded
  })

  const addProductToRoutine = (product: SkincareProduct) => {
    const newStep: RoutineStep = {
      id: `${activeTime}-${product.id}`,
      product,
      step: (activeTime === 'morning' ? morningSteps.length : eveningSteps.length) + 1
    }

    if (activeTime === 'morning') {
      setMorningSteps([...morningSteps, newStep])
    } else {
      setEveningSteps([...eveningSteps, newStep])
    }

    setShowProductSelector(false)
  }

  const removeProductFromRoutine = (stepId: string) => {
    if (activeTime === 'morning') {
      setMorningSteps(steps => steps.filter(step => step.id !== stepId))
    } else {
      setEveningSteps(steps => steps.filter(step => step.id !== stepId))
    }
  }

  const updateStepOrder = (newSteps: RoutineStep[]) => {
    const reorderedSteps = newSteps.map((step, index) => ({
      ...step,
      step: index + 1
    }))

    if (activeTime === 'morning') {
      setMorningSteps(reorderedSteps)
    } else {
      setEveningSteps(reorderedSteps)
    }
  }

  const saveRoutine = () => {
    const routine: SkincareRoutine = {
      id: `routine_${Date.now()}`,
      name: routineName,
      description: `Custom ${skinProfile?.skinType || 'personalized'} skincare routine`,
      skinProfile: skinProfile || {} as SkinProfile,
      morning: morningSteps.map(step => step.product),
      evening: eveningSteps.map(step => step.product),
      weekly: [], // Could be expanded
      totalCost: [...morningSteps, ...eveningSteps].reduce((sum, step) => sum + step.product.price, 0),
      routineComplexity: (morningSteps.length + eveningSteps.length) <= 6 ? 'beginner' : 
                        (morningSteps.length + eveningSteps.length) <= 10 ? 'intermediate' : 'advanced',
      expectedResults: [
        'Improved skin texture and appearance',
        'Enhanced hydration and comfort',
        'Targeted treatment of specific concerns'
      ],
      timeline: 'Results visible in 4-6 weeks'
    }

    onSaveRoutine?.(routine)
  }

  const currentSteps = activeTime === 'morning' ? morningSteps : eveningSteps
  const totalCost = [...morningSteps, ...eveningSteps].reduce((sum, step) => sum + step.product.price, 0)

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="h-8 w-8 text-rose-500" />
          <h2 className="text-3xl font-light text-gray-900">Routine Builder</h2>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create your perfect skincare routine with personalized product recommendations
        </p>
      </div>

      {/* Routine Name */}
      <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={routineName}
                onChange={(e) => setRoutineName(e.target.value)}
                className="w-full text-xl font-medium text-gray-900 bg-transparent border-b border-rose-300 focus:outline-none focus:border-rose-500 pb-2"
                onBlur={() => setIsEditing(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
                autoFocus
              />
            ) : (
              <h3
                className="text-xl font-medium text-gray-900 cursor-pointer hover:text-rose-600 transition-colors"
                onClick={() => setIsEditing(true)}
              >
                {routineName}
              </h3>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{morningSteps.length + eveningSteps.length} products</span>
            <span>•</span>
            <span>{formatPrice(totalCost)} total</span>
          </div>
          <button onClick={() => setIsEditing(!isEditing)} className="text-gray-400 hover:text-gray-600">
            <Edit3 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Time Selector */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-2 rounded-2xl flex">
          <button
            onClick={() => setActiveTime('morning')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 ${
              activeTime === 'morning'
                ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Sun className="h-5 w-5" />
            Morning Routine
            <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
              {morningSteps.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTime('evening')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 ${
              activeTime === 'evening'
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Moon className="h-5 w-5" />
            Evening Routine
            <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
              {eveningSteps.length}
            </span>
          </button>
        </div>
      </div>

      {/* Routine Steps */}
      <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-medium text-gray-900">
            {activeTime === 'morning' ? 'Morning' : 'Evening'} Routine Steps
          </h3>
          <button
            onClick={() => setShowProductSelector(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </button>
        </div>

        {currentSteps.length === 0 ? (
          <div className="text-center py-16">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              activeTime === 'morning' 
                ? 'bg-gradient-to-br from-yellow-100 to-orange-100' 
                : 'bg-gradient-to-br from-purple-100 to-blue-100'
            }`}>
              {activeTime === 'morning' ? (
                <Sun className="h-10 w-10 text-orange-400" />
              ) : (
                <Moon className="h-10 w-10 text-purple-400" />
              )}
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              No products in your {activeTime} routine yet
            </h4>
            <p className="text-gray-600 mb-6">
              Add products to create your perfect {activeTime} skincare routine
            </p>
            <button
              onClick={() => setShowProductSelector(true)}
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200"
            >
              Add First Product
            </button>
          </div>
        ) : (
          <Reorder.Group
            axis="y"
            values={currentSteps}
            onReorder={updateStepOrder}
            className="space-y-4"
          >
            {currentSteps.map((step) => (
              <Reorder.Item
                key={step.id}
                value={step}
                className="bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing"
              >
                <div className="flex items-center gap-6">
                  {/* Step Number */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-white shadow-lg ${
                    activeTime === 'morning' 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400' 
                      : 'bg-gradient-to-r from-purple-500 to-blue-500'
                  }`}>
                    {step.step}
                  </div>

                  {/* Product Image */}
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-50 to-purple-50 rounded-xl flex items-center justify-center">
                    {step.product.images && step.product.images[0] ? (
                      <Image
                        src={step.product.images[0]}
                        alt={step.product.name}
                        width={64}
                        height={64}
                        className="rounded-xl object-cover"
                      />
                    ) : (
                      <TestTube className="h-8 w-8 text-rose-300" />
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">
                      {step.product.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                      {step.product.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="bg-rose-50 text-rose-700 px-2 py-1 rounded-full">
                        {step.product.category}
                      </span>
                      <span>{step.product.frequency}</span>
                      {step.product.spfValue && (
                        <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full">
                          SPF {step.product.spfValue}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Product Price */}
                  <div className="text-right">
                    <span className="font-semibold text-gray-900">
                      {formatPrice(step.product.price)}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeProductFromRoutine(step.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                {/* How to Use */}
                {step.product.howToUse && step.product.howToUse.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-rose-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-sm font-medium text-gray-700">How to use: </span>
                        <span className="text-sm text-gray-600">
                          {step.product.howToUse.join(' • ')}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </div>

      {/* Routine Summary */}
      {(morningSteps.length > 0 || eveningSteps.length > 0) && (
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8">
          <h3 className="text-xl font-medium text-gray-900 mb-6">Routine Summary</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Clock className="h-6 w-6 text-rose-500" />
              </div>
              <h4 className="font-medium text-gray-900">
                {Math.ceil((morningSteps.length + eveningSteps.length) * 1.5)} min
              </h4>
              <p className="text-sm text-gray-600">Daily time investment</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <TestTube className="h-6 w-6 text-rose-500" />
              </div>
              <h4 className="font-medium text-gray-900">
                {morningSteps.length + eveningSteps.length} Products
              </h4>
              <p className="text-sm text-gray-600">In your complete routine</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Heart className="h-6 w-6 text-rose-500" />
              </div>
              <h4 className="font-medium text-gray-900">
                {formatPrice(totalCost)}
              </h4>
              <p className="text-sm text-gray-600">Total investment</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={saveRoutine}
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-200"
            >
              Save My Routine
            </button>
          </div>
        </div>
      )}

      {/* Product Selector Modal */}
      <AnimatePresence>
        {showProductSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowProductSelector(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-medium text-gray-900">
                    Add to {activeTime === 'morning' ? 'Morning' : 'Evening'} Routine
                  </h3>
                  <button
                    onClick={() => setShowProductSelector(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Plus className="h-6 w-6 rotate-45" />
                  </button>
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-rose-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Categories
                  </button>
                  {['cleansers', 'serums', 'moisturizers', 'sunscreen', 'masks'].map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors capitalize ${
                        selectedCategory === category
                          ? 'bg-rose-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-96">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableProducts.map((product) => (
                    <motion.button
                      key={product.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addProductToRoutine(product)}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 text-left"
                    >
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                        <TestTube className="h-6 w-6 text-rose-300" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1 line-clamp-1">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-1">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs bg-rose-50 text-rose-700 px-2 py-1 rounded-full">
                            {product.category}
                          </span>
                          <span className="font-semibold text-gray-900">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {availableProducts.length === 0 && (
                  <div className="text-center py-12">
                    <TestTube className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      No products available
                    </h4>
                    <p className="text-gray-600">
                      All suitable products for this routine time have been added,
                      or try selecting a different category.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
