'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlockedAt?: Date;
  isUnlocked: boolean;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  discount: number;
  type: 'percentage' | 'fixed';
  isRedeemed: boolean;
  redeemedAt?: Date;
}

interface RewardsState {
  points: number;
  totalEarned: number;
  level: number;
  achievements: Achievement[];
  availableRewards: Reward[];
  redeemedRewards: Reward[];
}

type RewardsAction =
  | { type: 'ADD_POINTS'; payload: { points: number; reason: string } }
  | { type: 'REDEEM_REWARD'; payload: { rewardId: string } }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: { achievementId: string } }
  | { type: 'LOAD_REWARDS'; payload: RewardsState };

const initialAchievements: Achievement[] = [
  {
    id: 'first-purchase',
    title: 'First Purchase',
    description: 'Made your first purchase with us',
    icon: '🛍️',
    points: 100,
    isUnlocked: true,
    unlockedAt: new Date('2025-08-01')
  },
  {
    id: 'style-maven',
    title: 'Style Maven',
    description: 'Added 10 items to wishlist',
    icon: '✨',
    points: 200,
    isUnlocked: true,
    unlockedAt: new Date('2025-08-10')
  },
  {
    id: 'loyal-customer',
    title: 'Loyal Customer',
    description: 'Made 5 purchases',
    icon: '👑',
    points: 300,
    isUnlocked: false
  },
  {
    id: 'trendsetter',
    title: 'Trendsetter',
    description: 'Purchased from 3 different categories',
    icon: '🌟',
    points: 250,
    isUnlocked: false
  },
  {
    id: 'vip-member',
    title: 'VIP Member',
    description: 'Reached 1000 style points',
    icon: '💎',
    points: 500,
    isUnlocked: false
  }
];

const initialRewards: Reward[] = [
  {
    id: 'welcome-discount',
    title: '15% Off First Order',
    description: 'Welcome bonus for new members',
    pointsCost: 0,
    discount: 15,
    type: 'percentage',
    isRedeemed: true,
    redeemedAt: new Date('2025-08-01')
  },
  {
    id: 'birthday-special',
    title: '25% Birthday Discount',
    description: 'Special birthday month offer',
    pointsCost: 0,
    discount: 25,
    type: 'percentage',
    isRedeemed: false
  },
  {
    id: 'small-discount',
    title: '$10 Off',
    description: 'Get $10 off your next purchase',
    pointsCost: 500,
    discount: 10,
    type: 'fixed',
    isRedeemed: false
  },
  {
    id: 'medium-discount',
    title: '$25 Off',
    description: 'Get $25 off your next purchase',
    pointsCost: 1000,
    discount: 25,
    type: 'fixed',
    isRedeemed: false
  },
  {
    id: 'large-discount',
    title: '$50 Off',
    description: 'Get $50 off your next purchase',
    pointsCost: 2000,
    discount: 50,
    type: 'fixed',
    isRedeemed: false
  }
];

const initialState: RewardsState = {
  points: 2450,
  totalEarned: 3200,
  level: 3,
  achievements: initialAchievements,
  availableRewards: initialRewards.filter(r => !r.isRedeemed),
  redeemedRewards: initialRewards.filter(r => r.isRedeemed),
};

function rewardsReducer(state: RewardsState, action: RewardsAction): RewardsState {
  switch (action.type) {
    case 'ADD_POINTS': {
      const newPoints = state.points + action.payload.points;
      const newTotalEarned = state.totalEarned + action.payload.points;
      const newLevel = Math.floor(newTotalEarned / 1000) + 1;

      return {
        ...state,
        points: newPoints,
        totalEarned: newTotalEarned,
        level: newLevel,
      };
    }

    case 'REDEEM_REWARD': {
      const reward = state.availableRewards.find(r => r.id === action.payload.rewardId);
      if (!reward || state.points < reward.pointsCost) {
        return state;
      }

      const updatedReward = {
        ...reward,
        isRedeemed: true,
        redeemedAt: new Date(),
      };

      return {
        ...state,
        points: state.points - reward.pointsCost,
        availableRewards: state.availableRewards.filter(r => r.id !== action.payload.rewardId),
        redeemedRewards: [...state.redeemedRewards, updatedReward],
      };
    }

    case 'UNLOCK_ACHIEVEMENT': {
      const achievement = state.achievements.find(a => a.id === action.payload.achievementId);
      if (!achievement || achievement.isUnlocked) {
        return state;
      }

      const updatedAchievements = state.achievements.map(a =>
        a.id === action.payload.achievementId
          ? { ...a, isUnlocked: true, unlockedAt: new Date() }
          : a
      );

      return {
        ...state,
        points: state.points + achievement.points,
        totalEarned: state.totalEarned + achievement.points,
        achievements: updatedAchievements,
      };
    }

    case 'LOAD_REWARDS':
      return action.payload;

    default:
      return state;
  }
}

interface RewardsContextType extends RewardsState {
  addPoints: (points: number, reason: string) => void;
  redeemReward: (rewardId: string) => boolean;
  unlockAchievement: (achievementId: string) => void;
  canRedeemReward: (rewardId: string) => boolean;
}

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

export function RewardsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(rewardsReducer, initialState);

  // Load rewards from localStorage on mount
  useEffect(() => {
    const savedRewards = localStorage.getItem('aura-rewards');
    if (savedRewards) {
      try {
        const parsedRewards = JSON.parse(savedRewards);
        dispatch({ type: 'LOAD_REWARDS', payload: parsedRewards });
      } catch (error) {
        console.error('Error loading rewards from localStorage:', error);
      }
    }
  }, []);

  // Save rewards to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('aura-rewards', JSON.stringify(state));
  }, [state]);

  const addPoints = (points: number, reason: string) => {
    dispatch({ type: 'ADD_POINTS', payload: { points, reason } });
  };

  const redeemReward = (rewardId: string) => {
    const reward = state.availableRewards.find(r => r.id === rewardId);
    if (!reward || state.points < reward.pointsCost) {
      return false;
    }
    
    dispatch({ type: 'REDEEM_REWARD', payload: { rewardId } });
    return true;
  };

  const unlockAchievement = (achievementId: string) => {
    dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: { achievementId } });
  };

  const canRedeemReward = (rewardId: string) => {
    const reward = state.availableRewards.find(r => r.id === rewardId);
    return reward ? state.points >= reward.pointsCost : false;
  };

  const contextValue: RewardsContextType = {
    ...state,
    addPoints,
    redeemReward,
    unlockAchievement,
    canRedeemReward,
  };

  return (
    <RewardsContext.Provider value={contextValue}>
      {children}
    </RewardsContext.Provider>
  );
}

export function useRewards() {
  const context = useContext(RewardsContext);
  if (context === undefined) {
    throw new Error('useRewards must be used within a RewardsProvider');
  }
  return context;
}
