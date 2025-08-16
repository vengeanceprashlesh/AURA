'use client';

import CategoryPageBase from '@/components/layout/CategoryPageBase';
import { motion } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';

const DailyDropsPage = () => {
  return (
    <div>
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-medium flex items-center justify-center gap-2"
        >
          <Clock className="h-5 w-5" />
          Updated daily at 12 PM EST - Don't miss out!
          <Sparkles className="h-5 w-5" />
        </motion.div>
      </div>

      <CategoryPageBase
        title="Daily Drops"
        description="Fresh arrivals added every single day. Be the first to discover what's new!"
        backgroundImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&h=600"
        products={[]}
        categories={[]}
        filters={[
          {
            id: 'drop-time',
            name: 'Drop Time',
            options: [
              { id: 'today', name: 'Today', count: 12 },
              { id: 'yesterday', name: 'Yesterday', count: 8 },
              { id: 'this-week', name: 'This Week', count: 42 },
            ]
          }
        ]}
      />
    </div>
  );
};

export default DailyDropsPage;
