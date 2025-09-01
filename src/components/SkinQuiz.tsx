'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Heart, 
  Sun, 
  Droplets,
  TestTube,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import type { 
  SkinProfile, 
  SkinQuizQuestion, 
  SkinQuizResult,
  SkinType,
  SkinConcern,
  AgeGroup,
  SkincareProduct
} from '@/types/skincare'
import { APP_CONFIG } from '@/config/constants'
import { analyzeSkinQuiz, buildSkincareRoutine, getPersonalizedMessage, getPersonalizedRecommendations } from '@/utils/skincare'
import { formatPrice } from '@/utils/currency'

interface SkinQuizProps {
  products?: SkincareProduct[]
  onComplete?: (result: SkinQuizResult) => void
}

const QUIZ_QUESTIONS: SkinQuizQuestion[] = [
  {
    id: 'skin_type',
    question: 'How would you describe your skin throughout most of the day?',
    type: 'single',
    category: 'skin_type',
    options: [
      {
        value: 'oily',
        label: 'Oily & Shiny',
        description: 'My skin gets oily, especially in the T-zone, and I often need to blot excess oil',
        image: '🌟'
      },
      {
        value: 'dry',
        label: 'Dry & Tight',
        description: 'My skin feels tight, sometimes flaky, and needs frequent moisturizing',
        image: '💎'
      },
      {
        value: 'combination',
        label: 'Combination',
        description: 'My T-zone is oily but my cheeks are normal or dry',
        image: '🌈'
      },
      {
        value: 'sensitive',
        label: 'Sensitive & Reactive',
        description: 'My skin easily gets irritated, red, or reacts to new products',
        image: '🌺'
      },
      {
        value: 'normal',
        label: 'Balanced & Comfortable',
        description: 'My skin feels comfortable, not too oily or dry, with minimal concerns',
        image: '✨'
      }
    ]
  },
  {
    id: 'main_concern',
    question: 'What\'s your primary skin concern right now?',
    type: 'single',
    category: 'concerns',
    options: [
      {
        value: 'acne',
        label: 'Breakouts & Blemishes',
        description: 'I struggle with pimples, blackheads, or acne scars',
        image: '🎯'
      },
      {
        value: 'aging',
        label: 'Fine Lines & Aging',
        description: 'I want to prevent or reduce signs of aging like fine lines and wrinkles',
        image: '👑'
      },
      {
        value: 'dark_spots',
        label: 'Dark Spots & Uneven Tone',
        description: 'I have dark spots, hyperpigmentation, or uneven skin tone',
        image: '🌅'
      },
      {
        value: 'hydration',
        label: 'Dryness & Dehydration',
        description: 'My skin lacks moisture and feels dehydrated',
        image: '💧'
      },
      {
        value: 'sensitivity',
        label: 'Redness & Irritation',
        description: 'My skin gets red, inflamed, or irritated easily',
        image: '🌸'
      }
    ]
  },
  {
    id: 'age_group',
    question: 'Which age range best describes you?',
    type: 'single',
    category: 'lifestyle',
    options: [
      {
        value: 'teens',
        label: 'Teens (13-19)',
        description: 'Building my first skincare routine and learning what works',
        image: '🌱'
      },
      {
        value: 'twenties',
        label: 'Twenties (20-29)',
        description: 'Establishing healthy habits and prevention-focused care',
        image: '🌸'
      },
      {
        value: 'thirties',
        label: 'Thirties (30-39)',
        description: 'Focusing on prevention and maintaining healthy, glowing skin',
        image: '🌺'
      },
      {
        value: 'forties',
        label: 'Forties (40-49)',
        description: 'Targeting specific concerns and anti-aging treatments',
        image: '👑'
      },
      {
        value: 'fifties_plus',
        label: '50+ Years',
        description: 'Mature skin care with focus on firmness and deep nourishment',
        image: '💎'
      }
    ]
  },
  {
    id: 'routine_complexity',
    question: 'How complex do you want your skincare routine to be?',
    type: 'single',
    category: 'preferences',
    options: [
      {
        value: 'minimal',
        label: 'Simple & Minimal',
        description: 'I prefer a quick, easy routine with just the essentials (3-4 products)',
        image: '🌿'
      },
      {
        value: 'moderate',
        label: 'Moderate & Balanced',
        description: 'I\'m comfortable with a routine that has some variety (5-7 products)',
        image: '⚖️'
      },
      {
        value: 'extensive',
        label: 'Comprehensive & Detailed',
        description: 'I love a full routine with multiple targeted treatments (8+ products)',
        image: '💫'
      }
    ]
  },
  {
    id: 'budget_range',
    question: 'What\'s your preferred budget range for skincare?',
    type: 'single',
    category: 'preferences',
    options: [
      {
        value: 'budget',
        label: 'Budget-Friendly',
        description: 'I prefer affordable options under ₹2000 per product',
        image: '💚'
      },
      {
        value: 'mid_range',
        label: 'Mid-Range',
        description: 'I\'m comfortable spending ₹2000-5000 for quality products',
        image: '💙'
      },
      {
        value: 'luxury',
        label: 'Premium & Luxury',
        description: 'I invest in high-end products (₹5000+ per product)',
        image: '💎'
      }
    ]
  },
  {
    id: 'lifestyle',
    question: 'Which best describes your lifestyle?',
    type: 'single',
    category: 'lifestyle',
    options: [
      {
        value: 'busy',
        label: 'Always On-the-Go',
        description: 'I have a busy schedule and need quick, effective solutions',
        image: '🏃‍♀️'
      },
      {
        value: 'balanced',
        label: 'Work-Life Balance',
        description: 'I have moderate time for self-care and enjoy my routines',
        image: '⚖️'
      },
      {
        value: 'relaxed',
        label: 'Self-Care Enthusiast',
        description: 'I love taking time for elaborate skincare rituals and pampering',
        image: '🧘‍♀️'
      }
    ]
  }
]

