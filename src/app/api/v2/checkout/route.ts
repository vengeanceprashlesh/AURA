import { withAuth } from '@/lib/middleware/error.middleware';
import { requireUserAuth } from '@/lib/middleware/auth.middleware';
import { successResponse } from '@/lib/utils/response';
import { paymentService } from '@/lib/services/payment.service';
import { userService } from '@/lib/services/user.service';
import { getConvexClient } from '@/lib/convex-client';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/v2/checkout/intent - Create payment intent
export const POST = withAuth(async (request, userId) => {
  const { amount } = await request.json();
  
  // Get user to fetch Stripe customer ID
  const user = await userService.getUser(userId as Id<"users">);
  
  if (!user.stripeCustomerId) {
    throw new Error('User does not have a Stripe customer ID');
  }
  
  const paymentIntent = await paymentService.createPaymentIntent({
    amount,
    customerId: user.stripeCustomerId,
    metadata: {
      userId: userId,
    },
  });
  
  return successResponse({
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  });
}, requireUserAuth);
