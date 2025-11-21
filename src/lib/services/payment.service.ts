import { getStripe } from '../stripe';
import { getConvexClient } from '../convex-client';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { BadRequestError } from '../utils/errors';

export class PaymentService {
  private stripe = getStripe();
  private convex = getConvexClient();

  // Create payment intent for checkout
  async createPaymentIntent(data: {
    amount: number;
    currency?: string;
    customerId: string;
    metadata?: Record<string, string>;
  }) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(data.amount * 100), // Convert to cents
      currency: data.currency || 'usd',
      customer: data.customerId,
      metadata: data.metadata || {},
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return paymentIntent;
  }

  // Confirm payment and create order
  async confirmPaymentAndCreateOrder(data: {
    paymentIntentId: string;
    userId: Id<"users">;
    items: Array<{
      productId: Id<"products">;
      quantity: number;
      price: number;
      selectedSize?: string;
    }>;
    totalAmount: number;
    shippingAddressId: Id<"addresses">;
    billingAddressId: Id<"addresses">;
    paymentMethod: {
      type: 'card' | 'paypal' | 'apple_pay' | 'google_pay';
      last4?: string;
      brand?: string;
    };
  }) {
    // Verify payment intent
    const paymentIntent = await this.stripe.paymentIntents.retrieve(data.paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      throw new BadRequestError('Payment has not been completed');
    }

    // Create order
    const orderId = await this.convex.mutation(api.orders.createOrder, {
      userId: data.userId,
      items: data.items,
      totalAmount: data.totalAmount,
      shippingAddressId: data.shippingAddressId,
      billingAddressId: data.billingAddressId,
      paymentMethod: data.paymentMethod,
    });

    // Clear user's cart
    await this.convex.mutation(api.cart.clearCart, {
      userId: data.userId,
    });

    return { orderId, paymentIntent };
  }

  // Create refund
  async createRefund(data: {
    paymentIntentId: string;
    amount?: number; // Optional partial refund
    reason?: string;
  }) {
    const refund = await this.stripe.refunds.create({
      payment_intent: data.paymentIntentId,
      amount: data.amount ? Math.round(data.amount * 100) : undefined,
      reason: data.reason as any,
    });

    return refund;
  }

  // Get payment methods for customer
  async getPaymentMethods(customerId: string) {
    const paymentMethods = await this.stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });

    return paymentMethods.data;
  }

  // Attach payment method to customer
  async attachPaymentMethod(paymentMethodId: string, customerId: string) {
    const paymentMethod = await this.stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    return paymentMethod;
  }

  // Detach payment method from customer
  async detachPaymentMethod(paymentMethodId: string) {
    const paymentMethod = await this.stripe.paymentMethods.detach(paymentMethodId);
    return paymentMethod;
  }

  // Calculate order total with tax and shipping
  calculateOrderTotal(data: {
    subtotal: number;
    taxRate?: number;
    shippingCost?: number;
    discount?: number;
  }): {
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    total: number;
  } {
    const subtotal = data.subtotal;
    const tax = subtotal * (data.taxRate || 0);
    const shipping = data.shippingCost || 0;
    const discount = data.discount || 0;
    const total = subtotal + tax + shipping - discount;

    return {
      subtotal,
      tax: Math.round(tax * 100) / 100,
      shipping,
      discount,
      total: Math.round(total * 100) / 100,
    };
  }
}

export const paymentService = new PaymentService();