export default function SkinQuiz({ products = [], onComplete }: SkinQuizProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [result, setResult] = useState<SkinQuizResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentQuestion = QUIZ_QUESTIONS[currentStep]
  const isLastQuestion = currentStep === QUIZ_QUESTIONS.length - 1
  const canProceed = answers[currentQuestion?.id]

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const handleNext = () => {
    if (isLastQuestion) {
      handleSubmit()
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(0, prev - 1))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // Analyze quiz results
      const quizResult = analyzeSkinQuiz(answers)
      
      // Get personalized recommendations if products are provided
      if (products.length > 0) {
        const recommendations = getPersonalizedRecommendations(products, quizResult.skinProfile)
        const routine = buildSkincareRoutine(products, quizResult.skinProfile)
        
        quizResult.recommendations = {
          products: recommendations,
          routine,
          tips: quizResult.recommendations.tips
        }
      }
      
      setResult(quizResult)
      setIsCompleted(true)
      onComplete?.(quizResult)
    } catch (error) {
      console.error('Quiz submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const restartQuiz = () => {
    setCurrentStep(0)
    setAnswers({})
    setIsCompleted(false)
    setResult(null)
  }

  if (isCompleted && result) {
    return <QuizResults result={result} onRestart={restartQuiz} />
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-rose-500" />
            <h2 className="text-xl font-medium text-gray-900">Skin Analysis Quiz</h2>
          </div>
          <span className="text-sm text-gray-500">
            {currentStep + 1} of {QUIZ_QUESTIONS.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-rose-100 p-8"
        >
          {/* Question */}
          <div className="mb-8">
            <h3 className="text-2xl font-light text-gray-900 mb-4">
              {currentQuestion?.question}
            </h3>
            <p className="text-gray-600">
              Choose the option that best describes you. This helps us personalize your skincare recommendations.
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {currentQuestion?.options.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(currentQuestion.id, option.value)}
                className={`p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-rose-500 bg-rose-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-rose-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">
                    {option.image}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {option.label}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                  {answers[currentQuestion.id] === option.value && (
                    <CheckCircle className="h-6 w-6 text-rose-500 flex-shrink-0" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed || isSubmitting}
              className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  {isLastQuestion ? 'Get My Results' : 'Next'}
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Quiz Results Component
function QuizResults({ result, onRestart }: { result: SkinQuizResult; onRestart: () => void }) {
  const { skinProfile, confidence, recommendations, explanation } = result

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="h-8 w-8 text-rose-500" />
          <h2 className="text-3xl font-light text-gray-900">Your Personalized Results</h2>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Based on your answers, we've created a personalized skincare plan just for you
        </p>
      </motion.div>

      {/* Skin Profile Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-light text-gray-900 mb-6">Your Skin Profile</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <div className="text-2xl">
                {skinProfile.skinType === 'oily' ? '🌟' :
                 skinProfile.skinType === 'dry' ? '💎' :
                 skinProfile.skinType === 'combination' ? '🌈' :
                 skinProfile.skinType === 'sensitive' ? '🌺' : '✨'}
              </div>
            </div>
            <h4 className="font-medium text-gray-900 capitalize">{skinProfile.skinType} Skin</h4>
            <p className="text-sm text-gray-600 mt-1">Your skin type</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <div className="text-2xl">
                {skinProfile.primaryConcern === 'acne' ? '🎯' :
                 skinProfile.primaryConcern === 'aging' ? '👑' :
                 skinProfile.primaryConcern === 'dark_spots' ? '🌅' :
                 skinProfile.primaryConcern === 'hydration' ? '💧' : '🌸'}
              </div>
            </div>
            <h4 className="font-medium text-gray-900 capitalize">
              {skinProfile.primaryConcern.replace('_', ' ')}
            </h4>
            <p className="text-sm text-gray-600 mt-1">Primary concern</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <div className="text-2xl">
                {confidence > 90 ? '🎯' : confidence > 80 ? '✨' : '🌟'}
              </div>
            </div>
            <h4 className="font-medium text-gray-900">{confidence}% Match</h4>
            <p className="text-sm text-gray-600 mt-1">Confidence level</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white rounded-xl">
          <p className="text-gray-700 leading-relaxed">{explanation}</p>
        </div>
      </motion.div>

      {/* Product Recommendations */}
      {recommendations.products && recommendations.products.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border border-rose-100 p-8"
        >
          <h3 className="text-2xl font-light text-gray-900 mb-6">Recommended Products</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.products.slice(0, 6).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all duration-200"
              >
                <div className="aspect-square bg-white rounded-lg mb-4 flex items-center justify-center">
                  <TestTube className="h-12 w-12 text-rose-300" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 line-clamp-2">{product.name}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                  
                  {product.matchScore && (
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-rose-600">
                        {product.matchScore}% Match
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    <button className="text-sm text-rose-600 hover:text-rose-700 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/categories/skincare"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-200"
            >
              Shop All Recommendations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      )}

      {/* Skincare Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl shadow-sm border border-rose-100 p-8"
      >
        <h3 className="text-2xl font-light text-gray-900 mb-6">Personalized Tips</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-rose-50 rounded-lg">
              <Heart className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <button
          onClick={onRestart}
          className="px-6 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Retake Quiz
        </button>
        <Link
          href="/categories/skincare"
          className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-200"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  )
}
